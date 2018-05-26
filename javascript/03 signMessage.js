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

const signedMessage = signMessage(123)
console.log(signedMessage)

function signMessage(_message) {
    const privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
    const signingKey = new ethers.SigningKey(privateKey);
    const address = signingKey.address

    const prefix = "\x19Ethereum Signed Message:\n32";
    const msgBytes = ethers.utils.toUtf8Bytes(_message);
    const msgDigest = ethers.utils.keccak256(msgBytes);

    const h = ethers.utils.solidityKeccak256(['string', 'bytes32'], [prefix, msgDigest]);

  const {r, s, recoveryParam} = signingKey.signDigest(h);

  const v = 27 + recoveryParam

  return { h, v, r, s, address}

}







