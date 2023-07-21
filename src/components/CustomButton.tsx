import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

type CustomButtonProps = {
  name: string;
  onPressHandler: () => void;
  iconName: string;
};

const CustomButton = (prop: CustomButtonProps) => {
  return (
    <Pressable onPress={prop.onPressHandler} style={styles.container}>
      <Icon name={prop.iconName} style={styles.iconStyle} />
      <Text style={styles.buttonTxt}>{prop.name}</Text>
    </Pressable>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255,0.9)',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  buttonTxt: {
    color: Colors.PRIMARY,
    fontSize: 14,
  },
  iconStyle: {
    color: Colors.PRIMARY,
    fontSize: 18,
    paddingHorizontal: 5,
  },
});
