import { on, RE, rif,I18, delay, win } from '../RIF'

export const Settings = {
    item: {
        replace: () => {
            if (!on.Settings) { return }

            const buttonClick = (i: any) => {
                i.parentElement.addEventListener('mouseup', () => {
                    setTimeout(() => I18(['Settings.main']), 10)
                })
            }
            const 设置 = {
                选项: rif({ afterFunc: [buttonClick] }).class('menu_hb1.child-opacity-transition_nkS').class('item_pq7.primary_Q54').first,
                选项inc: rif({ match: 'inc', afterFunc: [buttonClick] }).class('menu_hb1.child-opacity-transition_nkS').class('item_pq7.primary_Q54').first,
            }
            return RE(
                [设置.选项], {
                '529 Tiles': '529 区块解锁',
                'Anarchy': '无碰撞',
                'Asset Packs Manager': '资产管理器',
                'First Person Camera': '第一人称视角',
                'Map Texture Replacer': '地图纹理替换',

                'Road Name Remover': '道路名称移除',
                'Tree Controller': '树木控制器',
                'Weather Plus': '天气+',
                '模组': '模组开发',
                'Find It':'Find It ',
                'Move It':'Move It '

            },
                [设置.选项inc], {
                'Overpopulated Gizmo': '人口过剩工具'
            }
            )
        }
    },
    main: {
        replace: () => {
            if (!on.Settings) { return }

            const mouseOver = (i: any) => {
                i.parentElement.addEventListener('mouseenter', () => {
                    setTimeout(() => I18(['Settings.info','Settings.main']), 10)
                })
            }
            const buttonMouseOver = (i: any) => {
                i.addEventListener('mouseenter', () => {
                    setTimeout(() => I18(['Settings.info','Settings.main']), 10)
                })
            }

            const 设置 = {
                标签: rif({ afterFunc: [mouseOver] }).class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('content_gqa').class('label_DGc.label_ZLb'),
                分类: rif().class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('breadcrumbs_xcd').class('label_sAz.label-level-1'),
                标题: rif().class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-title_a3p'),
                描述: rif().class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-description_wwd'),
                TAB: rif().class('option-page_CW8.option-section_VzQ').class('main-column_D0A').class('tab_P7S'),
                按钮: rif({ afterFunc: [buttonMouseOver] }).class('button_WWa.button_SH8'),
            }

            return RE(
                [设置.标签, 设置.标题], {
                'Disable Anarchy Toggle While Brushing Objects': '在笔刷工具禁用无碰撞切换',
                'Enable Local Asset Packs': '启用本地资产加载',
                'Enable Subscribed Asset Packs': '启用订阅资产加载',
                'Enable Verbose Logging': '启用详细日志',
                'Auto Hide Notifications': '自动隐藏通知',
                'Show Warning for Local Assets': '显示本地资产警告',
                "Open Find It's panel after picking an object": "选取对象后打开Find It面板",
                "Select the first asset when opening Find It": "打开Find It时选择第一个资产",
                "Hide \"Random\" asset types": "隐藏“随机”资产类型",
                "Scroll Speed": "滚动速度",
                "Row Size": "行大小",
                "Column Size": "列大小",
                "Expanded Row Size": "展开的行大小",
                "Expanded Column Size": "展开的列大小",
                "Opens Support discord server in new tab.": "在新标签页中打开支持Discord服务器。",
                "Enable overpopulated gizmo": "启用人口过剩工具",
                "Enable dump to log": "启用日志转储",
                "Enable loading fix": "启用加载修复",
                "Enable renter fix": "启用租户修复",
                "Enable separated removal systems": "启用分离的移除系统",
                "Hide Street Names": "隐藏街道名称",
                "Hide Highway Names": "隐藏高速公路名称",
                "Hide Alley Names": "隐藏巷道名称",
                "Hide Bridge Names": "隐藏桥梁名称",
                "Hide Dam Names": "隐藏水坝名称"
            },
                [设置.分类], {
                'Synchronization': '同步',
                'Actions': '行为',
                'Miscellaneous': '杂项',
                "Behavior": "行为",
                "Display": "显示",
                "Other": "其他",
                "Toggle": "切换",
                'Options':'选项',
                'Change the settings for the Road Name Remover mod. Please change the language after changing any option to reload the changes.': '更改道路名称移除器模组的设置。请更改语言后更改任何选项以重新加载更改。',


            },
                [设置.按钮, 设置.标题], {
                'Open Log File': '打开日志文件',
                "Reset Favorites": "重置收藏",
                "Support": "支持",
                'Reset All Settings': '重置所有设置',

            },
                [rif({ afterFunc: [(i: any) => { i.style.color = 'red' }, buttonMouseOver] }).class('button_WWa.button_SH8'), 设置.标题], {
                'Delete Mods Cache': '删除模组缓存',
            }
            )
        }
    },
    info: {
        replace: () => {
            if (!on.Settings) { return }

            const 设置 = {
                描述: rif().class('option-page_CW8.option-section_VzQ').class('info-column_uQ0').class('info-description_wwd'),
            }
            return RE(
                [设置.描述], {

                "Enables the import of locally installed mods (Mods in the user/Mods folder).":
                    "允许导入本地安装的模组（用户/Mods文件夹中的模组）。",

                "Enables the import of subscribed asset packs.":
                    "允许导入订阅的资产包。",

                "Enables additional log messages for debugging purposes.":
                    "启用额外的日志消息以用于调试目的。",

                "Automatically hides Asset Importer Notifications after 30 seconds.":
                    "自动在30秒后隐藏资产导入器通知。",

                "Displays a warning when APM detects local assets in the user/Mods folder. This is to prevent accidental loading of local assets.":
                    "当APM检测到用户/Mods文件夹中的本地资产时显示警告，以防止意外加载本地资产。",

                "Sometimes helps the issue of missing CID-Files. Deletes the cache of downloaded PDX Mods. This will close the game immediately. It will not change your playset, but will require to re-download all mods on the next startup. This might take a few minutes depending on the amount of subscribed mods.":
                    "有时可以帮助解决缺失的CID文件问题。删除已下载PDX模组的缓存。这将立即关闭游戏。它不会改变您的游戏配置，但需要在下次启动时重新下载所有模组。这可能需要几分钟，具体取决于订阅的模组数量。",

                "Opens the log file of the mod in the default text editor. Log contains details about assets that failed to load.":
                    "在默认文本编辑器中打开模组的日志文件。日志包含无法加载的资产的详细信息。",

                "Automatically disables the anarchy toggle while brushing objects such as trees. Toggle reverts back to previous state after you stop brushing objects.":
                    "在刷树等物体时自动禁用无碰撞状态切换。停止刷物体后，切换恢复到之前的状态。",

                "Choose between opening the Find It panel after selecting an object with Picker, or the vanilla panel if available.":
                    "选择在使用选择器选定对象后打开Find It面板，或者如果可用，打开默认面板。",

                "Automatically selects the first asset in the list when opening the Find it panel, this affects behaviors like closing other tools and using the Escape key to close Find it.":
                    "打开Find It面板时自动选择列表中的第一个资产，这影响了关闭其他工具和使用Esc键关闭Find It的行为。",

                "Ignores assets that are marked as Random or Placeholders, requires re-loading your save to apply the changes.":
                    "忽略标记为随机或占位符的资产，需要重新加载存档以应用更改。",

                "Represents a multiplier of the size of one row of items.":
                    "代表一行物品大小的乘数。",

                "Customize how many rows are displayed in the Find It panel.":
                    "自定义Find It面板中显示的行数。",

                "Customize how many columns are displayed in the Find It panel.":
                    "自定义Find It面板中显示的列数。",

                "Customize how many rows are displayed while the Find It panel is expanded.":
                    "自定义展开Find It面板时显示的行数。",

                "Customize how many columns are displayed while the Find It panel is expanded.":
                    "自定义展开Find It面板时显示的列数。",

                "Remove all assets from your favorites.":
                    "从您的收藏中移除所有资产。",

                "Reset Mod Settings to Default Values":
                    "重置Mod设置为默认值",


            }
            )
        }
    },
    MouseEvent:()=>{
        on.Target(
            ()=> (win?.target?.textContent === '选项' || win?.target?.nextElementSibling?.textContent === '选项'),
            ()=> on.Settings,
            ()=> I18(['Settings.item','Settings.main']),
            400
        )
    }
}


