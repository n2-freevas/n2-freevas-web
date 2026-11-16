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
        name: 'hobby',
        path: '/hobby',
        img: '/img/hobby_icon.svg',
        active: true,
        explain: '趣味で作ったツールなどの一覧です。',
        submenu: []
    },
    {
        name: 'LinkedIn',
        path: 'https://www.linkedin.com/in/%E5%A4%AA%E9%83%8E-%E9%87%8E%E3%80%85%E5%B1%B1-05b20534a/',
        img: '/img/linkedin-svgrepo-com.svg',
        target: "_blank",
        active: true,
        explain: 'LinkedInのアカウントへ遷移します。',
        submenu: []
    },
    {
        name: 'github',
        img: '/img/github_icon.svg',
        path: 'https://github.com/n2-freevas',
        target: "_blank",
        explain: 'githubプロフィールへ遷移します',
        active: true,
        submenu: []
        
    },
    // {
    //     name: 'tcg sim',
    //     img: '/img/tcg-sim/card_naname.svg',
    //     active: true,
    //     path: '/tcg-simulator/game',
    //     explain: '適当に作って放置している、任意のTCGを一人回しできるエミュレーター',
    //     submenu: []
    // },
    {
        name: 'e.o.w',
        path: '/bonus',
        img: '/img/bonus.svg',
        active: true,
        explain: '末筆として。',
        submenu: []
    }
])

/* hobby配下の一覧 */
export const hobbymenus = writable<MainMenu[]>([
    {
        name: 'sports movie player',
        img: '/img/sports_movie_player_icon.svg',
        path: '/hobby/sports-movie-player',
        explain: 'タップとスワイプだけでスキップ・速度変更ができる動画プレーヤー。',
        active: true,
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
        name: 'clock',
        img: '/img/n2_clock/time-11.svg',
        path: '/hobby/clock',
        explain: 'N2-clockを眺めるだけの画面。',
        active: true,
        submenu: []
    }
])
