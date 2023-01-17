import { nanoid } from 'nanoid'

export const getVisitorId = (): string => {
    const localId: string | null = localStorage.getItem('visitorId')
    if (localId !== null) return localId
    else {
        const newId: string = nanoid()
        localStorage.setItem('visitorId', newId)
        return newId
    }
}
const getColor = (): string => {
    const getRandomNumber = (): number => Math.floor(Math.random() * 8)
    const colors: Array<string> = [
        'linear-gradient(rgb(214,97,97),rgb(235,81,81))',
        'linear-gradient(rgb(99,152,206),rgba(81,169,255))',
        'linear-gradient(rgb(148,207,151),rgb(12,190,80))',
        'linear-gradient(rgb(146,253,255),rgb(20,178,221))',
        'linear-gradient(rgb(245,168,255),rgb(191,35,229))',
        'linear-gradient(rgb(255,169,217),rgb(232,61,61))',
        'linear-gradient(rgb(201,170,255),rgb(109,60,245))',
        'linear-gradient(rgb(255,186,141),rgb(235,100,35))'
    ]
    return colors[getRandomNumber()]
}
export const getVisitorAvatarColor = (): string => {
    const localColor: string | null = localStorage.getItem('visitorColor')
    if (localColor !== null) return localColor
    else {
        const newColor: string = getColor()
        localStorage.setItem('visitorColor', newColor)
        return newColor
    }
}