import { environment as commonEnvironment } from './environment.common';

export const environment = {
  ...commonEnvironment,
  production: false,
  port: 3000
};
