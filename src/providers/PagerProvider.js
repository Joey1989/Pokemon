import React, { useContext } from 'react'
import usePagerCollection from '../hooks/usePagerCollection';

export const PagerContext = React.createContext(undefined);

export const PagerProvider = ({ children }) => {
    const [pager, pagerDispatch] = usePagerCollection();

    return (
        <PagerContext.Provider value={{pager, pagerDispatch}} >
            {children}
        </PagerContext.Provider>
    )
}

export const usePager = () => {
    const pagerCtx = useContext(PagerContext);
    if (!pagerCtx) {
        throw new Error('Pager cannot be loaded.');
    }
    return pagerCtx;
}
