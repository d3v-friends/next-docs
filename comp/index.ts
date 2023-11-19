export const merge = (...classNames: string[]): string => {
    let nms = "";
    for (let nm of classNames) {
        nms += `${nm} `;
    }
    return nms.slice(0, nms.length - 1);
};
