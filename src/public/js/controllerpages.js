import tiendasUbicacion from '../shops.json' assert {type: 'json'};

addEventListener("DOMContentLoaded", (event) => {
  const nuevaMercancia = document.getElementById("nueva-mercancia");
  const textEmprender = document.querySelector('.text-emprender');
  const videoContainer = document.querySelector('.video-container');
  const loadSectionNuevaMercancia = (entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        if(entrada.target.classList.contains('video-container')){
            entrada.target.classList.add("video-container-animation");
        }
        else
        entrada.target.classList.add("is-visible");  
      }
      else{
        entrada.target.classList.remove("is-visible");
      }
    });
  };

  const observer = new IntersectionObserver(loadSectionNuevaMercancia, {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  });

  observer.observe(nuevaMercancia);
  observer.observe(textEmprender);
  observer.observe(videoContainer);

  /*------------------------------------------------------------------*/
  const renderMap = function () {
    
    const iconoTienda = L.icon({
      iconUrl: "/img/alfilerCastillo.png",
      shadowUrl: "/img/alfilerCastilloShadow.png",

      iconSize: [23, 50], // size of the icon
      shadowSize: [28, 23], // size of the shadow
      iconAnchor: [19, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [3.5, 22], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    const map = L.map("map").setView([9.87538, -67.34479], 6);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    tiendasUbicacion.forEach((tienda) => {
      L.marker(tienda.coord, {icon: iconoTienda})
        .addTo(map)
        .bindPopup(
          "<span>Sede:</span> " +
            tienda.sede +
            "<br> <span>Ciudad: </span>" +
            tienda.ciudad +
            "<br> <span>Estado: </span>" +
            tienda.estado +
            "<hr>" +
            '<img src="img/sedes/valle-de-la-pascua.jpg" style="width:100%"></img>' +
            "<br> <p><span>Direccion: </span>Av. Principal Jardín la Pascua, Valle de la Pascua 2350, Guárico.</p>",
          { minWidth: 200 }
        );
    });

    const sedes = tiendasUbicacion.map(
      (obj) => `${obj.sede}  /  Ciudad: ${obj.ciudad}  /  Estado: ${obj.estado}`
    );
    const sedesCoords = tiendasUbicacion.map((obj) => obj.coord);

    const input = document.getElementById("testinput");

    const findCoords = function (e) {
      if (e.key === "Enter") {
        const i = sedes.findIndex((sede) => sede.includes(this.value));
        map.flyTo(sedesCoords[i], 15);
      }
    };

    const items = sedes.map(function (n) {
      return { label: n, group: "Sedes" };
    });
    const allowedChars = new RegExp(/^[a-zA-Z\s]+$/);

    function charsAllowed(value) {
      return allowedChars.test(value);
    }

    autocomplete({
      input: input,
      minLength: 2,
      onSelect: function (item, inputfield) {
        inputfield.value = item.label.slice(0, item.label.indexOf("/") - 2);
      },
      fetch: function (text, callback) {
        var match = text.toLowerCase();
        callback(
          items.filter(function (n) {
            return n.label.toLowerCase().indexOf(match) !== -1;
          })
        );
      },
      render: function (item, value) {
        var itemElement = document.createElement("div");
        if (charsAllowed(value)) {
          var regex = new RegExp(value, "gi");
          var inner = item.label
            .replace(regex, function (match) {
              return "<strong>" + match + "</strong>";
            })
            .replace(/\b(?:Ciudad|Estado)\b/gi, function (match) {
              return "<span class='span-list'>" + match + "</span>";
            });
          itemElement.innerHTML = inner;
        } else {
          itemElement.textContent = item.label;
        }
        return itemElement;
      },
      emptyMsg: "Sede no encontrada",
    });

    input.addEventListener("keypress", findCoords);
  };

  let renderedMap = false;
  const renderingMap = function () {
    if (!renderedMap) setTimeout(renderMap, 1000);
    renderedMap = true;
  };

  document.getElementById("button").addEventListener("click", renderingMap);

  if (renderedMap) {
    document
      .getElementById("button")
      .removeEventListener("click", renderingMap);
  }
});

//---------------------------------------------------------------------------------------------
