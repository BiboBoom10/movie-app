import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import starWarsImage from '../../assets/starwars.jpg'; 
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/moviedb';

const { height, width } = Dimensions.get('window');

function TrendingMovies({ data }) {

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', item)
  }

  return (
    <View>
        <Text style={styles.title}>Trending</Text>
        <View style={styles.container}>
          <Carousel
            loop
            width={width * 0.9} // Adjust width if needed
            height={height * 0.5} // Adjust height if needed
            autoPlay={false}
            data={data}
            renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
            scrollAnimationDuration={1000}
          />
        </View>
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  // console.log('item_potser_path:', item.poster_path);
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.card}>
        <Image
          source={{uri: image500(item.poster_path)}}
          style={styles.coverImage}
          resizeMode="cover"
        />
        {/* <Text style={styles.cardText}>Movie</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginHorizontal: 8,
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 16,
    textAlign: 'left',
    marginLeft: 20,
  },
  card: {
    backgroundColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden', // Ensure image does not overflow
    height: '100%', // Ensures image fits container
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
});

export default TrendingMovies;
