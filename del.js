// https://docs.ethers.io/ethers.js/html/api-wallet.html
const ethers = require('ethers');

const signedMessage = signMessage('123', '0xe37538be3aee714cef0e8a11c0227d2240fec16f')
console.log(signedMessage)

function signMessage(_value, _contractAddress) {
	const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
	const wallet = new ethers.Wallet(privateKey)

	const utf8BytesMessage = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + _value.length + _value)
	const signature = wallet.signMessage(utf8BytesMessage.toString(16))

	// https://docs.ethers.io/ethers.js/html/cookbook.html#break-apart-r-s-and-v-from-a-message-signature
	const signedMessage = ethers.utils.splitSignature(signature)

	// https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=sha3#cryptographic-functions
	// https://github.com/trufflesuite/ganache-cli/issues/243
	// const hashedMessage = ethers.utils.keccak256(utf8BytesMessage)

	// http://solidity.readthedocs.io/en/v0.4.21/units-and-global-variables.html#mathematical-and-cryptographic-functions
	const hashedMessage = ethers.utils.solidityKeccak256(['address', 'int' ], [_contractAddress, _value])

	signedMessage.hashedMessage = hashedMessage
	signedMessage.address = wallet.address

	/*
	signedMessage = {
		r: '0x0079d91efaa7ca55074617a2c255a8855bc278a3e0ca1b837f60ce000109ef85',
		s: '0x40960e193be95e38fb2f5307ca0c20108fcc420ff49e48b9a8cb11d9074deb46',
		v: 27,
		hashedMessage: '0x50b2c43fd39106bafbba0da34fc430e1f91e3c96ea2acee2bc34119f92b37750',
		address: '0x14791697260E4c9A71f18484C9f997B308e59325'
	}
	*/
	return signedMessage
}