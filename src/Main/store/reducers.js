const initialState = {
  chain: {},
  isChainValid: false,
};

const Chain = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CHAIN":
      console.log("hello");
      return {
        chain: action.payload,
        isChainValid: true,
      };
    default:
      return state;
  }
};

export default Chain;
