import { AnimeContext } from '@/contexts/AnimeContext';
import styles from '@/styles/components/FeaturedMovie.module.css'
import { useContext } from 'react';

export default function FeaturedList({ items, featuredData}) {
    const { featuredState: [,setFeatured]} = useContext(AnimeContext);

    function handleSelectFeatured(e, item) {
        setFeatured(item);
    }

    return (
        <div className={styles['featured-options']}>
            <h1>Mais assistidos</h1>
            {items.results.slice(0, 3).map((item) => (
                <>
                    <p>{item.name}</p>
                    <div onClick={(e) => handleSelectFeatured(e, item)} key={item.id} className={`${styles.option} ${featuredData && featuredData.id == item.id ? styles.selected : ''}`} style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(/assets/${item.image_file})`
                    }}>
                    </div>
                </>
            ))}
        </div>
    )
}