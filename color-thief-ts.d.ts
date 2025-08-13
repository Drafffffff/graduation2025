declare module 'color-thief-ts' {
  export default class ColorThief {
    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement | string, quality?: number): [number, number, number];
    getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement | string, colorCount?: number, quality?: number): Array<[number, number, number]>;
    getColorAsync(sourceImage: HTMLImageElement | HTMLCanvasElement | string, quality?: number): Promise<[number, number, number]>;
    getPaletteAsync(sourceImage: HTMLImageElement | HTMLCanvasElement | string, colorCount?: number, quality?: number): Promise<Array<[number, number, number]>>;
  }
}