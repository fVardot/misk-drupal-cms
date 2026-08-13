/**
 * @file
 * Counts each stat value up from 0 when it scrolls into view.
 *
 * The animation target comes from data-statistics-value (set once from the
 * `value` prop in statistics.twig), never by re-reading the element's
 * current text. Re-parsing the rendered text was the previous approach, but
 * it re-reads whatever is on screen *right now* — including a still-mid-
 * animation, partially-counted number if this re-attaches before the first
 * run finishes (as happens repeatedly while editing props in the page
 * builder's live preview). Each re-trigger compounded on the last one,
 * producing runaway values like "5.6e+133".
 */
(function (Drupal, once) {
  function animateValue(obj, end, prefix, suffix, duration = 3000) {
    if (!obj || Number.isNaN(end)) {
      return;
    }
    const start = 0;
    const range = end - start;
    const minTimer = 50;
    let stepTime = range === 0 ? minTimer : Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
      const now = new Date().getTime();
      const remaining = Math.max((endTime - now) / duration, 0);
      const value = Math.round(end - remaining * range);
      obj.textContent = `${prefix}${value}${suffix}`;
      if (value === end) {
        clearInterval(timer);
      }
    }

    timer = setInterval(run, stepTime);
    run();
  }

  Drupal.behaviors.miskStatisticsAnimate = {
    attach(context) {
      const elements = once('statistics-animate', '.statistics .value', context);
      if (elements.length === 0) {
        return;
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const end = parseFloat(el.dataset.statisticsValue);
            animateValue(el, end, el.dataset.statisticsPrefix || '', el.dataset.statisticsSuffix || '');
            observer.unobserve(el);
          }
        });
      });
      elements.forEach((el) => observer.observe(el));
    },
  };
})(Drupal, once);
