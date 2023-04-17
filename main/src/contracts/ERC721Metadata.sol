// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721Metadata{

    string private _name;
    string private _studentNumber;

    constructor(string memory named, string memory numbered){
        _name = named;
        _studentNumber = numbered;
    }

    function name() external returns(string memory){
        return _name;
    }

    function studentNumber() external returns(string memory){
        return _studentNumber;
    }
}