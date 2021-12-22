import { MODAL_STATE } from "./Type";

const initialState = {
  state: false,
  label:""
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_STATE:
      return {
        state: action.payload,
        label: action.label
      };

    default:
      return state;
  }
};
export default ModalReducer;
