import styles from '@/styles/components/FeaturedMovie.module.css'
import { useState } from 'react';
import ModalAnime from '@/components/ModalAnime'
import Anime from './Anime';
import Add from '@material-ui/icons/Add'

export default function FeaturedMovie({ item }) {
    const [isOpenModal, setIsOpen] = useState(false);
    
    let firstDate = new Date(item.start_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.description;
    if (description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    return (
        <>
        <div className={styles.mainFeatured}>
            <section className={styles.featured} onClick={() => setIsOpen(true)} style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(/assets/${item.cover_file})`
            }}>
                {<div className={styles['featured--vertical']}>
                    <div className={styles['featured--horizontal']}>
                        <div className={styles['featured--container']}>
                            <div className={styles['featured--name']}>{item.name}</div>
                            <div className={styles['featured--info']}>
                                <div className={styles['featured--points']}>{Math.round(item.evaluationMedia)}% relevante</div>
                                <div className={styles['featured--year']}>{firstDate.getFullYear()}</div>
                                <div className={styles['featured--seasons']}>{item.seasonsCount} temporada{item.seasonsCount !== 1 ? 's' : ''}</div>
                            </div>
                            <div className={styles['featured--description']}>{description}</div>
                            <div className={styles['featured--buttons']}>
                                {/* <a href={`/watch/${item.id}`} className={styles['featured--watchbutton']}>
                                    <img src='/assets/play.svg' alt="play" />Assistir
                                </a>
                                <a href={`/list/add/${item.id}`} className={styles['featured--mylistbutton']}>
                                    <img src='/assets/fav.svg' alt="fav" className="fav" />Favoritar
                                </a> */}
                                <div className={styles['featured--watchbutton']}>
                                    <Add/>Mais Informações
                                </div>
                            </div>
                            <div className={styles['featured--genres']}><strong>Gêneros:</strong> {genres.join(', ')}</div>
                        </div>
                    </div>
                </div>}
            </section>
            {isOpenModal && 
            <ModalAnime isOpenModal={isOpenModal} setIsOpen={setIsOpen}>
                <Anime item={item}></Anime>
            </ModalAnime>}
        </div>
        </>
    );
}