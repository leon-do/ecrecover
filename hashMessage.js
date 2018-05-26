/*
    pragma solidity ^0.4.0;

    contract test {
        bytes32 public proof;
        function verify(uint _value) {
            proof = sha3(this, _value);
        }
    }

*/
const ethers = require('ethers');

const hashedMessage = hashMessage('0x4920ebe161687f4a2180a698171ff5bfb2fbac65', '123')
console.log(hashedMessage)

function hashMessage(_contractAddress, _value) {
    const message = ethers.utils.solidityKeccak256(['address', 'int' ], [_contractAddress, _value])

    return {message, _value}
}



