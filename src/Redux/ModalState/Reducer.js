import { MODAL_STATE } from "./Type";

const initialState = {
  state: false,
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_STATE:
      return {
        state: action.payload,
      };

    default:
      return state;
  }
};
export default ModalReducer;
