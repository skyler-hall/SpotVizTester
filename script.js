import {songList} from './spotify_top_hits_clean_json.js'

const cards = document.getElementsByClassName('stat-card')
console.log(cards) //take a look at what the card looks like on the console

console.log('Song List: -------------------------------------------------------------')
console.log(songList)//here's the song list

let topArtist;
let averageSongLen;
let loudestSong;

const calculateAverageLength = () => {
    let sum = 0;
    for(let i = 0; i < songList.length; i++) {
        sum += songList[i]['duration_ms'];
    }
    let averageMs = sum / songList.length
    averageSongLen = Math.floor(averageMs/60000) //floor is optional - makes it pretty
    console.log(averageSongLen)
}

const findLoudestSong = () => {
    let loudest = songList[0] //set to the first val for comparison
    for(let i = 0; i < songList.length; i++) {
        if(songList[i]['loudness'] > loudest['loudness'])
            loudest = songList[i]
    }
    loudestSong = loudest['song']
    console.log(loudestSong)
}

const findTopArtist = () => {
    let popularityCount = {}
    for(let i = 0; i < songList.length; i++) {//freq dist
        if(popularityCount[songList[i]["artist"]] == null)
            popularityCount[songList[i]["artist"]] = 1
        else
            popularityCount[songList[i]["artist"]]++
    }

    let top = songList[0];
    for(let i = 0; i < songList.length; i++) {
        if(popularityCount[top["artist"]] < popularityCount[songList[i]["artist"]])
            top = songList[i]
    }

    topArtist = top['artist']
    console.log(topArtist)
}

calculateAverageLength()
findLoudestSong()
findTopArtist()

//-----------------------------------------------------------------------------------

const displayCard = (header, text) => {
    const card = document.getElementById('stat-card')
    console.log(card.firstChild)
    card.removeChild(card.firstElementChild)

    const cardItems = document.createElement('div')
    

    const newHeader = document.createElement('h4')
    newHeader.textContent = header
    newHeader.setAttribute('class', 'stat-intro-text')

    cardItems.append(newHeader)

    const newText = document.createElement('h3')
    newText.textContent = text
    newText.setAttribute('class', 'stat-result-text')

    cardItems.append(newText)

    card.append(cardItems)
}

const form = document.getElementById('input-form')

const handleSubmit = (event) => {
    event.preventDefault()

    console.log('Form Submitted!')

    const formInput = document.getElementById('user-input')
    let userInput = formInput.value;
    console.log('The user inputted: ' + userInput + ' into the form.')

    if(userInput == 'Top Artist') {
        displayCard('The Top Artist Is', topArtist)

    } else if(userInput == 'Average Song Length') {
        displayCard('The Average Song Time Is', averageSongLen + ' minutes')

    } else if(userInput == 'Loudest Song') {
        displayCard('The Loudest Song Is', loudestSong)
    } else {
        alert('Invalid Entry. Please try again!')
    }
}

form.addEventListener('submit', handleSubmit)