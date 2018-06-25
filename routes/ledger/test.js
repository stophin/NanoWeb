//import Block from './block';
//import Blockchain from './blockchain';
//import Transaction from './transaction';
const Block = require('./block');
const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

function test(){
  let genesisBlock = new Block();
  let blockchain = new Blockchain(genesisBlock);

  let transaction = new Transaction('Andy', 'John', 10);
  let nextBlock = blockchain.generateNextBlock([transaction]);
  blockchain.addBlock(nextBlock);

  let transaction2 = new Transaction('John', 'Andy', 5);
  let nextBlock2 = blockchain.generateNextBlock([transaction2]);
  blockchain.addBlock(nextBlock2);

  return blockchain;
}

console.log("Start of test");
let blockChain = test();
for (var i = 0; i < blockChain.blocks.length; i++) {
  var block = blockChain.blocks[i];
  console.log("chian " + i + ", " + block.index + "," + block.previousHash + "," + block.hash + "," + block.nonce + "," + block.timestamp + "," + JSON.stringify(block.body));
}

console.log("End of test");

//export default test;
module.exports = test