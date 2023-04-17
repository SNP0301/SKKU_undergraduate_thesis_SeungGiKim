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



     string [] public nftPapers;

    mapping(string => bool) _nftPapersExists;

    function mint(string memory _nftPaper) public {

        require(!_nftPapersExists[_nftPaper],
        'Error - Paper is already published');
        // this is deprecated - uint _id = KryptoBirdz.push(_nftPaper);
        nftPapers.push(_nftPaper);
        uint _id = nftPapers.length - 1;

        // .push no longer returns the length but a ref to the added element
        _mint(msg.sender, _id);

        _nftPapersExists[_nftPaper] = true;

    }

    constructor() ERC721Connector('Seung_Gi_Kim','2017314243') {
    }
    

}