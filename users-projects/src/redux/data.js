import { getAuthToken } from "./auth";

const GET_DATA = "GET_DATA";


export const MODULE_NAME = "data";

export const getAllData = (state) => state[MODULE_NAME].data;

const initialState = {
  data: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DATA:
      return {
        ...state,
        data: payload,
      };

    default:
      return state;
  }
}
export const getAll = (payload) => ({
  type: GET_DATA,
  payload,
});

export const getData = () => async (dispatch, getState) => {
  try {
    const domain = `https://usersprojects-6d10e.firebaseio.com/data.json`;
    const res = await fetch(`${domain}?auth=${getAuthToken(getState())}`);
    const data = await res.json();

    const arr = [];
    for (let key in data) {
      arr.push({
        ...data[key],
      });
    }

    dispatch(getAll(arr));
  } catch (e) {
    console.log(e);
  }
};
