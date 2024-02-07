import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import missionsReducer from "../redux/missions/missionSlice";
import rocketSlice from "./rockets/rocketSlice";

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    rockets: rocketSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
