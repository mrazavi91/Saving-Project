import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "./UseUserContext";

export const useLogout = () => {
    const { dispatch } = useUserContext();



    const logout = () => {
        const removeUser = async () => {
            try {
                await AsyncStorage.removeItem("user")
            } catch (error) {
                console.log(error)
            }
        }
        removeUser()

        //UPDATING 
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}