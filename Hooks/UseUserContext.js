import { UserContext } from "../Context/UserContext.js"
import { useContext } from "react"

export const useUserContext = () => {
    // reading and subscribing to context
    const context = useContext(UserContext)


    if (!context) {
        throw Error('useUserContext is not implemented in right position')
    }

    return context
}