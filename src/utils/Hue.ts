import { ByteValue } from '../types/number';

interface HSLValue {
  sat?: ByteValue;
  bri?: ByteValue;
  hue?: number; // 0..65535
}

export default class Hue {
  ipAddress: string;
  username: string;
  baseAPIUrl: string;

  constructor(ipAddress: string, username: string) {
    this.ipAddress = ipAddress;
    this.username = username;
    this.baseAPIUrl = `https://${this.ipAddress}/api/${this.username}`;
  }

  private async queryHue(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${this.baseAPIUrl}${endpoint}`, options);
    const json = await response.json();
    return json;
  }

  async getLights() {
    return this.queryHue('/lights');
  }

  async getLight(id: number) {
    return this.queryHue(`/lights/${id}}`);
  }

  async turnLightOff(id: number) {
    return this.queryHue(`/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({
        on: false,
      }),
    });
  }

  async turnLightOn(id: number) {
    return this.queryHue(`/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({
        on: true,
      }),
    });
  }

  async setBulbState(id: number, { hue, sat, bri }: HSLValue) {
    return this.queryHue(`/lights/${id}/state`, {
      method: 'PUT',
      body: JSON.stringify({
        on: bri !== 0,
        hue,
        sat,
        bri,
      }),
    });
  } 

  async getGroups() {
    return this.queryHue('/groups');
  }

  async getGroup(id: number) {
    return this.queryHue(`/groups/${id}`);
  }

  async setGroupState(id: number, on: boolean, { hue, sat, bri }: HSLValue) {
    this.queryHue(`/groups/${id}/action`, {
      method: 'PUT',
      body: JSON.stringify({
        on,
        hue,
        sat,
        bri,
      }),
    });
  }

  /* 
  v2 API: https://{bridge}/clip/v2
  endpoints:
    /resource/light
    /resource/scene
    /resource/room
    /resource/zone
    /resource/bridge_home
    /resource/grouped_light
    /resource/device
    /resource/bridge
    /resource/device_power
    /resource/zigbee_connectivity
    /resource/zgp_connectivity
    /resource/motion
    /resource/temperature
    /resource/light_level
    /resource/button
    /resource/behavior_script
    /resource/behavior_instance
    /resource/geofence_client
    /resource/geolocation
    /resource/entertainment_configuration
    /resource/entertainment
    /resource/homekit
    /resource

  v1 API: https://{bridge}/api/{username}
*/
}
