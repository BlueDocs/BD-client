import { createContext } from 'vc-state';

const [AppContextProvider, useAppContext] = createContext(() => {
    return {};
});

export { AppContextProvider, useAppContext };
