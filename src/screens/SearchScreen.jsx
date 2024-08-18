import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline';

const { height, width } = Dimensions.get('window');

function SearchScreen() {

  const navigation = useNavigation();

  const [results, setResults] = useState([1, 2, 3, 4]);

  const movieName = 'Movie Name';

  return (
    <SafeAreaView style={{backgroundColor: '#1F2937', flex: 1}}>
      <View style={styles.container}>
        <TextInput placeholder='Search Movie' placeholderTextColor='gray' style={styles.inputField} />
        <TouchableOpacity style={styles.close} onPress={() => navigation.navigate('Home')}>
          <XMarkIcon size={25} color='white' />
        </TouchableOpacity>
      </View>

      {results.length > 0 ? (
          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}} style={{marginVertical: 8}}>
          <Text style={{fontWeight: '900', color: 'white', marginVertical: 16}}>Results: {results.length}</Text>
          <View style={styles.list}>
              {
                results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
                        <View style={{display: 'flex', gap: 5}}>
                          <Image source={require('../../assets/starwars.jpg')} style={styles.imageContainer} />
                          <Text style={{color: 'white', fontWeight: 'semibold', marginBottom: 16}}>{movieName.length > 20 ? movieName.slice(0,20)+'...' : movieName}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
          </View>
          </ScrollView>
      ): (
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>No Results Found!</Text>
        </View>
      )}

      
    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: '#9CA3AF'
  },
  inputField: {
    padding:  16,
    flex: 1,
    fontWeight: '700',
    color: 'white',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#9CA3AF'
  },
  close: {
    padding: 16,
    margin: 4,
    backgroundColor: '#6B7280',
    borderRadius: 50
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  imageContainer: {
    width: width * 0.45,
    height: height * 0.3,
    borderRadius: 10
  }
});