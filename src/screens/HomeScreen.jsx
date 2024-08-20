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

function HomeScreen() {

  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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
          <TrendingMovies data={trending} />

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
    marginHorizontal: 8,
    marginVertical: 8
  }
});