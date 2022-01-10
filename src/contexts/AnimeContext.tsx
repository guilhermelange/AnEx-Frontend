import { createContext, Dispatch, SetStateAction, useState } from "react";
import { api } from '@/services/api'
import { listItems } from '@/utils/pagination'
import AnimeDTO from '@/interface/AnimeDTO'

interface AnimeList {
    slug: string;
    title: string;
    items: object;
}

interface AnimeContextType {
    featured: object | null;
    loadAll: () => Promise<void>;
    searchState: [string, Dispatch<SetStateAction<string>>];
    animeData: AnimeDTO[] | null;
}

export const AnimeContext = createContext({} as AnimeContextType)

export function AnimeProvider({ children }) {
    const [animeData, setAnimeData] = useState([])
    const [featured, setFeatured] = useState(null);
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
        <AnimeContext.Provider value={{ loadAll, featured, searchState, animeData }}>
            {children}
        </AnimeContext.Provider>
    )
}