import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS == 'ios';

const movieName = 'Ant Man'

function MovieScreen() {
  const { params: item } = useRoute();
  
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);

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

        <View style={{marginTop: 16}}>
          <Image source={require('../../assets/starwars.jpg')} style={styles.imageStyle} />
          <LinearGradient 
            colors={['transparent', 'rgba(10,10,10,0.9)', 'rgba(23,23,23,1)']}
            style={styles.gradientStyle}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
          />
        </View>

        <View style={styles.movieDescription}>
          <Text style={styles.movieHeading}>{movieName}</Text>
        </View>

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
    movieDescription: {
      marginTop: height * -(0.1)
    },
    movieHeading: {
      fontSize: 32,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold'
    }
});
