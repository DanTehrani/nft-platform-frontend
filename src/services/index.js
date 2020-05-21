import Web3 from 'web3';
import ipfsHttpClient, { Buffer } from 'ipfs-http-client';
import tokenContractABI from './Token';
import 'dotenv/config';

const proxyContractAddress = '0xf7D3838c38fcE6EDDa0093D13bb8505C7a7008cf';

export const getUserAddress = async (web3) => {
	const accounts = await web3.eth.getAccounts();
	return accounts[0];
};

export const getUserBalance = async (web3, address) => {
	let balance;
	balance = await web3.eth.getBalance(address);
	return balance;
};

export const getMetaMaskWeb3 = async () => {
	const ethereum = window.ethereum;

	let web3;
	// Modern dapp browsers...
	if (ethereum) {
		try {
			// Request account access if needed
			await ethereum.enable();
			web3 = new Web3(ethereum);
		} catch (error) {
			// User denied account access...
		}
	} else {
		// Non-dapp browsers...
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}

	return web3;
};

export const getWeb3 = async () => {
	return new Web3(process.env.REACT_APP_NETWORK);
};

export const getTokens = async (web3, ipfs) => {
	const contract = new web3.eth.Contract(tokenContractABI['abi'], proxyContractAddress);

	const totalSupply = parseInt(await contract.methods.totalSupply().call());

	if (totalSupply === 0) {
		return [];
	}

	const tokenIDs = await Promise.all(new Array(totalSupply).fill(0).map((_, i) => contract.methods.tokenByIndex(i).call()));
	let tokenURIs = await Promise.all(tokenIDs.map((id) => contract.methods.tokenURI(id).call()));
	tokenURIs = tokenURIs.filter((uri, i) => i === 0);
	const tokenMetaData = (await Promise.all(tokenURIs.map((uri) => ipfs.cat(uri)))).map((buffer) => JSON.parse(buffer.toString('utf8')));
	const images = (await Promise.all(tokenMetaData.map((metaData) => ipfs.cat(metaData.image))));
	const tokens = tokenMetaData.map((metaData, i) => {
		const cloned = Object.assign({}, metaData);
		cloned.image = images[i];
		return cloned;
	});

	return tokens;
};

export const getMyTokens = async (web3, ipfs) => {
	const contract = new web3.eth.Contract(tokenContractABI['abi'], proxyContractAddress);
	const addresses = await web3.eth.getAccounts();

	if (addresses.length === 0) {
		return [];
	}

	const myTokenIDs = await contract.methods.tokensOfOwner(addresses[0]).call();
	const myTokenURIs = await Promise.all(myTokenIDs.map((id) => contract.methods.tokenURI(id).call()));
	const myTokenMetaData = (await Promise.all(myTokenURIs.map((uri) => ipfs.cat(uri)))).map((buffer) => JSON.parse(buffer.toString('utf8')));
	const images = (await Promise.all(myTokenMetaData.map((metaData) => ipfs.cat(metaData.image))));
	const myTokens = myTokenMetaData.map((metaData, i) => {
		const cloned = Object.assign({}, metaData);
		cloned.image = images[i];
		return cloned;
	});

	return myTokens;
};

export const getIPFSClient = async () => {
	return ipfsHttpClient({
		host: 'ipfs.infura.io',
		port: 5001,
		protocol: 'https'
	});
};

export const uploadToIPFS = async (ipfs, title, description, image) => {
	const imageURI = (await ipfs.add(Buffer.from(image)))[0].hash;

	const metaData = {
		title,
		description,
		image: imageURI
	};

	const results = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
	const uri = results[0].hash;

	return uri;
};

export const mintToken = async (web3, cid) => {
	const contract = new web3.eth.Contract(tokenContractABI['abi'], proxyContractAddress);
	const addresses = await web3.eth.getAccounts();

	if (addresses.length === 0) {
		return;
	}

	// Sanity check.
	if (cid === '') {
		return;
	}

	await contract.methods.mint(addresses[0], cid).send({from: addresses[0]});
};

export const getMetaMaskNetworkID = async metaMaskWeb3 => {
	return await metaMaskWeb3.eth.net.getId();
};
