import React, {ReactNode} from 'react';
import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientColors} from '../Constants/Colors';
type propType = {
  children: ReactNode;
};

const InitialStyle = (prop: propType): JSX.Element => {
  return (
    <ImageBackground
      source={require('../asserts/plain.jpg')}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
      style={styles.root}>
      <LinearGradient
        colors={[GradientColors.LIGHTER, GradientColors.DARKER]}
        style={styles.gradientStyles}>
        <SafeAreaView style={styles.root}>{prop.children}</SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default InitialStyle;

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
