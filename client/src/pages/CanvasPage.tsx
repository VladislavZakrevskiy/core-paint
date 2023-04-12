import React from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'

type Props = {}

const CanvasPage = (props: Props) => {
  return (
    <div className='app'>
      <ToolBar/>
      <Settings/>
      <Canvas/>
    </div>
  )
}

export default CanvasPage