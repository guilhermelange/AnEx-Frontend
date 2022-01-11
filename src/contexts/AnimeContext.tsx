import { createContext, Dispatch, SetStateAction, useState } from "react";
import { api } from '@/services/api'
import { listItems } from '@/utils/pagination'
import AnimeDTO from '@/interface/AnimeDTO'

interface AnimeContextType {
    featuredState: [any, Dispatch<any>];
    loadAll: () => Promise<void>;
    searchState: [string, Dispatch<SetStateAction<string>>];
    animeData: AnimeDTO[] | null;
}

export const AnimeContext = createContext({} as AnimeContextType)

export function AnimeProvider({ children }) {
    const [animeData, setAnimeData] = useState([])
    const featuredState = useState(null);
    const [, setFeatured] = featuredState;
    const searchState = useState('');

    async function loadAll() {
        const responsedata = await api.get('animes');
        const [jsonAnime] = responsedata.data;

        const listAnimes = [{
            slug: 'highlights',
            title: 'Destaques',
            items: { results: listItems(responsedata.data, 1, 10) }
        },
        {
            slug: 'onrise',
            title: 'Em Alta',
            items: { results: listItems(responsedata.data, 2, 10) }
        }]

        setAnimeData(responsedata.data);
        setFeatured(jsonAnime);
    }

    return (
        <AnimeContext.Provider value={{ loadAll, featuredState, searchState, animeData }}>
            {children}
        </AnimeContext.Provider>
    )
}