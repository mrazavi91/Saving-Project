import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from './UseUserContext'
import { useFocusEffect } from '@react-navigation/native'

const useGetPlan = (url) => {
    const { user } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [apiData, setApiData] = useState(null)
    // console.log(apiData)

    useFocusEffect(useCallback(() => {
        
        const getPlans = async () => {
            setIsLoading(true)
            
            await axios.get(url, {
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
        getPlans()
    },[url]))

    return{isLoading , apiData , serverError}
 
}

export default useGetPlan




