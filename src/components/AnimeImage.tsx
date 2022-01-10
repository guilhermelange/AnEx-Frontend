import styles from '@/styles/components/AnimeImage.module.css'

interface AnimeImageRequest {
    image: string;
    name: string;
}


export default function AnimeImage({image, name}: AnimeImageRequest) {
    return (
        <div className={styles['movieRow--item']}>
            <img src={`/assets/${image}`} alt={name} />
        </div>
    )
}