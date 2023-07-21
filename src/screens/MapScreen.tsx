import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet} from 'react-native';
import MapView, {MapPressEvent, Marker} from 'react-native-maps';
import {MapCoordinates} from '../types/MapTypes';
import {RootStackParamList} from '../types/ScreenTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MapScreen = (): JSX.Element => {
  const [coordinates, updateCoordinates] = useState<MapCoordinates>();
  const navigation: StackNavigationProp<RootStackParamList, 'Map'> =
    useNavigation();

  const selectedLocationHandler = (event: MapPressEvent) => {
    updateCoordinates({
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude,
    });
  };
  const saveLocation = useCallback(() => {
    if (!coordinates) {
      Alert.alert(
        'No Location Picked',
        'You have to picked location first by tapping on the map',
      );
    } else {
      navigation.navigate('Form', {mapCoordinates: coordinates});
    }
  }, [coordinates, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: ({tintColor}) => {
        return (
          <Pressable onPress={saveLocation}>
            <Icon name="save" color={tintColor} style={styles.saveIcon} />
          </Pressable>
        );
      },
    });
  }, [navigation, saveLocation]);

  return (
    <MapView
      style={styles.root}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={selectedLocationHandler}>
      {coordinates && (
        <Marker
          coordinate={{
            latitude: coordinates.lat,
            longitude: coordinates.long,
          }}
        />
      )}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  saveIcon: {
    fontSize: 22,
    paddingRight: 18,
  },
});
