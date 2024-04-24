import * as actions from "../actions/actionTypes";

const initialState = {
  allUsers: [],
  savedUser: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        loading: false,
      };

    case actions.SAVE_USER:
      return {
        allUsers: state.allUsers.concat(action.payload),
        loading: false,
      };

    case actions.DELETE_USER:
      return {
        allUsers: state.allUsers.filter((user) => user._id !== action.payload),
        loading: false,
      };

    case actions.SET_STATUS:
      return {
        allUsers: state.allUsers.map((user) => {
          if (user._id === action.payload) user.active = !user.active;
          return user;
        }),
        loading: false,
      };

    case actions.USERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
