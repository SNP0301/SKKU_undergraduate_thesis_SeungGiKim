// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITest{
    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address);

    function transferFrom(address _from, address _to, uint256 _tokenId) external;
}

contract Test is ITest {

    function calc() public view returns(bytes4){
        return bytes4(keccak256('balanceOf(bytes4)')^
        keccak256('ownerOf(bytes4)')^
        keccak256('transferFrom(bytes4)'));
    }

    // calc() returns 0x92d8a794

    function balanceOf(address _owner) public override view returns(uint256) {
        return 5;
    }

    function ownerOf(uint256 _tokenId) public override view returns (address){
        return msg.sender;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) override public {
        uint x = 4;

    }    
}