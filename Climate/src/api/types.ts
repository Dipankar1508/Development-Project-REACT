export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type?: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
}

export interface ForeCastData {
    list: Array<{
        dt: number;
        main: MainWeather;
        weather: WeatherCondition[];
        wind: WeatherData["wind"];
        dt_txt: string; 
    }>;
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface GeocodingResponse {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}
