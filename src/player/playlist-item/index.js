import React from 'react';
import styles from './styles.module.css';

const PlayerListItem = ( { item, onClick } ) => {
    const { title = 'No title', author = 'No author' } = item;
    return <div
        className={styles['playlist-item']}
        onClick={_ => onClick(item)}
    >
        {author} - {title}
    </div>
}

export default PlayerListItem;