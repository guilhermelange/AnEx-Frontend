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
import { useRouter } from 'next/router';
import SEO from '@/components/SEO';
import css from '@/styles/pages/search.module.css';

export default function Home() {
  const { animeData, loadAll, searchState: [textSearch] } = useContext(AnimeContext);
  const [filteredAnime, setFilteredAnime] = useState([] as AnimeDTO[]);
  const { query: { q: queryString } } = useRouter();

  useEffect(() => {
    if (!animeData)
      loadAll();
  }, [])

  useEffect(() => {
    if (queryString) {
      const stringToSearch = String(queryString).toLowerCase();
      const filteredAnime = animeData.filter(anime => 
        anime.name.toLowerCase().includes(stringToSearch)
      )
      setFilteredAnime(filteredAnime);
    }
  }, [queryString])

  return (
    <>
      <SEO title="Pesquisa"/>
      <Header/>
      <div className={css.container}>
        {(filteredAnime && queryString) && <h6>{
            filteredAnime.length > 0 ? 'Resultados obtidos' : 'Nenhum resultado obtido'
          } para "<strong>{queryString}"</strong> </h6> }
        {filteredAnime && filteredAnime.map((anime) => (
          <AnimeImage key={anime.id} item={anime}></AnimeImage>
        ))}
      </div>

      {!queryString && 
        <div className={`${homeStyles.container} ${homeStyles.containerMsg}`}>
          Podemos te ajudar a localizar algum título?<br/>
          Basta informar o texto na caixa de pesquisa
        </div> }

      <Footer />

      

      {(animeData.length <= 0 || !filteredAnime) &&
        <div className={homeStyles.loading}>
          <Image src={loading} alt="Carregando Animes" />
        </div>
      }
    </>
  );
}