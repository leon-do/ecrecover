// https://docs.ethers.io/ethers.js/html/api-wallet.html
const ethers = require('ethers');

// signMessage('hello')
function signMessage(_message) {
	const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
	const wallet = new ethers.Wallet(privateKey)
	const signature = wallet.signMessage(_message)

	// https://docs.ethers.io/ethers.js/html/cookbook.html#break-apart-r-s-and-v-from-a-message-signature
	// Split apart the signature into an r, s and v that can be used by
	// ecrecover in Solidity. The v parameter will be normalized to the
	// canonical value of 27 or 28.
	const signedMessage = ethers.utils.splitSignature(signature)

	// https://docs.ethers.io/ethers.js/html/api-utils.html?highlight=sha3#cryptographic-functions
	// https://github.com/trufflesuite/ganache-cli/issues/243
	const utf8BytesMessage = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + _message.length + _message)
	const hashedMessage = ethers.utils.keccak256(utf8BytesMessage)

	signedMessage.hashedMessage = hashedMessage
	signedMessage.address = wallet.address

	console.log(signedMessage)
	return signedMessage
}

module.exports = {signMessage}