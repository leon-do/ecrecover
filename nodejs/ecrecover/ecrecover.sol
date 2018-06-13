pragma solidity ^0.4.0;

contract test {
    function verifyMessage(bytes32 _h, uint8 _v, bytes32 _r, bytes32 _s) returns (address){
        return ecrecover(_h, _v, _r, _s);
    }
}