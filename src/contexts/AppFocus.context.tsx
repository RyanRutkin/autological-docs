import { createContext, FC, PropsWithChildren } from "react";
import { useLocation } from "react-router";

export const AppFocusContext = createContext<{
    focusedItem: string | null;
}>({
    focusedItem: null
});

export const AppFocusContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { hash } = useLocation();

    return <AppFocusContext.Provider value={{ focusedItem: (hash ? hash.split('#')[1] : '') }} >
        { children }
    </AppFocusContext.Provider>
}