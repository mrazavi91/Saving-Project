import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext()


export const userReducer = (state, action) => {
    //using switch statement for action type, we have two action type: LOGIN (signup+login) , LOGOUT (only logout)
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


export const UserContextProvider = ({ children }) => {
    //using userReducer hook and set the state to null the we use userReducer to update the state!!
    const [state, dispatch] = useReducer(userReducer, {
        user: null
    })

    // lets tell react state is not null after refresh by getting the user from localstorage and we run just ONCE 
    useEffect(() => {

        const getUser = async () => {
            try {
                const item = await AsyncStorage.getItem("user");
                const user = JSON.parse(item)
                if (user) {
                    dispatch({ type: 'LOGIN', payload: user })
                }
            } catch (error) {
                console.log('myerror', error)
            }
        }

        getUser()

    }, [])

    console.log('UserContext state:', state)

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )

}