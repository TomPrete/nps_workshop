# National Park Finder

## What we're building

We will be building a Single Page Application (SPL) using HTML, Javascript, and the Bootstrap styling framework for styling. This application will utilize three (3) API's, Google Maps Embed API, National Park Services API, and Dark Sky's API for weather (Application Programming Interface).

Application User Flow:
1. The user will search for a National Park in a Text Input Field (by name or by state) and click SUBMIT.
2. We will retrieve and display a list of National Parks based on your search query.
3. The list of National Parks will have 3 buttons on them, a button that links to the National Parks' website, a button that will display a Google Map of the National Park, and a button that will display the National Park's weather if applicable.

## What you’ll learn today.

1. You’ll learn how to Use API’s (Google Maps, National Parks, Dark Sky).
2. You’ll learn how to manipulate data that’s retrieved from an API using Javascript.
3. You’ll learn how to manipulate the DOM (Webpage) using Javascript.
4. Many other things…

## Before We Begin

1. Ensure you have [Google Chrome](https://www.google.com/chrome/) downloaded.
2. Ensure you have a GMail  email Account to get access to the Google Maps Embed API.
3. Please copy and download the following folder files from Google Drive. [US National Parks](https://drive.google.com/open?id=1_M-x6Obr0l59_6-eFe47LNByNoBrPolZ).
4. Download a text editor to write your code in. I like to use VSCode. You can download it [here](https://code.visualstudio.com/download)


## Our Application File Structure

After downloading the US National Parks folder from the Google Drive and unzipping it. There should be 2 files (`app.js`, `index.html`) and an `assets` folder.

1. The `index.html` file:
    1. This HTML file is the main entry point to our application. We’ll open this file in the web browser.
2. The `app.js` file:
    1. This Javascript file is where we’ll be performing all the logic of the application. Including getting data from the API’s.
3. The `assets` folder:
    1. This is where we’re storing our assets for our application. Like images and other file types.

There is a base of code in the `index.html` and `app.js` files that we’ll build upon.

## Let’s Get Started

Open up the `index.html` file in Google Chrome. You can right click on the `index.html` file and ‘open with’ Google Chrome or you can click and hold and drag the file into an already open Google Chrome browser.

Your application should appear in the web browser. In the URL of Google Chrome should say the file path to your application. (Ex: **_file:///Users/taprete/us_national_parks/index.html_** - this is file path to my `index.html` file)

In the navigation bar there should be the National Parks logo with a title of NATIONAL PARK SEARCHER and a search box that says *Search for National Parks* and a button that says **Get Parks**

Typing in the Search field and clicking **Get Parks** currently doesn’t do anything since we haven’t programmed our application to get the National Parks from the NPS API. In fact we’ are not even running our `app.js` file yet. We want our `app.js` file to load as soon as our `index.html` file loads.

### Linking our `app.js` file our `index.html` file

__In our `index.html` file:__
There will be a comment as to where we should add our `app.js` file.
```html
  <script src="" async defer></script> <!-- add our 'app.js' file to the 'src' attribute -->
```

After you add your `app.js` file to the `<script>` tag it should look like the following:
```html
  <script src=“app.js” async defer></script> <!-- add our 'app.js' file to the 'src' attribute -->
```

Once you’ve added your `app.js` file to your `index.html` Refresh your page. __DON’T FORGET TO SAVE!__

### The Chrome Developer Tools

Web developers often log messages to the Console to make sure that their JavaScript is working as expected. To log a message, you insert an expression like `console.log('Hello Hackers!’)` into your JavaScript. When the browser executes your JavaScript (like when you load your `index.html` file) and sees an expression like that, it knows that it's supposed to log the message to the Console. - _Google Documentation_

__How to Open the Console panel to view logged messages or run JavaScript:__

Press `Command+Option+J` (Mac) or `Control+Shift+J` (Windows, Linux, Chrome OS) to jump straight into the Console panel.

__Open DevTools from Chrome's main menu:__

Click __Customize and control Google Chrome__ (the 3 vertical dots in the upper right hand corner of the Chrome Web Browser) and then select __More Tools > Developer Tools__. Navigate to the __Console__ tab.

If your `app.js` file was loaded correctly into your HTML file when your refresh your `index.html` page with the Chrome Dev Tools Console panel open you should see 2 things printed, `Hello Hacker!` and the file path to your `index.html` file (Ex: `file:///Users/taprete/us_national_parks/index.html`)

Let’s open up the `app.js` file in our Text Editor (VSCode). You can see on the first two lines of `app.js` we have two console.logs: `console.log('Hello Hackers!’)` and `console.log(location.href)`. This is what’s being printed out in our Console.

## Release 1: Getting National Park Data

For Release 1 we’ll be using the National Park’s API to get National Parks based on our search query.

First, we’ll need to get an API key to use the NPS API. Visit the NPS [Get Started](https://www.nps.gov/subjects/developer/get-started.htm) page and Signup to receive an API Key to access National Park Service Data.

Once you sign up you should receive an email with your API Key. Your API key is a unique identifier used to authenticate you when you’re making API Calls.

You should receive an email that looks something like this from __Your National Park Service API key__
```
Your API key for YOUR EMAIL is:
YOUR API KEY SHOULD DISPLAY HERE
You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:
https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=YOUR_API KEY SHOULD DISPLAY HERE
For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:
```
In our `app.js` file lets assign the variable `NPS_API` to equal our NPS service API that we received in our email. The API should be a string.

Before:
```javascript
const NPS_API = 'YOUR_NPS_API'
```

After:
```javascript
const NPS_API = 'xkhVti9P………………….’  // The entire API that is unique to you
```

When we click on the Get Parks button we want to grab National Park Data.

Click on the Get Parks button and see what prints out in the Console. It should print `Search for national parks…`.  Where is the function being executed in our `app.js` file?

In the function named `getNpsData` is where we’ll be getting all the National Park data.

`getNpsData` Function:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  console.log("Search for national parks...")
  // write your code here
}

```

After:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
    event.preventDefault()
    let npsElement = document.getElementById('national-parks')
    npsElement.innerHTML = loadingJumbo // Shows a loading status
    let search = event.target.elements[0].value // Grabs the search query
    if (search.length) { // Conditional logic in case No Results are returned.
      fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
        .then(res =>
          res.json()
        )
        .then(data => {
          let npsElement = document.getElementById('national-parks')
          if (data.data.length === 0) { // Conditional logic in case No Results are returned.
            return npsElement.innerHTML = 'Your search returned 0 results'
          }
          npsElement.innerHTML = ''
          console.log(data.data)
        })
    } else return npsElement.innerHTML = alert
  }
```

Save your `app.js` file and refresh your page. Search for a National Park (Ex: Washington).

Look in the Console. You should get back data! __Woooooo!__

How is this happening?

1. First, we check to see if we have anything in the search field with the `if` statement.
2. Then we use our API to `fetch` data from NPS’s API endpoint.
3. We get a response but it’s not in the format we can use, so we turn the response into JSON (Javascript Object Notation).
4. Then we perform some more conditional logic to ensure there is actual data being received with another `if` statement.
5. Then we `console.log(data)` the data to show up in the console.


__But how do we get it to display on the Webpage?__

First, there is a lot of data being returned per National Park, way more than we actually need. So we’ll want to only grab the specific data from the National Park that we need in to display or use for other parts of the application. We’ll want to *clean* the data.

### Cleaning the data

Let’s write another function that’s responsible for *cleaning* the data. (only grabbing the data that we want)

There’s a function named `cleanNpsData` already declared.

```javascript
// CLEAN NPS DATA
function cleanNpsData(data) {
  console.log(data)
  // write your code here
}
```

In the `cleanNpsData` function is where we’ll parse out data returned from the National Parks API and only grab the data we want. But first in our `getNpsData` functions let’s pass the `data` that’s being passed into the `console.log(data.data)` and instead pass it into our `cleanNpsData` function and assign that to a variable.

In our `getNpsData` function:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  let npsElement = document.getElementById('national-parks')
  npsElement.innerHTML = loadingJumbo // Shows a loading status.
  let search = event.target.elements[0].value // Grabs the search query.
  if (search.length) { // Conditional logic in case No Results are returned.
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
      .then(res =>
        res.json()
      )
      .then(data => {
        let npsElement = document.getElementById('national-parks')
        if (data.data.length === 0) { // Conditional logic in case No Results are returned.
          return npsElement.innerHTML = 'Your search returned 0 results'
        }
        let cleanData = cleanNpsData(data.data) // Here is where we’re calling the 'cleanupsData' function and assigning it to a variable called 'cleanData'
        npsElement.innerHTML = ''
        console.log(cleanData) // Will print the 'cleanData' variable which should only show the 'img', 'text', 'url', & 'title'
      })
  } else return npsElement.innerHTML = alert
}
```

Next, in our `cleanNpsData` function lets loop through the data (iterate through each National Park) and extract only the data that we want. We only want the `fullName`, `description`,  the `image` url, and the park’s `url` for the time being.

We’re going to also be including a `googleMapUrl` and the `latLong` in the data but right now those two are commented out. We’ll get to those at a later.

After (`cleanNpsData`):
```javascript
// CLEAN NPS DATA
function cleanNpsData(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    let park = {}
    park['title'] = data[i].fullName
    park['text'] = data[i].description
    park['img'] = data[i].images.length ? data[i].images[0].url : 'file:///Users/taprete/us_parks_workshop/assets/bear_in_park.png'
    park['url'] = data[i].url
    // park['googleMapUrl'] = createGoogleMapUrl(data[i].fullName)
    // if (data[i].latLong !== '') {
    //   park['latLong'] = getLatLong(data[i].latLong)
    // }
    nationalParks.push(park)
  }
  return nationalParks
}
```

Refresh your page and search for something like __seattle__ or __oregon__ and see what displays in our Console.

Example Search for `Seattle`:
```js
[
  {
    "img": "https://www.nps.gov/common/uploads/structured_data/3C796968-1DD8-B71B-0B0104B6AE13AEC3.jpg",
    "text": "After surviving a devastating fire and an economic depression, Seattle flourished with the Klondike Gold Rush. As a key port city, merchants supplied would-be Klondike Kings and Queens on their way to Alaska. This cemented Seattle as an anchor of the Pacific Northwest. Today the park is your gateway to learn about the gold rush, explore Seattle area parks, and be involved with the local community.",
    "title": "Klondike Gold Rush - Seattle Unit National Historical Park",
    "url": "https://www.nps.gov/klse/index.htm"
  },
  {
    "img": "https://www.nps.gov/common/uploads/structured_data/3C7A599D-1DD8-B71B-0BBDC12BEC5107B5.jpg”,
    "text": "Less than three hours from Seattle, an alpine landscape beckons. Discover communities of life adapted to moisture in the west and recurring fire in the east. Explore jagged peaks crowned by more than 300 glaciers. Listen to cascading waters in forested valleys. Witness a landscape sensitive to the Earth's changing climate. Help steward the ecological heart of the Cascades.",
    "title": "North Cascades National Park",
    "url": "https://www.nps.gov/noca/index.htm"
  }
]

```

__Great!__ We’re only getting the data that we want. But wait…don’t we want to display each National Park on the Screen?

## Release 2:  Displaying National Parks on the screen/in the DOM (Document Object Model).

Now that we have only the data that we want from each National Park and we’ve assigned all the National Parks to a variable called `cleanData` we can loop through the `cleanData` and display each National Park on the screen (or DOM).

But how do we put the data on the screen? Fortunately, I’ve already created a function called `createCard` that will display the data using the design patterns of a Bootstrap Card. Don’t worry specifically what that means. Just know there’s already a function that will create a ‘card’ of each National Park for us. (You can read about the Bootstrap Card I’m replicating [here](https://getbootstrap.com/docs/4.3/components/card/).

The `createCard` function takes in numerous parameters (`id`, `title`, `text`, `parkImage`, `googleMapUrl`, `url`, `latLong`, & `helperFunctions`). We currently don’t have access to the `googleMapUrl` or the `latLong` values so we’ll assign a default value of `null` & `undefined`. (`googleMapUrl=null` & `latLong=undefined`)

In fact, I created `default values` for all the parameters just in case some National Parks don’t have access to `id`, `title`, `text`, `parkImage`, `googleMapUrl`, `url`, `latLong`, & `helperFunctions`.

Since we already have the `createCard` function created for us now we can use the `createCard` function within our `getNpsData` function.

In our `getNpsData` function, after the `npsElement.innerHTML = ‘’` create a `for loop` that iterates through the `cleanData` variable and appends a National Park card to the `npsElement`.

Before:
```js
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
    event.preventDefault()
    let npsElement = document.getElementById('national-parks')
    npsElement.innerHTML = loadingJumbo // Shows a loading status.
    let search = event.target.elements[0].value // Grabs the search query.
    if (search.length) { // Conditional logic in case No Results are returned.
      fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
        .then(res =>
          res.json()
        )
        .then(data => {
          let npsElement = document.getElementById('national-parks')
          if (data.data.length === 0) { // Conditional logic in case No Results are returned.
            return npsElement.innerHTML = 'Your search returned 0 results'
          }
          let cleanData = cleanNpsData(data.data) // Here is where we’re calling the 'cleanupsData' function and assigning it to a variable called 'cleanData'
          npsElement.innerHTML = ''
          console.log(cleanData) // Will print the 'cleanData' variable which should only show the 'img', 'text', 'url', & 'title'
        })
    } else return npsElement.innerHTML = alert
  }
```

After:
```js
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  let npsElement = document.getElementById('national-parks')
  let clearMap = document.getElementById('i-frame')
  clearMap.innerHTML = ''
  npsElement.innerHTML = loadingJumbo // Shows a loading status
  let search = event.target.elements[0].value // Grabs the search query
  if (search.length) {
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
      .then(res =>
        res.json()
      )
      .then(data => {
        let npsElement = document.getElementById('national-parks')
        if (data.data.length === 0) {
          return npsElement.innerHTML = 'Your search returned 0 results'
        }
        let cleanData = cleanNpsData(data.data)
        npsElement.innerHTML = ''
        for (let i = 0; i < cleanData.length; i++) { // Iterate through the 'cleanData'
          let title = cleanData[i].title // Creating a new variable 'title'
          let text = cleanData[i].text // Creating a new variable 'text'
          let img = cleanData[i].img // Creating a new variable 'img'
          let url = cleanData[i].url // Creating a new variable 'url'
          let latLong = cleanData[i].latLong // Creating a new variable 'latLong'
          let googleMapUrl = cleanData[i].googleMapUrl // Creating a new variable 'googleMapUrl'
          npsElement.appendChild(createCard(i, title, text, img, googleMapUrl, url, latLong, helperFunctions)) // Passing in the cleanData values to the 'createCard' function and appending each Card to the 'npsElement
        }

      })
  } else return npsElement.innerHTML = alert
}
```

__If you’ve done it correctly go ahead and search for a National Park in `California` or `Illinois` and watch the National Parks show up on the screen!__

__You’ve just created an application!__

## Release 3:  Displaying a Google Map of the National Park.

Now that we have the National Parks showing up. Let’s look at what is included in each National Park Card. We have an Image, a Title, a short description about the National Park and two buttons, Website & View Map. If we inspect our data, the `img` is a url to the image that’s being displayed, the `title` is the bolded Card Title, the `text` is the short description of the National Park on the Card. Lastly, if we click on the __Website__ button it should open a new tab that will take us the the NPS Website of the National Park we clicked on. This is the `url` that we passed in.

That’s awesome! However, we have a __View Map__ button and when we click on it nothing happens.

### Google Maps API

Let's incorporate getting Google Maps into our application. First, visit https://developers.google.com/maps/documentation/ and click "Maps Embed API". You can read through all of the documentation on your own. For our pursoses, you get to go down to "Get an API Key" to get an API key. This is a unique key associated with your developer account for billing/usage purposes. You have public/private API keys - the public one is the key you'll put in the URL for most GET requests. The private key is what you'll send encoded for POST requests. If you are getting charged money for using an API, you'll have a private key that you want to protect. If anyone gets a hold of your private key, they can impersonate you and you can get charged boatloads of money. Public keys are public - don't worry about protecting these. Companies generally give public keys when they don't charge for a service (like Google Maps).

After you register for an API key, copy and paste the API and put it into your `app.js` file in the `GOOGLE_MAPS_API` variable like we did for the `NPS_API`.

Example:
```js
const GOOGLE_MAPS_API = 'AIzaSyDBtD…fill in the reset’
```

To incorporate a The Google Map into our application we need to include a Google Maps URL as the `src` attribute of an `iframe` HTML element .

It looks something like this for the Seattle Space Needle:
```js
<iframe
  width="600"
  height="450"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API}
    &q=Space+Needle,Seattle+WA" allowfullscreen>
</iframe>
```

However, in place of the Seattle Space Needle we need to include the name of the National Park we want to Map.

First, We need to use the `title` of `cleanData` and manipulate it to include pluses `+` like `Space+Needle,Seattle+WA`. As seen in the above code snippet. We have to do this because URLs don’t like spaces in them. Fortunately, we have a function called `createGoogleMapUrl` that takes in a `title` parameter and the output will be the url needed for the `src` attribute of the `<iframe>`.
Ex url: `https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API}&q={modified_title}`

First, in our `createGoogleMapUrl` function there should be a `console.log(title)`.

In your `createGoogleMaps` function:
```js
// CREATE GOOGLE MAP URL
function createGoogleMapUrl(title) {
  console.log("Create Google Map URL...")
  // write your code here
}
```

Then in our `cleanNpsData` function __uncomment__ the `park['googleMapUrl'] = createGoogleMapUrl(data[i].fullName)` so we can call the `createGoogleMapUrl` function and pass in the original data’s `fullName`, we renamed it  `title` to clean it up.

Refresh your application and make a search for a National Park. Look in the Console and you will see the `fullName` or `title` of the National Park you searched for!

__GREAT!__

Now for the _hard_ part. We need to take the title of the National Park and replace the spaces in the title with pluses `+`.

Example Before: `George Rogers Clark National Historical Park`

Example After: `George+Rogers+Clark+National+Historical+Park`

Fortunately, there is a built in methodthat will help us do that. It’s called the `replace()` method. This method will replace certain portions of a string with whatever we want it to. Again, we need to replace spaces with pluses `+`.  I’ve also noticed that there are some `title`s with the `&` sign. URLs don’t like the `&` sign either, so we’ll have to use the `replace` method to replace the `&` sign with the word `and`.

Once we have a title that has replaced all the spaces with pluses and all the ‘&’ signs with the word `and` we can create a Google Maps URL that we’ll use to display the map of where the National Park is located.

`createGoogleMapUrl` function after:
```js
// CREATE GOOGLE MAP URL
function createGoogleMapUrl(title) {
  var modifiedTitle = title.replace(/ /g, '+') // Uses Regex to replaces spaces with '+'
  var modifiedTitle = modifiedTitle.replace(/&/g, 'and') // Uses Regex to replaces & sign with 'and'
  let googleMapUrl = `https://www.google.com/maps/embed/v1/place?q=${modifiedTitle}&key=${GOOGLE_MAPS_API}` // Inserts the modifiedTitle variable and the GOOGLE MAPS API in the url using string interpolation
  return googleMapUrl //returns the googleMapUrl
}
```

Next, refresh your page and search for a National Park and click on the ‘View Map’ button. In the console you should see a ‘Clicked View Map...’ being printed. This is being executed via an `onclick` event every time the ‘View Map’ button is being clicked. This onclick function is being executed within the `createCard` function when the `onclick` function is being called on the`mapButton` element.  Within this function we want to execute a `displayMap` function that we’ll have to create that’s a key in our `helperFunctions` object.

`mapButton.onclick` function within the `createCard` function:
```js
  // ONCLICK RUNS DISPLAY MAP
  mapButton.onclick = () => {
    console.log('Clicked View Map...')
    // write your code here
  }
```

`displayMap` key in our `helperFunction` object:
```js
// HELPER FUNCTIONS
let helperFunctions = {
  // DISPLAY MAP ON SCREEN
  'displayMap': () => {
    console.log("Display Map...")
    // write your code here
  },
```

In our `mapButton.onclick` function return `helperFunction.displayMap(googleMapUrl)`. We’re passing in the `googleMapUrl` that we generated and are passing it into the `createCard` function which then passes it into the `helperFunction.displayMap` function.

`mapButton.onclick` after:
```js
  // ONCLICK RUNS DISPLAY MAP
  mapButton.onclick = () => {
    console.log('Clicked View Map...')
    // write your code here
    return helperFunctions.displayMap(googleMapUrl)
  }
```

Refresh your page and search for a National Park and click the ‘View Map’ button again and look in the console. You should see a `Clicked View Map…` and a `Display Map…` being printed. The `Display Map…` is coming from the `displayMap` key located in the `helperFunctions` object. NOTE: An object key can have what is called an anonymous function as its value. Like it does here.

Within the `displayMap` function we’ll want to get an HTML element by it’s id and add an `iframe` element that will include the `googleMapUrl` as its source. In our `index.html` file there is a `<div id=‘i-frame’>`. Within the `displayMap` function, we want to grab that element by its `id` and assign it to a variable.

Example:
```js
  // DISPLAY MAP ON SCREEN
  'displayMap': (googleMapUrl) => {
    console.log("Display Map...")
    // write your code here
    let map = document.getElementById('i-frame') //
  },
```

Next we can use string interpolation to make that `id`’s `innerHTML` = the `<iframe ` while including the `googleMapUrl` in the source.

After:
```js
  // DISPLAY MAP ON SCREEN
  'displayMap': (googleMapUrl) => {
    console.log("Display Map...")
    // write your code here
    let map = document.getElementById('i-frame')
    window.scrollTo(0,0) // Automatically scrolls to the top of the page.
    map.innerHTML = `<iframe width='1000' height='750' frameborder='0' style='border:0'
    src='${googleMapUrl}' allowfullscreen></iframe>`
  },
```

Save your `app.js` file and refresh your screen. Search for a National Park. If you’ve done everything correctly up until this point once the National Parks show up on the screen click on ‘View Map’ and you should autoscroll the top of the page and a Google Map of the National Park you click on should show!

_(NOTE: Google Maps might not be able to locate the National Park based off of its title and it will just show a Google Map of the world. This is known as an edge case and we’d normally address it. But for timing purposes we will not worry about it for the moment. But think about how you might handle this edge case.)_

### You’re doing great!

## STRETCH GOAL: Getting Weather Data of the National Park and Displaying it.

If you’ve done everything correctly up until this point you’ve managed to use __TWO__ API’s to get data, parsed/cleaned the data, and then managed to display them to the screen. This is a lot! A lot of developers would have a difficult time just doing one of these. You managed to do both!

The following instructions will be less indepth to see if you can figure out how to make an API call (similar to that of the National Parks Service API) and then display the data to the screen.

For our stretch goal we’re going to try and use a weather API. In order to do so we need to get the Latitude and Longitude from the National Park’s data, parse the data into something the weather API can use, then make an API call to the weather API, then use the data we get back from the weather API to display the current temperature and a graphic on the screen.

In order to get weather data from the National Parks we need a Weather API. In our case, we’re going to use Dark Sky’s free weather API. You’ll need to [Signup](https://darksky.net/dev/register) to get an API. Once you Signup and Login to Dark Sky you’ll see your SECRET KEY.

At the top of the `app.js` file there is a variable called `darkSkyUrl` with a value of `'https://api.darksky.net/forecast/YOUR_DARK_SKI_API/'`

Please replace the `YOUR_DARK_SKI_API` with your actual Dark Sky API

After:
```js
const darkSkyUrl = `https://api.darksky.net/forecast/2699e...the rest of your api/‘
```

In your Dark Sky account you’ll also see an example of an __Sample API Call__ to retrieve weather data.

Sample API Call:
```js
https://api.darksky.net/forecast/2699e...the rest of your api/37.8267,-122.4233
```

If you click on the Sample API Call it will open a new tab in your browser and display JSON data (Javascript Object Notation). This is how the data will look when you get the weather for you National Park. Notice at the very top there is a `latitude` and `longitude`. In the data we get back from the National Park API (before we clean it) there is a `latlong:` key with a latitude and longitude string value.

Dark Sky Sample API Call:
```js
{
"latitude": 37.8267,
"longitude": -122.4233,
"timezone": "America/Los_Angeles",
"currently": {
	"time": 1573160412,
	"summary": "Mostly Cloudy",
	"icon": "partly-cloudy-day",
	"nearestStormDistance": 19,
	"nearestStormBearing": 344,
	…
```

National Park Service Example API Call:
```js
{
"states": "ME",
"latLong": "lat:44.30777545, long:-68.30063316", // <- HERE IS THE LATITUDE AND LONGITUDE
"description": "Acadia National Park protects the natural beauty of the highest rocky headlands along the Atlantic coastline of the United States, an abundance of habitats, and a rich cultural heritage. At 3.5 million visits a year, it's one of the top 10 most-visited national parks in the United States. Visitors enjoy 27 miles of historic motor roads, 158 miles of hiking trails, and 45 miles of carriage roads.",
"designation": "National Park",
"parkCode": "acad",
"name": "Acadia"
}
```

In our `cleanNpsData` function there is some commented out code. There’s an `if` statement that will run __IF__ the `latLong` has a value in the NPS Data. If it does then this piece of code will be executed. This piece of code will then call another function called `getLatLong` which will parse the `"lat:44.30777545, long:-68.30063316”` string into an array where the value at index 0 of the array is the latitude and the value at index 1 is the longitude (Ex: `[44.30777545,-68.30063316]. We’ll also convert the string into a number data type.

`getLatLong` function:
```js
// FORMATS LATITUDE AND LONGITUDE
function getLatLong(latLong) {
  console.log("Parsing latitude and longitude...")
  // write your code here
  const location = latLong.split(/[,:]/mg) // Splits the string at commas and colons
  return [+location[1], +location[3]]
}
```

`cleanNpsData` function:
```js
// CLEAN NPS DATA
function cleanNpsData(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data)
    let park = {} // The park object
    park['title'] = data[i].fullName
    park['text'] = data[i].description
    park['img'] = data[i].images.length ? data[i].images[0].url : 'file:///Users/taprete/us_parks_workshop/assets/bear_in_park.png'
    park['url'] = data[i].url
    park['googleMapUrl'] = createGoogleMapUrl(data[i].fullName)
    if (data[i].latLong !== '') { // Will execute this code if 'latLong' has a value
       park['latLong'] = getLatLong(data[i].latLong) // Assigns a 'latLong' key to the park object and executes 'getLatLong' function that parses the latitude and longitude into something the Dark Sky API can use
     }
    nationalParks.push(park)
  }
  return nationalParks
}
```

If you save your `app.js` file, refresh your page, and search for a National Park there should be a ‘View Weather’ button that shows if applicable (if there is no latitude and longitude a button will not show). If you click on the ‘View Weather’ button nothing happens on the screen but in the console it should say “Clicked View Weather button…”. There is another `onclick` event handler similar to that of `mapButton.onclick`s handler.

In the `weatherButton.onclick` handler is where we’ll call both `getWeatherData` and `displayWeather` functions located in the `helperFunctions` object.

First we need to write the `getWeatherData` function and the `weatherButton.onclick` function.

### See if you can on your own.

#### HINT:

`getWeatherData` function:
```js
  // GET WEATHER DATA
  'getWeatherData': async (lat, long) => {
    console.log("Get weather data...")
    // write your code here
    let targetElement = document.getElementById('weather')
    targetElement.innerHTML = ''
    targetElement.innerHTML = loadingWeather
    if (lat !== undefined || long !== undefined) {
      let response = await fetch(`${proxy}${darkSkyUrl}${lat},${long}`) // Making API call using Dark Sky's API
      let data = response.json() // Formating the Weather Data we get back from to JSON format
      return data // Returning the Weather Data
    } else { // If no weather data is returned execute this code
      return {'response': 'No weather data available'}
    }
  },
```

`displayWeather` function:
```js
  // DISPLAY WEATHER ON SCREEN
  'displayWeather': (data) => {
    console.log('Display weather data...')
    console.log(data)
    let icon = data.currently.icon
    let targetElement = document.getElementById('weather')
    window.scrollTo(0, 0)
    targetElement.innerHTML = ''
    let degreeNode = document.createElement('h1')
    let imageNode = document.createElement('img')
    imageNode.setAttribute('src', images[icon])
    imageNode.setAttribute('height', '200px')
    imageNode.setAttribute('width', '200px')
    imageNode.setAttribute('alt', 'this is an image')
    targetElement.appendChild(degreeNode).innerHTML = `${data.currently.summary} and ${Math.round(data.currently.temperature)} degress F`
    targetElement.appendChild(imageNode)
  }
```

`weatherButton.onclick` function:
```js
    // ONCLICK GETS WEATHER AND DISPLAYS WEATHER
    weatherButton.onclick =  async () => {
      window.scrollTo(0,0)
      let weatherData = await helperFunctions.getWeatherData(latLong[0], latLong[1]) // Passes in Latitude and Longitude as parameters
      console.log("DATA: ", weatherData)
      helperFunctions.displayWeather(weatherData) // Passes in the 'weatherData' received by the weather API into the 'displayWeather' function
    }
```

After you’ve written those functions save your `app.js` file, refresh your page, search for a National Park and click the ‘View Weather’ button and you should see the Temperature and _maybe_ a weather icon. (make sure your weather `images` or are using the correct directory path)

## CONGRATULATIONS! YOU’VE COMPLETED A PRETTY COOL APPLICATION!

### What will you build next?
