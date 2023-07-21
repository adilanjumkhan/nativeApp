import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Colors} from '../Constants/Colors';
import CustomButton from '../components/CustomButton';
import {launchCamera} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {accessToken, baseUrl} from '../Constants/Maps';
import {geoJsonType} from '../types/CameraResponse';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../types/ScreenTypes';
import InitialStyle from './intialStyleScreen';

const InputForm = (): JSX.Element => {
  const [imageURI, updateImageUri] = useState<string>();
  const [title, updateTitle] = useState<string>('');
  const [mapURI, updateMapURI] = useState<string>();
  const [lat, updateLat] = useState<number>();
  const [long, updateLong] = useState<number>();
  const [cameraPermissionStatusTracker, updateCameraPermissionStatusTracker] =
    useState<boolean>(false);

  const [
    locationPermissionStatusTracker,
    updateLocationPermissionStatusTracker,
  ] = useState<boolean>(false);

  const navigation: StackNavigationProp<RootStackParamList, 'Form'> =
    useNavigation();
  const route: RouteProp<RootStackParamList, 'Form'> = useRoute();
  const isFocussed = useIsFocused();

  const requestCameraPermission = async () => {
    const cameraPermissionStatus = await request(PERMISSIONS.IOS.CAMERA);
    if (
      cameraPermissionStatus === RESULTS.GRANTED ||
      cameraPermissionStatus === RESULTS.LIMITED
    ) {
      updateCameraPermissionStatusTracker(true);
    } else {
      updateCameraPermissionStatusTracker(false);
      console.log('Denied Camera permission');
    }
  };

  const requestLocationPermission = async () => {
    const locationPermissionStatus = await request(
      PERMISSIONS.IOS.LOCATION_ALWAYS,
    );

    if (
      locationPermissionStatus === RESULTS.GRANTED ||
      locationPermissionStatus === RESULTS.LIMITED
    ) {
      updateLocationPermissionStatusTracker(true);
    } else {
      console.log('Denied Location permission');
      updateLocationPermissionStatusTracker(false);
    }
  };

  const triggerCamera = async () => {
    if (cameraPermissionStatusTracker) {
      const result = await launchCamera({
        quality: 0.5,
        mediaType: 'photo',
      });
      if (result.assets) {
        updateImageUri(result.assets[0].uri);
      }
    } else {
      Alert.alert(
        'Camera permission Denied',
        'Camera permission is not granted',
      );
    }
  };
  const updateMap = useCallback((latitude: number, longitude: number) => {
    const geoJson: geoJsonType = {
      type: 'Point',
      coordinates: [latitude, longitude],
    };
    const mapURL = `${baseUrl}/geojson(${JSON.stringify(
      geoJson,
    )})/${longitude},${latitude},12/500x300?access_token=${accessToken}`;
    console.log(mapURL);
    updateMapURI(mapURL);
    updateLat(latitude);
    updateLong(longitude);
  }, []);

  const triggerMapForUser = () => {
    if (locationPermissionStatusTracker) {
      Geolocation.getCurrentPosition(async info => {
        const latitude = info.coords.latitude;
        const longitude = info.coords.longitude;
        updateMap(latitude, longitude);
      });
    }
  };

  const moveToMap = () => {
    navigation.navigate('Map');
  };
  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission();
    if (route.params !== undefined && isFocussed) {
      console.log('Renders');
      if (route.params.mapCoordinates !== undefined) {
        console.log('Calling Function');
        updateMap(
          route.params.mapCoordinates.lat,
          route.params.mapCoordinates.long,
        );
      }
    }
  }, [isFocussed, route.params, updateMap]);
  const addDataToList = () => {
    console.log('addDataToList');
    if (lat !== undefined && long !== undefined && title !== '') {
      navigation.navigate('MyPlaces', {
        infoAdded: {
          geoStats: {lat: lat, long: long},
          title: title,
          imageUri:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fwolf%2F&psig=AOvVaw2H7op0xPeeUPUzm-vgSm1U&ust=1690034887596000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCO99n8n4ADFQAAAAAdAAAAABAE',
        },
      });
    } else {
      Alert.alert('Error', 'Fill the form to proceed');
    }
  };
  console.log(mapURI);
  return (
    <InitialStyle>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.parentContainer}>
          {/* <View style={styles.tittleContainer}>
            <Text style={styles.tittleTxt}>Input Form</Text>
            <View style={styles.dash} />
          </View> */}
          <View>
            <View style={styles.container}>
              <Text style={styles.tittleLabel}>Title:</Text>
              <TextInput
                placeholder="Enter title for location"
                placeholderTextColor={Colors.GREY}
                style={styles.tittleInput}
                value={title}
                onChangeText={updateTitle}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.tittleLabel}>Captured Image:</Text>
              <View style={styles.captureImage}>
                <View style={styles.descriptionContainer}>
                  {imageURI ? (
                    <Image
                      source={{uri: imageURI}}
                      style={styles.captureImageStyle}
                    />
                  ) : (
                    <Text style={styles.descriptionText}>
                      No Image Captured yet
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  name={imageURI ? 'Retake' : 'Capture'}
                  onPressHandler={triggerCamera}
                  iconName="camera"
                />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.tittleLabel}>Your Location:</Text>
              <View style={styles.captureImage}>
                <View style={styles.descriptionContainer}>
                  {mapURI === undefined ? (
                    <Text style={styles.descriptionText}>
                      No Location Given yet
                    </Text>
                  ) : (
                    <Image
                      source={{
                        uri: mapURI,
                      }}
                      style={styles.mapImage}
                    />
                  )}
                </View>
              </View>
              <View style={styles.buttonContainerForMaps}>
                <CustomButton
                  name="Location"
                  onPressHandler={triggerMapForUser}
                  iconName="location"
                />
                <CustomButton
                  name="Open Map"
                  onPressHandler={moveToMap}
                  iconName="map"
                />
              </View>
            </View>
          </View>
          <View style={styles.saveBtn}>
            <CustomButton
              name="Save Instance"
              onPressHandler={addDataToList}
              iconName="save"
            />
          </View>
        </View>
      </ScrollView>
    </InitialStyle>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tittleContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  tittleTxt: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
  dash: {
    marginTop: 8,
    backgroundColor: 'white',
    height: 4,
    width: '25%',
    borderRadius: 4,
  },
  container: {
    paddingHorizontal: '5%',
  },
  tittleLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  tittleInput: {
    backgroundColor: 'rgba(255, 255, 255,0.9)',
    padding: 12,
    borderRadius: 12,
    color: Colors.SECONDARY,
  },
  captureImage: {
    height: 150,
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255,0.9)',
    overflow: 'hidden',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    color: Colors.GREY,
    fontWeight: '400',
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: '30%',
  },
  captureImageStyle: {
    height: '100%',
    width: '100%',
  },
  mapImage: {
    height: '100%',
    width: '100%',
  },
  buttonContainerForMaps: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 35,
  },
  saveBtn: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});
