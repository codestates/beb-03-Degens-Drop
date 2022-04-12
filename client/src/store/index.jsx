import React from 'react';
import RootStore from "./RootStore";

export const BlockchainContext = React.createContext();
export const StoreProvider = BlockchainContext.Provider;


const BlockchainProvider = ({ children }) => {
    return (
        <StoreProvider value={RootStore}>
            {children}
        </StoreProvider>
    );
};

export default BlockchainProvider;
