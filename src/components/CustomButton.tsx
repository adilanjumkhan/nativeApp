import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../Constants/Colors';

type CustomButtonProps = {
  name: string;
  onPressHandler: () => void;
};

const CustomButton = (prop: CustomButtonProps) => {
  return (
    <Pressable onPress={prop.onPressHandler}>
      <View style={styles.container}>
        <Text style={styles.buttonTxt}>{prop.name}</Text>
      </View>
    </Pressable>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255,0.9)',
    borderRadius: 10,
  },
  buttonTxt: {
    color: Colors.PRIMARY,
    fontSize: 14,
  },
});
