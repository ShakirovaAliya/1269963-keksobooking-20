'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};


var card = createElement('article', 'map__card');

var ads = [
  {
    author: picture.src,
    offer: createOffer(),
    location: ('x', 'y')
  }
];

/* author */

var picture = createElement('img', 'popup__avatar');
for (var i = 1; i <= 8; i++) {
  var pictureUrl = 'img/avatars/user' + '0+[i]' + '.png';
  picture.src = pictureUrl;
  picture.alt = 'Аватар пользователя';
}
card.appendChild(picture);

/* Offer */

var createOffer = function (title, address, price, type, capacity, time, features, description, photo) {

  var title = createElement('h3', 'popup__title', );
  card.appendChild(title);

  var address = createElement('p', 'popup__text--address', address.text);
  card.appendChild(address);

  var price = createElement('p', 'popup__text--price', price.text + '₽/ночь');
  card.appendChild(price);

  var type= createElement('h4', 'popup__type', type.text);
  card.appendChild(type);

  var capacity = createElement('p', 'popup__text--capacity', capacity.text);
  card.appendChild(capacity);

  var time = createElement('p', 'popup__text--time', time.text);
  card.appendChild(time);

  var features = createElement('ul', 'popup__features');
  features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  card.appendChild(features);

  var description = createElement('p', 'popup__description', description.text);
  card.appendChild(description);

  var photo = createElement('img', 'popup__photo');
  for (var j=1; j<=3; j++) {
  var photoUrl = 'http://o0.github.io/assets/images/tokyo/hotel1' + '[j]' + '.jpg';
  photo.src = photoUrl;
  photo.alt = 'Фотография жилья';}
  card.appendChild(photo);


  return card;

};


/* location */

var location = ('x','y');


/*


{
  "author": {
      "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  "offer": {
      "title": строка, заголовок предложения
      "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": число, стоимость
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      "rooms": число, количество комнат
      "guests": число, количество гостей, которое можно разместить
      "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": строка с описанием,
      "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
  }
}

*/


/*

var offerItemTitle = makeElement('fieldset', 'ad-form__element');
  offerItemTitle.classList.add('ad-form__element--wide');
  var title = makeElement('label', 'ad-form__label', 'Заголовок объявления');
  var titleInput = makeElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('placeholder', 'Милая, уютная квартирка в центре Токио');
  offerItemTitle.appendChild(title);
  offerItemTitle.appendChild(titleInput);


  var offerItemAddress = makeElement('fieldset', 'ad-form__element');
  offerItemAddress.classList.add('ad-form__element--wide');
  var address = makeElement('label', 'ad-form__label', 'Адрес');
  var addressInput = makeElement('input');
  addressInput.setAttribute('type', 'text');
  offerItemAddress.appendChild(address);
  offerItemAddress.appendChild(addressInput);


  var offerItemPrice = makeElement('fieldset', 'ad-form__element');
  var price = makeElement('label', 'ad-form__label', 'Цена за ночь, руб.');
  var priceInput = makeElement('input');
  priceInput.setAttribute('placeholder', '5000');
  priceInput.setAttribute('type', 'number');
  offerItemPrice.appendChild(price);
  offerItemPrice.appendChild(priceInput);


  var offerItemType = makeElement('fieldset', 'ad-form__element');
  var type = makeElement('label', 'ad-form__label', 'Тип жилья');
  var typeList = 'palace, flat, house, bungalo';
  offerItemType.appendChild(type);
  offerItemType.appendChild(typeList);


  var offerItemRooms = makeElement('fieldset', 'ad-form__element');
  var rooms = makeElement('label', 'ad-form__label', 'Количество комнат');
  var roomsList = '1 комната, 2 комнаты, 3 комнаты, 100 комнат';
  offerItemRooms.appendChild(rooms);
  offerItemRooms.appendChild(roomsList);


  var offerItemGuests = makeElement('fieldset', 'ad-form__element');
  var guests = makeElement('label', 'ad-form__label', 'Количество мест');
  var guestsList = 'для 3 гостей, для 2 гостей, для 1 гостя, не для гостей';
  offerItemGuests.appendChild(guests);
  offerItemGuests.appendChild(guestsList);


  var offerItemСheck = makeElement('fieldset', 'ad-form__element');
  offerItemСheck.classList.add('ad-form__element--time');
  var check = makeElement('label', 'ad-form__label', 'Время заезда и выезда');
  var checkinTime = 'После 12, После 13, После 14';
  var checkoutTime = 'Выезд до 12, Выезд до 13, Выезд до 14';
  offerItemСheck.appendChild(check);
  offerItemСheck.appendChild(checkinTime);
  offerItemСheck.appendChild(checkoutTime);


  var offerItemFeatures = makeElement('fieldset', 'ad-form__element');
  offerItemСheck.classList.add('ad-form__element--wide');
  offerItemСheck.classList.add('features');
  var features = makeElement('label', 'ad-form__label', 'Удобства: Wi-Fi, кухня, парковка, стиралка, лифт, кондиционер');
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  offerItemFeatures.appendChild(features);
  offerItemFeatures.appendChild(featuresList);


  var offerItemDescription = makeElement('fieldset', 'ad-form__element');
  offerItemDescription.classList.add('ad-form__element--wide');
  var description = makeElement('label', 'ad-form__label', 'Описание (не обязательно)');
  var descriptionText = makeElement('textarea');
  descriptionText.setAttribute('placeholder', 'Здесь расскажите о том, какое ваше жилье замечательное и вообще');
  offerItemDescription.appendChild(description);
  offerItemDescription.appendChild(descriptionText);


  var offerItemPhoto = makeElement('fieldset', 'ad-form__element');
  offerItemPhoto.classList.add('ad-form__element--wide');
  var photo = makeElement('label', 'ad-form__label', 'Фотография жилья');
  var photoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var photoLoad = makeElement('label', 'ad-form__drop-zone', 'Загрузить фото...');

  offerItemPhoto.appendChild(photo);
  photo.appendChild(photoLoad);
  offerItemPhoto.appendChild(photoList);

  */
