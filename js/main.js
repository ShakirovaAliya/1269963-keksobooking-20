'use strict';
var mapVision = document.querySelector('.map');
mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth;
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;
var maxCoast = 600;
var maxRoomsCount = 4;
var maxGuestsCount = 10;


//  author
function avatar(count) {
  var newArr = [];
  for (var i = 1; i <= count; i++) {
    if (i < 10 || i > 0) {
      var s = '0' + i;
    } else {
      s = i;
    }
    newArr.push('img/avatars/user' + s + '.png');
  }
  return newArr;
}
var avatarArray = avatar(8);
function sortArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
var sortedAvatarArray = sortArray(avatarArray);


//  location
function locationsCoordinats(min, max, count) {
  var arr = [];
  for (var i = 1; i <= count; i++) {
    arr.push({
      x: Math.round(0 + Math.random() * (mapPinWidth)) - pinWidth / 2,
      y: Math.round(min + Math.random() * (max - min)) - pinHeight
    });
  }
  return arr;
}
var locations = locationsCoordinats(130, 630, 8);


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// offer
var typeArray = ['Palace', 'Flat', 'House', 'Bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


function generatePinArray(count) {

  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push({
      author: {
        avatar: sortedAvatarArray[i]
      },
      offer: {
        title: 'Уютное гнездышко для молодоженов',
        address: [locations[i].x, locations[i].y],
        price: getRandomInt(maxCoast),
        type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))],
        rooms: getRandomInt(maxRoomsCount),
        guests: getRandomInt(maxGuestsCount),
        checkin: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        checkout: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        features: featuresArray.slice(getRandomInt(featuresArray.length)),
        description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
        photos: photosArray.slice(getRandomInt(photosArray.length))
      },
      location: {
        x: locations[i].x,
        y: locations[i].y
      }
    });
  }
  return arr;
}
var similarAds = generatePinArray(8);


var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var createPin = function (properties) {
  var PinElement = similarMapPinTemplate.cloneNode(true);
  PinElement.style.top = properties.location.y + 'px';
  PinElement.style.left = properties.location.x + 'px';
  PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
  PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативный текст');
  return PinElement;
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAds.length; i++) {
  fragment.appendChild(createPin(similarAds[i]));

}
mapPin.appendChild(fragment);

var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var createCard = function (ads) {
  var card = similarCardTemplate.cloneNode(true);
  card.querySelector('.popup__title').innerText = ads.offer.title;
  card.querySelector('img').src = ads.author.avatar;
  card.querySelector('.popup__text--address').innerText = ads.offer.address;
  card.querySelector('.popup__text--price').innerText = ads.offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').innerText = ads.offer.type;
  card.querySelector('.popup__text--capacity').innerText = ads.offer.rooms + ' комнаты для ' + ads.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').innerText = 'заезд после' + ads.offer.checkin + ', выезд после' + ads.offer.checkout;
  var cardFeature = card.querySelector('.popup__features');
  cardFeature.innerHTML = '';
  ads.offer.features.forEach(function (element) {
    cardFeature.innerHTML += '<li class="popup__feature popup__feature--' + element + '"></li>';
  });
  card.querySelector('.popup__description').innerText = ads.offer.description;
  var cardPhoto = card.querySelector('.popup__photos');
  cardPhoto.innerHTML = '';
  ads.offer.photos.forEach(function (element) {
    if (element) {
      cardPhoto.innerHTML += '<img src="' + element + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
  });
  return card;
};

var mapContainer = document.querySelector('.map__filters-container');
mapVision.insertBefore(createCard(similarAds[0]), mapContainer);

