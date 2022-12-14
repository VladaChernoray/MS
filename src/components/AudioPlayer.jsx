import {useState, useEffect, useRef} from "react";
import Box from "@mui/material/Box";
import Widget from "./styled/Widget";
import CoverImage from "./styled/CoverImage";
import Typography from "@mui/material/Typography";
import AudioControls from "./AudioControls";
import Slider from "@mui/material/Slider";
import TinyText from "./styled/TinyText";
import Wallpaper from "./styled/Wallpaper";
import {useTheme} from "@mui/material";
import VolumenSlider from "./VolumenSlider";
import CoverVideo from "./styled/CoverVideo";

const AudioPlayer = ({songs}) => {
    const theme = useTheme();
    const [songIndex, setSongIndex] = useState(0);
    const [songProgress, setSongProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const videoRef = useRef(null);

    const {title, artist, cover, audio, video } = songs[songIndex];


    const audioRef = useRef(new Audio(audio ? audio : video)); 
    const intervalRef = useRef(); 
    const isReady = useRef(false); 
    const {duration} = audioRef.current;

    const [volumen, setVolumen] = useState(audioRef.current.volume)

    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setSongProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const onChangeVolumen = (e) => {
        let valor = e.target.value / 100;
        audioRef.current.volume = valor;
        setVolumen(Math.floor(valor * 100));
    }

    const toPrevSong = () => {
        const tempValue = songIndex - 1 < 0 ? songs.length - 1 : songIndex - 1;
        setSongIndex(tempValue);
    }

    const toNextSong = () => {
        const tempValue = songIndex < songs.length - 1 ? songIndex + 1 : 0;
        setSongIndex(tempValue);
    }

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextSong();
            } else {
                setSongProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, startTimer]);

    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(audio ? audio : video);
        setSongProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }

    }, [songIndex, audio ? audio : video ]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);

    const formatDuration = (value) => {
        if(isNaN(value)) return '0:00';

        const minute = Math.floor(value / 60);
        const secondLeft = Math.trunc(value - minute * 60);
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    return (
        <Box sx={{ overflow: 'hidden'}}>
            <Widget>
                <Box>
                    {audio ? (
                    <CoverImage>
                        <img
                            alt={title}
                            src={cover}
                        />
                    </CoverImage>) : (
                    <CoverVideo>
                        <video width="400" height="300" controls>
                            <source src={video} type="video/mp4"/>
                        </video>
                    </CoverVideo>
                    )}    
                    <Box 
                    align="center"
                    paddingTop="10px"
                    sx={{ ml: 1.5, minWidth: 0}}>
                        <Typography noWrap fontFamily = "Outfit" fontStyle = "sans-serif" fontSize="20px">
                            {title}
                        </Typography>
                        <Typography fontFamily = "Outfit" fontStyle = "sans-serif" fontSize="14px">
                            {artist}
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={songProgress}
                    step={1}
                    min={0}
                    max={duration ? duration : 0}
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                    theme.palette.mode === 'dark'
                                        ? 'rgb(255 255 255 / 16%)'
                                        : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(songProgress)}</TinyText>
                    <TinyText>{formatDuration(duration)}</TinyText>
                </Box>

                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevSong}
                    onNextClick={toNextSong}
                    onPlayPauseClick={setIsPlaying}
                    mainColor={mainIconColor}
                />
                <VolumenSlider
                    lightIconColor={lightIconColor}
                    volumen={volumen}
                    onChangeVolumen={onChangeVolumen}
                />
            </Widget>
            <Wallpaper/>
        </Box>
    );
}

export default AudioPlayer;