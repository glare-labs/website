export const SDragHandler = Symbol('dragHandler')

export interface IDragHandlerHost extends HTMLElement {
    [SDragHandler]: IDragHandler
}

export interface IDragHandler {
    getPosition: () => ({
        x: number,
        y: number
    })
    setPosition: (x: number, y: number) => void
}
