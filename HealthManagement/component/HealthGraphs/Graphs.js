import { View, Text } from 'react-native'
import React from 'react'
import MWeight from './MWeight'


const Graphs = ({pregnancyId}) => {
  return (
    <View>
      <MWeight  pregnancyId={pregnancyId}/>
    </View>
  )
}

export default Graphs