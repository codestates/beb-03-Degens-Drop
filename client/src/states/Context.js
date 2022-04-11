import * as React from "react";
import { RootStore } from "./RootStore";

export const BlockchainContext = React.createContext(new RootStore());
export const StoreProvider = BlockchainContext.Provider;

export const useStores = () => React.useContext(BlockchainContext);
