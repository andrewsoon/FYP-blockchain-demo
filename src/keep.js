const CryptoJs = require("crypto-js/");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJs.SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data).toString()
    ).toString(CryptoJs.enc.Hex);
  }

  // To prevent changes in the blockchain, need to invalidate the blockchain when there is a mismatch
  // Mining is basically trial and error the hash combinations until you get a sufficient number of zeros in front of the hash
  // mineBlock(difficulty) {
  //   while (
  //     this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
  //   ) {
  //     this.nonce++;
  //     this.hash = this.calculateHash();
  //   }
  //   console.log("Block mined: " + this.hash);
  // }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
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
    // newBlock.mineBlock(this.difficulty);
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

// console.log("Mining block 1...");
myCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 }));

// console.log("Mining block 2...");
myCoin.addBlock(new Block(2, "15/07/2017", { amount: 10 }));
// console.log(JSON.stringify(myCoin, null, 4));
console.log("Is blockchain valid? " + myCoin.isChainValid());

// Changing data of block
console.log(myCoin.chain[1].data);
console.log(myCoin.chain[1].hash);
console.log("Changing block index 1 data...");
myCoin.chain[1].data = { amount: 100 };
console.log(myCoin.chain[1].data);
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();
console.log(myCoin.chain[1].hash);

console.log("Is blockchain valid? " + myCoin.isChainValid());
