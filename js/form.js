'use strict';


(function () {
  var noticeBlock = document.querySelector('.notice');
  var mainForm = document.querySelector('.ad-form');
  var titleInput = noticeBlock.querySelector('#title');
  var minTitleLength = 30;
  var maxTitleLength = 100;
  var roomsNumber = noticeBlock.querySelector('#room_number');
  var capacityGuests = noticeBlock.querySelector('#capacity');
  var defaultOptionItem = document.createElement('option');
  var houseType = noticeBlock.querySelector('#type');
  var priceInput = noticeBlock.querySelector('#price');
  var timeInSelect = noticeBlock.querySelector('#timein');
  var timeOutSelect = noticeBlock.querySelector('#timeout');
  var time = noticeBlock.querySelector('.ad-form__element--time');
  var avatarInput = noticeBlock.querySelector('.ad-form-header');
  var imagesInput = noticeBlock.querySelector('#images');
  var descriptionText = noticeBlock.querySelector('#description');
  var features = noticeBlock.querySelector('.features');
  var addressInput = noticeBlock.querySelector('#address');
  var buttonSubmit = noticeBlock.querySelector('.ad-form__element--submit');
  var defaultOptionItemType = defaultOptionItem.cloneNode(true);
  var defaultOptionItemRooms = defaultOptionItem.cloneNode(true);
  var defaultOptionItemCapacity = defaultOptionItem.cloneNode(true);
  roomsNumber.setAttribute('disabled', 'true');
  capacityGuests.setAttribute('disabled', 'true');
  defaultOptionItem.innerHTML = 'выберите значение';
  defaultOptionItem.disabled = true;
  defaultOptionItem.value = '99';
  defaultOptionItem.setAttribute('selected', true);
  houseType.setAttribute('disabled', 'true');
  priceInput.setAttribute('disabled', 'true');
  priceInput.min = '0';
  priceInput.max = '1000000';
  priceInput.required = 'true';
  mainForm.method = 'post';
  mainForm.action = 'https://javascript.pages.academy/keksobooking';
  avatarInput.disabled = true;
  imagesInput.disabled = true;
  descriptionText.disabled = true;
  features.disabled = true;
  addressInput.disabled = true;
  buttonSubmit.disabled = true;
  time.disabled = true;
  titleInput.disabled = true;
  titleInput.minlength = '30';
  titleInput.maxlength = '100';
  titleInput.required = 'true';
  window.form = {
    titleInput: titleInput,
    roomsNumber: roomsNumber,
    capacityGuests: capacityGuests,
    houseType: houseType,
    priceInput: priceInput,
    time: time,
    descriptionText: descriptionText,
    features: features,
    avatarInput: avatarInput,
    imagesInput: imagesInput,
    buttonSubmit: buttonSubmit,
    addressInput: addressInput,
    minTitleLength: minTitleLength,
    maxTitleLength: maxTitleLength,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    defaultOptionItemType: defaultOptionItemType,
    defaultOptionItemRooms: defaultOptionItemRooms,
    defaultOptionItemCapacity: defaultOptionItemCapacity,
  };
})();

// ЗАГОЛОВОК
window.form.titleInput.addEventListener('invalid', function () {
  if (window.form.titleInput.validity.valueMissing) {
    window.form.titleInput.setCustomValidity('Обязательное поле');
  } else {
    window.form. titleInput.setCustomValidity('');
  }
});

window.form.titleInput.addEventListener('input', function () {
  var valueLength = window.form.titleInput.value.length;
  if (valueLength < window.form.minTitleLength) {
    window.form.titleInput.setCustomValidity('Ещё ' + (window.form.minTitleLength - valueLength) + ' симв.');
  } else if (valueLength > window.form.maxTitleLength) {
    window.form.titleInput.setCustomValidity('Удалите лишние ' + (valueLength - window.form.maxTitleLength) + ' симв.');
  } else {
    window.form. titleInput.setCustomValidity('');
  }
});

window.form.capacityGuests.appendChild(window.form.defaultOptionItemCapacity);
window.form.roomsNumber.appendChild(window.form.defaultOptionItemRooms);

window.form.roomsNumber.addEventListener('change', function () {
  var valueRoom = window.form.roomsNumber.value;
  var errorMessage = '';
  if (valueRoom && window.form.capacityGuests.value === '99') {
    errorMessage = 'укажите кол-во гостей';
  } else if (valueRoom === '1' && window.form.capacityGuests.value !== '1') {
    errorMessage = '1 комната — для 1 гостя';
  } else if (valueRoom === '2' && !(window.form.capacityGuests.value === '1' || window.form.capacityGuests.value === '2')) {
    errorMessage = '2 комнаты — для 2 гостей или для 1 гостя';
  } else if (valueRoom === '3' && !(window.form.capacityGuests.value === '1' || window.form.capacityGuests.value === '2' || window.form.capacityGuests.value === '3')) {
    errorMessage = '3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя';
  } else if (valueRoom === '100' && window.form.capacityGuests.value !== '0') {
    errorMessage = '100 комнат — не для гостей';
  } else {
    errorMessage = '';
  }

  window.form.capacityGuests.setCustomValidity(errorMessage);
  window.form.roomsNumber.setCustomValidity(errorMessage);

});

window.form.capacityGuests.addEventListener('change', function () {
  var valueCapacity = window.form.capacityGuests.value;
  var errorMessage = '';
  if (valueCapacity && window.form.roomsNumber.value === '99') {
    errorMessage = 'укажите кол-во комнат';
  } else if (valueCapacity === '1' && !(window.form.roomsNumber.value === '1' || window.form.roomsNumber.value === '2' || window.form.roomsNumber.value === '3')) {
    errorMessage = 'для 1го гостя - 1, 2 или 3 комнаты';
  } else if (valueCapacity === '2' && !(window.form.roomsNumber.value === '2' || window.form.roomsNumber.value === '3')) {
    errorMessage = 'для 2х гостей - 2 или 3 комнаты';
  } else if (valueCapacity === '3' && window.form.roomsNumber.value !== '3') {
    errorMessage = 'для 3х гостей - только 3 комнаты';
  } else if (valueCapacity === '0' && window.form.roomsNumber.value !== '100') {
    errorMessage = 'не для гостей - 100 комнат';
  } else {
    errorMessage = '';
  }

  window.form.roomsNumber.setCustomValidity(errorMessage);
  window.form.capacityGuests.setCustomValidity(errorMessage);
}
);


window.form.houseType.appendChild(window.form.defaultOptionItemType);

window.form.houseType.addEventListener('change', function () {
  var valueType = window.form.houseType.value;
  if (valueType === 'bungalo') {
    window.form.priceInput.min = '0';
    window.form.priceInput.placeholder = '0';
  } else if (valueType === 'flat') {
    window.form.priceInput.min = '1000';
    window.form.priceInput.placeholder = '1000';
  } else if (valueType === 'house') {
    window.form.priceInput.min = '5000';
    window.form. priceInput.placeholder = '5000';
  } else if (valueType === 'palace') {
    window.form. priceInput.min = '10000';
    window.form. priceInput.placeholder = '10000';
  }
});

window.form.timeInSelect.addEventListener('change', function () {
  var valueTimeIn = window.form.timeInSelect.value;
  if (valueTimeIn === '12:00') {
    window.form.timeOutSelect.value = '12:00';
  } else if (valueTimeIn === '13:00') {
    window.form.timeOutSelect.value = '13:00';
  } else if (valueTimeIn === '14:00') {
    window.form.timeOutSelect.value = '14:00';
  }
});

window.form.timeOutSelect.addEventListener('change', function () {
  var valueTimeOut = window.form.timeOutSelect.value;
  if (valueTimeOut === '12:00') {
    window.form.timeInSelect.value = '12:00';
  } else if (valueTimeOut === '13:00') {
    window.form.timeInSelect.value = '13:00';
  } else if (valueTimeOut === '14:00') {
    window.form.timeInSelect.value = '14:00';
  }
});

