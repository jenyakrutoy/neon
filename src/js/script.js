document.addEventListener('DOMContentLoaded', function () {

  // ! ==================================header-burger==================================

  const body = document.querySelector('body')
  const burger = document.querySelector('.header__burger')
  const nav = document.querySelector('.nav')
  const navActive = document.querySelector('.nav-active')

  burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger-active')
    burger.classList.toggle('header__burger')
    nav.classList.toggle('nav-active')

    body.classList.toggle('no-scroll')
  });

  let keys = {
    ESC: 27,
  }

  document.addEventListener('keydown', function (e) {
    if (e.keyCode == keys.ESC) {
      burger.classList.toggle('header__burger-active')
      burger.classList.toggle('header__burger')

      nav.classList.toggle('nav-active')
    }
  })


  // ! ==================================search==================================

  let mediaQuery = window.matchMedia('(max-width: 575px)')
  let logo = document.querySelector(".header__item-logo")

  document.querySelector('.header__search').addEventListener('click', function (e) {
    if (mediaQuery.matches) {
      logo.style.cssText = `
    opacity: 0;
    transition: .2s linear`
    }
    document.querySelector('.header-form').classList.add('header-form-active');
    document.querySelector('.header-form__icon-closed').addEventListener('click', function (el) {
      logo.style.opacity = "1"
      document.querySelector('.header-form-active').classList.remove('header-form-active');
    });
  });

  // ! ==================================валидация==================================

  new JustValidate('.studio__form', {
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    colorWrong: '#f06666',
    messages: {
      email: {
        required: 'Недопустимый формат'
      },
    },
  });

  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },

    colorWrong: '#f06666',

    messages: {
      name: {
        required: 'Как вас зовут?',
        minLength: 'Введите 3 и более символов',
        maxLength: 'Запрещено вводить более 15 символов'
      },
      email: {
        email: 'Укажите ваш email',
        required: 'Укажите ваш e-mail'
      },
    },
  });

  // ! ==================================карта==================================

  ymaps.ready(init);

  function init() {

    var map = new ymaps.Map("map", {
      center: [55.76027745729305, 37.61536031599042],
      zoom: 13
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)


    var myPlacemark = new ymaps.Placemark([55.769506409874566, 37.63894927527743], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/img/icons-sprite/icon-map.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-2, -8]
    });

    map.geoObjects.add(myPlacemark);
  }

  // ! ==================================burger в карте==================================

  const contactsBurger = document.querySelector('.contacts-adress__burger')
  const contactsBurger1920 = document.querySelector('.contacts-adress__burger-1920')
  const contactsBurgerHidden = document.querySelector('.contacts-adress-hidden__burger-hidden')
  const contactsAdress = document.querySelector('.contacts-adress')
  const contactsAdressHidden = document.querySelector('.contacts-adress-hidden')

  contactsBurger.addEventListener('click', () => {
    contactsAdress.style.opacity = '0'
    contactsAdress.style.visibility = 'hidden'
    contactsAdressHidden.style.opacity = '1'
    contactsAdressHidden.style.visibility = 'visible'
    contactsBurgerHidden.style.opacity = '1'
    contactsBurgerHidden.style.visibility = 'visible'
  })

  contactsBurger1920.addEventListener('click', () => {
    contactsAdress.style.opacity = '0'
    contactsAdress.style.visibility = 'hidden'
    contactsAdressHidden.style.opacity = '1'
    contactsAdressHidden.style.visibility = 'visible'
    contactsBurgerHidden.style.opacity = '1'
    contactsBurgerHidden.style.visibility = 'visible'
  })

  contactsBurgerHidden.addEventListener('click', () => {
    contactsAdressHidden.style.opacity = '0'
    contactsAdressHidden.style.visibility = 'hidden'
    contactsBurgerHidden.style.opacity = '0'
    contactsBurgerHidden.style.visibility = 'hidden'
    contactsAdress.style.opacity = '1'
    contactsAdress.style.visibility = 'visible'
    contactsBurger.style.opacity = '1'
    contactsBurger.style.visibility = 'visible'
  })


})