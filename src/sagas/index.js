import { put, call, select, all, takeLatest, cancel } from 'redux-saga/effects'
import { ActionTypes } from '../actions/actionTypes.js';
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
} from '../services';

export function* loadMyAccountPage() {
	try {
		let metaMaskWeb3 = yield select(state => state.web3.metaMaskWeb3);

		if (typeof metaMaskWeb3 === 'undefined') {
			metaMaskWeb3 = yield call(getMetaMaskWeb3);
			const payload = { metaMaskWeb3 };
			yield put({type: ActionTypes.GET_METAMASK_WEB3_SUCCESS, ...payload});
		}

		const address = yield call(getUserAddress, metaMaskWeb3);
		const balance = yield call(getUserBalance, metaMaskWeb3, address);
		const metaMaskNetworkID = yield call(getMetaMaskNetworkID, metaMaskWeb3);
		yield put({type: ActionTypes.LOAD_MYACCOUNT_PAGE_SUCCESS, address, balance, metaMaskNetworkID});
	} catch (error) {
		yield put({type: ActionTypes.LOAD_MYACCOUNT_PAGE_FAILURE, error});
	}
}

export function* loadBrowsePage() {
	try {
		let web3 = yield select(state => state.web3.web3);
		let ipfs = yield select(state => state.web3.ipfs);

		if (typeof web3 === 'undefined') {
			web3 = yield call(getWeb3);
			yield put({type: ActionTypes.GET_WEB3_SUCCESS, web3});
		}

		if (typeof ipfs === 'undefined') {
			ipfs = yield call(getIPFSClient);
			yield put({type: ActionTypes.GET_IPFSCLIENT_SUCCESS, ipfs});
		}

		const tokens = yield call(getTokens, web3, ipfs);
		yield put({type: ActionTypes.LOAD_BROWSE_PAGE_SUCCESS, tokens});
	} catch (error) {
		yield put({type: ActionTypes.LOAD_BROWSE_PAGE_FAILURE, error});
	}

}

export function* loadMyItemsPage() {
	try {
		let metaMaskWeb3 = yield select(state => state.web3.metaMaskWeb3);
		let ipfs = yield select(state => state.web3.ipfs);

		if (typeof metaMaskWeb3 === 'undefined') {
			metaMaskWeb3 = yield call(getMetaMaskWeb3);
			yield put({type: ActionTypes.GET_METAMASK_WEB3_SUCCESS, metaMaskWeb3});
		}

		if (typeof ipfs === 'undefined') {
			ipfs = yield call(getIPFSClient);
			yield put({type: ActionTypes.GET_IPFSCLIENT_SUCCESS, ipfs});
		}

		const myTokens = yield call(getMyTokens, metaMaskWeb3, ipfs);
		yield put({type: ActionTypes.LOAD_MYITEMS_PAGE_SUCCESS, myTokens});
	} catch (error) {
		yield put({type: ActionTypes.LOAD_MYITEMS_PAGE_FAILURE, error});
	}

}

export function* createToken(action) {
	try {
		const {
			title,
			description,
			image
		} = action;

		let metaMaskWeb3 = yield select(state => state.web3.metaMaskWeb3);
		let ipfs = yield select(state => state.web3.ipfs);

		if (typeof metaMaskWeb3 === 'undefined') {
			metaMaskWeb3 = yield call(getMetaMaskWeb3);
			yield put({type: ActionTypes.GET_METAMASK_WEB3_SUCCESS, metaMaskWeb3});
		}

		if (typeof ipfs === 'undefined') {
			ipfs = yield call(getIPFSClient);
			yield put({type: ActionTypes.GET_IPFSCLIENT_SUCCESS, ipfs});
		}

		if (yield select(state => state.create.cancel)) {
			yield put({type: ActionTypes.UPLOADING_TO_IPFS_CANCEL});
			return;
		}

		yield put({type: ActionTypes.UPLOADING_TO_IPFS});
		const cid = yield call(uploadToIPFS, ipfs, title, description, image);
		yield put({type: ActionTypes.UPLOADING_TO_IPFS_SUCCESS});

		// Do not mint when cancelled.
		if (yield select(state => state.create.cancel)) {
			yield put({type: ActionTypes.MINTING_CANCEL});
			return;
		}

		yield put({type: ActionTypes.MINTING});
		yield call(mintToken, metaMaskWeb3, cid);
		yield put({type: ActionTypes.MINTING_SUCCESS});

		yield put({type: ActionTypes.CREATE_TOKEN_SUCCESS, cid});
	} catch (error) {
		yield put({type: ActionTypes.CREATE_TOKEN_FAILURE, error});
	}
}

export default function *rootSaga() {
	yield takeLatest(ActionTypes.CREATE_TOKEN, createToken);
	yield takeLatest(ActionTypes.LOAD_MYACCOUNT_PAGE, loadMyAccountPage);
	yield takeLatest(ActionTypes.LOAD_BROWSE_PAGE, loadBrowsePage);
	yield takeLatest(ActionTypes.LOAD_MYITEMS_PAGE, loadMyItemsPage);
}
