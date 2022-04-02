import { CREATE_CHAIN, EDIT_CHAIN } from "./types";

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

export function EditChain(data) {
  return (dispatch) => {
    dispatch({
      type: EDIT_CHAIN,
      payload: {
        data: data,
      },
    });
  };
}
