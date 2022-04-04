import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Blockchain } from "../main";
import { CreateChain } from "../store/actions";
import AddBlock from "./AddBlock";
import "./components.css";
import EditBlock from "./EditBlock";
import RenderBlocks from "./RenderBlocks";

function BlockchainDemo() {
  const chainRedux = useSelector((state) => state);

  const dispatch = useDispatch();

  function createNewChain() {
    dispatch(CreateChain(new Blockchain()));
  }
  let chain = chainRedux.chain;
  console.log(chain?.isChainValid());
  return (
    <div>
      {!chain ? (
        <div className="Demo-wrapper">
          <div className="Demo-row">
            <div className="Block">
              <h2>Blockchain Demo</h2>
              <p>
                Clicking the button below will create a new blockchain with a
                genesis block. <br />
                <br />
                Find out how a blockchain works by adding more blocks and
                editing existing blocks!
              </p>
              <button className="button" onClick={createNewChain}>
                Create New Chain
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="Demo-wrapper">
          {chain?.isChainValid() ? (
            <h3 className="Chain-Validity-True">Chain is VALID</h3>
          ) : (
            <h3 className="Chain-Validity-False">Chain is NOT VALID</h3>
          )}
          <div className="Demo-row">
            <div>
              <AddBlock />
              <EditBlock />
            </div>
            <RenderBlocks />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockchainDemo;
