'use strict';

(function () {
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
        cardPhoto.innerHTML += '<img src="' + element + '"class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      }
    });
    return card;
  };
  window.card = {
    similarCardTemplate: similarCardTemplate,
    createCard: createCard,
  };
})();


