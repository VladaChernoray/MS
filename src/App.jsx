import React, {useMemo} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Container from "@mui/material/Container";

import song1 from './music/song1.mp3'
import song2 from './music/song2.mp3'
import song3 from './music/song3.mp3'
import song4 from './music/song4.mp3'
import song5 from './music/song5.mp3'

import pic1 from './images/pic1.jpg'
import pic2 from './images/pic2.jpg'
import pic3 from './images/pic3.jpg'
import pic4 from './images/pic4.jpg'
import pic5 from './images/pic5.jpg'
import video1 from './video/video1.mp4'

import AudioPlayer from "./components/AudioPlayer";
import VideoPlayer from "./components/VideoPlayer";

function App() {
    let songs = useMemo(
        () => [
            {
                title: "4:00 A.M.",
                artist: "Taeko Onuki",
                cover: pic1,
                audio: song1
            },
            {
                title: "All Eyes On Me",
                artist: "Bo Burnhum",
                cover: pic2,
                audio: song2
            },
            {
                title: "Shadow Mouses",
                artist: "Bring me the horizon",
                cover: pic3,
                audio: song3
            },
            {
                title: "Nightcall",
                artist: "Kavinsky",
                cover: pic4,
                audio: song4
            },
            {
                title: "i was all over her",
                artist: "salvia palth",
                cover: pic5,
                audio: song5
            },
            {
                title: "i was all over her",
                artist: "salvia palth",
                video: video1
            },
        ], []
    )
    
    let video = useMemo(
        () => [
            {
                title: "All Eyes On Me",
                artist: "Bo Burnhum",
                url: video1
            },
        ], []
    )


    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
        <React.StrictMode>
        <BrowserRouter>
        <Routes>
          <Route path="/audioPlayer" element={<AudioPlayer  songs={songs} />}></Route>
          <Route path="/videoPlayer" element={<VideoPlayer/>}></Route>
        </Routes>
        </BrowserRouter>
      </React.StrictMode>
      </Container>
    );
}

export default App;
