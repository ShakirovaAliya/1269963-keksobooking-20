'use strict';
var mapVision = document.querySelector('.map');
debugger
mapVision.classList.remove('map--faded');
var mapPin = document.querySelector('.map__pins');
var mapPinWidth = mapPin.offsetWidth; //  ширина окна
var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth; // ширина пина
var pinHeight = pin.offsetHeight; //  высота пина
debugger
var maxCoast = 600;
var maxRoomsCount = 4;


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


var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkArray = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var titleText;
var descriptionText;


function generatePinArray(count) {

  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push({
      author: {
        avatar: sortedAvatarArray[i]
      },
      offer: {
        title: titleText;
        address: [locations[i].x, locations[i].y],
        price: getRandomInt(maxCoast),
        type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))],
        rooms: getRandomInt(maxRoomsCount),
        quests:
        checkin: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        checkout: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
        features: featuresArray[0 + Math.floor(Math.random() * (featuresArray.length - 0))],
        description: descriptionText;
        photos: photosArray[0 + Math.floor(Math.random() * (photosArray.length - 0))]
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


"title": строка, заголовок предложения
"guests": число, количество гостей, которое можно разместить

"description": строка с описанием,



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
