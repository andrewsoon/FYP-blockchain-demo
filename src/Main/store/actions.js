import { CREATE_CHAIN, ADD_BLOCK, MODIFY_CHAIN, CHECK_VALID } from "./types";

export function CreateChain(chain) {
  console.log(chain);
  return (dispatch) => {
    dispatch({
      type: CREATE_CHAIN,
      payload: {
        chain: chain,
      },
    });
  };
}
