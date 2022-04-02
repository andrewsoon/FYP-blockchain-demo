import { useState } from "react";
import { useSelector } from "react-redux";
import { Block } from "../main";
import "./components.css";

function AddBlock() {
  const chainRedux = useSelector((state) => state);
  const chain = chainRedux.chain;
  const [blockData, setBlockData] = useState();
  const handleAddBlock = (event) => {
    event.preventDefault();
    alert(`Block Data ${blockData}`);
    chain.addBlock(
      new Block(
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(Date.now()),
        blockData
      )
    );
  };
  const onChangeHandler = (event) => {
    setBlockData(event.target.value);
  };

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
              onChange={onChangeHandler}
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

export default AddBlock;
