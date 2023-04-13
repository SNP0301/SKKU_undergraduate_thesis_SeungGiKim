pragma solidity >=0.7.0 <0.9.0;

interface IERC165{
   
    function supportsInterface(bytes4 interfaceId) external view returns (bool);

} 

contract ERC165 is IERC165 {

    function calcFingerPrint() public view returns(bytes4) {
        return bytes4(keccak256('supportsInterfaces(bytes4)'));

        // function supportInterface alue: 0xcce2d2ea
    }

    mapping(bytes4 => bool) private _supportedInterfaces;

    function supportsInterface(bytes4 interfaceId) external override view returns (bool){
        return _supportedInterfaces[interfaceId];
    }

    function _registerInterface(bytes4 interfaceId) public {
        require(interfaceId != 0xffffffff,'ERC165 error');
        _supportedInterfaces[interfaceId] = true;
    }

} 