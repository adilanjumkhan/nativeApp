import {PlaceType} from '../screens/MyPlaces';
import {MapCoordinates} from './MapTypes';

export type RootStackParamList = {
  MyPlaces: {infoAdded?: PlaceType};
  Form: {mapCoordinates?: MapCoordinates};
  Map: undefined;
};
