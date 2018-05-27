if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


var abi = [ { "constant": true, "inputs": [], "name": "numShareholders", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x3b13e4513aac5ac3efec497926e8dca71e6ba7b4" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "shareholders", "outputs": [ { "name": "", "type": "address", "value": "0x8bede2f7db581deee30fcd99576212ce9071b514" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_shareholder", "type": "address" } ], "name": "addShareholder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "shareRevenue", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

var myContractAddress = "0x7669F5AE75b6DAFc35B7D912C8428c163F58451E";
var myContractInstance;

myContractInstance = web3.eth.contract(abi).at(myContractAddress);


$("#contractAddress").html("CONTRACT ADDRESS: " + myContractAddress);


var myAccounts;
var myTxHush;
var myTxValue;

web3.eth.getAccounts(function(error, result){
  if(!error)
    myAccounts = result;
  else
    console.log(error);
});


myContractInstance.shareholders(0, function(error, result) {
  if(!error){;
    $("#c_address").html(result);
  } else {
    console.log(error);
  }
});



//rs.shareRevenue.sendTransaction({from: eth.coinbase, value: web3.toWei(5, "ether")})

/*
web3.eth.getBalance("0x8bede2f7db581deee30fcd99576212ce9071b514", function(error, result){
  if(!error){
    $("#c_balance").html(web3.fromWei(result.toNumber(), "ether") + " ETH");
  } else {
    console.log(error);
  }
});


*/

//リターンがないとだめかもコールバックしないと機能しない。コンソールからはEtherを送れた
function sendEther(){
myContractInstance.shareRevenue.sendTransaction({from: myAccounts[0], value: web3.toWei($("#amount").val(), "ether")}, function(error, result){
  if(!error){
    myTxHush = result;
    $("#txHush").html(myTxHush);
    web3.eth.getTransaction(result, function(error, transaction){
      if(!error){
        myTxValue = web3.fromWei(transaction.value.toString(), "ether");
        $("#txVal").html(myTxValue);
      } else {
        console.log(error);
      }
    });
  } else {
    console.log(error);
}
});
}
