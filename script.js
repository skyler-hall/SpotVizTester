import { songList } from './spotify_top_hits_clean_json.js';

// Global variables for calculated results
let topArtist = '';
let averageSongLen = 0;
let loudestSong = '';

// Function to calculate average song length
const calculateAverageLength = () => {
    const totalDuration = songList.reduce((sum, song) => sum + song.duration_ms, 0);
    averageSongLen = Math.floor(totalDuration / songList.length / 60000); // Convert ms to minutes
};

// Function to find the loudest song
const findLoudestSong = () => {
    const loudest = songList.reduce((prev, curr) => (prev.loudness > curr.loudness ? prev : curr));
    loudestSong = loudest.song;
};

// Function to find the most frequent artist
const findTopArtist = () => {
    const artistCount = {};
    songList.forEach(song => {
        artistCount[song.artist] = (artistCount[song.artist] || 0) + 1;
    });
    topArtist = Object.keys(artistCount).reduce((a, b) => (artistCount[a] > artistCount[b] ? a : b));
};

// Initialize calculations
calculateAverageLength();
findLoudestSong();
findTopArtist();

// Function to update the result card
const updateResultCard = (header, text) => {
    const resultCard = document.getElementById('result-card');
    resultCard.innerHTML = `
        <div class="result-content">
            <h4 class="result-intro-text">${header}</h4>
            <h3 class="result-text">${text}</h3>
        </div>
    `;
};

// Form submission event listener
const resultForm = document.getElementById('result-form');

resultForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const userInput = document.getElementById('resultinput').value;

    // Display results based on the selected category
    if (userInput === 'Top Artist') {
        updateResultCard('The Top Artist Is', topArtist);
    } else if (userInput === 'Average Song Length') {
        updateResultCard('The Average Song Length Is', `${averageSongLen} minutes`);
    } else if (userInput === 'Loudest Song in Decibels') {
        updateResultCard('The Loudest Song Is', loudestSong);
    } else {
        alert('Invalid category. Please select a valid option!');
    }
});
