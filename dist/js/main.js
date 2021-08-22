document.addEventListener('DOMContentLoaded', () => {
  console.log('load');
  const deadline = new Date().getTime() + 60000 * 30;
  const phone = document.querySelector('.number');
  const btns = document.querySelectorAll('.orderBtn');
  let timerId = null;

  phone.addEventListener('input', function () {
    this.value = this.value.replace(/[^\d.]/g, '');
  });

  btns.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const scrollTarget = document.getElementById('order');
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - 0;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });

  new Swiper('.swiper-container', {
    loop: true,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }

  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $days.textContent = days < 10 ? '0' + days : days;
    $hours.textContent = hours < 10 ? '0' + hours : hours;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
  }

  const $days = document.querySelector('.timer__days');
  const $hours = document.querySelector('.timer__hours');
  const $minutes = document.querySelector('.timer__minutes');
  const $seconds = document.querySelector('.timer__seconds');

  countdownTimer();
  timerId = setInterval(countdownTimer, 1000);
});
