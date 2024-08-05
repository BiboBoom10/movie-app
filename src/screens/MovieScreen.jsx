import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';

const { width, height } = Dimensions.get('window');

const ios = Platform.OS == 'ios';

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
        marginTop: Platform.OS === ios ? 0 : 12
    }
});
