import React from 'react';    //before staring anything we need this

//we need view--div conatiner,Image--to display image,StyleSheet--helps to create styles,Text-- to write
// ActivityIndicator--to load the loading circle....
import { View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';

//main function call
export default function LoadingScreen() {
  return (
    <View style={styles.container}>                                                                                       
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#00768" />
      <Text style={styles.text}>Loading .....</Text>
    </View>
  );
}
//Styling of the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
