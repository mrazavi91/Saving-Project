import { createContext, useReducer, useEffect } from "react";
export const PlanContext = createContext()


export const planReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAN':
            return {
                plan: action.payload
            }
        case 'CREATE_PLAN':
            return {
                plan: [action.payload, state.plan]
            }
        default:
            return state
    }
}

export const PlanContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(planReducer, {
        plan: null
    })

    
    return (
        <PlanContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PlanContext.Provider>
    )
}
