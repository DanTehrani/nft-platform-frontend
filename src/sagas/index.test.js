import { call, fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { loadMyAccountPage, loadBrowsePage, loadMyItemsPage, createToken } from './index.js';
import { ActionTypes } from '../actions/actionTypes.js';
import reducer from '../reducers';
import { throwError } from 'redux-saga-test-plan/providers';
import {
	getWeb3,
	getMetaMaskWeb3,
	getUserAddress,
	getUserBalance,
	getTokens,
	getMyTokens,
	getMetaMaskNetworkID,
	getIPFSClient,
	uploadToIPFS,
	mintToken
} from '../services/index.js';

const createFakeWeb3 = () => {
	return {
		description: 'This is a fake web3 instance'
	};
};

const createFakeIPFSClient = () => {
	return {
		description: 'This is a fake ipfs client'
	};
};

const shouldSetupMetaMaskWeb3WhenNotProvided = (saga, actionType, payload, providers = []) => {
	describe('when MetaMask web3 is not provided', () => {
		const metaMaskWeb3 = createFakeWeb3();

		it('should get MetaMask web3', () => {
			return expectSaga(saga, {type: actionType, ...payload})
				.withState({ web3: {} })
				.provide([
					[call(getMetaMaskWeb3), metaMaskWeb3],
					...providers
				])
				.put({type: ActionTypes.GET_METAMASK_WEB3_SUCCESS, metaMaskWeb3})
				.run();
		});
	});
};

const shouldSetupWeb3WhenNotProvided = (saga, actionType, payload, providers = []) => {
	describe('when web3 is not provided', () => {
		let web3;
		let ipfs;
		beforeEach(() => {
			web3 = createFakeWeb3();
			ipfs = createFakeIPFSClient();
		});

		it('should get web3', () => {
			return expectSaga(saga, { type: actionType, ...payload })
				.withState({ web3: { ipfs } })
				.provide([
					[call(getWeb3), web3],
					...providers
				])
				.put({type: ActionTypes.GET_WEB3_SUCCESS, web3})
				.run();
		});
	});
};
const shouldHandleError = (saga, payload = {}, providers = [], errorType, error, state = {}) => {
	it('should handle error', () => {
		const web3 = createFakeWeb3();
		const ipfs = createFakeIPFSClient();

		return expectSaga(saga, { ...payload })
			.withState({ web3: { web3, ipfs }, ...state })
			.provide([
				...providers
			])
			.put({type: errorType, error})
			.run();
	})
};

const shouldSetupIPFSWhenNotProvided = (saga, actionType, payload, providers = []) => {
	describe('when ipfs has not been set up', () => {
		let web3;
		let ipfs;
		beforeEach(() => {
			web3 = createFakeWeb3();
			ipfs = createFakeIPFSClient();
		});

		it('should get ipfs', () => {
			return expectSaga(saga, {type: actionType, ...payload})
				.withState({ web3: { web3 } })
				.provide([
					[call(getIPFSClient), ipfs],
					...providers
				])
				.put({type: ActionTypes.GET_IPFSCLIENT_SUCCESS, ipfs})
				.run();
		});
	});
};

describe('sagas', () => {
	describe('loadMyAccountPage', () => {
		const address = '0xB16100f7187183568d7f05269fA7708c6AE34a65';
		const balance = 10;

		const providers = [
			[matchers.call.fn(getUserAddress), address],
			[matchers.call.fn(getUserBalance), balance],
			[matchers.call.fn(getMetaMaskNetworkID)],
		]

		shouldSetupMetaMaskWeb3WhenNotProvided(loadMyAccountPage, ActionTypes.LOAD_MYACCOUNT_PAGE, {}, providers);

		describe('when MetaMask web3 is provided', () => {

			const metaMaskNetworkID = 1;
			let metaMaskWeb3;

			beforeEach(() => {
				metaMaskWeb3 = createFakeWeb3();
			});

			it('should load user address and balance and networkID', () => {
				return expectSaga(loadMyAccountPage)
					.withState({ web3: { metaMaskWeb3: metaMaskWeb3 } })
					.provide([
						[call(getUserAddress, metaMaskWeb3), address],
						[matchers.call.fn(getUserBalance, metaMaskWeb3), balance],
						[call(getMetaMaskNetworkID, metaMaskWeb3), metaMaskNetworkID],
					])
					.put({type: ActionTypes.LOAD_MYACCOUNT_PAGE_SUCCESS, address, balance, metaMaskNetworkID})
					.run();
			});

			describe('when failed to get user addres', () => {
				const error = 'error';

				shouldHandleError(
					loadMyAccountPage,
					{},
					[[matchers.call.fn(getUserAddress), throwError(error)]],
					ActionTypes.LOAD_MYACCOUNT_PAGE_FAILURE,
					error
				);
			});

			describe('when failed to get user balance', () => {
				const error = 'error';
				const address = '0xB16100f7187183568d7f05269fA7708c6AE34a65';

				shouldHandleError(
					loadMyAccountPage,
					{},
					[[matchers.call.fn(getUserAddress), address], [matchers.call.fn(getUserBalance), throwError(error)]],
					ActionTypes.LOAD_MYACCOUNT_PAGE_FAILURE,
					error
				);
			});
		});
	});

	describe('loadBrowsePage', () => {
		const provdiers = [
			[matchers.call.fn(getTokens)]
		];

		shouldSetupWeb3WhenNotProvided(loadBrowsePage, ActionTypes.LOAD_BROWSE_PAGE, {}, provdiers);

		describe('when Infura web3 is provided', () => {
			let web3;
			beforeEach(() => {
				web3 = createFakeWeb3();
			});

			it('should load tokens', () => {
				const tokens = [
					{ name: 'token1', description: 'description1', image: 'URI 1'},
					{ name: 'token2', description: 'description2', image: 'URI 2'},
				];

				return expectSaga(loadBrowsePage)
					.withState({ web3: { web3 } })
					.provide([
						[matchers.call.fn(getTokens), tokens],
					])
					.put({type: ActionTypes.LOAD_BROWSE_PAGE_SUCCESS, tokens})
					.run();
			});

			describe('when failed to get tokens', () => {
				const error = 'error';
				shouldHandleError(
					loadBrowsePage,
					{},
					[[matchers.call.fn(getTokens), throwError(error)]],
					ActionTypes.LOAD_BROWSE_PAGE_FAILURE,
					error
				);
			});
		});
	});

	describe('loadMyItemsPage', () => {
		shouldSetupMetaMaskWeb3WhenNotProvided(loadMyItemsPage, ActionTypes.LOAD_MYITEMS_PAGE, {});
		shouldSetupIPFSWhenNotProvided(loadMyItemsPage, ActionTypes.LOAD_MYITEMS_PAGE, {});

		describe('when MetaMask web3 and ipfs client are provided', () => {
			let metaMaskWeb3;
			let ipfs;
			beforeEach(() => {
				metaMaskWeb3 = createFakeWeb3();
				ipfs = createFakeIPFSClient();
			});

			it('should load user tokens', () => {
				const myTokens = [
					{ name: 'token1', description: 'description1', image: 'URI 1'},
					{ name: 'token2', description: 'description2', image: 'URI 2'},
				];

				return expectSaga(loadMyItemsPage)
					.withState({ web3: { metaMaskWeb3, ipfs } })
					.provide([
						[matchers.call.fn(getMyTokens), myTokens],
					])
					.put({type: ActionTypes.LOAD_MYITEMS_PAGE_SUCCESS, myTokens})
					.run();
			});

			describe('when failed to get tokens', () => {
				const error = 'error';
				shouldHandleError(
					loadMyItemsPage,
					{},
					[[matchers.call.fn(getMyTokens), throwError(error)]],
					ActionTypes.LOAD_MYITEMS_PAGE_FAILURE,
					error
				);
			});
		});
	});

	describe('createToken', () => {
		const payload = {
			title: 'title',
			description: 'description',
			image: 'image'
		};

		shouldSetupMetaMaskWeb3WhenNotProvided(createToken, ActionTypes.CREATE_TOKEN, payload);
		shouldSetupIPFSWhenNotProvided(createToken, ActionTypes.CREATE_TOKEN, payload);

		describe('when MetaMask web3 and ipfs client is provided', () => {
			let metaMaskWeb3;
			let ipfs;
			beforeEach(() => {
				metaMaskWeb3 = createFakeWeb3();
				ipfs = createFakeIPFSClient();
			});

			it('should dispatch UPLOADING_TO_IPFS', () => {
				const cid = 'Qm';
				const title = 'title';
				const description = 'description';
				const image = 'image';
				return expectSaga(createToken, { title, description, image })
					.withState({ web3: { metaMaskWeb3, ipfs }, create: { cancel : false } })
					.provide([
						[matchers.call.fn(uploadToIPFS), cid],
						[matchers.call.fn(mintToken)]
					])
					.put({type: ActionTypes.UPLOADING_TO_IPFS})
					.run();
			});

			it('should dispatch UPLOADING_TO_IPFS_SUCCESS', () => {
				const cid = 'Qm';
				const title = 'title';
				const description = 'description';
				const image = 'image';
				return expectSaga(createToken, { title, description, image })
					.withState({ web3: { metaMaskWeb3, ipfs }, create: { cancel : false } })
					.provide([
						[matchers.call.fn(uploadToIPFS), cid],
						[matchers.call.fn(mintToken)]
					])
					.put({type: ActionTypes.UPLOADING_TO_IPFS_SUCCESS})
					.run();
			});

			it('should dispatch MINTING', () => {
				const cid = 'Qm';
				const title = 'title';
				const description = 'description';
				const image = 'image';
				return expectSaga(createToken, { title, description, image })
					.withState({ web3: { metaMaskWeb3, ipfs }, create: { cancel : false } })
					.withReducer(reducer)
					.provide([
						[matchers.call.fn(uploadToIPFS), cid],
						[matchers.call.fn(mintToken)]
					])
					.put({type: ActionTypes.MINTING})
					.run();
			});

			it('should dispatch MINTING_SUCCESS', () => {
				const cid = 'Qm';
				const title = 'title';
				const description = 'description';
				const image = 'image';
				return expectSaga(createToken, { title, description, image })
					.withState({ web3: { metaMaskWeb3, ipfs }, create: { cancel : false } })
					.withReducer(reducer)
					.provide([
						[matchers.call.fn(uploadToIPFS), cid],
						[matchers.call.fn(mintToken)]
					])
					.put({type: ActionTypes.MINTING_SUCCESS})
					.run();
			});

			describe('error handling', () => {
				const title = 'title';
				const description = 'description';
				const image = 'image';
				const cid = 'cid';
				const error = 'error';

				let metaMaskWeb3;
				let ipfs;

				beforeEach(() => {
					metaMaskWeb3 = createFakeWeb3();
					ipfs = createFakeIPFSClient();
				});

				it('should handle error when minting fails', () => {
					return expectSaga(createToken, { title, description, image })
						.withState({ web3: { metaMaskWeb3, ipfs }, create: { cancel : false } })
						.provide([
							[matchers.call.fn(uploadToIPFS), cid],
							[matchers.call.fn(mintToken), throwError(error)]
						])
						.put({type: ActionTypes.UPLOADING_TO_IPFS})
						.run();
				});
			});
		});
	});
});
