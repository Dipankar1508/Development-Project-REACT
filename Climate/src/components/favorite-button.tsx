import type { WeatherData } from "@/api/types";
import { useFavourite } from "@/hooks/use-favorite";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
    data: WeatherData; // Replace 'any' with the actual type of your data prop
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
    const { addFavourite, removeFavorite, isFavorite } = useFavourite();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from favorites`);
        } else {
            addFavourite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to favorites`);
        }
    };

    return (
        <Button
            variant={isCurrentlyFavorite ? "destructive" : "outline"}
            size="icon"
            onClick={handleToggleFavorite}
            className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />

        </Button>
    )
}
