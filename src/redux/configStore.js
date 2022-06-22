import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
const rootReducer = combineReducers({
  CarouselReducer,
  QuanLyPhimReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
