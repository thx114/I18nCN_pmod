import { on, RE, rif, I18, delay } from '../RIF'

export const Game = {
    main: {
        replace: () => {
            if (!on.Game) { return }

            const 重置 = rif().class('reset-button_UEO')
            return RE(
                [重置], {
                'Reset': '重置'
            }
            )
        }
    },
    MouseEvent:async()=>{
        if (!on.Game) { return }
        await delay(200)
        I18(['Game.main'])
    }
}


