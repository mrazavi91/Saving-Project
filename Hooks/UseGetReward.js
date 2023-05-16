import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from './UseUserContext'

const useGetReward = (url, id) => {
    const { user } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [apiData, setApiData] = useState(null)
    console.log(apiData)

    useCallback(() => {
        const getPlans = async () => {
            setIsLoading(true)
            await axios.get(url , {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then((res) => {
                    setApiData(res.data)
                    setIsLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setServerError(error)
                    setIsLoading(false)
                })
        }
        getPlans();
        const dataInterval = setInterval(() => getPlans(), 5 * 1000);
        return () => clearInterval(dataInterval);

    }, [url])

    return { isLoading, apiData, serverError }

}

export default useGetReward