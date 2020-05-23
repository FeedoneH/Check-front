const SET_AUTH_SUCCESS = "SET_AUTH_SUCCESS";
const SET_LOG_OUT = "SET_LOG_OUT";

export const MODULE_NAME = "auth";
export const getAuthStatus = (state) => state[MODULE_NAME].status;
export const getAuthToken = (state) => state[MODULE_NAME].userInfo.idToken;
export const getUserInfo = (state) => state[MODULE_NAME].userInfo;

const initialState = {
  status: false,
  userInfo: {
    email: "",
    idToken: null,
    localId: null,
  },
 
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_SUCCESS:
      return {
        ...state,
        status: true,
        userInfo: payload,
      };
      case SET_LOG_OUT:
        return {
          ...state,
          status: false,
          userInfo: {
            email: "",
            userInfo: null,
            localId: null,
          },
        };
  
    default:
      return state;
  }
}
export const setAuthSuccess = (payload) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_SUCCESS,
    payload,
  });
};

export const setLogOut = () => ({
  type: SET_LOG_OUT,
});

const AUTH_DOMAIN = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "AIzaSyCHSjduCUu1VMkIRjzu01uMsg6Eu8zqE0M";

export const sign = ({ email, password }, isSignIn = true) => async (
  dispatch
) => {
  try {
    const SIGN_TYPE = isSignIn ? "signInWithPassword" : "signUp";
    const res = await fetch(`${AUTH_DOMAIN}${SIGN_TYPE}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const answer = await res.json();

    if (!answer.error) {
      const { email, idToken, localId } = answer;
      await localStorage.setItem(
        "Auth",
        JSON.stringify({ email, idToken, localId })
      );
      dispatch(setAuthSuccess({ email, idToken, localId }));
    }
  } catch (error) {
    console.log(error);
  }
};
export const logOut = () => async (dispatch) => {
  try {
    await localStorage.removeItem("Auth");
    dispatch(setLogOut());
  } catch (error) {
    console.log("Log out", error);
  }
};
