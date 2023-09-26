/// <reference types="react" />
import { PointerProps, WheelData } from './types';
interface Props {
    mustStartSpinning: boolean;
    prizeNumber: number;
    data: WheelData[];
    onStopSpinning?: () => any;
    backgroundColors?: string[];
    backgroundColorsGradient?: string[][];
    textColors?: string[];
    outerBorderColor?: string;
    outerBorderWidth?: number;
    innerRadius?: number;
    innerBorderColor?: string;
    innerBorderWidth?: number;
    radiusLineColor?: string;
    radiusLineWidth?: number;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
    perpendicularText?: boolean;
    textDistance?: number;
    spinDuration?: number;
    startingOptionIndex?: number;
    pointerProps?: PointerProps;
    disableInitialAnimation?: boolean;
    pending?: boolean;
}
export declare const Wheel: ({ mustStartSpinning, prizeNumber, data, onStopSpinning, backgroundColors, backgroundColorsGradient, textColors, outerBorderColor, outerBorderWidth, innerRadius, innerBorderColor, innerBorderWidth, radiusLineColor, radiusLineWidth, fontFamily, fontSize, fontWeight, fontStyle, perpendicularText, textDistance, spinDuration, startingOptionIndex, pointerProps, disableInitialAnimation, pending, }: Props) => JSX.Element | null;
export {};
