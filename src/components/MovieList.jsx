import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import starWarsImage from '../../assets/starwars.jpg'; 

const { height, width } = Dimensions.get('window');

function MovieList({title, data, hideSeeAll}) {

  let movieName = 'Ant Man';

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={{color: '#eab308'}}>See All</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 16}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                <View style={styles.movieCard}>
                  <Image source={starWarsImage} style={styles.imageCard} />
                  <Text style={{color: 'white'}}>{movieName.length > 14 ? movieName.slice(0, 14)+'...' : movieName}</Text>
                </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginHorizontal: 4
  },
  header: {
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  movieCard: {
    marginVertical: 8,
    marginRight: 4
  },
  imageCard: {
    borderRadius: 16,
    width: width * 0.3,
    height: height * 0.2
  }
});