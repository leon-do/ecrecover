// https://ethereum.stackexchange.com/a/15911
pragma solidity ^0.4.0;

contract test {
  function verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) constant returns (address) {
    address signer = ecrecover(_hashedMessage, _v, _r, _s);
    return signer;
  }
}