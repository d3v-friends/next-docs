declare module "*.module.css" {
    const styles: { [className: string]: { [className: string]: string } | string };
    export = styles;
}
