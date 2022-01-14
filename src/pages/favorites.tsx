/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from 'react';
import Footer from "@/components/Footer"
import Header from "@/components/Header";
import loading from "@/assets/loading.gif"
import Image from 'next/image';
import homeStyles from '@/styles/pages/home.module.css';
import { AnimeContext } from '@/contexts/AnimeContext';
import AnimeImage from '@/components/AnimeImage';
import AnimeDTO from '@/interface/AnimeDTO';
import SEO from '@/components/SEO';
import css from '@/styles/pages/favorites.module.css'

export default function Home() {
    const { animeData, loadAll } = useContext(AnimeContext);
    const [filteredAnime, setFilteredAnime] = useState([] as AnimeDTO[]);

    useEffect(() => {
        if (!animeData)
            loadAll();

        const filteredAnime = animeData; //animeData.filter(anime => anime.favorite)
        setFilteredAnime(filteredAnime);
    }, [])

    return (
        <>
            <SEO title="Favoritos"/>
            <Header favorite={true}/>
            <div className={`${css.container} ${filteredAnime.length > 0 ? '':homeStyles.containerMsg}`}>
                <h6>{filteredAnime.length > 0 ? 'Seus animes favoritos:' : 'Você ainda não possui favoritos'}</h6>
                {filteredAnime && filteredAnime.map((anime) => (
                    <AnimeImage key={anime.id} item={anime}></AnimeImage>
                ))}
            </div>

            <Footer />

            {animeData.length <= 0 &&
                <div className={homeStyles.loading}>
                    <Image src={loading} alt="Carregando Animes" />
                </div>
            }
        </>
    );
}