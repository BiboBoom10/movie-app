import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dimensions, Platform, ScrollView, Text } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../../api/moviedb';

const { height, width } = Dimensions.get('window');

const ios = Platform.OS == 'ios';

const personName = 'Ant Man'

function PersonScreen() {

    const { params: item } = useRoute();

    const navigation = useNavigation();

    const [favorite, setFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [person, setPerson] = useState({});

    useEffect(() => {
      setLoading(true);
      getPersonDetails(item.id);
      getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async (id) => {
      const data = await fetchPersonDetails(id);
      if (data) setPerson(data)
      setLoading(false);
    }

    const getPersonMovies = async (id) => {
      const data = await fetchPersonMovies(id);
      if (data && data.cast) setPersonMovies(data.cast)
      setLoading(false);
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFavorite(!favorite)}>
            <HeartIcon size={30} color={favorite ? "red" : "white"} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <View>
              <View style={styles.imageContainer}>
                <View style={styles.imageResizer}>
                  <Image
                    style={styles.imageSize}
                    // source={require("../../assets/starwars.jpg")}
                    source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                  />
                </View>
              </View>
            </View>

            <View style={styles.movieTitle}>
              <Text style={styles.movieHeading}>{person?.name}</Text>
              <Text style={{ color: "gray" }}>{person?.place_of_birth}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#9CA3AF",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#D1D5DB" }}>
                  Gender
                </Text>
                <Text style={{ color: "#D1D5DB" }}>{person?.gender==1 ? 'Female' : 'Male' }</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#9CA3AF",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#D1D5DB" }}>
                  Birthday
                </Text>
                <Text style={{ color: "#D1D5DB" }}>{person?.birthday}</Text>
              </View>
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: "#9CA3AF",
                  paddingHorizontal: 16,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#D1D5DB" }}>
                  Known For
                </Text>
                <Text style={{ color: "#D1D5DB" }}>{person?.known_for_department}</Text>
              </View>
              <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ fontWeight: "bold", color: "#D1D5DB" }}>
                  Popularity
                </Text>
                <Text style={{ color: "#D1D5DB" }}>{person?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.bio}>Biography</Text>

              <Text style={styles.description}>
                {person?.biography}
              </Text>
            </View>

            <MovieList title={"Movies"} data={personMovies} hideSeeAll={true} />
          </View>
        )}
      </ScrollView>
    );
}

export default PersonScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e201d'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginTop: Platform.OS === ios ? 0 : 55
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1
    },
    imageSize: {
        height: height * 0.4,
        // width: width * 0.6,
        width: '100%'
    },
    imageResizer: {
        borderWidth: 2,
        borderRadius: 300,
        height: 300,
        width: 300,
        borderColor: 'white',
        overflow: 'hidden',
    },
    movieTitle: {
        marginVertical: 20,
        display: 'flex',
        alignItems: 'center'
      },
      movieHeading: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
      },
      detailsContainer: {
        marginHorizontal: 4,
        padding: 8,
        backgroundColor: '#363835',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 200,
        flexWrap: 'wrap'
      },
      bio: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
      },
      description: {
        letterSpacing: 1,
        fontSize: 14,
        color: '#D1D5DB',
        margin: 8,
        textAlign: 'center',
        fontWeight: '300'
      },
      bioContainer: {
        marginVertical: 20
      }
});

