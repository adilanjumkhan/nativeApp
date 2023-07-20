import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {Colors} from '../Constants/Colors';
import CustomButton from '../components/CustomButton';
import {launchCamera} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const InputForm = (): JSX.Element => {
  const [imageURI, updateImageUri] = useState<string>();
  const requestCameraPermission = async () => {
    const cameraPermissionStatus = await request(PERMISSIONS.IOS.CAMERA);
    if (
      cameraPermissionStatus === RESULTS.GRANTED ||
      cameraPermissionStatus === RESULTS.LIMITED
    ) {
      console.log(cameraPermissionStatus);
    } else {
      console.log('Denied permission');
    }
  };

  const triggerCamera = async () => {
    const result = await launchCamera({
      quality: 0.5,
      mediaType: 'photo',
    });
    if (result.assets) {
      updateImageUri(result.assets[0].uri);
    }
  };
  useEffect(() => {
    requestCameraPermission();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.parentContainer}>
        <View style={styles.tittleContainer}>
          <Text style={styles.tittleTxt}>Input Form</Text>
          <View style={styles.dash} />
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.tittleLabel}>Title:</Text>
            <TextInput
              placeholder="Enter title for location"
              placeholderTextColor={Colors.GREY}
              style={styles.tittleInput}
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
              <CustomButton name="capture" onPressHandler={triggerCamera} />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.tittleLabel}>Your Location:</Text>
            <View style={styles.captureImage}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  No Location Given yet
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton name="Open Map" onPressHandler={triggerCamera} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tittleContainer: {
    marginVertical: 10,
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
    marginHorizontal: '35%',
  },
  captureImageStyle: {
    height: '100%',
    width: '100%',
  },
});
