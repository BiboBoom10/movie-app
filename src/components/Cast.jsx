import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fallbackPersonImage, image185 } from '../../api/moviedb';

const personName = 'Person Name';
const characterName = 'Character Name';

function Cast({cast, navigation}) {
  return (
    <View style={styles.castSection}>
        <Text style={{color: 'white', fontSize: 18, marginHorizontal: 16}}>Top Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16}}>
            {
                cast && cast.map((person, index) => {
                    return(
                        <TouchableOpacity onPress={() => navigation.navigate('Person', person)} key={index} style={styles.castContainer}>
                            <View style={styles.castImageContainer}>
                                {/* <Image style={styles.castImage} source={require('../../assets/starwars.jpg')}/> */}
                                <Image style={styles.castImage} source={{uri: image185(person?.profile_path) || fallbackPersonImage}}/>
                            </View>
                            <Text style={{color: 'white', fontSize: 12, marginTop: 8}}>
                                {person?.character.length > 10 ? person?.character.slice(0, 10)+'...' :  person?.character}
                            </Text>
                            <Text style={{color: '#9CA3AF', fontSize: 10}}>
                                {person?.original_name.length > 10 ? person?.original_name.slice(0, 10)+'...' :  person?.original_name}
                            </Text>
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
        marginHorizontal: 8,
        marginVertical: 16
    },
    castContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 8,
    },
    castImage: {
        height: 64,
        width: 60
    },
    castImageContainer: {
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderRadius: 30,
        marginTop: 16
    }
})