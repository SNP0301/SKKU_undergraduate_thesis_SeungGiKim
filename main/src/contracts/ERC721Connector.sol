// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Metadata.sol';
import './ERC721Enumerable.sol';

contract ERC721Connector is ERC721Metadata, ERC721Enumberable {
    constructor(string memory name, string memory studentNumber) ERC721Metadata(name, studentNumber){

    }
}