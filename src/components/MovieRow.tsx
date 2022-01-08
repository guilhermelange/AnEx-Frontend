import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from '@/styles/components/MovieRow.module.css'

const MovieRow = ({ title, items }) => {
    const [scrollX, setscrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setscrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setscrollX(x);
    }

    return (
        <div className={styles.movieRow}>
            <h2>{title}</h2>
            <div className={styles['movieRow--left']} onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className={styles['movieRow--right']} onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className={styles['movieRow--listarea']}>
                <div className={styles['movieRow--list']} style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className={styles['movieRow--item']}>
                            <img src={`/assets/${item.image_file}`} alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieRow;