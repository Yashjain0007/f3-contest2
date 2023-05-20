let whiteContainer = document.getElementById("white-container");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}
const apiKey = `48b45c8c4e054ad1aa4b28309e46de77`;
async function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  if (data.length !== 0) {
    let name = data.results[0].timezone.name;
    let offsetStd = data.results[0].timezone.offset_STD;
    let stdSec = data.results[0].timezone.offset_STD_seconds;
    let offsetDst = data.results[0].timezone.offset_DST;
    let dstsec = data.results[0].timezone.offset_DST_seconds;
    let country = data.results[0].country;
    let city = data.results[0].city;
    whiteContainer.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                <div class="lonspan"><span>Lat : ${lat}</span><span>&nbsp &nbsp &nbsp &nbspLong : ${long}</span></div>
                                <div>Offset STD : ${offsetStd}</div>
                                <div>Offset STD Seconds : ${stdSec}</div>
                                <div>Offset DST : ${offsetDst}</div
                                <div>Offset DST Seconds : ${dstsec}</div>
                                <div>Country : ${country}</div>
                                <div>Postcode : 
                                <div>City : ${city}</div>`;
  } else {
    alert("No location found");
  }
}

const input = document.getElementById("input");
let result = document.getElementById("result");
let error = document.querySelector(".error");
let resultcontainer = document.querySelector(".resultcontainer");

async function inputAddress() {
  if (input.value) {
    if (error.style.display === "block") {
      error.style.display = "none";
    }
    let address = input.value;
    let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.features.length !== 0) {
      result.innerHTML = "";
      resultcontainer.style.display = "block";
      let name = data.features[0].properties.timezone.name;
      let lat = data.features[0].properties.lat;
      let longi = data.features[0].properties.lon;
      let offsetStd = data.features[0].properties.timezone.offset_STD;
      let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
      let offsetDst = data.features[0].properties.timezone.offset_DST;
      let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
      let country = data.features[0].country;
      let city = data.features[0].city;
      error.style.display = "none";
      result.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                    <div class="lonspan"><span>Lat : ${lat}</span>&nbsp &nbsp &nbsp<span>Long : ${longi}</span></div>
                                    <div>Offset STD : ${offsetStd}</div>
                                    <div>Offset STD Seconds : ${stdsec}</div>
                                    <div>Offset DST : ${offsetDst}</div
                                    <div>Offset DST Seconds : ${dstsec}</div>
                                    <div>Country : ${country}</div>
                                    <div>City : ${city}</div>`;
    } else {
      error.style.display = "block";
      resultcontainer.style.display = "none";
    }
  } else {
    if (resultcontainer.style.display === "block") {
      resultcontainer.style.display = "none";
    }
    error.style.display = "block";
  }
}
