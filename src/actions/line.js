import {
  LINE_BRUSH_START,
  LINE_BRUSH_MOVE,
  LINE_BRUSH_END
} from "../common/actionTypes"

export const lineBrushStart = data => ({
  type: LINE_BRUSH_START,
  data
})

export const lineBrushMove = data => ({
  type: LINE_BRUSH_MOVE,
  data
})

export const lineBrushEnd = data => ({
  type: LINE_BRUSH_END,
  data
})
