import { useState, useEffect } from "react";
import type { Coordinates } from "@/api/types";
// Step 1: Define the shape of the location data state
interface GeolocationState {

    //will store {lat, lon } if location is found
    coordinates: Coordinates | null;

    //will store error message is something gone wrong
    error: string | null;

    //loading state while fetching the location
    isLoading: boolean
}

//step 2: define the custom hook
export function useGeolocation() {

    //step 3: Initilize the state with default values
    const [locationData, setlocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    //step 4: function to get the user's location 
    const getLocation = () => {
        //Reset loading and error befor fetching
        setlocationData((prev) => ({ ...prev, isLoading: true, error: null }));
        
        // step 5: Check if the browser supports geolocation
        if (!navigator.geolocation) {
            setlocationData({
                coordinates: null,
                error: 'Geolocation is not supported by your browser',
                isLoading: false,
            });
            return;
        }

        //step 6: Reqest loction from browser
        navigator.geolocation.getCurrentPosition(
            //Succes callback
            (position) => {
                setlocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    },
                    error: null,
                    isLoading: false,
                });
            },

            //error callback
            (error) => {
                let errorMessage: string;

                //map the browser error code to readable message

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "location premission denied. Please enable location access";
                        break;

                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "location information is unavailable";
                        break;

                    case error.TIMEOUT:
                        errorMessage = "The request to get user location timed out";
                        break;

                    default:
                        errorMessage = "An unknow error occurred";
                }
                setlocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            },

            //step 7: Options for geolocation request
            {
                enableHighAccuracy: true,//try to get the most accurate position
                timeout: 5000,// wait at most 5 second
                maximumAge: 0,// don't use cached location
            }
        );
    };

    //step 8: automatically fetch location to first render
    useEffect(() => {
        getLocation();
    }, []);

    //step 9: Return state + method for manual refresh

    return {
        ...locationData,//Coordinates, error , isloading
        getLocation,//allows re-fetching location on demand
    };
}