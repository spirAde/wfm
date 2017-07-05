import isFunction from 'lodash/isFunction';

class WizardWay {
  constructor(steps, current) {
    this.steps = steps;
    this.current = current;

    this.setCurrent = this.setCurrent.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
  }

  getCurrent() {
    return this.steps[this.current.name];
  }

  setCurrent(step) {
    this.current = step;
  }

  getNext(...args) {
    const currentStep = this.getCurrent();
    const nextStep = isFunction(currentStep.next)
      ? currentStep.next(...args)
      : currentStep.next;

    this.setCurrent(nextStep);

    return nextStep;
  }

  getPrev(...args) {
    const currentStep = this.getCurrent();
    const prevStep = isFunction(currentStep.prev)
      ? currentStep.prev(...args)
      : currentStep.prev;

    this.setCurrent(prevStep);

    return prevStep;
  }
}

export default WizardWay;
