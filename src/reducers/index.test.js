import { userInfo, web3, browse, myItems, create } from './index.js';
import { ActionTypes } from '../actions/actionTypes.js';

const action = (actionType, payload = {}) => {
  return {
    type: actionType,
    ...payload
  }
}

describe('reducer', () => {
  describe('userInfo', () => {
    it('should return the initial state', () => {
      expect(userInfo(undefined, {})).toEqual({ loading: false});
    });

    it('should handle LOAD_MYACCOUNT_PAGE', () => {
      expect(userInfo({}, action(ActionTypes.LOAD_MYACCOUNT_PAGE))).toEqual({
        loading: true
      });
    });

    it('should handle LOAD_MYACCOUNT_PAGE_SUCCESS', () => {
      const payload = {
        address: '0x0',
        balance: 100,
        metaMaskNetworkID: 1
      };

      expect(userInfo({}, action(ActionTypes.LOAD_MYACCOUNT_PAGE_SUCCESS, payload))).toEqual({
        loading: false,
        address: payload.address,
        balance: payload.balance,
        metaMaskNetworkID: payload.metaMaskNetworkID
      });
    });
  });

  describe('web3', () => {
    it('should return the initial state', () => {
      expect(web3(undefined, {})).toEqual({});
    });

    it('should handle GET_WEB3_SUCCESS', () => {
      const web3Instance = { name: 'This is the web3 instance'};
      expect(web3({}, action(ActionTypes.GET_WEB3_SUCCESS, { web3: web3Instance }))).toEqual({
        web3: web3Instance
      });
    });

    it('should handle GET_METAMASK_WEB3_SUCCESS', () => {
      const metamaskWeb3Instance = { name: 'This is the MetaMask web3 instance'};
      const payload = { metaMaskWeb3: metamaskWeb3Instance }
      expect(web3({}, action(ActionTypes.GET_METAMASK_WEB3_SUCCESS, payload))).toEqual({
        metaMaskWeb3: metamaskWeb3Instance
      });
    });

    it('should handle GET_METAMASK_WEB3_SUCCESS', () => {
      const metamaskWeb3Instance = { name: 'This is the MetaMask web3 instance'};
      expect(web3({}, action(ActionTypes.GET_METAMASK_WEB3_SUCCESS, { metaMaskWeb3: metamaskWeb3Instance }))).toEqual({
        metaMaskWeb3: metamaskWeb3Instance
      });
    });

    it('should handle SETUP_TOKEN_CONTRACT_SUCCESS', () => {
      const Token = { name: 'This is the token contract'};
      expect(web3({}, action(ActionTypes.SETUP_TOKEN_CONTRACT_SUCCESS, { Token }))).toEqual({
        Token
      });
    });
  });

  describe('browse', () => {
    it('should return the initial state', () => {
      expect(browse(undefined, {})).toEqual({ tokens : [], loading: false});
    });

    it('should handle LOAD_BROWSE_PAGE', () => {
      expect(browse({}, action(ActionTypes.LOAD_BROWSE_PAGE))).toEqual({
        loading: true
      });
    });

    it('should handle LOAD_BROWSE_PAGE_SUCCESS', () => {
      const tokens = [
        { name: 'token1', description: 'description1', image: 'URI 1'},
        { name: 'token2', description: 'description2', image: 'URI 2'},
      ];

      expect(browse({}, action(ActionTypes.LOAD_BROWSE_PAGE_SUCCESS, { tokens }))).toEqual({
        loading: false,
        tokens
      });
    });
  });

  describe('myItems', () => {
    it('should return the initial state', () => {
      expect(myItems(undefined, {})).toEqual({ myTokens : [], loading: false});
    });

    it('should handle LOAD_MYITEMS_PAGE', () => {
      expect(myItems({}, action(ActionTypes.LOAD_MYITEMS_PAGE))).toEqual({
        loading: true,
      });
    });

    it('should handle LOAD_MYITEMS_PAGE_SUCCESS', () => {
      const myTokens = [
        { name: 'token1', description: 'description1', image: 'URI 1'},
        { name: 'token2', description: 'description2', image: 'URI 2'},
      ];

      expect(myItems({}, action(ActionTypes.LOAD_MYITEMS_PAGE_SUCCESS, { myTokens }))).toEqual({
        loading: false,
        myTokens
      });
    });
  });

  describe('create', () => {
    it('should return the initial state', () => {
      expect(create(undefined, {})).toEqual({
        uploading: false,
        cancel: false ,
      });
    });

    it('should handle UPLOADING_TO_IPFS', () => {
      expect(create({}, action(ActionTypes.UPLOADING_TO_IPFS))).toEqual({
				uploading: true,
      });
    });

    it('should handle UPLOADING_TO_IPFS_SUCCESS', () => {
      expect(create({}, action(ActionTypes.UPLOADING_TO_IPFS_SUCCESS))).toEqual({
				uploading: false,
      });
    });

		it('should handle CREATE_TOKEN_SUCCESS', () => {
      const cid = 'Qm';
      expect(create({}, action(ActionTypes.CREATE_TOKEN_SUCCESS, { cid }))).toEqual({
				uploading: false,
				cid
      });
    });

    it('should handle CREATE_TOKEN_CANCEL', () => {
      expect(create({}, action(ActionTypes.CREATE_TOKEN_CANCEL))).toEqual({
        uploading: false,
        minting: false,
        cancel: true,
      });
    });

    it('should handle UPLOADING_TO_IPFS_CANCEL', () => {
      expect(create({}, action(ActionTypes.UPLOADING_TO_IPFS_CANCEL))).toEqual({
        uploading: false,
        cancel: false,
      });
    });

    it('should handle MINTING_CANCEL', () => {
      expect(create({}, action(ActionTypes.MINTING_CANCEL))).toEqual({
        minting: false,
        cancel: false,
      });
    });
  });
});
