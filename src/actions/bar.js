import { BAR_PIECE_SELECTION_TOGGLE, BAR_COLUMN_SELECTION_TOGGLE } from "../common/actionTypes"

export const toggleBarPieceSelection = payload => ({
  type: BAR_PIECE_SELECTION_TOGGLE,
  payload
})

export const toggleBarColumnSelect = payload => ({
  type: BAR_COLUMN_SELECTION_TOGGLE,
  payload
})
