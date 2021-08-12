const input = document.querySelector('#search');
const btn = document.querySelector('#submit');

// ================= CREATE MAP =================
// https://leafletjs.com/examples/quick-start/

let mymap = L.map('map').setView([52.37403, 4.88969], 13);
let marker = L.marker([52.37403, 4.88969]).addTo(mymap);

marker.bindPopup(`IP Address: <b>192.210.175.100</b><br>Location: <b>Amsterdam, NL </b>`);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW5uYXNlcmVnaSIsImEiOiJja2g0eG15dzAwY3pyMnpvOWExYzQ5eHFoIn0.R477kJxFENpSygYtn-RPEA'
}).addTo(mymap);

// ================= CREATE MAP =================

function getInput() {
  const ip = input.value;

  const key = 'at_PTT02duq568yvroOy4kGIKShZbbpR'
  const url = `https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`;

  fetchData(url);
  input.value = '';
}

// ================= FETCH DATA =================

async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();

    console.log(response.statusText)
    if (response.statusText !== 'OK') {
      alert(`Sorry, the IP address or domain you've entered does not exist. Try an other search! `)
    }
    
    const { ip, location, isp} = data;

    setResults(ip, location.city, location.postalCode, location.timezone, isp, location.country);
    setMap(location.lat, location.lng, ip, location.city, location.country);
}

// ================= UPDATE DOM WITH RESULTS =================

function setResults(ip, city, postcode, utc, isp, country) {
  const ip_address = document.querySelector('#IP');
  const location = document.querySelector('#location');
  const timezone = document.querySelector('#timezone');
  const provider = document.querySelector('#ISP');

  ip_address.innerText = `${ip}`;
  location.innerText = `${city}, ${country} ${postcode ? postcode : country}`;
  timezone.innerText = `UTC ${utc}`;
  provider.innerText = `${isp}`;
}

// ================= SET MAP AND MARKER WITH NEW SEARCH =================

function setMap(lat, lng, ip, city, country) {
  mymap.setView([lat, lng]);
  marker = L.marker([lat, lng]).addTo(mymap);
  marker.bindPopup(`IP Address: <b>${ip}</b><br>Location: <b>${city}, ${country}</b>`);
}

// ================= EVENT LISTENERS =================
btn.addEventListener('click', () => {
  getInput();
})

input.addEventListener('search', () => {
  getInput();
})