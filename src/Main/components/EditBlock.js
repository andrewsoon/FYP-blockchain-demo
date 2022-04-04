import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateChain } from "../store/actions";
import "./components.css";

function EditBlock() {
  const chainRedux = useSelector((state) => state);
  const chain = chainRedux.chain;
  const [blockIndex, setBlockIndex] = useState(Number);
  const [blockData, setBlockData] = useState();
  const dispatch = useDispatch();

  const handleEditBlock = (event) => {
    event.preventDefault();
    alert(`Block "${blockIndex}"'s data has been updated with "${blockData}"`);
    console.log(chain);
    chain.chain[blockIndex].data = blockData;
    chain.chain[blockIndex].hash = chain.chain[blockIndex].calculateHash();
    dispatch(CreateChain(chain));
  };
  const onChangeHandler = (event) => {
    setBlockData(event.target.value);
  };

  const onChangeHandlerIndex = (event) => {
    setBlockIndex(event.target.value);
  };

  return (
    <div className="AddBlock">
      <h2>*Edit Block</h2>
      <form onSubmit={handleEditBlock}>
        <div className="form-group row">
          <label htmlFor="blockData" className="col-sm-4 col-form-label">
            Block Index
          </label>
          <div className="col-sm-8">
            <input
              rows="3"
              type="number"
              max={chain.chain.length - 1}
              className="form-control"
              id="addBlockData"
              value={blockIndex}
              onChange={onChangeHandlerIndex}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="blockData" className="col-sm-4 col-form-label">
            Edit Block Data
          </label>
          <div className="col-sm-8">
            <input
              rows="3"
              type="text"
              className="form-control"
              id="addBlockData"
              value={blockData}
              onChange={onChangeHandler}
              required={true}
            />
          </div>
        </div>
        <button
          className="add-block"
          type="submit"
          data-toggle="tooltip"
          data-placement="top"
          title="Try and edit an existing block's data and observe the changes in the block's data and hash"
        >
          Edit Block
        </button>
      </form>
    </div>
  );
}

export default EditBlock;
