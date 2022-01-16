import { createContext, Dispatch, SetStateAction, useState } from "react";
import { api } from '@/services/api'
import AnimeDTO from '@/interface/AnimeDTO'
import SeasonDTO from "@/interface/SeasonDTO";

interface AnimeContextType {
    featuredState: [any, Dispatch<any>];
    loadAll: () => Promise<void>;
    searchState: [string, Dispatch<SetStateAction<string>>];
    animeData: AnimeDTO[] | null;
    // seasonsData: SeasonDTO[] | null;
    // loadSeasons: (animeId: string) => Promise<void>;
}

export const AnimeContext = createContext({} as AnimeContextType)

export function AnimeProvider({ children }) {
    const [animeData, setAnimeData] = useState([]);
    // const [seasonsData, setSeasonsData] = useState([]);
    const featuredState = useState(null);
    const [, setFeatured] = featuredState;
    const searchState = useState('');

    async function loadAll() {
        const responsedata = await api.get('animes');
        const [jsonAnime] = responsedata.data;

        setAnimeData(responsedata.data);
        setFeatured(jsonAnime);
    }

    // async function loadSeasons(animeId: string) {
    //     const responsedata = await api.get(`animes/${animeId}/seasons`);
    //     const [jsonSeasons] = responsedata.data;
    //     setSeasonsData(jsonSeasons);
    //     console.log(seasonsData);
    // }

    return (
        <AnimeContext.Provider value={{ loadAll, featuredState, searchState, animeData }}>
            {children}
        </AnimeContext.Provider>
    )
}