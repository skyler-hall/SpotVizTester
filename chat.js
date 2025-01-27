// chat.js
import { songList } from './spotify_top_hits_clean_json.js';
console.log('chat.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.result-button');
    const resultCard = document.getElementById('result-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            console.log('Button clicked:', buttonText);

            if (buttonText === 'Most Common Genre') {
                createGenreChart();
            } else if (buttonText === 'Average Year Song Released') {
                createYearChart();
            } else if (buttonText === 'Loudest Song') {
                createLoudestSongChart();
            }
        });
    });

    function createGenreChart() {
        const genreCounts = {};
        songList.forEach(song => {
            const genres = song.genre.split(',').map(g => g.trim());
            genres.forEach(genre => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        });

        const labels = Object.keys(genreCounts);
        const data = Object.values(genreCounts);

        const canvas = document.createElement('canvas');
        canvas.id = 'genreChart';
        resultCard.innerHTML = ''; // Clear previous content
        resultCard.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Songs',
                    data: data,
                    backgroundColor: 'rgba(35, 255, 64, 0.8)',
                    borderColor: 'rgb(0, 0, 0)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function createYearChart() {
        const years = songList.map(song => parseInt(song.year));
        const averageYear = years.reduce((acc, year) => acc + year, 0) / years.length;
        console.log('Average Year:', averageYear);
    }

    function createLoudestSongChart() {
        const loudness = songList.map(song => parseFloat(song.loudness));
        const loudestSong = songList[loudness.indexOf(Math.max(...loudness))];
        console.log('Loudest Song:', loudestSong);
    }


});
