export const useClickLove = () => {
    let body: HTMLElement = document.body
    const getRandomColor = (): string => {
        const randomNumber = (): number => Math.floor(Math.random() * 256)
        return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
    }
    body.addEventListener('click', event => {
        let x: number = event.pageX
        let y: number = event.pageY
        let i: number = 0
        let span: HTMLSpanElement = document.createElement('span')
        span.innerText = "❤"
        span.style.color = getRandomColor()
        span.style.top = y - 20 + 'px'
        span.style.left = x + 'px'
        span.style.position = 'absolute'
        span.style.zIndex = '9999999'
        span.style.transition = 'opacity 2s ease-in'
        body.appendChild(span)
        setTimeout(() => span.style.opacity = '0')
        setInterval(() => { span.style.top = y - 20 - i + 'px'; i++ }, 10)
        setTimeout(() => span.remove(), 2000)
    })
}