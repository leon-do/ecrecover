// https://docs.ethers.io/ethers.js/html/api-wallet.html
// if proof === hashedMessage

const ethers = require('ethers');

const signedMessage = signMessage('123', '0xd04a9b31144d28e3a36c4ebcb99b9c79763f71f0')
console.log(signedMessage)

function signMessage(_value, _contractAddress) {
	const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
	const wallet = new ethers.Wallet(privateKey)
	const address = wallet.address

	const proof = ethers.utils.solidityKeccak256(['address', 'int' ], [_contractAddress, _value])

	const utf8BytesMessage = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + proof.length + proof)
	const hashedMessage = ethers.utils.keccak256(utf8BytesMessage)

	const signedMessage = wallet.signMessage(hashedMessage)
	const VRS = ethers.utils.splitSignature(signedMessage)


	return { VRS, address, proof, hashedMessage }
}