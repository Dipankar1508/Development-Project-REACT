import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";

export interface FavouriteCity{
    id: string;
    name: string;
    lat: number;
    lon: number;
    country:string;
    state?:string;
    addedAt:number;
}

export function useFavourite(){
    const [favorite,setFavorite]=useLocalStorage<FavouriteCity[]>(
        "favourite",
        []
    
    );
    const queryClient=useQueryClient()
    const favouriteQuery=useQuery({
        queryKey:["favourite"],
        queryFn:()=>favorite,
        initialData:favorite,
        staleTime:Infinity,

    })

    const addFavourite=useMutation({
        mutationFn:async(city:Omit<FavouriteCity,"id"|"addedAt">)=>{
            const newFavorite:FavouriteCity={
                ...city,
                id:`${city.lat}-${city.lon}`,
                addedAt:Date.now(),
            }

            const exists=favorite.some((fav)=>fav.id===newFavorite.id)
            if(exists){
                return favorite
            }

            const newFavorites=[...favorite,newFavorite];
            setFavorite(newFavorites)
            return newFavorites;
        }
    });

    const removeFavorite=useMutation({
        mutationFn:async(cityId:string)=>{
            const newFavorites=favorite.filter((fav)=>fav.id!==cityId);
            setFavorite(newFavorites)
            return newFavorites;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["favourite"]});
        }
    });

    return{
        favorite:favouriteQuery.data,
        addFavourite,
        removeFavorite,
        isFavorite:(lat:number,lon:number)=>favorite.some((fav)=>fav.lat===lat && fav.lon===lon),
    };
}