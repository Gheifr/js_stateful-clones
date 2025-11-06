'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const interimState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProps(interimState, action.extraData);
        result.push(Object.assign({}, interimState));
        break;
      case 'removeProperties':
        removeProps(interimState, action.keysToRemove);
        result.push(Object.assign({}, interimState));
        break;
      case 'clear':
        clearProps(interimState);
        result.push(Object.assign({}, interimState));
        break;
    }
  }

  return result;
}

function addProps(targetObj, sourceObj) {
  for (const key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }
}

function removeProps(targetObj, sourceObj) {
  for (const key in sourceObj) {
    delete targetObj[sourceObj[key]];
  }
}

function clearProps(targetObj) {
  for (const key in targetObj) {
    delete targetObj[key];
  }
}

module.exports = transformStateWithClones;
