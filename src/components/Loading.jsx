import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const  { height, width } = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={4} size={80} color='white' />
    </View>
  )
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width
    }
});