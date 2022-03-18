import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./main.css";

const CryptoJs = require("crypto-js/");

const Landing = () => {
  const [chainState, setChainState] = useState(false);
  const [chain, setChain] = useState();
  const [blockData, setBlockData] = useState();

  function createNewChain() {
    const myCoin = new Blockchain();
    setChainState(true);
    setChain(myCoin);
  }

  function RenderChain(chain) {
    const i = 0;
    console.log(chain.chain.chain.length);
    const chainLength = chain.chain.chain.length;
    const chainData = chain.chain.chain;

    function RenderBlocks() {
      for (let i = 0; i < chainLength; i++) {
        return (
          <div className="Block">
            <h2 className="GenesisBlockHeader">Block {i}</h2>
            <form>
              <div className="form-group row">
                <label
                  htmlFor="previousHash"
                  className="col-sm-4 col-form-label"
                >
                  Previous Hash:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    id="previousHash"
                    value={chainData[i].previousHash}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="blockHash" className="col-sm-4 col-form-label">
                  Block Hash:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="blockHash"
                    value={chainData[i].hash}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="blockTimestamp"
                  className="col-sm-4 col-form-label"
                >
                  Timestamp:
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="blockTimestamp"
                    value={chainData[i].timestamp}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="blockData" className="col-sm-4 col-form-label">
                  Block Data
                </label>
                <div className="col-sm-8">
                  <textarea
                    rows="3"
                    type="text"
                    readOnly
                    className="form-control"
                    id="blockData"
                    value={chainData[i].data}
                  />
                </div>
              </div>
            </form>
          </div>
        );
      }
    }

    return (
      <div className="Chain-container">
        <RenderBlocks />
        <AddBlockForm />
      </div>
    );
  }

  const handleAddBlock = (evt) => {
    evt.preventDefault();
    alert("Block Data ", { blockData });
  };

  function AddBlockForm() {
    return (
      <div className="Block">
        <h2>Add New Block</h2>
        <form onSubmit={handleAddBlock}>
          <div className="form-group row">
            <label htmlFor="blockData" className="col-sm-4 col-form-label">
              Block Data
            </label>
            <div className="col-sm-8">
              <textarea
                rows="3"
                type="text"
                className="form-control"
                id="addBlockData"
                value={blockData}
                onChange={(e) => setBlockData(e.target.value)}
              />
            </div>
          </div>
          <button className="add-block" type="submit">
            Add Block +
          </button>
        </form>
      </div>
    );
  }

  function BlockchainDemo() {
    if (chain == null) {
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
      return <RenderChain chain={chain} />;
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
