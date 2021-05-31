import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ImageDetail from '../Components/ImageDetail';

const DetailsScreen = (prop) => {
    const imagesBaseURL = 'https://image.tmdb.org/t/p/w500'
    let movie = prop.navigation.state.params.item
    console.log(movie);
    console.log('********************************')
    return (
        <View>
            <View styles={{
                flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'
                , marginTop: 10
            }}>
                {/* <ImageDetail title="Forest" />
        <ImageDetail title="Beach" />
        <ImageDetail title="Mountain" /> */}
                <Image style={{
                    height: 500, width: 400, alignContent: 'center', alignSelf: 'center'
                }} source={{ uri: imagesBaseURL + movie.poster_path }} />
            </View>

            <View>
                <Text style={styles.text}>  {movie.title}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
            </View>
        </View>)

};



const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0099",
        marginTop: 10,
    },
    label: {
        fontSize: 15,
        marginTop: 10,
    },
    overview: {
        marginTop: 15,
        marginLeft: 15,
        textAlign: 'left',
        fontSize: 14,
    },
});

const style = StyleSheet.create({});
export default DetailsScreen;