// https://ethereum.stackexchange.com/a/15911
pragma solidity ^0.4.0;

contract test {

  function test() {
  }


  function verify(bytes32 _message, uint8 _v, bytes32 _r, bytes32 _s) constant returns (address) {
    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 prefixedHash = keccak256(prefix, _message);
    address signer = ecrecover(prefixedHash, _v, _r, _s);
    return signer;
  }
}