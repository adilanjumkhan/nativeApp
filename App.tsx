/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientColors} from './src/Constants/Colors';
import InputForm from './src/screens/FormScreen';

function App(): JSX.Element {
  return (
    <ImageBackground
      source={require('./src/asserts/plain.jpg')}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
      style={styles.root}>
      <LinearGradient
        colors={[GradientColors.LIGHTER, GradientColors.DARKER]}
        style={styles.gradientStyles}>
        <SafeAreaView style={styles.root}>
          <InputForm />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

export default App;

const styles = StyleSheet.create({
  gradientStyles: {
    flex: 1,
  },
  imageStyle: {
    height: '90%',
    width: '100%',
    marginVertical: '10%',
  },
  root: {
    flex: 1,
  },
});
