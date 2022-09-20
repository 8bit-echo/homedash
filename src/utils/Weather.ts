// 40.002869, -105.252971
// {cwa: 'BOU', gridX: 54, gridY: 73}

import { WeatherPeriod } from '../types/weather';

interface WeatherInitObject {
  lat?: number;
  long?: number;
  cwa?: string;
  gridX?: number;
  gridY?: number;
}

export default class USWeather {
  baseURL: string;
  lat?: number;
  long?: number;
  cwa?: string;
  gridX?: number;
  gridY?: number;

  constructor({ cwa, gridX, gridY, lat, long }: WeatherInitObject) {
    // require either lat/long or cwa/gridX/gridY
    if (!cwa || !gridX || !gridY) {
      if (!lat || !long) {
        throw new Error('Must provide either lat/long or cwa/gridX/gridY');
      }
    }

    this.lat = lat;
    this.long = long;
    this.baseURL = 'https://api.weather.gov';

    this.cwa = cwa;
    this.gridX = gridX;
    this.gridY = gridY;
  }

  async init() {
    if (!this.cwa || !this.gridX || !this.gridY) {
      const { cwa, gridX, gridY } = await this.getOffice();
      this.cwa = cwa;
      this.gridX = gridX;
      this.gridY = gridY;
    }
  }

  async getOffice() {
    const response = await fetch(`${this.baseURL}/points/${this.lat},${this.long}`);
    const json = await response.json();
    const { cwa, gridX, gridY } = json.properties;
    return { cwa, gridX, gridY };
  }

  async getForecast(): Promise<WeatherPeriod[]> {
    const response = await fetch(`${this.baseURL}/gridpoints/${this.cwa}/${this.gridX},${this.gridY}/forecast?units=si`, {
      headers: {
        Accept: 'application/ld+json',
      },
    });

    const json = await response.json();
    return json.periods;
  }
}
