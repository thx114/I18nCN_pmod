import { event } from "cs2/bindings"

interface rifSettings {
    match: 'full' | 'inc'
    mode: 'text' | 'html'
    replaceMode: 'full' | 'inc'
    afterFunc: Function[]
}


export const setNativeValue = function setNativeValue(element: Element, value: any) {
    const valueSetter = (Object.getOwnPropertyDescriptor(element, 'value') as any).set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = (Object.getOwnPropertyDescriptor(prototype, 'value') as any).set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter.call(element, value);
    } else {
        valueSetter.call(element, value);
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
}
export class RIF {
    match: 'full' | 'inc' = `full`
    replaceMode: 'full' | 'inc' = `full`
    repalceFunc: Function[] = []
    mode: 'text' | 'html' = `text`
    __state: string = 'selected'
    afterFunc: Function[] = []
    items: Element[] = [document.body]
    private _state: Function = (e: Element) => (e.classList.contains(this.__state))
    static Match(str: string, replaceMatch: 'inc' | `full`, rString: string) {
        return ((replaceMatch === 'full' && str === rString) || (replaceMatch === 'inc' && str.includes(rString)) || false)
    }

    constructor(settings: rifSettings | Element | Element[] | RIF = { match: 'full', mode: 'text', replaceMode: 'inc', afterFunc: [] }) {
        if (settings instanceof Element) { this.items = [settings] }
        else if (settings instanceof Array) { this.items = settings }
        else if (settings instanceof RIF) { this.items = settings.items }
        else {
            this.match = settings.match ? settings.match : this.match
            if (this.match === 'inc') { this.replaceMode = 'inc' }
            this.replaceMode = settings.replaceMode ? settings.replaceMode : this.replaceMode
            this.mode = settings.mode ? settings.mode : this.mode
            this.repalceFunc = settings.afterFunc || []
        }
    }
    get all() {
        this.items = this.items
            .filter(item => item && item.children && item.children.length)
            .map(item => Array.from(item.children))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    get before() {
        this.items = this.items
            .filter(item => item && item.previousElementSibling)
            .map(item => item.previousElementSibling) as Element[];
        return this
    }
    get next() {
        this.items = this.items
            .filter(item => item && item.nextElementSibling)
            .map(item => item.nextElementSibling) as Element[];
        return this
    }
    get first() {
        this.items = this.items
            .filter(item => item && item.firstElementChild)
            .map(item => item.firstElementChild) as Element[];
        return this
    }
    isClass(className: string) {
        this.items = this.items.filter((item) => item.classList.contains(className))
        return this
    }
    class(className: string) {
        this.items = this.items
            .filter(item => item)
            .map(item => Array.from(item.querySelectorAll(`.${className}`)))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    isId(id: string) {
        this.items = this.items.filter(item => item.id === id)
        return this
    }
    id(id: string) {
        this.items = this.items
            .filter(item => (item))
            .map(item => Array.from(item.querySelectorAll(`#${id}`)))
            .reduce((acc, children) => acc.concat(children), []);
        return this
    }
    hasHtml(html: string | string[]) {
        this.items = this.items.filter((item) => {
            switch (typeof html) {
                case 'string':
                    return item.innerHTML.includes(html)
                case 'object':
                    return html.some(h => item.innerHTML.includes(h))
            }
        })
        return this
    }
    isHtml(html: string) {
        this.items = this.items.filter((item) => {
            return item.innerHTML === html
        })
        return this
    }
    hasStyle(style: string) {
        this.items = this.items.filter((item) => {
            const computedStyle = window.getComputedStyle(item);
            return computedStyle.getPropertyValue(style) !== '';
        })
    }
    isStyles(styles: string[]) {
        this.items = this.items.filter((item) => {
            const computedStyle = window.getComputedStyle(item);
            return styles.every(style => computedStyle.getPropertyValue(style) !== '');
        })
    }
    index(index: number) {
        this.items = this.items
            .filter(item => item && item.children && item.children.length)
            .map(item => item.children[index]);
        return this
    }
    state = (state: string = 'selected', func: Function | null = null) => {
        this.__state = state
        this._state = func ? func : (e: Element) => e.classList.contains(this.__state)
        return this
    }

    get click() {
        this.items.forEach(item => {
            const allProps = Object.keys(item);
            for (const prop of allProps) {
                if (typeof prop === 'string' && prop.startsWith('__reactProps')) {
                    const onClickMethod = (item as any)[prop]?.onClick;
                    if (typeof onClickMethod === 'function') {
                        try {
                            onClickMethod({ stopPropagation: () => { } });
                        } catch (error) {
                            console.error('Error calling onClick method:', error);
                        }
                    }
                }
            }
        })
        return this
    }
    get enable() {
        this.items.forEach(item => {
            if (!this._state(item, this._state)) { this.click }
        })
        return this
    }
    get disable() {
        this.items.forEach(item => {
            if (this._state(item, this._state)) { this.click }
        })
        return this
    }
    valueOf() {
        return Boolean(this.items.length); // ���ز���ֵ
    }
    get(index: number) {
        this.items = this.items.filter((item, i) => i === index)
        return this
    }
    get item() { return this.items[0] }
    getItems(items: number[]): RIF[] {
        return this.items.filter((item, i) => items.includes(i)).map(item => new RIF(item))
    }
    setValue(value: string) {
        this.items.forEach(item => {
            setNativeValue(item, value);
        })
        return this
    }
    REPLACE = (replaceObject: object) => {
        let mode = (
            (this.mode === 'html') ? 'innerHTML' :
                (this.mode === 'text') ? 'textContent' :
                    'error'
        )
        if (mode == 'error') { console.error('mode 错误:', this.mode) }

        for (const [key, value] of Object.entries(replaceObject)) {
            for (const item of this.items) {
                const Rstr = item as any

                if (item && RIF.Match(Rstr[mode], this.match, key)) {
                    if (this.match === 'full') {
                        Rstr[mode] = value
                    } else if (this.match === 'inc') {
                        if (this.replaceMode == 'full') { Rstr[mode] = value } else {
                            Rstr[mode] = Rstr[mode].replace(new RegExp(`${key}`, 'g'), value)
                        }
                    }
                    this.repalceFunc.forEach(func => func(item))
                }
            }
        }
    }
    get fontCN() {
        this.repalceFunc.push((div: any) => {
            div.style.fontFamily = "Noto Sans SC"
        })
        return this
    }
}
export const rif = function rif(...args: any) {
    return new RIF(...args)
}

export const RE = function RE(...args: any) {
    return args.reduce((result: any, value: any, index: number, array: any) => {
        if (index % 2 === 0) {
            const key = array[index];
            const val = array[index + 1];
            result.set(key, val);
        }
        return result;
    }, new Map());
}


export const delay = function delay(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

export const Lock = async function Lock(name: string, time = 50) {
    async function _Lock(name: string, time = 0) {
        if (typeof ((window as any).Lock[name]) == 'undefined') { (window as any).Lock[name] = false }
        if ((!(window as any).Lock[name]) && time === 0) { (window as any).Lock[name] = true; return true }
        else if ((window as any).Lock[name] && time > 0) { await delay(time); (window as any).Lock[name] = false }
        else { return false }
    }
    if (await _Lock(name)) { _Lock(name, time); return true }
    else { return false }
}

export const Fsytle = (Element: any, sytle: string) => {
    return Number(window.getComputedStyle(Element).getPropertyValue(sytle))
}

export const Click = (item: any, returnFunc = false): undefined | { reactItem: any, prop: string, onClickMethod: Function } => {
    const allProps = Object.keys(item);
    for (const prop of allProps) {
        if (typeof prop === 'string' && prop.startsWith('__reactProps')) {
            const onClickMethod = (item as any)[prop]?.onClick;
            if (typeof onClickMethod === 'function') {
                if (returnFunc) { return { reactItem: item, prop: prop, onClickMethod: onClickMethod } }
                try {
                    onClickMethod({ stopPropagation: () => { } });
                } catch (error) {
                    console.error('Error calling onClick method:', error);
                }
                return undefined
            }
        }
    }

}

export const WINODW = (window as any)
export const on = {
    get Game() { return Boolean(document.body.querySelector('.game-main-screen_TRK')) },
    get Editor() { return Boolean(document.body.querySelector('.editor-main-screen_m89')) },
    get Menu() { return Boolean(document.body.querySelector('.menu-ui_I8X')) },
    get Settings() { return Boolean(document.body.querySelector('.option-page_CW8')) },
    get Debug() { return Boolean(document.body.querySelector('.debug-ui_M_y')) },
    Target: async (TargetCondition:Function,Condition:Function,Callback:Function,Delay=100,Times=10) => {
        await delay(10)
        if (TargetCondition()) {
            let times = 0
            while (!Condition() && Times < 10) {
                await delay(100)
                times + 1
            }
            await delay(Delay)
            Callback()
        }
    },
}



export function I18(...args:any) {
    (window as any).i18(...args)
}

export const win = {
    get target() {
        return (window as any).I18nCN.target
    }
}


