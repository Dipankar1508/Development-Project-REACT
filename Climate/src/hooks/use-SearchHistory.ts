import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";

interface searchHistoryItem{
    id: string;
    query : string;
    lat : number;
    lon : number;
    name : string;
    country : string;
    state? : string;
    searchedAt : number;
}

export function useSearchHistory(){
    const [history , setHistory]= useLocalStorage<searchHistoryItem[]>(
        "search-history",
        []
    );
    const queryClient =useQueryClient();

    const historyQuery=useQuery({
        queryKey:["search-history"],
        queryFn:()=>history,
        initialData:history,
    });

    const addHistory=useMutation({
        mutationFn:async(
            search:Omit<searchHistoryItem,"id"|"searchedAt">,
        )=>{
            const newSearch:searchHistoryItem={
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now(),
            
            };
            const filterHistory=history.filter(
                (item=>!(item.lat===search.lat && item.lon===search.lon))
            )

            const newHistory=[newSearch,...filterHistory].slice(0,10);

            setHistory(newHistory);
            return newHistory;
        
        }
    });

    const clearHistory=useMutation({
        mutationFn:async()=>{
            setHistory([]);
            return [];
        },
        onSuccess:()=>{
            queryClient.setQueryData(["search-history"],[]);
        }
    });

    return {
        history:historyQuery.data??[],
        addHistory,
        clearHistory,
    }

}