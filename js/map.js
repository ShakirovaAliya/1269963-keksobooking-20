'use strict';
(function () {
  var mapVision = document.querySelector('.map');
  var mapCard = document.querySelector('.map__card');
  var mapContainer = document.querySelector('.map__filters-container');
  window.map = {
    mapVision: mapVision,
    mapCard: mapCard,
    mapContainer: mapContainer
  };
})();


function getId(evt) {
  var target = evt.target;
  var dataPopup;
  if (target.className === 'map__pin' || target.className === 'popup_img') {
    var pinId = target.dataset.id;
    dataPopup = window.pin.similarAds.find(function (element) {
      return element.id === Number(pinId);
    });

    if (window.map.mapCard) {
      window.map.mapCard.remove();
    }
    window.map.mapVision.insertBefore(window.card.createCard(dataPopup), window.map.mapContainer);
    window.map.mapCard = document.querySelector('.map__card');
    var closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      window.map.mapCard.remove();
    });
  } else if (evt.key === 'Enter') {
    window.map.mapVision.insertBefore(window.card.createCard(dataPopup), window.map.mapContainer);
    window.map.mapCard = document.querySelector('.map__card');
    closeButton.addEventListener('click', function () {
      window.map.mapCard.remove();
    });
  }
}

document.addEventListener('click', getId);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    window.map.mapCard = document.querySelector('.map__card');
    if (window.map.mapCard) {
      window.map.mapCard.remove();
    }
  }
});
