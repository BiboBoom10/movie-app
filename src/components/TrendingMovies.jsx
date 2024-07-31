import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import starWarsImage from '../../assets/starwars.jpg'; 
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

function TrendingMovies({ data }) {

  const navigation = useNavigation();

  const handleClick = () => {
    // navigation.navigate('Movie', item)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <Carousel
        loop
        width={width * 0.95} // Adjust width if needed
        height={height * 0.4} // Adjust height if needed
        autoPlay={false}
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        scrollAnimationDuration={1000}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.card}>
        <Image
          source={starWarsImage}
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
  },
  title: {
    color: 'white',
    fontSize: 16,
    paddingBottom: 16,
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
