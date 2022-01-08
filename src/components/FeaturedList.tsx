import styles from '@/styles/components/FeaturedMovie.module.css'
export default function FeaturedList({ items }) {

    return (
        <div className={styles['featured-options']}>
            <h1>Mais assistidos</h1>
            {items.results.slice(0, 3).map((item, index) => (
                <>
                    <p>{`${index+1}º - ${item.name}`}</p>
                    <div key={item.id} className={styles.option} style={{
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