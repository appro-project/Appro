import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import { initialState, rootReducer, RootState } from "../reducers";
// @ts-ignore
import thunk, {ThunkMiddleware} from "redux-thunk";

export type ThunkWithRootState = ThunkMiddleware<RootState, AnyAction>;

export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk as ThunkWithRootState),
    ),
);

declare global {
    interface Window {
        reactStore:any;
    }
}

window.reactStore = store;