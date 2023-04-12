import { IMessage, connectionMessage, drawMessage } from '../models/message';
import { setSocket } from '../store/canvasSlice';
import { useAppDispatch } from '../store/hooks';
import { setTool } from '../store/toolSlice';
import Brush from '../tools/Brush';
import undoRedo from '../tools/UndoRedo';
import { drawHandler } from "./drawWS"


export const connectWS = (username: string | null, id: string | undefined, dispatch: any, canvas: HTMLCanvasElement, tool: undoRedo) => {
    if( username ) {
        const socket = new WebSocket('ws://localhost:5000/')
        dispatch(setSocket(socket))
        dispatch(setTool(new Brush(canvas, socket, id, tool)))
        const msg: connectionMessage = {
          id: id,
          method: 'connection',
          username: username
        }
        socket.onopen = () => {
          socket.send(JSON.stringify(msg))
        }
        socket.onmessage = (ev) => {
          const msg: IMessage = JSON.parse(ev.data)
          switch(msg.method) {
            case 'connection': 
              console.log(`User ${msg.username} is connected`)
              break;
            case 'draw': 
              drawHandler(msg, canvas)
              tool.pushUndo(canvas.toDataURL())
              break;
            case 'undoRedo': 
              // tool.setUndoRedo = {
              //   redo: msg.redo,
              //   undo: msg.undo
              // }
              console.log(msg)
              break;
          }
        }
    }
}