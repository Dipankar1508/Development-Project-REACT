import CurrentWeather from "@/components/CurrentWeather";
import Weatherskeleton from "@/components/loading-skeleton";
import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useForecastQuery, useReserveGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"



const WeatherDashborad = () => {
    const {
        coordinates,
        error: locationError,
        isLoading: locationLoading,
        getLocation,
    } = useGeolocation();

    // console.log(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReserveGeocodeQuery(coordinates);
    console.log(locationQuery);


    const handleRefresh = () => {
        getLocation();

        if (coordinates) {
            // reload weather data
        }
    };
    if (locationLoading) {
        return <Weatherskeleton />;
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle> locationError</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button variant="outline" onClick={getLocation} className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>

                </AlertDescription>
            </Alert>
        );
    }


    if (!coordinates) {
        return (
            <Alert>
                <MapPin className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location asecss to see your location weather</p>
                    <Button variant={"outline"} onClick={getLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle> Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data . Please try again</p>
                    <Button variant="outline" onClick={getLocation} className="w-full">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <Weatherskeleton />
    }

    return (
        <>
            <div className="space-y-4">
                {/* Favorte class */}
                <div className="flex items-center justify-between ">
                    <h1 className="text-4xl font-bold tracking-tight">My Location</h1>
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={handleRefresh}
                        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                    >
                        <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
                    </Button>

                </div>
            </div>

            <div>
                <div>
                    {/* current weather */}
                    <CurrentWeather data={weatherQuery.data} locationName={locationName} />
                    {/* hourly weather */}
                </div>

                <div>
                    {/* Details */}
                    {/* Forecast */}
                </div>
            </div>
        </>
    );
};

export default WeatherDashborad