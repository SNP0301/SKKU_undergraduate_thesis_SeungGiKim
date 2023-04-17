// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
  address public owner = msg.sender; // NFT owner: publishing page에서는 publisher, transferer의 역할 수행
  uint public last_completed_migration; // 

  modifier restricted() { //함수 제한자: 계약의 소유자만 계약을 이전(migrate)할 수 있도록 제한
    require(
      msg.sender == owner,
      "Only owner can migrate this contract: check your account information"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted { // 이전(migrate)된 계약 이력을 추적하기 위해 upgraded를 지속적으로 업데이트(업그레이드)
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration); 
  }
 

}
