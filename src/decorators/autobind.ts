namespace App {
  type TypedMethodDecorator = <T extends Function>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) => TypedPropertyDescriptor<T> | void;

  export const Autobind: TypedMethodDecorator = function (_, _2, descriptor) {
    const originalMethod = descriptor.value; // to get the original method
    const adjDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod!.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  };
}
