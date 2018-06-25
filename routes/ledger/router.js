//import fetch from 'node-fetch';
//import Transaction from './transaction';
//import Blockchain from './blockchain';
//import genesisBlock from './genesisBlock';
//import BlockchainNode from './blockchainNode';

const fetch  = require('node-fetch');
const Transaction  = require('./transaction');
const Blockchain  = require('./blockchain');
const genesisBlock  = require('./genesisBlock');
const BlockchainNode  = require('./blockchainNode');

//const router = require('express').Router();
const router = require('koa-router')()

let body = [];
let blockchain = new Blockchain(genesisBlock);
let nodes = [];

router.prefix('/blockchain')

router.all('/info', (ctx, next)=>{
  ctx.body = JSON.stringify(blockchain);
})

router.post('/trans', (ctx, next)=>{
  const {from, to, amount} = ctx.request.body;
  let transaction = new Transaction(from , to ,amount);
  let nextBlock = blockchain.generateNextBlock([transaction]);
  blockchain.addBlock(nextBlock);

  nextBlock.success = true;
  ctx.body = JSON.stringify(nextBlock);
})

router.post('/mine', (ctx, next)=>{
    if(body.length < 1){
        return ctx.body = JSON.stringify(blockchain.blocks[blockchain.blocks.length-1]);
    }
    let block = blockchain.generateNextBlock(body)
    body = [];
    blockchain.addBlock(block);
    ctx.body = JSON.stringify(block);
})

router.get('/nodes/resolve', (ctx, next)=>{
  if(nodes.length<1){
    return res.send('No Nodes')
  }
  let count = 0;
  nodes.forEach((n, i, nodes)=>{
    let url = `http://${n.url}/blockchain`;
    fetch(url)
    .then(r=>r.json())
    .then(otherChain=>{
      count += 1;
      if(blockchain.blocks.length < otherChain.blocks.length){
        blockchain = otherChain;
      }
      if(count==nodes.length) return res.send(blockchain);
    })
    .catch(err=>res.send(err))
  })
})

router.post('/nodes/register', (ctx, next)=>{
  let nodeList = req.body.urls;
  if(!nodeList) return res.sendStatus(500);
  nodeList.forEach((n)=>{
    if(n.url !== req.headers.host){
      let node = new BlockchainNode(n.url);
      nodes.push(node);
    }
  })

  ctx.body = JSON.stringify(nodes);
})

router.get('/nodes', (ctx, next)=>{
  ctx.body = JSON.stringify(nodes);
})

//export default router;
module.exports = router