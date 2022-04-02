import { useDispatch, useSelector } from "react-redux";
import { Blockchain } from "../main";
import { CreateChain } from "../store/actions";
import AddBlock from "./AddBlock";
import RenderBlocks from "./RenderBlocks";

function BlockchainDemo() {
  const chainRedux = useSelector((state) => state);
  const dispatch = useDispatch();

  function createNewChain() {
    dispatch(CreateChain(new Blockchain()));
  }
  let chain = chainRedux.chain;
  return (
    <div>
      {chain === null ? (
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
      ) : (
        <div className="Chain-container">
          <RenderBlocks />
          <AddBlock />
        </div>
      )}
    </div>
  );
}

export default BlockchainDemo;
