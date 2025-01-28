
const API_KEY = "eccf8200898239c01b81626293da9f1d"; 

/**
 * 
 * @param {string} cityName
 * @returns {Promise<{lat: number, lon: number, name: string, state?: string, country?: string}>}
 */
function getCoordinates(cityName) {
  const urlGeo = `https://api.openweathermap.org/geo/1.0/direct`
               + `?q=${encodeURIComponent(cityName)}`
               + `&limit=1`
               + `&appid=${API_KEY}`;

  return fetch(urlGeo)
    .then(resp => resp.json())
    .then(data => {
      if (!data || data.length === 0) {
        throw new Error("Ville non trouvée via la géocodage OWM");
      }
      return data[0]; 
    });
}

/**
 * 2) Récupère la météo via l'API "weather" d’OpenWeatherMap
 *    selon lat/lon fournis par la fonction getCoordinates
 @param {string} cityName
 @returns {Promise<{temp, description, icon}>}
 */
function getWeather(cityName) {
  return getCoordinates(cityName)
    .then(location => {
      const lat = location.lat;
      const lon = location.lon;
      const officialName = location.name; 
      const country = location.country;   

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather`
                       + `?lat=${lat}&lon=${lon}`
                       + `&appid=${API_KEY}`
                       + `&units=metric`
                       + `&lang=fr`;

      return fetch(urlWeather)
        .then(resp => resp.json())
        .then(data => {
          if (!data || !data.main) {
            throw new Error("Pas de data weather pour cette localisation");
          }

          const tempC = data.main.temp;                     // en °C
          const desc = data.weather[0].description;       
          const icon = data.weather[0].icon;                
          const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          return {
            city: officialName,
            country: country,
            temp: tempC,
            description: desc,
            iconUrl
          };
        });
    });
}

function displayWeather(cityName) {
  getWeather(cityName)
    .then(result => {
      console.log("Météo reçue :", result);

      const eltVilleChoisie = document.getElementById("ville-choisie");
      const eltMeteo = document.getElementById("meteo");
      const eltIcone = document.getElementById("icone");

      eltVilleChoisie.textContent = `${result.city} (${result.country})`;
      eltMeteo.textContent = `Température : ${result.temp}°C, ${result.description}`;
      eltIcone.src = result.iconUrl;
      eltIcone.alt = result.description;
    })
    .catch(err => {
      console.error("Erreur dans displayWeather:", err);
      alert("Erreur : " + err.message);
    });
}

window.addEventListener("load", function() {
  const selectVille = document.getElementById("select-ville");
  const inputVille = document.getElementById("input-ville");
  const btnSearch  = document.getElementById("btn-search");

  selectVille.addEventListener("change", () => {
    const ville = selectVille.value;
    displayWeather(ville);
  });

  btnSearch.addEventListener("click", () => {
    const villeTapee = inputVille.value.trim();
    if (villeTapee !== "") {
      displayWeather(villeTapee);
    } else {
      alert("Veuillez saisir un nom de ville.");
    }
  });

  displayWeather(selectVille.value);
});
