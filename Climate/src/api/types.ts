export interface Coordinates{
    lat: number;
    lon: number;
}

export interface WeatherCondition{
    id:number;
    main: string;
    description: string,
    icon:string;
}

export interface WeatherData{
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds:{
        all:number;
    }
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string
}

export interface ForeCastData{
    list: Array<{
        dt:number,
        main:WeatherData['main'],
        weather: WeatherData['weather'],
        wind: WeatherData['wind'],
        dt_text:string
    }>

    city:{
        name:String;
        country:String;
        sunrise:number;
        sunset:number;

    }
}

export interface GeocodingResponse{
    name:String;
    local_name?:Record<string,string >;
    lat :number;
    lon:number;
    country:String;
    state?:String;
    
}