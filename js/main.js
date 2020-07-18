'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var activePage = function () {
    var formDisabled = document.querySelector('.ad-form--disabled');
    var mapFilter = document.querySelector('.map__filters');
    window.map.mapVision.classList.remove('map--faded');
    formDisabled.classList.remove('ad-form--disabled');
    mapFilter.disabled = false;
    window.form.titleInput.disabled = false;
    window.form.roomsNumber.removeAttribute('disabled', 'true');
    window.form.capacityGuests.removeAttribute('disabled', 'true');
    window.form.houseType.removeAttribute('disabled', 'true');
    window.form.priceInput.removeAttribute('disabled', 'true');
    window.form.time.disabled = false;
    window.form.descriptionText.disabled = false;
    window.form.features.disabled = false;
    window.form.avatarInput.disabled = false;
    window.form.imagesInput.disabled = false;
    window.form.buttonSubmit.disabled = false;
    window.form.addressInput.readOnly = true;
    window.form.addressInput.disabled = false;
    window.form.addressInput.value = window.main.mapPinMain.offsetLeft + ',' + window.main.mapPinMain.offsetTop;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.similarAds.length; i++) {
      fragment.appendChild(window.pin.createPin(window.pin.similarAds[i]));
    }
    window.pin.mapPin.appendChild(fragment);
  };
  window.main = {
    mapPinMain: mapPinMain,
    activePage: activePage

  };
})();


window.main.mapPinMain.addEventListener('mousedown', function () {
  window.main.activePage();
});

window.main.mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    window.main.activePage();
  }
});


