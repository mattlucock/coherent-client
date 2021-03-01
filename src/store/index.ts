import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit'
import type { Reducer } from '@reduxjs/toolkit'
import { useSelector as baseUseSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { createLogger } from 'redux-logger'

import { apiReducer } from './api'
import { selfReducer } from './self'
import { usersReducer } from './users'
import { chatsReducer } from './chats'
import { uiReducer } from './ui'

const mainReducer = combineReducers({
  api: apiReducer,
  self: selfReducer,
  users: usersReducer,
  chats: chatsReducer,
  ui: uiReducer
})
type State = ReturnType<typeof mainReducer>

export const clearStore = createAction('clearStore')

const rootReducer: Reducer<State> = (state, action) => {
  if (action.type === clearStore.type) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    state = {} as State
  }
  return mainReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), createLogger({ collapsed: true })]
})
export const getState = store.getState
export const dispatch = store.dispatch
export const useSelector: TypedUseSelectorHook<State> = baseUseSelector
