import { useSelector } from "react-redux";

function RenderBlocks() {
  const chainRedux = useSelector((state) => state);
  const chainLength = chainRedux.chain.chain.length;
  const chainData = chainRedux.chain.chain;
  console.log("hoho");
  if (chainRedux != null) {
    for (let i = 0; i < chainLength; i++) {
      return (
        <div className="Block">
          <h2 className="GenesisBlockHeader">Block {i}</h2>
          <form>
            <div className="form-group row">
              <label htmlFor="previousHash" className="col-sm-4 col-form-label">
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
  return null;
}

export default RenderBlocks;
