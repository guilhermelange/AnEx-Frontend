import css from '@/styles/components/Anime.module.css'
import { api } from '@/services/api'
import { useState } from 'react';
import LikeOff from '@material-ui/icons/ThumbUpOutlined'
import LikeOn from '@material-ui/icons/ThumbUp'
import DislikeOff from '@material-ui/icons/ThumbDownOutlined'
import DislikeOn from '@material-ui/icons/ThumbDown'

export default function Anime({ item }) {
    const [midiaSelected, setMidiaSelected] = useState(0);
    const [isFavorite, setIsFavorite] = useState(item.favorite); 
    const [evaluation, setEvaluation] = useState(item.evaluation);
    let firstDate = new Date(item.start_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.description;
    if (description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    async function handleSetFavorite() {
        const body = { favorite: !item.favorite }
        const responsedata = await api.put(`animes/${item.id}`, body);
        if (responsedata.status === 200) {
            setIsFavorite(!item.favorite);
            item.favorite = !item.favorite;
        }
    }

    async function handleEvaluation(evaluationIn: boolean) {
        const body = { evaluation: evaluationIn }
        const responsedata = await api.put(`animes/${item.id}`, body);
        if (responsedata.status === 200) {
            setEvaluation(evaluationIn);
            item.evaluation = evaluationIn;
        }
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
                                <div className={css['featured--points']}>{Math.round(item.evaluationMedia)}% relevante</div>
                                <div className={css['featured--year']}>{firstDate.getFullYear()}</div>
                                <div className={css['featured--seasons']}>{item.seasonsCount} temporada{item.seasonsCount !== 1 ? 's' : ''}</div>
                            </div>
                            <div className={css['featured--description']}>{description}</div>
                            <div className={css['featured--buttons']}>
                                <div className={css['featured--watchbutton']} onClick={handleSetFavorite}>
                                    <img src={ isFavorite ? '/assets/bookmark-fill.svg' : '/assets/bookmark.svg'} alt="fav" className={css.favorite} />Favoritar
                                </div>
                                <div className={css['featured--evaluation']}>
                                    {evaluation && <LikeOn/>}
                                    {!evaluation && <LikeOff onClick={e => handleEvaluation(true)} />}
                                    {evaluation === null && <DislikeOff onClick={e => handleEvaluation(false)}/>}
                                    {(evaluation !== null && !evaluation) && <DislikeOn />}
                                    {(evaluation !== null && evaluation) && <DislikeOff onClick={e => handleEvaluation(false)}/>}
                                </div>
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

                    {(midiaSelected == 1 && !item.playlist_link) && <div>
                        Ainda não há playlist disponível
                    </div> }
                    {(midiaSelected == 1 && item.playlist_link) && <div>
                        <iframe src={item.playlist_link} width="100%" height="380" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div> }
                </div>
            </div>
        </div>
    )
}