import React, { useEffect, useReducer } from "react";

import {
  initialState as foodsInitialState,
  foodsActionTyps,
  foodsReducer,
} from "../reducers/foods";

// apis
import { fetchFoods } from "../apis/foods";

import { REQUEST_STATE } from "../constants";

export const Foods = ({ match }) => {
  const {
    params: { restaurantsId },
  } = match;

  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTyps.FETCHING });
    fetchFoods(restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTyps.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, []);

  return (
    <>
      {foodsState.fetchState === REQUEST_STATE.LOADING ? (
        <p>ロード中...</p>
      ) : (
        foodsState.foodsList.map((food) => <div key={food.id}>{food.name}</div>)
      )}
    </>
  );
};
