import {RemoteApi} from "../api/Api";
import {createContext, useContext} from "react";
import CommonsStore from "./CommonsStore";

const url = process.env.REACT_APP_API_URL || "/api";
const api = new RemoteApi(url);
const commonsStore = new CommonsStore();

export const mainStore = {
    api,
    commonsStore
};

export const StoreContext = createContext(mainStore);

export const useStore = () => {
    return useContext(StoreContext);
};