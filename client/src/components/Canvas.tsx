import React, {useEffect, useRef} from 'react'
import '../styles/canvas.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCanvas, setId, setUndoRedo } from '../store/canvasSlice'
import { setTool } from '../store/toolSlice'
import Brush from '../tools/Brush'
import undoRedo, { setter } from '../tools/UndoRedo'
import {useParams} from 'react-router-dom'
import { connectWS } from '../utils/connectWS'
import { postPng } from '../utils/postPng'
import { loadStartPng } from '../utils/loadStartPng'
import ModalComponent from './Modal'

type Props = {}

const Canvas = (props: Props) => {
  const dispatch = useAppDispatch()
  const canvasRef = useRef(null)
  const {tool, username, socket, redoList, undoList} = useAppSelector(state => state.canvasSlice)
  const {id} = useParams()


  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
    dispatch(setUndoRedo(new undoRedo(canvasRef.current, socket, id, dispatch)))
  }, [])

  useEffect(() => {
    dispatch(setId(id))
    connectWS(username, id, dispatch, canvasRef.current, tool)
    loadStartPng(id!, canvasRef.current)
    }, [username])

  const mouseDownHandler = () => {    
    tool?.pushUndo(canvasRef.current.toDataURL())
  }

  const mouseUpHandler = () => { 
    postPng(id!, canvasRef.current)
  }



  return (
    <div className='canvas'>
        <ModalComponent/>
        <canvas onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}
        />
    </div>
  )
}

export default Canvas

