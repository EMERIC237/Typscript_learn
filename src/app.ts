import axios from "axios";
const form = document.querySelector("form");
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyDog74oxvennQ9Q2zQ2yO0sfeZZZN7LXGM";
function searchAddressHandler(event: Event) {
  event.preventDefault();

  type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
  };

  const enteredAdress = addressInput.value;
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAdress
      )}&key=${GOOGLE_API_KEY}
  `
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("could not fetch location");
      }
      const coordinates = response.data.results[0].geometry.location;
      console.log({ coordinates });
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 15,
        mapTypeId: "satellite",
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });

  //send the address to google  API
}

form?.addEventListener("submit", searchAddressHandler);
