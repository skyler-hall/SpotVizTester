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
            type: 'doughnut',
            data: {
                labels: [
                  '2009',
                  '20011',
                  '2013'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(9, 110, 31)',
                    'rgb(0, 155, 26)',
                    'rgb(28, 75, 42)'
                  ],
                  hoverOffset: 2
                }]
            },
        });
    }

    function createLoudestSongChart() {

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
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                  label: 'Loudest Song',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  borderColor: 'rgb(5, 255, 5)',
                  tension: 0.1
                }]
            },
        });
    }


});
