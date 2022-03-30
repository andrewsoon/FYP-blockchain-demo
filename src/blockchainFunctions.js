const CryptoJs = require("crypto-js/");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return CryptoJs.SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data).toString() +
        this.nonce
    ).toString(CryptoJs.enc.Hex);
  }

  // To prevent changes in the blockchain, need to invalidate the blockchain when there is a mismatch
  // Mining is basically trial and error of hash combinations until you get a sufficient number of zeros in front of the hash
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
    console.log("Nonce: " + this.nonce);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let myCoin = new Blockchain();
console.log(myCoin);

// console.log("Mining block 1...");
myCoin.addBlock(new Block(1, "10/07/2017", "amount: 4 "));

// console.log("Mining block 2...");
myCoin.addBlock(new Block(2, "15/07/2017", "amount: 10 "));

console.log(myCoin);

// // console.log(JSON.stringify(myCoin, null, 4));

console.log("Is blockchain valid? " + myCoin.isChainValid());

// Changing data of block 1
console.log("Data of block index 1: " + myCoin.chain[1].data);
console.log("Hash of block index 1: " + myCoin.chain[1].hash);
console.log("Changing block index 1 data...");
myCoin.chain[1].data = "amount: 100 ";
console.log("Updated data of block index 1: " + myCoin.chain[1].data);
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();
console.log("Updated hash of block index 1: " + myCoin.chain[1].hash);

console.log(myCoin);
console.log("Is blockchain valid? " + myCoin.isChainValid());
