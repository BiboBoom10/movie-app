import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native';
import TrendingMovies from '../components/TrendingMovies';
import { useState } from 'react';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviedb';

function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('Got trending movies', data);

    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('Got upcoming movies', data);

    if(data && data.results) setUpcoming(data.results);
    // setLoading(false);
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('Get top rated movies', data);

    if(data && data.results) setTopRated(data.results);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.safeView}>
          <StatusBar style='light'/>
          <View style={styles.headerSection}>
            <TouchableOpacity>
              <Bars3CenterLeftIcon size={30} color='white' strokeWidth={2} />
            </TouchableOpacity>
            <Text style={{fontSize: 24, color: 'white'}}>
              <Text style={{fontSize: 24, color: '#eab308'}}>M</Text>
              ovies
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} >
              <MagnifyingGlassIcon size={28} color='white' strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
          { trending.length > 0 && <TrendingMovies data={trending} />}

          <MovieList title='Upcoming Movies' data={upcoming} />

          <MovieList title='Top Rated Movies' data={topRated} />
          </ScrollView>
        )}

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#1e201d'
  },
  safeView: {
    marginBottom: '0.25rem'
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8
  }
});