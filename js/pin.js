'use strict';

(function () {
  var avatar = function (count) {
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
  };
  var avatarArray = avatar(8);
  var sortArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  var sortedAvatarArray = sortArray(avatarArray);
  var mapPin = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  var mapPinWidth = mapPin.offsetWidth;
  var pinWidth = pin.offsetWidth;
  var pinHeight = pin.offsetHeight;
  var locationsCoordinats = function (min, max, count) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
      arr.push({
        x: Math.round(0 + Math.random() * (mapPinWidth)) - pinWidth / 2,
        y: Math.round(min + Math.random() * (max - min)) - pinHeight
      });
    }
    return arr;
  };
  var location = locationsCoordinats(130, 630, 8);
  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  var maxCoast = 600;
  var maxRoomsCount = 4;
  var maxGuestsCount = 10;
  var typeArray = ['Palace', 'Flat', 'House', 'Bungalo'];
  var checkArray = ['12:00', '13:00', '14:00'];
  var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generatePinArray = function (count) {
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push({
        author: {
          avatar: sortedAvatarArray[i]
        },
        offer: {
          title: 'Уютное гнездышко для молодоженов',
          address: [location[i].x, location[i].y],
          price: getRandomInt(maxCoast),
          type: typeArray[0 + Math.floor(Math.random() * (typeArray.length - 0))],
          rooms: getRandomInt(maxRoomsCount),
          guests: getRandomInt(maxGuestsCount),
          checkin: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
          checkout: checkArray[0 + Math.floor(Math.random() * (checkArray.length - 0))],
          features: featuresArray.slice(getRandomInt(featuresArray.length)),
          description: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
          photos: photosArray.slice(getRandomInt(photosArray.length)),
        },
        location: {
          x: location[i].x,
          y: location[i].y
        },
        id: i,
      });
    }
    return arr;
  };
  var similarAds = generatePinArray(8);
  window.pin = {
    similarAds: similarAds
  };
})();
