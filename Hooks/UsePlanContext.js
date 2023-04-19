import { useContext } from "react"
import { PlanContext } from "../Context/PlanContext"

const usePlanContext = () => {
    const context = useContext(PlanContext)

    if (!context) {
        throw Error('context error, no context')
    }

    return context
}

export default usePlanContext