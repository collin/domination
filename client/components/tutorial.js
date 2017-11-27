import React from 'react'
import { connect } from 'react-redux'
import { hexagons, createGrid } from '../functions'
import configs from '../configurations';
import { setInGame } from '../store'
import firebase from '../firebase'

import '../css/_tutorial.scss'

// COMPONENT

const Tutorial = (props) => {
  const { user } = props

  return (
    <div className="tutorial-wrapper">
      <div id="tutorial" >
      <h1>Tutorial</h1>
      <div><p>Play our resident DOMINATION bot as we walk you through game play.</p></div>
        <div className="center">
          <button
            className="text"
            type="submit"
            onClick={evt => props.handleSubmit(evt, user)}
          > Start Tutorial
          </button>
        </div>
      </div>

    </div>
  )
}

const mapState = state => ({ user: state.user })

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault();
      console.log('clicked')
      let hexes = {}

      hexagons.forEach(hex => {
        hex.id = `${hex.q},${hex.r},${hex.s}`;
        hexes[hex.id] = {
          movesLeft: 2,
          playerId: '',
          unit1: 1,
          unit2: 0,
          unit3: 0
        }
      });

      const state = {
        currentPhase: 'allotment', // or whatever default state 'start' should be default for distribution
        currentPlayer: user.username, // default 1st player
        playerOrder: [user.username, 'dombot'], // array of all players in order of turn
        allotmentPointsPerTurn: { [user.username]: 3 }, //obj of points(val) per player(key) per turn
        allotmentLeft: 3,
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'playing',
        selectedHex: '',
        prevSelectedHex: ''
      }

      const board = { hexes, state }
      firebase.ref('boards').push(board)
        .then(snap => ownProps.history.push(`/tutorial/${snap.key}`));
      dispatch(setInGame(true));
    }
  }
}

const TutorialContainer = connect(mapState, mapDispatch)(Tutorial)
export default TutorialContainer

