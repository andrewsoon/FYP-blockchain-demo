import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlock from "./components/AddBlock";
import RenderBlocks from "./components/RenderBlocks";
import "./main.css";
import { CreateChain } from "./store/actions";

const CryptoJs = require("crypto-js/");

const Landing = () => {
  const [chain, setChain] = useState();
  const chainRedux = useSelector((state) => state.chain);
  const dispatch = useDispatch();

  function createNewChain() {
    const myCoin = new Blockchain();
    setChain(myCoin);
    dispatch(CreateChain(new Blockchain()));
    console.log(chainRedux);
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
      return (
        <div className="Chain-container">
          <RenderBlocks
            chainLength={chain.chain.length}
            chainData={chain.chain}
          />
          <AddBlock chain={chain} block={Block} updateRenderChain={setChain} />
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

export class Blockchain {
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

export class Block {
  constructor(timestamp, data, previousHash = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoJs.SHA256(
      this.previousHash + this.timestamp + JSON.stringify(this.data).toString()
    ).toString(CryptoJs.enc.Hex);
  }
}

export default Landing;
