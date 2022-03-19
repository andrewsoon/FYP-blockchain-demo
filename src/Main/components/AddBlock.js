import { useState } from "react";
import "./components.css";

const AddBlock = () => {
  const [blockData, setBlockData] = useState();
  const handleAddBlock = (event) => {
    event.preventDefault();
    console.log("haha", { blockData });
    alert(`Block Data ${blockData}`);
  };
  const onChangeHandler = (event) => {
    setBlockData(event.target.value);
    console.log(blockData);
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
};

export default AddBlock;
