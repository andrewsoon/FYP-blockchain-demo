import { useSelector } from "react-redux";
import "./components.css";

function RenderBlocks() {
  const chainRedux = useSelector((state) => state);
  const chainData = chainRedux.chain.chain;

  return (
    <div className="Chain-container">
      {chainData.map((data, index) => (
        <div className="Block" key={index}>
          <h2 className="GenesisBlockHeader">Block {index}</h2>
          <form>
            <div className="form-group row">
              <label htmlFor="previousHash" className="col-sm-4 col-form-label">
                Previous Hash:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readOnly
                  className="form-control"
                  id="previousHash"
                  value={data.previousHash}
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
                  value={data.hash}
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
                  value={data.timestamp}
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
                  value={data.data}
                />
              </div>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}

export default RenderBlocks;
