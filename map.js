// 1) Karte initialisieren (Köln Zentrum)
const map = L.map("map",{scrollWheelZoom: false}).setView([50.9375, 6.9603], 11); // 11 is good starting zoom level for us

// 2) Kartenlayer / Baselayer (OpenStreetMap) min + max Zoom
var osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 10, maxZoom: 19, // The higher, the more detailed
  attribution: '&copy; OpenStreetMap-Mitwirkende'
});
osmLayer.addTo(map);

// 3) Orte definieren
const PlacesCologne = [
  {
    name: "Dellbrück im Bürgertreff 1006",
    lat: 50.978559,
    lon: 7.070426,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Dellbrueck.webp",
    link: "https://reparaturcafekoelndellbrueck.webador.de/",
    text: "Reparatur Café<br>Jeden <strong>1.&nbsp;Montag</strong> im Monat<br>von 16:00 bis 19:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Bergisch+Gladbacher+Str.+1006,+51069+Mülheim"
  },
  {
    name: "Riehl im Riehler Treff der SBK",
    lat: 50.96694,
    lon: 6.98406,
    opacity: 0.6,
    img: "https://www.repaircafe-koeln.de/pictures/640/Riehl.jpg",
    link: "https://sbk-koeln.de/angebote/wohnen-pflege/freizeit/riehler-treff/",
    text: "Reparatur-Café<br>Jeden <strong>1.&nbsp;Montag</strong> im Monat<br>von 10:00 bis 12:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Boltensternstraße+16,+50735+Nippes"
  },
  {
    name: "Raderthal im Gemeindesaal Philippuskirche",
    lat: 50.90250,
    lon: 6.95085,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Raderthal.jpg",
    link: "https://www.kirche-raderthal.de/angebote/repairinitiative/",
    text: "Repair Initiative<br>Jeden <strong>1.&nbsp;Mittwoch</strong> im Monat<br>von 18:00 bis 20:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Albert-Schweitzer-Straße+3-5,+50968+Köln-Rodenkirchen"
  },
  {
    name: "Chorweiler im Bürgerzentrum",
    lat: 51.02253,
    lon: 6.89970,
    opacity: 0.6,
    img: "https://www.repaircafe-koeln.de/pictures/640/Chorweiler.jpg",
    link: "https://chorweiler.sozialraumkoordination.koeln/2846/3764.html",
    text: "Repair Café<br>Jeden <strong>1.&nbsp;Donnerstag</strong> im Monat<br>von 15:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Pariser+Passage+1,+50765+Chorweiler"
  },
  {
    name: "Westhoven im Bürgerzentrum Engelshof",
    lat: 50.900233,
    lon: 7.021326,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/engelshof/pictures/640/Engelshof_1.jpg",
    link: "https://www.repaircafe-koeln.de/engelshof",
    text: "Veedelswerkstatt<br>Jeden <strong>1.&nbsp;Donnerstag</strong> im Monat<br>von 15:00 bis 18:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Oberstraße+96,+51149+Porz"
  },
  {
    name: "Poll im Quartier am Hafen",
    lat: 50.91698,
    lon: 6.98394,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/poll/pictures/640/Poll.jpg",
    link: "https://www.repaircafe-koeln.de/poll",
    text: "Repair Café<br>Jeden <strong>1.&nbsp;Samstag</strong> im Monat<br>von 13:00 bis 18:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Poller+Kirchweg+78-90,+51105+Porz"
  },
  {
    name: "Widdersdorf im Pfarrheim",
    lat: 50.96392,
    lon: 6.82737,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/widdersdorf/pictures/640/Widdersdorf.jpg",
    link: "https://www.repaircafe-koeln.de/widdersdorf/",
    text: "Repair Café<br>Jeden <strong>2.&nbsp;Mittwoch</strong> im Monat<br>von 15:30 bis 18:30",
    route: "https://www.google.de/maps/dir/?api=1&destination=Hauptstraße+10,+50859+Lindenthal"
  },
  {
    name: "Mauenheim im Clubraum St. Quirinus",
    lat: 50.973467,
    lon: 6.943510,
    opacity: 0.6,
    img: "https://www.repaircafe-koeln.de/pictures/640/Mauenheim.jpg",
    link: "https://reparaturcafe-mauenheim.de/",
    text: "Reparatur Café<br>Jeden <strong>2.&nbsp;Donnerstag</strong> im Monat<br>von 15:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Bergstraße+87,+50739+Nippes"
  },
  {
    name: "Südstadt im Bürgerhaus Stollwerk",
    lat: 50.925310,
    lon: 6.964468,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Stollwerk.jpg",
    link: "https://repair-cafe-koeln-suedstadt.de/",
    text: "Repair Café<br>Jeden <strong>2.&nbsp;Sonntag</strong> im Monat<br>von 14:00 bis 19:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Dreikönigenstraße+23,+50678+Köln"
  },
  {
    name: "Sülz bei Schmitz und Kunzt",
    lat: 50.91316,
    lon: 6.92438,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Stollwerk.jpg",
    link: "https://www.schmitzundkunzt.de/repair.php",
    text: "Repair Café<br>Jeden <strong>2.&nbsp;+&nbsp;4.&nbsp;Sonntag</strong> im Monat<br>von 11:30 bis 15:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Luxemburger+Str.+284A,+50937+Lindenthal"
  },
  {
    name: "Lindweiler im Libützje",
    lat: 51.003010,
    lon: 6.889118,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Lindweiler.jpg",
    link: "https://www.bv-lindweiler.de/locations/libuetzje/",
    text: "Repair Café<br>Jeden <strong>3.&nbsp;Mittwoch</strong> im Monat<br>von 17:00 bis 19:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Marienberger+Weg+19,+50767+Chorweiler"
  },
  {
    name: "Ehrenfeld im Bürgerzentrum",
    lat: 50.952920,
    lon: 6.912313,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Ehrenfeld.jpg",
    link: "https://www.repaircafe-koeln.de/bueze",
    text: "Repair Café<br>Jeden <strong>3.&nbsp;Samstag</strong> im Monat<br>von 11:00 bis 15:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Venloer+Str.+429,+50825+Ehrenfeld"
  },
    {
    name: "Innenstadt in der Zentrabibliothek",
    lat: 50.93710,
    lon: 6.95662,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Zentralbibliothek.jpg",
    link: "https://www.stadt-koeln.de/leben-in-koeln/stadtbibliothek/repair-cafes",
    text: "Repair Café<br>Jeden <strong>4.&nbsp;Samstag</strong> im Monat<br>von 11:00 bis 15:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Hohe+Str.+68-82,+50667+Köln"
  },
  {
    name: "Worringen im AWO-Haus",
    lat: 51.06309,
    lon: 6.86279,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Worringen.jpg",
    link: "https://www.reparatur-initiativen.de/repair-cafe-worringen",
    text: "Repair Café<br>Jeden <strong>4.&nbsp;Samstag</strong> im Monat von 14:00 bis 16:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Sankt-Tönnis-Straße+65,+50769+Chorweiler"
  },
  {
    name: "Ehrenfeld im Gemeindezentrum Stephanus",
    lat: 50.95365,
    lon: 6.92201,
    opacity: 0.6,
    img: "https://www.repaircafe-koeln.de/pictures/640/Stephanus.jpg",
    link: "https://www.evangelisch-ehrenfeld.de/veranstaltungen/",
    text: "Repair Café<br>Jeden <strong>letzten Mittwoch</strong> im Monat<br>von 15:00 bis 17:30",
    route: "https://www.google.de/maps/dir/?api=1&destination=Subbelrather+Str.+206-210,+50823+Ehrenfeld"
  },
  {
    name: "Nippes, Wunschnachbarn im Clouth Quartier",
    lat: 50.96560,
    lon: 6.96256,
    opacity: 1.0,
    img: "https://wunschnachbarn.de/wp-content/uploads/2019/04/werkstatt1-e1555698431792.jpeg",
    link: "https://wunschnachbarn.de/werkstatt/",
    text: "Repair Café und Werkstatt<br>Jeden <strong>letzten Freitag</strong> im Monat<br>von 15:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Auf+dem+Stahlseil+7,+50733+Nippes"
  },
  {
    name: "Sülz im Café Lamerdin",
    lat: 50.91786,
    lon: 6.92659,
    opacity: 0.4, // Keine online Infos
    img: "https://www.repaircafe-koeln.de/pictures/640/Suelz.jpg",
    link: "https://kirche-klettenberg.de/seniorennetzwerk/aktuelles-programm/",
    text: "Repair Café und Nähwerkstatt<br>Jeden <strong>1.&nbsp;Samstag</strong> im Monat von 11:00 bis 13:00.<br>Termin im Zweifel vorher unter 9440-1388 erfragen",
    route: "https://www.google.de/maps/dir/?api=1&destination=Levin-Haus,+Wittekindstraße,+50937+Lindenthal"
  },
    {
    name: "3D Druck im Museum für Angewandte Kunst Köln",
    lat: 50.93991,
    lon: 6.95455,
    opacity: 0.4,
    img: "https://www.repaircafe-koeln.de/pictures/640/MAKK.jpg",
    link: "https://www.museen.koeln/besuchen/veranstaltungen?date=2026-05&ftype=150&search=repair/",
    text: "3D Druck Repair Café - Termine siehe Webseite",
    route: "https://www.google.de/maps/dir/?api=1&destination=Museum+für+Angewandte+Kunst+Köln,+An+d.+Rechtschule+7,+50667+Köln"
  }
];


const FahrradSelbsthilfePlaces = [
  {
    name: "Fahrrad-Selsthilfe-Werkstatt mit Team Turbo",
    lat: 50.95848,
    lon: 6.94081,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Liebig_Fahrrad.jpg",
    link: "https://klugev.de/projekte/liebig257/",
    text: "Fahrrad Selbsthilfe<br>Jeden <strong>Samstag</strong> von 12:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Liebigstraße+257,+50739+Nippes"
  },
  {
    name: "Bickendorfer Fahrradbuedchen",
    lat: 50.96579,
    lon: 6.88644,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Fahrradbuedchen.jpg",
    link: "https://aktion-nachbarschaft.de/bickendorf/bickendorfer-fahrradbudchen",
    text: "Fahrrad Selbsthilfe<br>Jeden <strong>Dienstag und Freitag</strong> von 15:00 bis 17:00 (bei Sommerzeit bis 18:00)",
    route: "https://www.google.de/maps/dir/?api=1&destination=Wolffsohnstraße+12,+50827+Ehrenfeld"
  },
  {
    name: "Bike Kitchen Cologne im autonomen Zentrum",
    lat: 50.92370,
    lon: 6.93637,
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Bikekitchen.jpg",
    link: "https://az-koeln.org/bikekitchen/",
    text: "Fahrrad Selbsthilfe<br>Jeden <strong>Mittwoch</strong> von 18:00 bis 22:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Autonomes+Zentrum+Köln,+Luxemburger+Str.+93,+50939+Lindenthal"
  }
];

const PlacesOutsideCologne = [
  {
    name: "Rösrath im Gemeindesaal der Evangelischen Kirche",
    lat: 50.89432, // +1 .5m nach Norden
    lon: 7.18059, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Roesrath.jpg",
    link: "https://repaircaferoesrath.weebly.com/",
    text: "Reparatur Café<br>Jeden <strong>1.&nbsp;Samstag</strong> im Monat von 14:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Hauptstraße+16,+51503+Rösrath"
  },
  {
    name: "Frechen im Mehrgenerationenhaus hinter dem Rathaus",
    lat: 50.91020, // +1 .5m nach Norden
    lon: 6.80673, // +1 .5m nach Osten
    opacity: 0.8,
    img: "https://www.repaircafe-koeln.de/pictures/640/Frechen.jpg",
    link: "https://www.mgh-frechen.de/angebote-hilfen/alle-generationen/reparatur-cafe",
    text: "Reparatur Café<br>Jeden <strong>1.&nbsp;Samstag</strong> im Monat von 14:00 bis 18:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Doktor-Tusch-Straße+1%2F3,+50226+Frechen"
  },
  {
    name: "Hürth im Familienbüro Mittendrin",
    lat: 50.88197, // +1 .5m nach Norden
    lon: 6.87496, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Huerth.jpg",
    link: "https://repaircafehuerth.wixsite.com/start/wann",
    text: "Reparatur Café<br>Jeden <strong>2.&nbsp;Samstag</strong> im Monat von 14:00 bis 17:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Bonnstraße+32,+50354+Hürth"
  },
  {
    name: "Frechen-Königsdorf im JugendMagnet hinter St Sebastianus",
    lat: 50.93739, // +1 .5m nach Norden
    lon: 6.77564, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Koenigsdorf.jpg",
    link: "https://www.mit-füreinander.de/mi-fue-termine.html",
    text: "Reparatur Café<br>Jeden <strong>4.&nbsp;Donnerstag</strong> im Monat von 14:00 bis 17:30",
    route: "https://www.google.de/maps/dir/?api=1&destination=Aachener+Str.+564,+50226+Frechen-Königsdorf"
  },
  {
    name: "Leverkusen-Opladen im Probierwerk",
    lat: 51.06786, // +1 .5m nach Norden
    lon: 7.01147, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Leverkusen.jpg",
    link: "https://ausbesserungswert.de/",
    text: "Reparatur Café<br>Jeden <strong>letzten Samstag</strong> im Monat (ausser Dezember) von 11:00 bis 15:00<br>Alle ungerade Monate in Opladen, alle gerade an wechselnden Standorten in Leverkusen",
    route: "https://www.google.de/maps/dir/?api=1&destination=Stauffenbergstraße+14–20,+51379+Leverkusen-Opladen"
  },
  {
    name: "Brühl im Margarethas",
    lat: 50.82929, // +1 .5m nach Norden
    lon: 6.90314, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Bruehl.jpg",
    link: "https://repaircafebruehl.wordpress.com/termine/",
    text: "Reparatur Café<br>Einmal im Monat <strong>am Samstag</strong> von 14:00 bis 17:00",
    route: "https://www.google.com/maps/dir/?api=1&destination=Heinrich-Fetten-Platz+3,+50321+Br%C3%BChl"
  },
  {
    name: "Pulheim-Brauweiler im DRK Jugendtreff ZAHNRAD",
    lat: 50.96018, // +1 .5m nach Norden
    lon: 6.79593, // +1 .5m nach Osten
    opacity: 1.0,
    img: "https://www.repaircafe-koeln.de/pictures/640/Brauweiler.jpg",
    link: "https://www.agenda21-pulheim.de/anmeldung-zum-repair-cafe",
    text: "Reparatur Café<br>Samstags <strong>alle 2 bis 3 Monate</strong> von 10:30 bis 14:00",
    route: "https://www.google.de/maps/dir/?api=1&destination=Donatusstraße+43,+50259+Pulheim-Brauweiler"
  }
];


// 3.5) Icons definieren
const fahrradSvgIcon = L.icon({
  iconUrl: 'leaflet/fahrrad.png',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38]
});

const werkzeugSvgIcon = L.icon({
  iconUrl: 'leaflet/werkzeugBlau.png',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38]
});

const werkzeugRedSvgIcon = L.icon({
  iconUrl: 'leaflet/werkzeugRed.png',
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38]
});

// 4) Marker hinzufügen + Popup mit Bild & Text
function createPlaceMarker(layerGroup, p, icon = null) {
  const html = `
    <div class="poi-popup">
      <img src="${p.img}" alt="${p.name}">
      <h3><a href="${p.link}" target="_blank">${p.name}</a> &nbsp; <a href="${p.route}" style="text-decoration:none" target="_blank"><b>&nbsp; &#8625; &nbsp;</b></a></h3>
      <p>${p.text}</p>
    </div>
  `;

  const markerOptions = {
    opacity: p.opacity
  };
  if (icon) {
    markerOptions.icon = icon;
  }

  const marker = L.marker([p.lat, p.lon], markerOptions)
    .addTo(layerGroup)
    .bindPopup(html, {
      maxWidth: 260,
      closeButton: false,
      autoClose: true,
      closeOnClick: true
    });

  // Popup bei Mouseover öffnen
  marker.on("mouseover", function () {
    this.openPopup();
  });

  // Popup schließt erst, wenn Maus DAS POPUP verlässt
  marker.on("popupopen", function (e) {
    const popupEl = e.popup.getElement();

    popupEl.addEventListener("mouseleave", () => {
      marker.closePopup();
    });
  });

  // Klick bleibt möglich (Touch / Accessibility)
  marker.on("click", function () {
    this.openPopup();
  });

  return marker;
}

// 5) die places zu den overlays und marker arrays hinzufügen
const RepairCafesOverlay = L.layerGroup().addTo(map); // muss vor dem Control addiert werden
const RepairCafesOutsideOverlay = L.layerGroup().addTo(map); // muss vor dem Control addiert werden
const FahrradSelbsthilfeOverlay = L.layerGroup().addTo(map);

const RepairCafeMarkers = [];
const FahrradSelbsthilfeMarkers = [];

//var i = 1;
for (const p of PlacesCologne) {
  const marker = createPlaceMarker(RepairCafesOverlay, p, werkzeugSvgIcon);
  RepairCafeMarkers.push(marker);
/*  Test welcher Eintrag den zoomfaktor wie beeinflusst
  if(i < 16){
    RepairCafeMarkers.push(marker);
  }
  i++;
  */
}

for (const p of PlacesOutsideCologne) {
  createPlaceMarker(RepairCafesOutsideOverlay, p, werkzeugRedSvgIcon); //  Nicht hinzufügen zum Array für getBounds()
//  RepairCafeMarkers.push(createPlaceMarker(RepairCafesOverlay, p, werkzeugRedSvgIcon)); //  Hinzufügen zum Array für getBounds()
}

for (const p of FahrradSelbsthilfePlaces) {
  FahrradSelbsthilfeMarkers.push(createPlaceMarker(FahrradSelbsthilfeOverlay, p, fahrradSvgIcon));
}


// 6) Layer-Control zum ein- und ausblenden
L.control.layers(null, {
  "<span style='color: blue'>Repair Cafes Köln</span>": RepairCafesOverlay,
  "<span style='color: red'>Repair Cafes Umgebung</span>": RepairCafesOutsideOverlay,
  "<span style='color: green'>Fahrrad Selbsthilfe</span>": FahrradSelbsthilfeOverlay
}).addTo(map);

L.control.scale({imperial: false}).addTo(map);

// 7) Karte so zoomen, dass alle Marker sichtbar sind
const group = L.featureGroup(RepairCafeMarkers);
map.fitBounds(group.getBounds().pad(0.05)); // with pad 0.15 we get zoom level 11 instead of 12 at a full HD display
