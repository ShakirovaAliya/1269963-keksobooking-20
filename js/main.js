'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPin = document.querySelector('.map__pins');
  var mapPinWidth = mapPin.offsetWidth;
  var noticeBlock = document.querySelector('.notice');
  var formDisabled = document.querySelector('.ad-form--disabled');
  var mapFilter = document.querySelector('.map__filters');
  var mapVision = document.querySelector('.map');
  var titleInput = noticeBlock.querySelector('#title');
  var roomsNumber = noticeBlock.querySelector('#room_number');
  var capacityGuests = noticeBlock.querySelector('#capacity');
  var houseType = noticeBlock.querySelector('#type');
  var priceInput = noticeBlock.querySelector('#price');
  var time = noticeBlock.querySelector('.ad-form__element--time');
  var descriptionText = noticeBlock.querySelector('#description');
  var features = noticeBlock.querySelector('.features');
  var avatarInput = noticeBlock.querySelector('.ad-form-header');
  var imagesInput = noticeBlock.querySelector('#images');
  var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
  var addressInput = noticeBlock.querySelector('#address');
  var maxPinCount = 8;
  var main = document.querySelector('main');

  // тут я просто вынес в отдельную функцию логику отрисовки всех пинов
  // Всю логику,которую можно обьединить в функции по смыслу( отрисовка всех пинов,отрисовка карточек)
  // нужно обьединять в функции , так позже проще работать с кодом*/
  var createPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < maxPinCount; i++) {
      fragment.appendChild(window.createpin.createPin(data[i]));
    }
    mapPin.appendChild(fragment);
  };


  var successHandler = function (data) {
    // если фун-я window.load выбросила успешное получение данных
    // а именно successHandler то запускаеться колбэк successHandler в котором
    // мы и описываем всю асинхронную логику
    // Если по логике
    // 1-е  мы переводим страницу в активный режим
    // 2-е  отрисовуем пины с помощью функции createPins на основании данных,
    // которые нам пришли с сервера и в которые мы добавили id*/
    activePage();
    // выносим переменную apartamentList в область видимости window
    // что б дальше можно было ней пользоваться и записываем в неё данные
    // которые пришли с сервера data
    window.apartamentList = data;
    // поскольку отображение попапа мы реализовали через делегирование
    // которое основуеться на поиске id елемента - добавляем каждому елементу массива данных поле id
    // с помощью цикла где id = индексу елемента в массиве
    for (var i = 0; i < window.apartamentList.length; i++) {
      window.apartamentList[i].id = i;
    }
    // дальше на основании данных window.apartamentList отрисовуем пины
    createPins(window.apartamentList);
  };

  var errorHandler = function (errorMessage) {
    var errorM = document.querySelector('#error').content.querySelector('.error');
    errorM.textContent = errorMessage;
    main.appendChild(errorM);
  };

  var activePage = function () {
    // убрал от сюдого window.load(successHandler) поскольку
    // при вызове window.load(..., ...) нам не всегда нужно быдет
    // переводить екран в активный режим, а только при удачной загрузке данных с сервера successHandler
    mapVision.classList.remove('map--faded');
    formDisabled.classList.remove('ad-form--disabled');
    mapFilter.disabled = false;
    titleInput.disabled = false;
    roomsNumber.removeAttribute('disabled', 'true');
    capacityGuests.removeAttribute('disabled', 'true');
    houseType.removeAttribute('disabled', 'true');
    priceInput.removeAttribute('disabled', 'true');
    time.disabled = false;
    descriptionText.disabled = false;
    features.disabled = false;
    avatarInput.disabled = false;
    imagesInput.disabled = false;
    buttonSubmit.disabled = false;
    addressInput.readOnly = true;
    addressInput.disabled = false;
    addressInput.value = mapPinMain.offsetLeft + ',' + mapPinMain.offsetTop;
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      // при нажатии кнопки запустим обработку функции  запроса с сервера данных
      window.load(successHandler, errorHandler);
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // если же пользователь нажал кнопку мыши - запустим обработку функции
    //  запроса с сервера данных
    window.load(successHandler, errorHandler);
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
      var minY = 130;
      var maxY = 630;

      if ((mapPinMain.offsetTop - shift.y) >= (minY - mapPinMainHeight) && (mapPinMain.offsetTop - shift.y) <= (maxY - mapPinMainHeight)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if ((mapPinMain.offsetLeft - shift.x) <= (mapPinWidth - mapPinMainWidth / 2)) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      if ((mapPinMain.offsetLeft - shift.x) <= 0) {
        mapPinMain.style.left = (0 - mapPinMainWidth / 2) + 'px';
      }
      addressInput.value = (mapPinMain.offsetLeft - shift.x) + ',' + (mapPinMain.offsetTop - shift.y);
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

  window.main = {
    successHandler: successHandler
  };
})();

