import { measure as core } from './node';
import { measure as prod } from './production';

export const measure = process.env.NODE_ENV !== 'production' ? core : prod;
