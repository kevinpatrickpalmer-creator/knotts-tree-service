(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('navToggle');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var reviewsContainer = document.getElementById('reviewQuotes');
  var showAllBtn = document.getElementById('showAllReviews');
  var INITIAL_COUNT = 6;

  if (reviewsContainer && window.KNOTTS_REVIEWS) {
    var reviews = window.KNOTTS_REVIEWS;

    reviews.forEach(function (review, i) {
      var card = document.createElement('figure');
      card.className = 'review-quote';
      if (i >= INITIAL_COUNT) card.hidden = true;

      var stars = document.createElement('div');
      stars.className = 'stars';
      stars.setAttribute('aria-hidden', 'true');
      stars.textContent = '★★★★★';

      var quote = document.createElement('blockquote');
      quote.textContent = review.text;

      var caption = document.createElement('figcaption');
      var source = review.source || 'Facebook';
      caption.textContent = review.name + (review.date ? ', ' + review.date : '') + ' · ' + source + ' review';

      card.appendChild(stars);
      card.appendChild(quote);
      card.appendChild(caption);
      reviewsContainer.appendChild(card);
    });

    if (showAllBtn) {
      if (reviews.length <= INITIAL_COUNT) {
        showAllBtn.hidden = true;
      } else {
        showAllBtn.textContent = 'Show All ' + reviews.length + ' Reviews';
        showAllBtn.addEventListener('click', function () {
          reviewsContainer.querySelectorAll('.review-quote[hidden]').forEach(function (card) {
            card.hidden = false;
          });
          showAllBtn.hidden = true;
        });
      }
    }
  }
})();
