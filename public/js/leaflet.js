/* eslint-disable */
export const displayMap = (locations) => {
  // Leaflet map setup
  const map = L.map('map').setView([31.111745, -118.113491], 5);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 10,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Create markers and add to map
  const markerArray = [];
  locations.forEach((loc) => {
    const reversedArr = [...loc.coordinates].reverse();
    const myIcon = L.icon({
      iconUrl: './../img/pin.png',
      iconSize: [32, 40],
      iconAnchor: [15, 35],
    });
    L.marker(reversedArr, { icon: myIcon })
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        offset: [0, -30],
      })
      .addTo(map);
    markerArray.push(reversedArr);
  });

  // remove zooming and the zoomcontrols
  map.scrollWheelZoom.disable();
  map.zoomControl.remove();

  const bounds = L.latLngBounds(markerArray);
  map.fitBounds(bounds, {
    padding: [100, 100],
  });
};
