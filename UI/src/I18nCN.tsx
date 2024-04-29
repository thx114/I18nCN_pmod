import { DeveloperMode } from "i18/developerMode";
import { RIF,delay,Lock } from "./RIF";

import { Editor } from "./i18/editor";
import { Settings } from "./i18/settings";
import { Game } from "i18/game";

const DEV_MODE = false

export const load = ()=>{
    if ((window as any).I18nCN && (window as any).I18nCN.loadded) { return null }

    ; (window as any).I18nCN = {
        loadded : true,
        target:null
    }
    ; (window as any).Lock = {}

    console.log("全局汉化 载入")

    function I18nCN(useItems:string[]) {
        const dir = {
            DeveloperMode:DeveloperMode,
            Editor:Editor,
            Settings:Settings,
            Game:Game,
        } as any
        const textReplaceItems = useItems.map(i=>eval(`dir.${i}`))
        for (const textReplaceItems_Ritem of textReplaceItems) {
            const Ritem = textReplaceItems_Ritem.replace()
            if(!Ritem){continue}
            for (const [ReFunc, ReStrs] of (Ritem as any)) {
                ReFunc.forEach((func: RIF) => func.REPLACE(ReStrs))
            }
        
        }
    }

    const KeyI18Funcs = [DeveloperMode]
    const MouseI18Funcs = [Editor,Settings,Game]


    const KEY_EVENTS = KeyI18Funcs.map((func:any)=>func.KeyEvent)
    const MOUSE_EVENTS = MouseI18Funcs.map((func:any)=>func.MouseEvent)
    console.log(`全局汉化加载了 ${KEY_EVENTS.length} 个按键事件, ${MOUSE_EVENTS.length} 个鼠标事件`)



    document.body.addEventListener("keydown", async (key) => {
        if (!await Lock('i18_key', 200)) { return null };
        for (const func of KEY_EVENTS) {
            if (!Object.keys(func).includes(key.code)) { continue }
            func[key.code]()
        }
    })

    document.body.addEventListener("mousedown", async (key) => {
        if (!await Lock('i18_mouse', 200)) { return null };
        if(key.button!==0){return null}
        for (const func of MOUSE_EVENTS) {
            if(!func){continue}
            func(key)
        }
    })

    document.body.addEventListener('mousedown', function(event) {
        if(event.button!==0)return null;
        const target = event.target;
        if (!target)return null;
        (window as any).I18nCN.target = target
    });

    ;(window as any).i18 = I18nCN

    if (DEV_MODE){
        document.body.addEventListener("keydown", async (key) => {
            if(!(key.code==='KeyQ' && key.shiftKey)){return null}
            const DOM = document.querySelector('.info-description_wwd') as any
            DOM.style.backgroundColor='blue'
            console.log(DOM.textContent)
            setTimeout(()=>{
                DOM.style.backgroundColor=''
            },500)
        })

        document.body.addEventListener("mousedown", async (event) => {
            if(event.button!=2) return;
            if(!event.shiftKey) return;
            const DOM = event.target as any
            if(!DOM) return;
            DOM.style.backgroundColor='red'
            console.log(DOM.textContent)
            setTimeout(()=>{
                DOM.style.backgroundColor=''
            },500)
        })
    }
    return null
}
