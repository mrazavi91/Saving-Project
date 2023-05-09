import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const SavingContext = createContext()



export const savingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SAVING':
            
            return {
                saving: action.payload
            }
        case 'CREATE_SAVING':
            
            return {
                saving: [action.payload, state.saving]
            }
        default:
            return state
    }
}

export const SavingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(savingReducer, {
        saving: null
    })

    // useEffect(() => {

    //     const getSaving = async () => {
    //         try {
    //             const item = await AsyncStorage.getItem("saving");
    //             const saving = JSON.parse(item)
    //             console.log(saving)
    //             if (saving) {
    //                 dispatch({ type: 'SET_SAVING', payload: saving })
    //             }
    //         } catch (error) {
    //             console.log('get saving error', error)
    //         }
    //     }

    //     getSaving()

    // }, [])

    console.log('SavingContext state:', state)


    return (
        <SavingContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SavingContext.Provider>
    )
}