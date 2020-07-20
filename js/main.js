'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth;
  var activePage = function () {
    var formDisabled = document.querySelector('.ad-form--disabled');
    var mapFilter = document.querySelector('.map__filters');
    window.form.mapVision.classList.remove('map--faded');
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
    window.form.addressInput.value = mapPinMain.offsetLeft + ',' + mapPinMain.offsetTop;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.similarAds.length; i++) {
      fragment.appendChild(window.createpin.createPin(window.pin.similarAds[i]));
    }
    mapPin.appendChild(fragment);
  };

  /* mapPinMain.addEventListener('mousedown', function () {
    activePage();
  });
  */
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activePage();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activePage();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if ((mapPinMain.offsetTop - shift.y) >= (130 - mapPinMainHeight) && (mapPinMain.offsetTop - shift.y) <= (630 - mapPinMainHeight)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) <= (mapPinWidth - mapPinMainWidth / 2)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((mapPinMain.offsetRight - shift.x) >= (mapPinWidth - mapPinMainWidth / 2)) {
        mapPinMain.style.right = (mapPinMain.offsetRight - shift.x) + 'px';
      }
      window.form.addressInput.value = (mapPinMain.offsetLeft - shift.x) + ',' + (mapPinMain.offsetTop - shift.y);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  );
}
)();


