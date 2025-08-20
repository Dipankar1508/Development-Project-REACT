import React from 'react'
import type { GeocodingResponse, WeatherData } from '@/api/types';
import { Card, CardContent } from './ui/card';
import { ArrowUp } from 'lucide-react';

interface currentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;

}

const CurrentWeather = ({ data, locationName }: currentWeatherProps) => {

    const {
        weather: [currentWeather],
        main: { temp, feels_like, temp_min, temp_max, humidity },
        wind: { speed },
    } = data;

    const formatTemp = (temp: number) => `${Math.round(temp)}°C`

    return (
        <div>
            <Card className='overflow-hidden'>
                <CardContent className='p-6'>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <h2 className='text-2xl font-bold tracking-tight'>
                                    {locationName?.name}
                                </h2>
                                {
                                    locationName?.state && (
                                        <span className='text-sm text-muted-foreground'>
                                            , {locationName.state}
                                        </span>
                                    )
                                }
                            </div>
                            <p className='text-sm text-muted-foreground'>
                                {locationName?.country}
                            </p>

                            <div className="flex items-center gap-2">
                                <p className='text-7xl font-bold tracking-tighter'>
                                    {
                                        formatTemp(temp)
                                    }
                                </p>
                                <div className="space-y-1">
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        Feels like {formatTemp(feels_like)};
                                    </p>
                                    <div className="flex gap-2 text-sm font-medium">
                                        <span className='flex items-center gap-1 text-red-500'>
                                            <ArrowUp className='h-3 w-3' />
                                            {
                                                formatTemp(temp_max)
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>
    )
}

export default CurrentWeather