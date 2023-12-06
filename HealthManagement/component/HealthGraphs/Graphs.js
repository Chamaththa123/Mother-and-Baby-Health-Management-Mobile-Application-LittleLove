import { View, Text } from 'react-native'
import React from 'react'
import MaternalWeight from './MaternalWeight'

const Graphs = ({pregnancyId}) => {
  return (
    <View>
      <MaternalWeight  pregnancyId={pregnancyId}/>
    </View>
  )
}

export default Graphs