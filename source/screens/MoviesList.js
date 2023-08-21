import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import { IMAGE_BASE_URL } from '../constants';
import { useList, useHandleSearch } from './hooks';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    useList({ setIsLoading, setIsError, setMovies });
  }, []);

  const renderMovie = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}/${item.poster_path}` }}
        style={styles.moviePoster}
      />
      <View style={styles.movieDetails}>
        <Text style={[styles.movieTitle, styles.centerTitle]}>{item.title}</Text>
        <Text style={styles.movieReleaseDate}>{`Release Date: ${item.release_date}`}</Text>
        <Text style={styles.movieOverview}>{item.overview}</Text>
      </View>
    </View>
  );

  if(isError) {
    return <View style={styles.centerTitle}>
    <Text>{'Error Loading Data'}</Text>
  </View>
  }

  if(isLoading) {
    return <View style={styles.centerTitle}>
      <Text>{'Loading...'}</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{'Search Movie'}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a movie..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={() => useHandleSearch({searchQuery, setIsLoading, setIsError, setMovies })}
      />
      <Text style={styles.movieTitle}>{'Popular Movies'}</Text>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={5}
        windowSize={4}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  centerTitle: {
    justifyContent: 'center',
    alignSelf:'center'
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  movieContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  moviePoster: {
    width: "40%",
    height: 200,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf:'center'
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  movieReleaseDate: {
    marginBottom: 4,
    justifyContent: 'center',
    alignSelf:'center'
  },
  movieOverview: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignSelf:'center',
  }
});

export default MoviesList;
