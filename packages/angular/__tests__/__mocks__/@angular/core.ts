// Minimal Angular core mock for unit testing
export function Injectable(): ClassDecorator {
  return (target: any) => target;
}

export function Inject(token: any): ParameterDecorator {
  return () => {};
}

export function Optional(): ParameterDecorator {
  return () => {};
}

export function NgModule(metadata?: any): ClassDecorator {
  return (target: any) => target;
}

export class InjectionToken<T> {
  constructor(public description: string) {}
}

export interface OnDestroy {
  ngOnDestroy(): void;
}

export interface ModuleWithProviders<T> {
  ngModule: any;
  providers: any[];
}

export type Provider = any;
