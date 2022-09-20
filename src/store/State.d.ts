import { HueState } from './hue';
import { WeatherState } from './weather';
import { WebPageState } from './webpages';
import { PlexState } from './plex';
export interface AppStore {
  weather?: WeatherState;
  hue?: HueState;
  webpages?: WebPageState;
  plex?: PlexState;
}
