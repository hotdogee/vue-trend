import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import { DefineComponent } from 'vue';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PublicProps } from 'vue';

declare interface Boundary {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

declare const _default: DefineComponent<Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props> & Readonly<{}>, {
max: number;
min: number;
gradient: string[];
gradientDirection: GradientDirection;
smooth: boolean;
radius: number;
autoDraw: boolean;
autoDrawDuration: number;
autoDrawEasing: string;
height: number | string;
width: number | string;
viewHeight: number;
viewWidth: number;
padding: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
pathRef: CreateComponentPublicInstanceWithMixins<Readonly<Props_2> & Readonly<{}>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, PublicProps, {
max: number;
min: number;
smooth: boolean;
radius: number;
}, false, {}, {}, GlobalComponents, GlobalDirectives, string, {}, SVGPathElement, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<Props_2> & Readonly<{}>, {}, {}, {}, {}, {
max: number;
min: number;
smooth: boolean;
radius: number;
}> | null;
}, any>;

declare type GradientDirection = 'top' | 'bottom' | 'left' | 'right';

declare type InputData = number | {
    value: number;
};

declare interface Props {
    data: InputData[];
    autoDraw?: boolean;
    autoDrawDuration?: number;
    autoDrawEasing?: string;
    gradient?: string[];
    gradientDirection?: GradientDirection;
    max?: number;
    min?: number;
    height?: number | string;
    width?: number | string;
    viewHeight?: number;
    viewWidth?: number;
    padding?: number;
    radius?: number;
    smooth?: boolean;
}

declare interface Props_2 {
    data: InputData[];
    boundary: Boundary;
    id: string;
    smooth?: boolean;
    radius?: number;
    max?: number;
    min?: number;
}

declare const VueTrend: typeof _default & {
    install: Plugin_2;
};
export default VueTrend;

export { }
