
import { IMapPoint } from "./map-renderer/map-renderer.component";

/*
 *  Utility functions for maps
 */

export class MapUtilities {
    constructor() {
        throw new Error('class is static')
    }

    public static base64Encode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode(('0x' + p1) as any);
        }));
    }

    public static getFillScale(source, dest) {
        const ratio_w = source.width / dest.width;
        const ratio_h = source.height / dest.height;
        return Math.min(ratio_w, ratio_h);
    }

    public static cleanCssSelector(name) {
        let selector = name.replace(/[!"#$%&'()*+,.\/;<=>?@[\\\]^`{|}~]/g, "\\$&");
        let parts = selector.split(' ');
        for (let p of parts) {
            parts.splice(parts.indexOf(p), 1, [p.replace(/^\\/g, '')]);
        }
        selector = parts.join(' ');
        return selector;
    }

    public static getPosition(box, el: Element, coords: IMapPoint) {
        if (el) {
            const el_box = el.getBoundingClientRect();
            return {
                x: +((el_box.left + el_box.width / 2 - box.left) / box.width * 100).toFixed(3),
                y: +((el_box.top + el_box.height / 2 - box.top) / box.height * 100).toFixed(3)
            };
        } else if (coords) {
            const ratio = box.width / box.height
            return {
                x: +((coords.x / 10000) * 100).toFixed(3),
                y: +((coords.y / (10000 * ratio)) * 100).toFixed(3)
            }
        }
        return null;
    }
}