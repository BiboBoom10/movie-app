import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS === 'ios';

const movieName = 'Ant Man'

function MovieScreen() {
  const { params: item } = useRoute();
  
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Effect hook to handle updates based on item
  }, [item]);
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon size={30} color={favorite? 'red' : 'white'} />
          </TouchableOpacity>
        </View>

        {
          loading ? (
            <Loading />
          ) : (
            <View style={{marginTop: 16}}>
            <Image source={require('../../assets/starwars.jpg')} style={styles.imageStyle} />
            <LinearGradient 
              colors={['transparent', 'rgba(20,20,20,0.8)', 'rgba(32,32,32,1)']}
              style={styles.gradientStyle}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
            </View>
          )
        }

        <View style={styles.movieTitle}>
          <Text style={styles.movieHeading}>{movieName}</Text>
        </View>

        <Text style={{color: 'gray', textAlign: 'center'}}>Realeased . 2020 . 120 min </Text>

        <View style={styles.categories}>
          <Text style={styles.categoriesColor}>Action -</Text>
          <Text style={styles.categoriesColor}>Thrill -</Text>
          <Text style={styles.categoriesColor}>Comedy</Text>
        </View>

        <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis neque vel nisi tincidunt, condimentum maximus lorem volutpat. 
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
        Sed et tempus dolor. Aliquam sagittis varius bibendum. Integer ornare mattis blandit. Sed semper vel ipsum eget bibendum. 
        Integer tempor arcu finibus neque lacinia placerat. Phasellus dictum ligula eu sapien placerat elementum.
        </Text>

        <Cast navigation={navigation} cast={cast} />

        <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies } />

      </ScrollView>
    </SafeAreaView>
  );
}

export default MovieScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1e201d',
    },
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingTop: 50, 
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginTop: Platform.OS === ios ? 0 : 15
    },
    imageStyle: {
      width: width,
      height: height * 0.5,
    },
    gradientStyle: {
      height: height * 0.4,
      width: width,
      position: 'absolute',
      bottom: 0
    },
    movieTitle: {
      marginTop: height * -(0.1),
    },
    movieHeading: {
      fontSize: 40,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 8
    },
    categories: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: 8,
      gap: 4,
      marginTop: 8
    },
    categoriesColor: {
      color: '#9CA3AF',
      fontSize: 18
    },
    description: {
      letterSpacing: 1,
      fontSize: 14,
      color: 'white',
      margin: 8,
      textAlign: 'center',
      fontWeight: '300'
    }
});
