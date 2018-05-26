/*
    // https://ethereum.stackexchange.com/a/15911
    pragma solidity ^0.4.0;

    contract test {
      function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) constant returns (address) {
        address signer = ecrecover(_hashedMessage, _v, _r, _s);
        return signer;
      }
    }
*/
const ethers = require('ethers');

const signedMessage = signMessage('123', '0xb05df6af0073fd592d8f6ee3d5c8ac0ff12e3967')
console.log(signedMessage)

function signMessage(_value, _contractAddress) {
    const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
    const wallet = new ethers.Wallet(privateKey)
    const address = wallet.address

    const message = 'hello'

    // https://github.com/trufflesuite/ganache-cli/issues/243
    const utf8BytesMessage = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + message.length + message)
    const proof = ethers.utils.keccak256(utf8BytesMessage)

    const signature = wallet.signMessage(message)
    // https://docs.ethers.io/ethers.js/html/cookbook.html#break-apart-r-s-and-v-from-a-message-signature
    const {r, s, v} = ethers.utils.splitSignature(signature)

    return {r, s, v, proof, address}
}







