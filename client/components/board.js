import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hexagons, config, addColors, addIdToHexes } from '../functions';
import { AllotmentGUI } from './';
import '../css/_board.scss';
import firebase from '../firebase'


class Board extends Component {

  componentDidMount() {
    const { playerOrder, hexes } = this.props;
    addIdToHexes();
    addColors(playerOrder, hexes);
  }

  render() {
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };
    const {
      user,
      hexes,
      currentPhase,
      currentPlayer,
      renderAllotmentGUI,
      selectHex,
      selectedHex,
    } = this.props;

    return (
      <div className="board">
        <HexGrid width={config.width} height={config.height}>
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
            {
              hexagons.map((hex, i) => {
                const hexId = `${hex.q},${hex.r},${hex.s}`;
                const doesPlayerOwn = !!hexes[hexId].playerId.length;
                const hexUnits = hexes[hexId].unit1.toString();
                return (<Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  onClick={() => {
                    selectHex(hexId);
                    renderAllotmentGUI(currentPhase, hexId, hexes, user, currentPlayer);
                  }}

                >
                  <div className="poly-id" id={hexId} />
                  <Text>
                    {doesPlayerOwn ? hexUnits : ''}
                  </Text>
                  {/*<Text>{HexUtils.getID(hex)}</Text>*/}
                  <foreignObject className="allotment-guis" id={`${hexId}-algui`}>
                    <AllotmentGUI hexId={hexId} />
                  </foreignObject>
                </Hexagon>)
              })
            }
          </Layout>
          {/*<Pattern id="img1" link="favicon.ico" />*/ /*fill="img1"*/}
        </HexGrid>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    currentPhase: state.board.state.currentPhase,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder,
    currentPlayer: state.board.state.currentPlayer,
    selectedHex: state.board.state.selectedHex,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    renderAllotmentGUI(phase, selectedHexId, hexes, user, currentPlayer) {
      const allGuis = document.getElementsByClassName('allotment-guis');
      [...allGuis].forEach(gui => gui.classList.remove('show'));
      const isOwner = hexes[selectedHexId].playerId === user.username;
      const isCurrentPlayer = user.username === currentPlayer;
      if (phase === 'allotment' && isOwner && isCurrentPlayer) {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${selectedHexId}-algui`);
        gui.classList.add('show');
      }
    },
    selectHex(id) {
      firebase.ref(`/boards/${ownProps.boardId}/state`).update({ selectedHex: id })
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Board);

