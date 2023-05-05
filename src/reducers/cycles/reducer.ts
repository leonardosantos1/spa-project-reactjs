import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  if (action.type === ActionTypes.ADD_NEW_CYCLE) {
    // return {
    //   ...state,
    //   cycles: [...state.cycles, action.payload.newCycle],
    //   activeCycleId: action.payload.newCycle.id,
    // }
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle)
      draft.activeCycleId = action.payload.newCycle.id
    })
  }

  if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].interruptedDate = new Date()
    })
  }

  if (action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
    // return {
    //   ...state,
    //   cycles: state.cycles.map((cycle) => {
    //     if (cycle.id === state.activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    //   activeCycleId: null,
    // }
    const currentCycleIndex = state.cycles.findIndex((cycle) => {
      return cycle.id === state.activeCycleId
    })

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.activeCycleId = null
      draft.cycles[currentCycleIndex].finishedDate = new Date()
    })
  }
  return state
}
