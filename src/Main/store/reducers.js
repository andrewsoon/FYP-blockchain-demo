const initialState = {
  chain: null,
};

const Chain = (state = initialState, action) => {
  console.log(action.payload, action.type);
  switch (action.type) {
    case "CREATE_CHAIN":
      return {
        chain: action.payload.chain,
      };
    default:
      return state;
  }
};

export default Chain;
