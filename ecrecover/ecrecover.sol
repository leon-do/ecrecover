pragma solidity ^0.4.0;

contract test {
    address public signer;
    bytes32 public hash;
    
    function verifyMessage(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s, uint _value) {
        signer = ecrecover(_h, _v, _r, _s);
        hash = sha3(this, _value);
    }
}