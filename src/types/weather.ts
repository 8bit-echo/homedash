export interface WeatherPeriod {
  number:           number;
  name:             string;
  startTime:        Date;
  endTime:          Date;
  isDaytime:        boolean;
  temperature:      number;
  temperatureUnit:  "F" | "C";
  temperatureTrend: null | string;
  windSpeed:        string;
  windDirection:    string;
  icon:             string;
  shortForecast:    string;
  detailedForecast: string;
}
