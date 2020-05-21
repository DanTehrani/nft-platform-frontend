import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/actionTypes.js';

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    console.log('to null')
		return null;
  } else if (error) {
    return error;
  }

  return state;
}

export const userInfo = (state = { loading: false }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_MYACCOUNT_PAGE:
      return Object.assign({}, state, {
        loading: true
      });

    case ActionTypes.LOAD_MYACCOUNT_PAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        address: action.address,
        balance: action.balance,
        metaMaskNetworkID: action.metaMaskNetworkID
      });
    default:
      return state;
  }
};

export const web3 = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_WEB3_SUCCESS:
      return Object.assign({}, state, {
        web3: action.web3
      });

    case ActionTypes.GET_METAMASK_WEB3_SUCCESS:
      return Object.assign({}, state, {
        metaMaskWeb3: action.metaMaskWeb3
      });

    case ActionTypes.SETUP_TOKEN_CONTRACT_SUCCESS:
      return Object.assign({}, state, {
        Token: action.Token
      });
    case ActionTypes.GET_IPFSCLIENT_SUCCESS:
      return Object.assign({}, state, {
        ipfs: action.ipfs
      })
    default:
      return state;
  }
};

export const browse = (state = { loading: false, tokens : [] }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_BROWSE_PAGE:
      return Object.assign({}, state, {
        loading: true
      })

    case ActionTypes.LOAD_BROWSE_PAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        tokens: action.tokens
      });
    default:
      return state;
  }
};

export const myItems = (state = { loading: false, myTokens: [] }, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_MYITEMS_PAGE:
      return Object.assign({}, state, {
        loading: true
      });

    case ActionTypes.LOAD_MYITEMS_PAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        myTokens: action.myTokens
      });
    default:
      return state;
  }
}

export const create = (state = { uploading: false, cancel: false }, action) => {
  switch (action.type) {
    case ActionTypes.UPLOADING_TO_IPFS:
      return Object.assign({}, state, {
        uploading: true
      });

    case ActionTypes.UPLOADING_TO_IPFS_SUCCESS:
      return Object.assign({}, state, {
        uploading: false
      });

    case ActionTypes.UPLOADING_TO_IPFS_CANCEL:
      return Object.assign({}, state, {
        uploading: false,
        cancel: false
      });

    case ActionTypes.CREATE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        uploading: false,
        cid: action.cid
      });

    case ActionTypes.CREATE_TOKEN_CANCEL:
      return Object.assign({}, state, {
        uploading: false,
        minting: false,
        cancel: true
      });

    case ActionTypes.MINTING:
      return Object.assign({}, state, {
        minting: true
      });

    case ActionTypes.MINTING_SUCCESS:
      return Object.assign({}, state, {
        minting: false
      });

    case ActionTypes.MINTING_CANCEL:
      return Object.assign({}, state, {
        minting: false,
        cancel: false
      });

    default:
      return state;
  }
}

export default combineReducers({
  userInfo,
  web3,
  browse,
  myItems,
  create,
  errorMessage
});
