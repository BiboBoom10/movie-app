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
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS === 'ios';

const movieName = 'Ant Man'

function MovieScreen() {
  const { params: item } = useRoute();
  
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log('Movie Details: ', data.id);
    if(data) setMovie(data);
    setLoading(false);
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);

    if(data && data.cast) setCast(data.cast)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    if(data && data.results) setSimilarMovies(data.results);
  }

  useEffect(() => {
    // console.log('Movie Item: ', item.id);
    setLoading(true);

    getMovieDetails(item.id);

    getMovieCredits(item.id);

    getSimilarMovies(item.id);

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
            <Image source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}} style={styles.imageStyle} />
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
          <Text style={styles.movieHeading}>{movie?.title}</Text>
        </View>

        {
          movie?.id? (
            <Text style={{color: 'gray', textAlign: 'center'}}>{movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min </Text>
          ) : null
        }

        <View style={styles.categories}>
          {
            movie?.genres?.map((genre, index) => {
              let showDash = index + 1 != movie.genres.length;
              return(
                <Text key={index} style={styles.categoriesColor}>{genre?.name} {showDash ? '-': null}</Text>
              )
            })
          }
          
        </View>

        <Text style={styles.description}>
          {movie.overview}
        </Text>

        {cast.length > 0 &&<Cast navigation={navigation} cast={cast} />}

        {similarMovies.length > 0 && <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />}

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
        // paddingTop: 50, 
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginTop: Platform.OS === ios ? 0 : 15,
    },
    imageStyle: {
      width: width,
      height: height * 0.6,
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
