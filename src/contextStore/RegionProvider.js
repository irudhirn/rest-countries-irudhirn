import { createContext, useReducer } from "react";

export const RegionContext = createContext({
    region: "All",
    setRegion: () => {}
});

const initialState = {
    region: "All"
}

const reducerFn = (state, action) => {
    return {
        ...state,
        region: action.payload
    }
}

const RegionProvider = (props) => {
    const [state, dispatch] = useReducer(reducerFn, initialState);

    const setRegionHandler = (region) => {
        dispatch({payload: region});
    }

    const regionCtx = {
        region: state.region,
        setRegion: setRegionHandler
    }

    return(
        <RegionContext.Provider value={regionCtx}>
            {props.children}
        </RegionContext.Provider>
    )
}

export default RegionProvider;