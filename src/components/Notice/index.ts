import { createVNode, render, ref, watch, reactive } from 'vue'
import Notice from './Notice.vue'
let index: number = 0
const useNotice = () => {
    const renderComponent = (text: string, type: string) => {
        const div = document.createElement('div')
        document.body.append(div)
        const vNode = createVNode(Notice, { text, type, index })
        render(vNode, div)
        index++
        setTimeout(() => {
            render(null, div)
            document.body.removeChild(div)
            index--
        }, 2000)
    }
    return {
        success: (text: string) => renderComponent(text, 'success'),
        warn: (text: string) => renderComponent(text, 'warn'),
        error: (text: string) => renderComponent(text, 'error'),
    }
}
export const notice = useNotice()
