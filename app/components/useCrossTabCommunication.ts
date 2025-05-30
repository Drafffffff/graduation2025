import { useCallback, useEffect } from 'react';

// 消息类型定义
export type MessageType = string | symbol;

// 消息结构
export interface CrossTabMessage<T = any> {
  type: MessageType;
  payload: T;
  timestamp: number;
  sender?: string;
}

// Hook 配置选项
interface UseCrossTabCallbackOptions {
  /** 
   * 是否在发送消息的标签页也执行回调 
   * 默认 false（仅其他标签页执行回调）
   */
  includeCurrentTab?: boolean;

  /** 
   * 消息存储键名（用于多个独立通信通道）
   * 默认 'cross-tab-callback'
   */
  storageKey?: string;

  /** 
   * 消息发送者标识（用于调试）
   * 默认 window.location.href
   */
  senderId?: string;
}

// Hook 返回值类型
interface UseCrossTabCallback {
  /**
   * 发送消息到其他标签页
   * @param type 消息类型
   * @param payload 消息负载（任意数据）
   * @param callback 可选的回调函数（将在接收方执行）
   */
  sendMessage: <T>(
    type: MessageType,
    payload: T,
    callback?: (payload: T) => void
  ) => void;

  /**
   * 订阅特定类型的消息
   * @param type 消息类型
   * @param callback 收到消息时执行的回调
   * @returns 取消订阅函数
   */
  subscribe: <T>(
    type: MessageType,
    callback: (payload: T, sender: string) => void
  ) => () => void;
}

// 存储订阅回调
type SubscriptionCallback<T> = (payload: T, sender: string) => void;
type Subscriptions = Map<MessageType, Set<SubscriptionCallback<any>>>;

// 单例模式确保全局只有一个订阅映射
let globalSubscriptions: Subscriptions | null = null;

// 获取全局订阅映射
const getGlobalSubscriptions = (): Subscriptions => {
  if (!globalSubscriptions) {
    globalSubscriptions = new Map();
  }
  return globalSubscriptions;
};

/**
 * 跨标签页通信回调 Hook
 * @param options 配置选项
 * @returns { sendMessage, subscribe } 发送消息和订阅消息的方法
 */
export const useCrossTabCallback = (
  options: UseCrossTabCallbackOptions = {}
): UseCrossTabCallback => {
  const {
    includeCurrentTab = false,
    storageKey = 'cross-tab-callback',
    senderId = window.location.href
  } = options;

  // 获取全局订阅映射
  const subscriptions = getGlobalSubscriptions();

  // 发送消息
  const sendMessage = useCallback(<T,>(
    type: MessageType,
    payload: T,
    callback?: (payload: T) => void
  ) => {
    try {
      // 创建消息对象
      const message: CrossTabMessage<T> = {
        type,
        payload,
        timestamp: Date.now(),
        sender: senderId
      };

      // 如果需要包含回调，将回调存储在消息中
      if (callback) {
        const callbackWrapper = {
          __isCallback: true,
          callback: callback.toString()
        };
        (message as any).callbackWrapper = callbackWrapper;
      }

      // 存储消息到 localStorage
      localStorage.setItem(storageKey, JSON.stringify(message));

      // 手动触发 storage 事件
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: storageKey,
          newValue: JSON.stringify(message)
        })
      );

      // 如果需要在当前标签页也执行回调
      if (includeCurrentTab && callback) {
        callback(payload);
      }
    } catch (error) {
      console.error('Error sending cross-tab message:', error);
    }
  }, [includeCurrentTab, storageKey, senderId]);

  // 订阅消息
  const subscribe = useCallback(<T,>(
    type: MessageType,
    callback: (payload: T, sender: string) => void
  ): (() => void) => {
    // 初始化该类型的订阅集合
    if (!subscriptions.has(type)) {
      subscriptions.set(type, new Set());
    }

    // 获取该类型的订阅集合
    const callbacks = subscriptions.get(type)!;

    // 添加回调到集合
    callbacks.add(callback);

    // 返回取消订阅函数
    return () => {
      if (subscriptions.has(type)) {
        const callbacks = subscriptions.get(type)!;
        callbacks.delete(callback);

        // 如果没有回调了，清理该类型
        if (callbacks.size === 0) {
          subscriptions.delete(type);
        }
      }
    };
  }, [subscriptions]);

  // 处理接收到的消息
  const handleMessage = useCallback((event: StorageEvent) => {
    // 忽略非目标事件
    if (event.key !== storageKey || !event.newValue) return;

    try {
      const message: CrossTabMessage = JSON.parse(event.newValue);

      // 忽略来自当前标签页的消息（除非配置 includeCurrentTab）
      if (!includeCurrentTab && message.sender === senderId) return;

      // 检查是否有订阅该类型的回调
      if (subscriptions.has(message.type)) {
        const callbacks = subscriptions.get(message.type)!;

        // 执行所有订阅的回调
        callbacks.forEach(callback => {
          try {
            callback(message.payload, message.sender || 'unknown');
          } catch (error) {
            console.error('Error executing subscription callback:', error);
          }
        });
      }

      // 检查是否有内联回调
      if ((message as any).callbackWrapper) {
        const callbackWrapper = (message as any).callbackWrapper;

        if (callbackWrapper.__isCallback) {
          try {
            // 反序列化回调函数
            const callback = new Function(`return (${callbackWrapper.callback})`)();
            callback(message.payload);
          } catch (error) {
            console.error('Error executing inline callback:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error processing cross-tab message:', error);
    }
  }, [includeCurrentTab, storageKey, senderId, subscriptions]);

  // 设置事件监听
  useEffect(() => {
    window.addEventListener('storage', handleMessage);
    return () => {
      window.removeEventListener('storage', handleMessage);
    };
  }, [handleMessage]);

  return {
    sendMessage,
    subscribe
  };
};
