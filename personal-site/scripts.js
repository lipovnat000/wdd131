import { FALLBACK_PLAYLIST } from './fallback-playlist.js';

const API_KEY = 'AIzaSyAzmP6ZSQ_KaPWEDpVyEGZR98jeXqdKC64';
const CHANNEL_ID = 'UCwaK1gmmTE2v9mz8Ky1Nyog';

function updateWelcomeMessage(success) {
    const welcomeMessage = document.getElementById('welcome-message');
    if (success) {
        welcomeMessage.textContent = 'Welcome to the official website of Pokemaniac_101! It\'s currently a work in progress but feel free to explore.';
    } else {
        welcomeMessage.textContent = 'Welcome to the official website of Pokemaniac_101! We are currently having trouble fetching the latest videos, this is most likely caused by daily YouTube API query limits (I\'m accessing the free version, bear with me). Please try again later. In the meantime, enjoy this personal selection of videos, visit Behind the Scenes, or go to my channel on Youtube below';
    }
}

async function fetchVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`);
        const data = await response.json();
        const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title.replace(/'/g, "&#39;").replace(/"/g, "&quot;"),
            views: 0,
            uploadDate: item.snippet.publishedAt,
            src: `https://www.youtube.com/embed/${item.id.videoId}`
        }));

        for (let video of videos) {
            const statsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${video.id}&part=statistics`);
            const statsData = await statsResponse.json();
            if (statsData.items[0] && statsData.items[0].statistics) {
                video.views = statsData.items[0].statistics.viewCount;
            } else {
                video.views = 'N/A';
            }
        }

        updateWelcomeMessage(true);
        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        updateWelcomeMessage(false);
        return FALLBACK_PLAYLIST;
    }
}

function displayVideoList(videos) {
    const videoListElement = document.getElementById('video-list');
    videoListElement.innerHTML = '';
    videos.forEach(video => {
        const videoItem = document.createElement('li');
        videoItem.textContent = `${video.title} - ${video.views} views`;
        videoItem.onclick = () => setMainVideo(video);
        videoListElement.appendChild(videoItem);
    });
}

function setMainVideo(video) {
    const mainVideoPlayer = document.getElementById('main-video-player');
    const mainVideoTitle = document.getElementById('main-video-title');
    mainVideoPlayer.src = video.src;
    mainVideoTitle.textContent = video.title;
}

function sortVideos(videos, sortBy) {
    if (sortBy === 'popular') {
        return videos.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'latest') {
        return videos.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (sortBy === 'random') {
        return videos.sort(() => 0.5 - Math.random());
    }
    return videos;
}

document.getElementById('popular').addEventListener('click', async () => {
    const videos = await fetchVideos();
    displayVideoList(sortVideos(videos, 'popular'));
});

document.getElementById('latest').addEventListener('click', async () => {
    const videos = await fetchVideos();
    displayVideoList(sortVideos(videos, 'latest'));
});

document.getElementById('random').addEventListener('click', async () => {
    const videos = await fetchVideos();
    displayVideoList(sortVideos(videos, 'random'));
});

document.addEventListener('DOMContentLoaded', async () => {
    const videos = await fetchVideos();
    if (videos.length > 0) {
        setMainVideo(videos[0]);
        displayVideoList(videos);
    } else {
        console.error('No videos found.');
    }
});
