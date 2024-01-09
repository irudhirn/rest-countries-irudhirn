import { createContext, useReducer } from "react";

export const DarkContext = createContext({
    isDark: true,
    setIsDark: () => {}
});

const initialState = {
    isDark: true
}

const reducerFn = (state, action) => {
    return {
        ...state,
        isDark: !state.isDark
    }
}

const DarkModeProvider = (props) => {
    const [state, dispatch] = useReducer(reducerFn, initialState);

    const toggleDarkModeHandler = () => {
        dispatch({});
    }

    const darkCtx = {
        isDark: state.isDark,
        setIsDark: toggleDarkModeHandler
    }

    return(
        <DarkContext.Provider value={darkCtx}>
            {props.children}
        </DarkContext.Provider>
    )
}

export default DarkModeProvider;