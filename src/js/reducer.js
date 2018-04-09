// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import { Record, Map } from 'immutable'

import {} from './actions'

const AppRecord = Record({
  data: Map(),
})

export default function reducer(state = new AppRecord(), action) {
  switch (action.type) {
    case 'SET_DATA':
      return state.set('data', state.get('data').merge(action.data))
    default:
      break
  }
  return state
}
