// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract NftPaper is ERC721Connector {


    /*
    const minterName = "OO University";
    const awardeeName = "Student ";
    const awardInfo = "default award";
    const awardedDate = "2023-01-01";
    const imageURL = "default URL for ipfs must be here";
    const counter = 5;
    */

    constructor() ERC721Connector('Seung_Gi_Kim','2017314243') {
    }
    

}