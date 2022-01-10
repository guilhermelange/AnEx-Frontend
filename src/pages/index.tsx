import { useContext, useEffect, useState } from 'react';
import MovieRow from "@/components/MovieRow"
import FeaturedList from "@/components/FeaturedList"
import Footer from "@/components/Footer"
import FeaturedMovie from "@/components/FeaturedMovie";
import Header from "@/components/Header";
import loading from "@/assets/loading.gif"
import Image from 'next/image';
import styles from '@/styles/pages/home.module.css';
import stylesFeat from '@/styles/components/FeaturedMovie.module.css';
import { AnimeContext } from '@/contexts/AnimeContext';
import SEO from '@/components/SEO';
import { listItems } from '@/utils/pagination';

export default function Home() {
  const { featured, loadAll, animeData } = useContext(AnimeContext);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (!featured)
      loadAll();
  }, [])

  useEffect(() => {
    const listAnimes = [{
        slug: 'highlights',
        title: 'Destaques',
        items: { results: listItems(animeData, 1, 10) }
    },
    {
        slug: 'onrise',
        title: 'Em Alta',
        items: { results: listItems(animeData, 2, 10) }
    }]

    setMovieList(listAnimes);
  }, [animeData])

  return (
    <>
        <SEO title='Início'/>
        <Header/>
        <div className={styles.container}>
          <div className={stylesFeat.mainFeatured}>
            {featured &&
              <FeaturedMovie item={featured}/>
            }
            {movieList.slice(0,1).map((item) => (
              <FeaturedList key={item.slug} items={item.items} featuredData={featured}/>
            ))}
          </div>
        </div>

        <section className={styles.lists}>
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <Footer />
        {animeData.length <= 0 &&
          <div className={styles.loading}>
            <Image src={loading} alt="Carregando" />
          </div>
        }
    </>
  );
}