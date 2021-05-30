type LatLng = {
  latitude: number;
  longitude: number;
};

/*
  Algoritam za kodiranje onog crnog polylinea za mapu, naso na netu

  Ima objasnjenje na guglovoj dokumentaciji da ti napravis od pocetka sam ako oces,
  ali jelte, ko ima zapravo vremena za to i ko ce glavu lomit kad postoji gugl

  Trebace se ovo dekodirat u history screenu ko sto napisah tamo u Walk screenu cini mi se,
  al ima neka biblioteka, vidio sam.

  Jedino kod te biblioteke je problem sto ocekuje input koordinata kao niz nizova dok sam ja
  stavio da su koordinate zapravo niz objekata koji imaju ono standardno, lat, lon

  Nece bit problem samo prilagodit output kad se dekodira polyline u taj format

  Format je znaci: 

  LatLng: {
    lattitude:number,
    longitude:number
  },

  a iz tog shita za dekodiranje ce se dobit ovako nesto: 

  [[lat,lon], [lat,lon]...itd]

*/

export function encodePolyline(coords: Array<LatLng>) {
  var i = 0;

  var plat = 0;
  var plng = 0;

  var encoded_points = "";

  for (i = 0; i < coords.length; ++i) {
    var lat = coords[i].latitude;
    var lng = coords[i].longitude;

    encoded_points += encodePoint(plat, plng, lat, lng);

    plat = lat;
    plng = lng;
  }

  return encoded_points;
}

function encodePoint(plat: number, plng: number, lat: number, lng: number) {
  var dlng = 0;
  var dlat = 0;

  var late5 = Math.round(lat * 1e5);
  var plate5 = Math.round(plat * 1e5);

  var lnge5 = Math.round(lng * 1e5);
  var plnge5 = Math.round(plng * 1e5);

  dlng = lnge5 - plnge5;
  dlat = late5 - plate5;

  return encodeSignedNumber(dlat) + encodeSignedNumber(dlng);
}

function encodeSignedNumber(num: number) {
  var sgn_num = num << 1;

  if (num < 0) {
    sgn_num = ~sgn_num;
  }

  return encodeNumber(sgn_num);
}

function encodeNumber(num: number) {
  var encodeString = "";

  while (num >= 0x20) {
    encodeString += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
    num >>= 5;
  }

  encodeString += String.fromCharCode(num + 63);
  return encodeString;
}
