import styles from '@/styles/components/AnimeImage.module.css'
import AnimeDTO from '@/interface/AnimeDTO';
import { useEffect, useState } from 'react';
import ModalAnime from '@/components/ModalAnime';
import Anime from '@/components/Anime';
import { parseCookies, destroyCookie } from 'nookies'

interface AnimeImageRequest {
    item: AnimeDTO;
}


export default function AnimeImage({ item }: AnimeImageRequest) {
    const [isOpenModal, setIsOpen] = useState(false);
    
    useEffect(()=> {
        const {'modal.anime': modalAnime} = parseCookies();
        
        if (modalAnime) {
            if (item.id === modalAnime) {
                setIsOpen(true);
                destroyCookie(undefined, 'modal.anime')
            }
        }
    }, [])
    
    return (
        <>
        <div className={styles['movieRow--item']} onClick={(e) => {setIsOpen(!isOpenModal)}}>
            <img src={`/assets/${item.image_file}`} alt={item.name} />
        </div>
        {isOpenModal &&
        <ModalAnime isOpenModal={isOpenModal} setIsOpen={setIsOpen}>
            <Anime item={item}></Anime>
        </ModalAnime>}
        </>
        
    )
}