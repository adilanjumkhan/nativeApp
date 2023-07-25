import React, {useCallback, useEffect, useState} from 'react';
import InitialStyle from './intialStyleScreen';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
import {Colors} from '../Constants/Colors';

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

  const updateData = useCallback((newPlace: PlaceType) => {
    updateMyPlaces(prevPlaces => [...prevPlaces, newPlace]);
  }, []);

  useEffect(() => {
    const alreadyExist = (newPlace: PlaceType): boolean => {
      return myPlaces.some(
        place =>
          place.title === newPlace.title &&
          place.imageUri === newPlace.imageUri,
      );
    };
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
      if (route.params.infoAdded) {
        if (!alreadyExist(route.params.infoAdded)) {
          updateData(route.params.infoAdded);
        }
      }
    }
  }, [
    isFocussed,
    myPlaces,
    navigateToForm,
    navigation,
    route.params,
    updateData,
  ]);

  return (
    <InitialStyle>
      <View style={styles.root}>
        {myPlaces.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.noInfoTxt}>No places added yet !</Text>
          </View>
        ) : (
          <View style={styles.rootContainer}>
            <FlatList
              data={myPlaces}
              renderItem={itemData => {
                return (
                  <View style={styles.dataContainer}>
                    <Image
                      source={{uri: itemData.item.imageUri}}
                      style={styles.imageStyle}
                    />
                    <Text style={styles.titleStyle}>
                      Title: {itemData.item.title}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={item => {
                return item.imageUri + item.title;
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
  rootContainer: {
    flex: 1,
    marginTop: 20,
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
  dataContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  imageStyle: {
    width: 80,
    height: 40,
    borderRadius: 10,
  },
  titleStyle: {
    fontSize: 16,
    color: Colors.PRIMARY,
    margin: 10,
  },
});
