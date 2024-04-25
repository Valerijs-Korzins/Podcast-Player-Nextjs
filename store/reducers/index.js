import { combineReducers } from "@reduxjs/toolkit";
import podcast from "./podcast";

const rootReducer = combineReducers({
  podcast: podcast,
});

export default rootReducer;
