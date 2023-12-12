declare module "*.module.css" {
    const styles: { [className: string]: { [className: string]: string } | string };
    export = styles;
}

declare module "*.svg" {
    const content: string;
    export = content;
}
