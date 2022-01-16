import { useRouter } from 'next/router'
import css from '@/styles/pages/watch.module.css'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { useContext, useEffect, useState } from 'react';
import { AnimeContext } from '@/contexts/AnimeContext';
import AnimeDTO from '@/interface/AnimeDTO';
import SeasonDTO from '@/interface/SeasonDTO';
import EpisodeDTO from '@/interface/EpisodeDTO';
import { setCookie } from 'nookies';

export default function Watch() {
    const { seasonsData, loadSeasons, animeData } =  useContext(AnimeContext);
    const [anime, setAnime] = useState({} as AnimeDTO);
    const [season, setSeason] = useState({} as SeasonDTO);
    const [episode, setEpisode] = useState({} as EpisodeDTO);
    const { query } = useRouter();
    const { anime: animeId, season: seasonNumber, episode: episodeNumber } = query;

    useEffect(() => {
        if (seasonsData.length === 0) {
            loadSeasons(animeId[0]);
        }
    }, [])

    useEffect(() => {
        const anime = animeData.filter(item => item.id === animeId)[0];
        setAnime(anime);

        const season = seasonsData.filter(item => item.number === +seasonNumber)[0];
        setSeason(season);
        
        if (season) {
            const episode = season.episodes.filter(item => +item.number === +episodeNumber)[0];
            setEpisode(episode);
        }
        
    }, [animeId, seasonNumber, episodeNumber])

    function historyBack() {
        setCookie(undefined, 'modal.anime', String(animeId), {
            maxAge: 60 * 60 * 1, // 1 hour
        })
        history.back();
    }

    return (
        <>
            <div className={css.back} onClick={historyBack}>
                <ArrowBack fontSize='large' />
            </div>
            <div className={css.container}>
                <video className={css.video} controls={true} autoPlay={true}>
                    <source src={episode.link} type="video/mp4"/>
                </video>
            </div>
        </>
    )
}