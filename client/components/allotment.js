import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store, { updateHex, setAllotmentLeft } from '../store';

import '../css/_allotment-gui.scss';

const AllotmentGUI = (props) => {
  const { allotmentLeft, hexId, addUnit, hexagons } = props;

  return (
    <div className="allotment-gui-wrapper">

      <div className='allotment'>
        <button onClick={() => addUnit(hexId, hexagons, allotmentLeft)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        <span className='muted'>{allotmentLeft}</span><span> unit left</span>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allotmentLeft: state.board.state.allotmentLeft,
    hexagons: state.board.hexagons,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addUnit(id, hexagons, allotmentLeft) {
      if (allotmentLeft > 0) {
        const newAllotmentPoints = allotmentLeft > 0 ? allotmentLeft - 1 : 0;
        const hexagon = hexagons.filter(hex => hex.id === id)[0];
        const units = hexagon.units + 1;
        store.dispatch(updateHex(id, { units }));
        store.dispatch(setAllotmentLeft(newAllotmentPoints));
      }
    }
  }
}

export default connect(mapState, mapDispatch)(AllotmentGUI);

/**
 * PROP TYPES
 */
AllotmentGUI.propTypes = {

}
