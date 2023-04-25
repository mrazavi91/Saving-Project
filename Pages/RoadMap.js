import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import LevelList from './LevelList'

const RoadMap = () => {
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
  return (
      <ScrollView
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
      
      >
      <LevelList /> 
    </ScrollView>
  )
}

export default RoadMap

const styles = StyleSheet.create({})