import * as api from "../api";
import * as actionTypes from "../constants/actionTypes";

// * Action Creators
export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: actionTypes.AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Sorry. Something went wrong!");
    }
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: actionTypes.AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Sorry. Something went wrong!");
    }
  }
};

export const googleSignIn = (result, token, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.AUTH, data: { result, token } });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGOUT });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
