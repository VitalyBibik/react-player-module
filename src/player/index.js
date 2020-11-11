import React, {useState, useRef} from 'react';
import styles from './styles.module.css';
import playlist from "./playlist";
import PlayListItem from "./playlist-item";
import PlayerTimeline from "./player-timeline";
import throttling from '../utils/throttling';
import ctm from '../utils/convert-to-minutes';


const Player = () => {
    const [currentTrack, setCurrentTrack] = useState(playlist[0]);
    const [currentTime, setCurrentTime] = useState(0);

    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const myPlayer = useRef(null)


    const onTimeUpdate = throttling (e => {
        setCurrentTime(e.target.currentTime)
    }, 1000)

    const onPlay = e => {
       setDuration(e.target.duration);
    }

    return <div className={styles.player}>
        <div className={styles['player__controls']}>
            <PlayerTimeline
            currentTime={currentTime}
            duration={duration}
            onClick={time => {
                console.log('time', time);
                myPlayer.current.currentTime = time;
            }}
            />
            <div>{currentTrack.title}</div>
            <div>playing time: {ctm(currentTime)}</div>
            <div>duration: {ctm(duration)} </div>
            <button
                onClick={_ => {
                    if (isPlaying) {
                        myPlayer.current.pause();
                        setIsPlaying(false);
                    } else {
                        myPlayer.current.play();
                        setIsPlaying(true);
                    }
                }}
            >
                {isPlaying ? 'pause' : 'play'}
            </button>
            <audio
                src={currentTrack.audioFile}
                controls
                className={styles['player__audio']}
                ref={myPlayer}
                onPlay={onPlay}
                onPause={_ => console.log('pause')}
                onTimeUpdate={onTimeUpdate}
                onLoadedData={_ => {
                    console.log('loaded');
                    setDuration(myPlayer.current.duration);
                }}
            >
                Your browser doesn't support audio
            </audio>
        </div>
        <div className={styles['player__playlist']}>
            {playlist.map(item => <PlayListItem
                item={item}
                key={item.id}
                onClick={item => {
                    setCurrentTrack(item);
                    setIsPlaying(false);
                }}
            />)}
        </div>
    </div>
}

export default Player;