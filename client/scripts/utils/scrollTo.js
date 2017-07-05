const easingTypes = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
};

function scrollTo(target, duration, easing, padding = 0, align, onFinish) {
  const docElem = document.documentElement;
  const windowHeight = docElem.clientHeight;
  const maxScroll = 'scrollMaxY' in window ? window.scrollMaxY : (docElem.scrollHeight - windowHeight);
  const currentY = window.pageYOffset;

  const elementBounds = isNaN(target) ? target.getBoundingClientRect() : 0;
  let targetY = currentY;

  if (align === 'center') {
    targetY += isNaN(target) ? (elementBounds.top + elementBounds.height / 2) : target;
    targetY -= windowHeight / 2;
    targetY -= padding;
  } else if (align === 'bottom') {
    targetY += elementBounds.bottom || target;
    targetY -= windowHeight;
    targetY += padding;
  } else { // top, undefined
    targetY += elementBounds.top || target;
    targetY -= padding;
  }

  targetY = Math.max(Math.min(maxScroll, targetY), 0);

  const deltaY = targetY - currentY;

  function step() {
    if (this.lastY !== window.pageYOffset && this.onFinish) {
      this.onFinish();
      return;
    }

    // Calculate how much time has passed
    const t = Math.min((Date.now() - this.startTime) / this.duration, 1);

    // Scroll window amount determined by easing
    const y = this.targetY - ((1 - this.easing(t)) * (this.deltaY));
    window.scrollTo(window.scrollX, y);

    // Continue animation as long as duration hasn't surpassed
    if (t !== 1) {
      this.lastY = window.pageYOffset;
      window.requestAnimationFrame(this.step.bind(this));
    } else if (this.onFinish) {
      this.onFinish();
    }
  }

  const obj = {
    targetY,
    deltaY,
    step,
    onFinish,
    duration: duration || 0,
    easing: (easing in easingTypes) ? easingTypes[easing] : easingTypes.linear,
    startTime: Date.now(),
    lastY: currentY,
  };

  window.requestAnimationFrame(obj.step.bind(obj));
}

export default scrollTo;
