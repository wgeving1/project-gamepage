import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from './api'
import TYPES from './types'

export const name = 'gamesActions'

export function fetch(userHandle) {
  return {
    type: TYPES.FETCH_REQUEST,
    userHandle
  }
}

export function* executeFetch({userHandle}) {
  const url = api.fetch.formatUrl()
  try {
    const res = yield call(api.fetch.request, url)
    yield put(fetchSuccess(res.data, userHandle))
  } catch (err) {
    console.error('Request failed with', err)
  }
}

export function fetchSuccess(data, userHandle) {
  return {
    type: TYPES.FETCH_SUCCESS,
    queued: data.queued, 
    userHandle
  }
}

export function addToQueue() {
  return {
    type: TYPES.ADD_TO_QUEUE_REQUEST
  }
}

export function* executeAddToQueue() {
  const url = api.addToQueue.formatUrl()
  try {
    const res = yield call(api.addToQueue.request, url)
    yield put(addToQueueSuccess(res.data))
  } catch (err) {
    console.error('Request failed with', err)
  }
}

export function addToQueueSuccess(data) {
  return {
    type: TYPES.ADD_TO_QUEUE_SUCCESS,
    queued: data.queued
  }
}
export function inviteToGame(userHandle) {
  return {
    type: TYPES.INVITE_REQUEST, 
    userHandle
  }
}

export function* executeInviteToGame( { userHandle }) {
  const url = api.inviteUser.formatUrl()
  try {
    const res = yield call(api.inviteUser.request, url, { userHandle })
    yield put(inviteToGameSuccess(res.data))
  } catch (err) {
    console.error('Request failed with', err)
  }
}

export function inviteToGameSuccess(data) {
  return {
    type: TYPES.INVITE_SUCCESS,
    invited: data.invited
  }
}

export function acceptInviteToPlay(userHandle, gameId) {
  return {
    type: TYPES.ACCEPT_INVITE_TO_PLAY_REQUEST, 
    userHandle, 
    gameId
  }
}

export function* executeAcceptInviteToPlay( { userHandle, gameId }) {
  const url = api.acceptInviteToPlay.formatUrl()
  try {
    yield call(api.acceptInviteToPlay.request, url, { userHandle, gameId })
    yield put(acceptInviteToPlaySuccess())
  } catch (err) {
    console.error('Request failed with', err)
  }
}

export function acceptInviteToPlaySuccess(gameId) {
  return {
    type: TYPES.ACCEPT_INVITE_TO_PLAY_SUCCESS, 
    gameId
  }
}
export function fetchTicTacToeGame(gameId) {
  return {
    type: TYPES.FETCH_TIC_TAC_TOE_GAME_REQUEST, 
    gameId
  }
}

export function* executefetchTicTacToeGame( { gameId }) {
  const url = api.fetchTicTacToeGame.formatUrl()
  try {
    yield call(api.fetchTicTacToeGame.request, url)
    yield put(fetchTicTacToeGameSuccess(gameId))
  } catch (err) {
    console.error('Request failed with', err)
  }
}

export function fetchTicTacToeGameSuccess(gameId) {
  return {
    type: TYPES.FETCH_TIC_TAC_TOE_GAME_SUCCESS, 
    gameId
  }
}
const sagas = [
  takeLatest(TYPES.FETCH_REQUEST, executeFetch),
  takeLatest(TYPES.ADD_TO_QUEUE_REQUEST, executeAddToQueue), 
  takeLatest(TYPES.INVITE_REQUEST, executeInviteToGame),
  takeLatest(TYPES.ACCEPT_INVITE_TO_PLAY_REQUEST, executeAcceptInviteToPlay),
  takeLatest(TYPES.FETCH_TIC_TAC_TOE_GAME_REQUEST, executefetchTicTacToeGame)

]

export default sagas
