/// <reference types="react" />
interface ImagePropsLocal extends ImageProps {
    _imageHTML?: HTMLImageElement;
}
export interface WheelData {
    image?: ImagePropsLocal;
    option?: string;
    style?: StyleType;
    optionSize?: number;
}
export interface StyleType {
    backgroundColor?: string;
    backgroundColorsGradient?: string[];
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
}
export interface PointerProps {
    src?: string;
    style?: React.CSSProperties;
}
export interface ImageProps {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
}
export {};
