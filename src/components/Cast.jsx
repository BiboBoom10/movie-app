import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Cast({cast}) {
  return (
    <View style={styles.castSection}>
        <Text style={{color: 'white', fontSize: 20, marginHorizontal: 4}}>Top Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16}}>
            {
                cast && cast.map((person, index) => {
                    return(
                        <TouchableOpacity key={index}>

                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}

export default Cast

const styles = StyleSheet.create({
    castSection: {
        marginHorizontal: 8
    }
})