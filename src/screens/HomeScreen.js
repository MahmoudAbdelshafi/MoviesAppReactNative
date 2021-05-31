import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from 'axios'


const imagesBaseURL = 'https://image.tmdb.org/t/p/w500'

const Item = ({ title, poster_path, overview, release_date }) => (
  <View style={styles.item}>
    <View style={{ height: 180, display: 'flex', flexDirection: 'row' }}>
      <Image style={{ height: 170, width: 140, marginRight: 16, marginLeft: 16 }} source={{ uri: imagesBaseURL + poster_path }} />
      <View style={{ display: 'flex', marginRight: 16, height: 100, width: 230 }}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.label}>Date: {release_date}</Text>
        <Text style={styles.label} >{overview}</Text>
      </View>
    </View>
  </View>
);

const HomeScreen = (props) => {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  var searchingValue = '';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatListItem}
      key={item.id}
      onPress={() => selectedIngredient(item)}>
      <Item title={item.title} poster_path={item.poster_path} overview={item.overview} release_date={item.release_date} />

    </TouchableOpacity>

  );

  const selectedIngredient = (item) => {
    props.navigation.navigate('Details', { item: item })
    console.log('selecionado: ' + item.title);
  };

  const renderFooter = () => {
    return (
      isLoading ?
        (<View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>) : null
    )
  };

  const handelLoadMore = () => {
    setPageCurrent(pageCurrent + 1)
    setIsLoading(true)
  }

  const getData = (searchText = 'The') => {

    setIsLoading(true)
    const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=840d9830ce5ea69425c3f231dbc1f7b3&language=en-US&page=${pageCurrent}&query={${searchText}}`
    fetch(apiURL).then
    axios.get(apiURL).then((res) => {
      //setMovies(res.data.results)
      //setMovies(data.concat(res.data.results)
      if (pageCurrent === 1) {
        setMovies(res.data.results)
      } else {
        setMovies([...movies, ...res.data.results])
      };
      setIsLoading(false)
    })
  };

  useEffect(() => {
    setIsLoading(true)
    getData()
    return () => {

    }
  }, [pageCurrent])
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 70, backgroundColor: 'black', justifyContent: 'center', paddingHorizontal: 10 }}>
        <View style={{ height: 45, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
          <TextInput placeholder="search" style={{ width: '100%', fontSize: 24, marginLeft: 15 }} onChangeText={value => {
            setMovies([])
            setPageCurrent(1)
            getData(value), searchingValue = value
          }} />
        </View>

      </View>
      <FlatList
        style={{ marginTop: 5, marginBottom: 30 }}

        data={movies}
        renderItem={renderItem}

        keyExtractor={item => item.id + ''}
        //ListFooterComponent={renderFooter}
        onEndReached={handelLoadMore}

        onEndReachedThreshold={0.5}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "bold"
  },
  label: {
    fontSize: 15,
    marginTop: 10,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center'
  },
});

export default HomeScreen;
