interface SlideObject {
    renderArrowPrev: (clickHandler:() => void, hasPrev: boolean, label: string) => JSX.Element;
    renderArrowNext: (clickHandler: () => void, hasPrev: boolean, label: string) => JSX.Element;
    showThumbs: boolean;
    showStatus: boolean;
    infiniteLoop: boolean;
    autoPlay: boolean;
    interval: number;
}

export type Slide = () => SlideObject;