/*
    pragma solidity ^0.4.0;

    contract test {
        address public signer;

        function verifyMessage(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s) {
            signer = ecrecover(_h, _v, _r, _s);
        }
    }
*/
const ethers = require('ethers')

const signedMessage = signMessage('0xdc04977a2078c8ffdf086d618d1f961b6c546222' ,123)
console.log(signedMessage)

function signMessage(_contract, _value) {
    const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
    const signingKey = new ethers.SigningKey(privateKey);
    const address = signingKey.address

    // hash message
    const h = ethers.utils.solidityKeccak256(['address', 'int'], [_contract, _value]);

    // sign and split message: https://github.com/ethers-io/ethers.js/issues/85
    const {r, s, recoveryParam} = signingKey.signDigest(h);
    const v = 27 + recoveryParam

    return { h, v, r, s, address }
}







