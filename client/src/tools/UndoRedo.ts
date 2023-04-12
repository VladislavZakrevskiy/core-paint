import { IMessage } from "../models/message"
import { setRedoList, setUndoList } from "../store/canvasSlice"

export interface setter {
  undo: string[]
  redo: string[]
}

export default class undoRedo {
    canvas: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null = null
    undoList: string[] = []
    redoList: string[] = []
    socket: WebSocket | null = null
    id: string = ''
    dispatch: any = ''

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string, dispatch: any) {
        this.socket = socket
        this.id = id
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.dispatch = dispatch
    }

    get getUndoList () {
      return this.undoList
    }

    get getRedoList () {
      return this.redoList
    }

    set setUndoRedo ({undo, redo}: setter) {
      this.undoList = undo
      this.redoList = redo
    }

    pushUndo(canvasURL: string) {
        this.undoList.push(canvasURL)
      //   const undoRedoMsg: IMessage = {
      //     id: this.id,
      //     method: 'undoRedo',
      //     redo: this.redoList,
      //     undo: this.undoList
      // }
      // this.socket?.send(JSON.stringify(undoRedoMsg))
    }

    pushRedo(canvasURL: string) {
        this.redoList.push(canvasURL)
      //   const undoRedoMsg: IMessage = {
      //     id: this.id,
      //     method: 'undoRedo',
      //     redo: this.redoList,
      //     undo: this.undoList
      // }
      // this.socket?.send(JSON.stringify(undoRedoMsg))
    }

    undo() {
        if(this.undoList.length > 0) {
            const dataURL = this.undoList.pop()
            //@ts-ignore
            this.pushRedo(this.canvas?.toDataURL())
            const img = new Image()
            //@ts-ignore
            img.src = dataURL
            img.onload = () => {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
            //@ts-ignore
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height)
            } 
          } else {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
          }
    }


    redo() {
        if(this.redoList.length > 0) {
            const dataURL = this.redoList.pop()
            const img = new Image()
            //@ts-ignore
            img.src = dataURL
            img.onload = () => {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
            //@ts-ignore
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height)
            } 
          } else {
            //@ts-ignore
            this.ctx?.clearRect(0,0,this.canvas.width, this.canvas.height)
          }
    }
}