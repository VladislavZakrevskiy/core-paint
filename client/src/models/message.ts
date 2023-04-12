

export interface IMessage {
    id: string | undefined
    username?: string | null
    method: 'connection' | 'draw' | 'undoRedo'
    undo?:string[]
    redo?:string[]
}

export interface connectionMessage extends IMessage {
    method: 'connection'
}

interface IFigure {
    type: 'brush' | 'rect' | 'circle' | 'eraser' | 'line' | 'finish'
    x: number
    y: number
    width?:number
    height?:number
    radius?: number
    fillColor?: string
    strokeColor?: string
    lineWidth?: number
    currentX?: number
    currentY?: number
}

export interface drawMessage extends IMessage {
    username?: string | null
    method: 'draw'
    figure: IFigure
}


