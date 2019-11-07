console.log('Hello Hackers!')
console.log(location.href)

const darkSkyUrl = 'https://api.darksky.net/forecast/YOUR_DARK_SKI_API/'
const GOOGLE_MAPS_API = 'YOUR_GOOGLE_MAPS_API'
const NPS_API = 'YOUR_NPS_API'
const proxy = 'https://cors-anywhere.herokuapp.com/'
let nationalParks = []

document.getElementById('form').addEventListener('submit', getNpsData)

// WEATHER IMAGES
const images = {
  'partly-cloudy-day': 'file:///paht_to_your_assets/assets/cloudy-day-3.svg',
  'partly-cloudy-night':'file:///paht_to_your_assets/assets/cloudy-night-2.svg',
  'cloudy': 'file:///paht_to_your_assets/assets/cloudy.svg',
  'fog': 'file:///paht_to_your_assets/assets/cloudy.svg',
  'wind': 'file:///paht_to_your_assets/assets/cloudy.svg',
  'clear-day': 'file:///paht_to_your_assets/assets/day.svg',
  'clear-night':'file:///paht_to_your_assets/assets/night.svg',
  'drizzle': 'file:///paht_to_your_assets/assets/rainy-4.svg',
  'rain': 'file:///paht_to_your_assets/assets/rainy-5.svg',
  'snow':'file:///paht_to_your_assets/assets/snowy-5.svg',
  'sleet':'file:///paht_to_your_assets/assets/snowy-6.svg',
  'thunder':'file:///paht_to_your_assets/assets/thunder.svg',
  'tornado':'file:///paht_to_your_assets/assets/weather.svg',
}

// HELPER FUNCTIONS
let helperFunctions = {
  // DISPLAY MAP ON SCREEN
  'displayMap': (googleMapUrl) => {
    console.log("Display Map...")
    // write your code here
  },
  // GET WEATHER DATA
  'getWeatherData': async (lat, long) => {
    console.log("Get weather data...")
    // write your code here
  },
  // DISPLAY WEATHER ON SCREEN
  'displayWeather': (data) => {
    console.log('Display weather data...')
    console.log(data)
    let icon = data.currently.icon
    let targetElement = document.getElementById('weather')
    window.scrollTo(0, 0)
    targetElement.innerHTML = ''
    let degreeNode = document.createElement('h1')
    let imageNode = document.createElement('img')
    imageNode.setAttribute('src', images[icon])
    imageNode.setAttribute('height', '200px')
    imageNode.setAttribute('width', '200px')
    imageNode.setAttribute('alt', 'this is an image')
    targetElement.appendChild(degreeNode).innerHTML = `${data.currently.summary} and ${Math.round(data.currently.temperature)} degress F`
    targetElement.appendChild(imageNode)
  }
}

// CREATE A NATIONAL PARK CARD ON SCREEN (id,title,text,parkImage, googleMapUrl, url, latLong, helperFunctions)
function createCard(id = 1, title = 'TITLE', text = 'Card Text', parkImage = 'file:///Users/taprete/us_parks_workshop/assets/yellowstone_one.jpg', googleMapUrl = null, url = null, latLong = undefined, helperFunctions) {

  let smallCard = document.createElement('div')
  smallCard.setAttribute('class', 'col-sm-4')
  smallCard.setAttribute('style', 'margin-top: 20px')

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.setAttribute('style', 'width: 18rem;')

  let image = document.createElement('img')
  image.setAttribute('src', parkImage)
  image.setAttribute('class', 'card-img-top')
  image.setAttribute('alt', 'this is an image')

  let cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body')

  let cardTitle = document.createElement('h5')
  cardTitle.setAttribute('class', 'card-title')

  let cardText = document.createElement('p')
  cardText.setAttribute('class', 'card-text')

  let link = document.createElement('a')
  link.setAttribute('class', 'btn btn-primary btn-lg mx-2')
  link.setAttribute('href', `${url}`)
  link.setAttribute('target', '_blank')

  let mapButton = document.createElement('button')
  mapButton.setAttribute('id', `map-${id}`)
  mapButton.setAttribute('type', 'button')
  mapButton.setAttribute('class', 'btn btn-primary btn-lg')

  cardBody.appendChild(cardTitle).innerHTML = title
  cardBody.appendChild(cardText).innerHTML = text
  cardBody.appendChild(link).innerHTML = 'Website'
  cardBody.appendChild(mapButton).innerHTML = 'View Map'

  card.appendChild(image)
  card.appendChild(cardBody)
  smallCard.appendChild(card)

  if (latLong !== undefined) {
    let weatherButton = document.createElement('button')
    weatherButton.setAttribute('id', `weather-${id}`)
    weatherButton.setAttribute('type', 'button')
    weatherButton.setAttribute('class', 'btn btn-primary btn-lg m-2')
    cardBody.appendChild(weatherButton).innerHTML = 'View Weather'
    // ONCLICK GETS WEATHER AND DISPLAYS WEATHER
    weatherButton.onclick =  async () => {
      console.log("Clicked View Weather...")
      // write your code here
    }
  }

  // ONCLICK RUNS DISPLAY MAP
  mapButton.onclick = () => {
    console.log('Clicked View Map...')
    // write your code here
  }

  return smallCard
}

// CREATE GOOGLE MAP URL
function createGoogleMapUrl(title) {
  console.log("Create Google Map URL...")
  // write your code here
}

// LOADING NATIONAL PARKS MESSAGE
let loadingJumbo = `<div class='jumbotron jumbotron-fluid col-12'>
<div class='container'>
  <h1 class='display-4'>Loading National Parks... <div class='spinner-grow' style='width: 3rem; height: 3rem;' role='status'>
  <span class='sr-only'>Loading...</span>
  </div></h1>
</div>
</div>`

// LOADING WEATHER DATA
let loadingWeather = `<div class='jumbotron jumbotron-fluid col-12'>
<div class='container'><div class='spinner-grow' style='width: 3rem; height: 3rem;' role='status'>
  <span class='sr-only'>Loading...</span>
  </div>
</div>
</div>`

// ALERT WHEN NO TEXT IS ENTERED
let alert = `
<div class='alert alert-primary col-12' role='alert'>
  Please enter in the search field
</div>`

// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  console.log("Searching for national parks...")
  // write your code here
}

// FORMATS LATITUDE AND LONGITUDE
function getLatLong(latLong) {
  console.log("Parsing latitude and longitude...")
  // write your code here
}

// CLEAN NPS DATA
function cleanNpsData(data) {
  console.log('Cleaning NPS Data...')
  console.log(data)
  // write your code here
}
