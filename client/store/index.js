import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import hexagons from './boardHexagon';
import config from './boardConfig';
import boardId from './boardId';
import boardName from './boardName';
import maxPlayers from './maxPlayers';
import gameSettings from './gameSettings';
import playerOrder from './playerOrder';
import currentPlayer from './currentPlayer';
import currentPhase from './currentPhase';
import inGame from './inGame';
import allotmentLeft from './allotmentLeft';
import selectedHex from './selectedHex';

const state = combineReducers({
  gameSettings,
  playerOrder,
  currentPlayer,
  currentPhase,
  allotmentLeft,
  selectedHex,
});

const board = combineReducers({
  boardId,
  hexagons,
  config,
  state,
  boardName,
  maxPlayers
});

const reducer = combineReducers({
  user,
  board,
  inGame
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store
export * from './user';
export * from './boardHexagon';
export * from './boardConfig';
export * from './boardId';
export * from './boardName';
export * from './inGame';
export * from './allotmentLeft';
export * from './selectedHex';
export * from './maxPlayers';
