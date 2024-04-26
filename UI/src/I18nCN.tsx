import { DeveloperMode } from "i18/developerMode";
import { RIF,delay } from "./RIF";
import { Editor } from "./i18/editor";

export const load = ()=>{
    console.log("全局汉化 load")

    if ((window as any).I18nCN && (window as any).I18nCN.loadded) { return null }

    ; (window as any).I18nCN = {
        loadded : true

    }

    function I18nCN() {
        const textReplaceItems = [Editor,DeveloperMode]
        for (const textReplaceItems_Ritem of textReplaceItems) {
            const Ritem = textReplaceItems_Ritem.replace()
            for (const Ritem_ of Object.values(Ritem)){
            for (const [ReFunc, ReStrs] of Ritem_) {
                ReFunc.forEach((func: RIF) => func.REPLACE(ReStrs))
            }
        }
        }
    }

    // 全局鼠标左键监听
    document.body.addEventListener("mousedown", async (e) => {
        if (e.button != 0) return
        await delay(100)
        I18nCN()
        return null
    })

        document.body.addEventListener("keydown", async (e) => {
        await delay(100)
        I18nCN()
        return null
    })

    ;(window as any).i18 = I18nCN
    return null
}
