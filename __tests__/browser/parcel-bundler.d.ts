declare class Bundler {
  constructor(file: string, options?: Object);

  bundle: () => Promise<any>;
}

declare module 'parcel-bundler' {
  export = Bundler;
}
