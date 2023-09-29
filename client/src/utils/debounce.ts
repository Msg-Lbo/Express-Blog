import { customRef } from 'vue';
/**
 * @description: 函数防抖
 * @param {Function} func
 * @param {number} duration 
 * @param {boolean} immediate
 * @example debounce(() => {console.log('debounce')}, 500, true)
 * @example debounce(() => {console.log('debounce')}, 500, false)
 * @example debounce(() => {console.log('debounce')}, 500)
 */
export const debounce = (func: Function, duration: number = 500, immediate?: boolean) => {
    let timer: any = null;
    return (...args: any) => {
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 立即执行
            // callNow 为 true 表示第一次触发事件立即执行函数
            const callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, duration);
            // this 指向 window 对象 args 为事件对象 e 的参数
            if (callNow) func.apply(this, args);
        } else {
            // 延迟执行
            timer = setTimeout(() => {
                func.apply(this, args);
            }, duration);
        }
    }
};

/**
 * @description: 自定义防抖
 * @param {any} value
 * @param {number} duration
 * @returns
 */
export function debounceRef(value: any, duration: number = 500) {
    let timer: any = null;
    return customRef((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue: any) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, duration);
            }
        }
    })
}
