import CurrentWeather from "@/components/CurrentWeather";
import HourTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WeatherDetails } from "@/components/weather-details";
import WeatherForeCast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordiates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordiates);
  const forecastQuery = useForecastQuery(coordiates);

  if (weatherQuery.error || forecastQuery.error)
    return (
      <div>
        <Alert variant="destructive">
          <AlertTriangle className="mr-2 h-4 w-4" />
          <AlertDescription>Failed to fetch weather data</AlertDescription>
        </Alert>
      </div>
    );

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName},{weatherQuery.data.sys.country}
        </h1>
      </div>

      {/* <div className="flex gap-2"></div> */}

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} />
          <HourTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-col-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForeCast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
