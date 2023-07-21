import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import InitialStyle from './intialStyleScreen';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/ScreenTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {MapCoordinates} from '../types/MapTypes';

export type PlaceType = {
  geoStats: MapCoordinates;
  imageUri: string;
  title: string;
};

const MyPlaces = () => {
  const navigation: StackNavigationProp<RootStackParamList, 'MyPlaces'> =
    useNavigation();
  const [myPlaces, updateMyPlaces] = useState<PlaceType[]>([]);

  const navigateToForm = useCallback(() => {
    navigation.navigate('Form', {mapCoordinates: undefined});
  }, [navigation]);
  const route: RouteProp<RootStackParamList, 'MyPlaces'> = useRoute();
  const isFocussed = useIsFocused();

  const updateData = useCallback(
    (newPlace: PlaceType) => {
      updateMyPlaces(prevPlaces => [...prevPlaces, newPlace]);
    },
    [updateMyPlaces],
  );

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: ({tintColor}) => {
        return (
          <Pressable onPress={navigateToForm}>
            <Icon name="add" color={tintColor} style={styles.saveIcon} />
          </Pressable>
        );
      },
    });
    if (isFocussed && route.params !== undefined) {
      if (route.params.infoAdded !== undefined) {
        console.log(route.params.infoAdded);
        updateData(route.params.infoAdded);
      }
    }
  }, [isFocussed, navigateToForm, navigation, route.params, updateData]);

  return (
    <InitialStyle>
      <View style={styles.root}>
        {myPlaces.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.noInfoTxt}>No places added yet !</Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <FlatList
              data={myPlaces}
              renderItem={item => {
                return <Text></Text>;
              }}
            />
          </View>
        )}
      </View>
    </InitialStyle>
  );
};

export default MyPlaces;

const styles = StyleSheet.create({
  saveIcon: {
    fontSize: 22,
    paddingRight: 18,
  },
  root: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInfoTxt: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
  },
});
