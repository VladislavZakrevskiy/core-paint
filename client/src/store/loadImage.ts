//@ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import canvasSlice from './canvasSlice';
import { RootState } from './store';

export const loadImage = createAsyncThunk(
  'canvas/loadImage',
  async (dataURL: string | undefined, { getState }) => {
    let ctx = state.canvasSlice.canvas?.getContext('2d')
    let state: RootState = getState()
      if(state.canvasSlice.undoList.length > 0) {
        let before = state.canvasSlice.undoList.pop()
        let img = new Image()
        //@ts-ignore
        img.src = before
        const ctx = state.canvasSlice.canvas?.getContext('2d');
        //@ts-ignore
        ctx.clearRect(0, 0, state.canvasSlice.canvas.width, state.canvasSlice.canvas.height);
        //@ts-ignore
        ctx.drawImage(img, 0, 0, state.canvasSlice.canvas.width, state.canvasSlice.canvas.height);
      } else {
        //@ts-ignore
        ctx?.clearRect(0, 0, state.canvasSlice.canvas?.width, state.canvasSlice.canvas?.height)
      }
  }
);