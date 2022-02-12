import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./main.css";

const CryptoJs = require("crypto-js/");

const Landing = () => {
  const [chainState, setChainState] = useState(false);
  const [chain, setChain] = useState();

  function createNewChain() {
    const myCoin = new Blockchain();
    setChainState(true);
    setChain(myCoin);
  }

  function createNewBlock() {
    console.log("block created");
  }

  function BlockchainDemo() {
    if (!chainState) {
      return (
        <div className="Chain-container">
          <div className="Block">
            <h2>Blockchain Demo</h2>
            <p>
              Clicking the button below will create a new blockchain with a
              genesis block. <br />
              <br />
              Find out how a blockchain works by adding more blocks and editing
              already created blocks!
            </p>
            <button className="button" onClick={createNewChain}>
              Create New Chain
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Chain-container">
          <div className="Block">
            <h2 className="GenesisBlockHeader">{chain.chain[0].data}</h2>
            <form>
              <div class="form-group row">
                <label for="previousHash" class="col-sm-4 col-form-label">
                  Previous Hash:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    id="previousHash"
                    value={chain.chain[0].previousHash}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="blockHash" class="col-sm-4 col-form-label">
                  Block Hash:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control"
                    id="blockHash"
                    value={chain.chain[0].hash}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="blockTimestamp" class="col-sm-4 col-form-label">
                  Timestamp:
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control"
                    id="blockTimestamp"
                    value={chain.chain[0].timestamp}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="blockData" class="col-sm-4 col-form-label">
                  Block Data
                </label>
                <div class="col-sm-8">
                  <textarea
                    rows="3"
                    type="text"
                    readonly
                    class="form-control"
                    id="blockData"
                    value={chain.chain[0].data}
                  />
                </div>
              </div>
            </form>
          </div>
          <button className="add-block" onClick={createNewBlock}>
            +
          </button>
        </div>
      );
    }
  }

  return (
    <div className="Main-container">
      <header className="Main-header">
        <h2>FYP Blockchain Prototype</h2>
      </header>
      <BlockchainDemo />
    </div>
  );
};

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
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    console.log("Genesis Block Created");
    return new Block(
      0,
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(Date.now()),
      "Genesis block",
      "0"
    );
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

export default Landing;