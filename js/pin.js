'use strict';

(function () {
  var mapPin = document.querySelector('.map__pins');
  var maxCoast = 600;
  var maxRoomsCount = 4;
  var maxGuestsCount = 10;
  var mapPinWidth = mapPin.offsetWidth;
  var pin = document.querySelector('.map__pin');
  var pinWidth = pin.offsetWidth;
  var pinHeight = pin.offsetHeight;
  var location = locationsCoordinats(130, 630, 8);
  var typeArray = ['Palace', 'Flat', 'House', 'Bungalo'];
  var checkArray = ['12:00', '13:00', '14:00'];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var avatarArray = avatar(8);
  var sortedAvatarArray = sortArray(avatarArray);
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var createPin = function (properties) {
    var PinElement = similarMapPinTemplate.cloneNode(true);
    PinElement.style.top = properties.location.y + 'px';
    PinElement.style.left = properties.location.x + 'px';
    PinElement.dataset.id = properties.id;
    PinElement.querySelector('img').setAttribute('src', properties.author.avatar);
    PinElement.querySelector('img').classList.add('popup_img');
    PinElement.querySelector('img').dataset.id = properties.id;
    PinElement.querySelector('img').setAttribute('alt', 'Некий альтернативный текст');
    return PinElement;
  };
  var generatePinArray = function (count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push({
        author: {
          avatar: window.pin.sortedAvatarArray[i]
        },
        offer: {
          title: 'Уютное гнездышко для молодоженов',
          address: [window.pin.location[i].x, window.pin.location[i].y],
          price: getRandomInt(window.pin.maxCoast),
          type: window.pin.typeArray[0 + Math.floor(Math.random() * (window.pin.typeArray.length - 0))],
          rooms: getRandomInt(window.pin.maxRoomsCount),
          guests: getRandomInt(window.pin.maxGuestsCount),
          checkin: window.pin.checkArray[0 + Math.floor(Math.random() * (window.pin.checkArray.length - 0))],
          checkout: window.pin.checkArray[0 + Math.floor(Math.random() * (window.pin.checkArray.length - 0))],
          features: window.pin.featuresArray.slice(getRandomInt(window.pin.featuresArray.length)),
          description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
          photos: window.pin.photosArray.slice(getRandomInt(window.pin.photosArray.length)),
        },
        location: {
          x: window.pin.location[i].x,
          y: window.pin.location[i].y
        },
        id: i,
      });
    }
    return arr;
  };
  var similarAds = generatePinArray(8);
  window.pin = {
    mapPin: mapPin,
    mapPinWidth: mapPinWidth,
    pinWidth: pinWidth,
    pinHeight: pinHeight,
    sortedAvatarArray: sortedAvatarArray,
    maxCoast: maxCoast,
    typeArray: typeArray,
    checkArray: checkArray,
    maxRoomsCount: maxRoomsCount,
    maxGuestsCount: maxGuestsCount,
    featuresArray: featuresArray,
    photosArray: photosArray,
    location: location,
    createPin: createPin,
    similarAds: similarAds
  };
})();


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


function sortArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function locationsCoordinats(min, max, count) {
  var arr = [];
  for (var i = 1; i <= count; i++) {
    arr.push({
      x: Math.round(0 + Math.random() * (window.pin.mapPinWidth)) - window.pin.pinWidth / 2,
      y: Math.round(min + Math.random() * (max - min)) - window.pin.pinHeight
    });
  }
  return arr;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


