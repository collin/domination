import firebase from '../firebase';
import { validBoardCheck } from './';

const PERCENT_DISABLED = .20;

export const divvySpaces = (playerOrder, hexes, boardId) => {
  let validBoard = false;

  while (!validBoard) {
    const players = ['', ...playerOrder];
    const numPlayers = playerOrder.length;
    let numSpaces = Object.keys(hexes).length;
    let numVoidSpaces = Math.floor(numSpaces * PERCENT_DISABLED);
    let numAllotSpaces = numSpaces - numVoidSpaces;

    // distributes spaces evenly to players
    if (numAllotSpaces % numPlayers !== 0) {
      let numExtra = numAllotSpaces % numPlayers;
      numVoidSpaces += numExtra;
      numAllotSpaces -= numExtra;
    }

    const spacesPerPlayer = numAllotSpaces / numPlayers;

    // maps to players order 0: disabled, 1: player1 ...
    let assignmentColors = [
      { color: 'black', amount: numVoidSpaces },
      { color: 'red', amount: spacesPerPlayer },
      { color: 'blue', amount: spacesPerPlayer },
      { color: 'green', amount: spacesPerPlayer },
      { color: 'orange', amount: spacesPerPlayer },
      { color: 'yellow', amount: spacesPerPlayer },
    ]

    // used for validBoardCheck
    let initialValidHex;

    const hexesCopy = Object.assign({}, hexes);

    Object.keys(hexesCopy).forEach(id => {
      let successfulAssign = false;
      while (!successfulAssign) {
        const assign = Math.floor(Math.random() * (numPlayers + 1));
        const assignment = assignmentColors[assign];
        const player = players[assign];
        const hex = hexesCopy[id];

        if (assignment.amount > 0) {
          assignment.amount--;
          hex.playerId = player;
          successfulAssign = true;
        }
        if (!initialValidHex) initialValidHex = id;
      }
    });

    if (validBoardCheck(initialValidHex, hexesCopy)) {
      validBoard = true;
      firebase.ref(`/boards/${boardId}`).update({ hexes: hexesCopy })
    }
  } //while !validBoard
}
