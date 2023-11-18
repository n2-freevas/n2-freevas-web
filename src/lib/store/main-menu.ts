import { writable } from 'svelte/store'

/* Models */
export type SubMenu = {
    name: string
    path: string
    img: string
    explain: string
    root: string
    submenu: SubMenu[]
}
export type MainMenu = {
    name: string //親メニュー名称
    path: string
    img: string
    active: boolean
    explain: string
    submenu: SubMenu[]
    target?: "_blank"
}


/* Initialize */
export const mainmenus = writable<MainMenu[]>([
    {
        name: 'profile',
        path: '/introduce',
        img: '/img/profile_icon.svg',
        active: true,
        explain: 'Taro Nonoyamaの<br>プロフィールを表示します。',
        submenu: []
    },
    {
        name: 'contact',
        path: 'https://twitter.com/N2_FreeVAS',
        img: '/img/X_icon.svg',
        target: "_blank",
        active: true,
        explain: '連絡先・SNSアカウントを<br>表示します。',
        submenu: []
    },
    {
        name: 'web dmg-cnt.',
        img: '/img/pokeca/icon_white.svg',
        path: '/pokemon-card-game-effector',
        explain: 'ポケカのダメカンを、Webカメラ上でやっちゃうお手軽ツール。',
        active: true,
        submenu: []
    },
    {
        name: 'tcg sim',
        img: '/img/tcg-sim/card_naname.svg',
        active: true,
        path: '/tcg-simulator/game',
        explain: '適当に作って放置している、任意のTCGを一人回しできるエミュレーター',
        submenu: []
    },
    {
        name: 'bonus',
        path: '/show',
        img: '/img/bonus.svg',
        active: true,
        explain: 'CSSでつくったおもちゃなど',
        submenu: []
    }
])
