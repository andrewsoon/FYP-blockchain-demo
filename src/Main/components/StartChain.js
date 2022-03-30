import AddBlock from "./AddBlock";
import "./components.css";
import RenderBlocks from "./RenderBlocks";

function StartChain({ chain, block, updateChain }) {
  const chainLength = chain.chain.length;
  const chainData = chain.chain;

  return (
    <div className="Chain-container">
      <RenderBlocks chainLength={chainLength} chainData={chainData} />
      <AddBlock chain={chain} block={block} updateRenderChain={updateChain} />
    </div>
  );
}

export default StartChain;
