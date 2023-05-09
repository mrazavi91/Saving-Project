import { useContext } from "react"
import { SavingContext } from "../Context/SavingContext"


const useSavingContext = () => {
    const context = useContext(SavingContext)

    if (!context) {
        throw Error('context error, no context')
    }

    return context
}

export default useSavingContext