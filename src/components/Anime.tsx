import css from '@/styles/components/Anime.module.css'
import { useState } from 'react';

export default function Anime({ item }) {
    const [midiaSelected, setMidiaSelected] = useState(0);
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
        <div className={css.mainFeatured}>
            <section className={css.featured} style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(/assets/${item.cover_file})`
            }}>
                {<div className={css['featured--vertical']}>
                    <div className={css['featured--horizontal']}>
                        <div className={css['featured--container']}>
                            <div className={css['featured--name']}>{item.name}</div>
                            <div className={css['featured--info']}>
                                <div className={css['featured--points']}>{item.evaluationMedia}% relevante</div>
                                <div className={css['featured--year']}>{firstDate.getFullYear()}</div>
                                <div className={css['featured--seasons']}>{item.seasonsCount} temporada{item.seasonsCount !== 1 ? 's' : ''}</div>
                            </div>
                            <div className={css['featured--description']}>{description}</div>
                            <div className={css['featured--buttons']}>
                                <a href={`/watch/${item.id}`} className={css['featured--watchbutton']}>
                                    <img src='/assets/play.svg' alt="play" />Assistir
                                </a>
                                <a href={`/list/add/${item.id}`} className={css['featured--mylistbutton']}>
                                    <img src='/assets/fav.svg' alt="fav" className="fav" />Favoritar
                                </a>
                            </div>
                            <div className={css['featured--genres']}><strong>Gêneros:</strong> {genres.join(', ')}</div>
                        </div>
                    </div>
                </div>}
            </section>
            <div>
                <div className={css.contentContainer}>
                    <nav className={css.navAnime}>
                        <a href="#" id={`${midiaSelected == 0 ? css.select : ''}`} onClick={()=>setMidiaSelected(0)}><h4>Episódios</h4></a>
                        <a href="#" id={`${midiaSelected == 1 ? css.select : ''}`} onClick={()=>setMidiaSelected(1)}><h4>Trilha Sonora</h4></a>
                    </nav>
                    
                    {midiaSelected == 0 && <div>
                        Episódios
                    </div> }

                    {midiaSelected == 1 && <div>
                        <iframe src="https://open.spotify.com/embed/playlist/6ssJIwSAqRjTlBuCmyvhDp?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div> }
                </div>
            </div>
        </div>
    )
}