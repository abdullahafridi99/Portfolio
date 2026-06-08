/**
 * scroll.js
 * 
 * Custom scroll animation helper to perform fast, snappy, and hardware-accelerated
 * smooth scrolling with custom durations (defaulting to 350ms).
 */

export function smoothScrollTo(targetPosition, duration = 350) {
  const startPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetPosition);
    return;
  }
  
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    
    // Snappy Quadratic Ease In-Out
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  requestAnimationFrame(animation);
}
