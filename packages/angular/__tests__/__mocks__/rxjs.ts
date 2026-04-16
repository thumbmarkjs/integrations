// Minimal RxJS mock for unit testing
type Observer<T> = ((value: T) => void) | { next?: (value: T) => void };

export class BehaviorSubject<T> {
  private _value: T;
  private _observers: ((value: T) => void)[] = [];

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return this._value;
  }

  next(value: T): void {
    this._value = value;
    for (const fn of this._observers) {
      fn(value);
    }
  }

  asObservable(): Observable<T> {
    const self = this;
    return {
      subscribe(observer?: Observer<T>) {
        return self.subscribe(observer);
      },
    } as Observable<T>;
  }

  subscribe(observer?: Observer<T>): { unsubscribe: () => void } {
    const fn = typeof observer === 'function' ? observer : observer?.next;
    if (fn) {
      this._observers.push(fn);
      fn(this._value); // Emit current value immediately
    }
    return {
      unsubscribe: () => {
        if (fn) {
          const idx = this._observers.indexOf(fn);
          if (idx >= 0) this._observers.splice(idx, 1);
        }
      },
    };
  }

  complete(): void {
    this._observers = [];
  }
}

export class Observable<T> {
  subscribe(observer?: Observer<T>): { unsubscribe: () => void } {
    return { unsubscribe: () => {} };
  }
}
