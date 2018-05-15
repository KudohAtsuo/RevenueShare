pragma solidity ^0.4.21;

// Basic contract to share revenue
contract RevenueShare {
  address public owner;
  uint public numShareholders;

  mapping (uint => address) public shareholders;


  function RevenueShare() public{
    owner = msg.sender;
    numShareholders = 0;
  }

  // modifier only owner
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // to add a shareholder
  function addShareholder(address _shareholder) public onlyOwner{
    shareholders[numShareholders] = _shareholder;

    numShareholders++;
  }

  // to share Revenue
  function shareRevenue() public payable{
    for(uint i = 0; i < numShareholders; i++){
      shareholders[i].transfer(msg.value / numShareholders);
    }
  }

}
