import { CREATE_CHAIN } from "./types";

export function CreateChain(chain) {
  return (dispatch) => {
    dispatch({
      type: CREATE_CHAIN,
      payload: {
        chain: chain,
      },
    });
  };
}
