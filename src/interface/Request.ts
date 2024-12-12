import { Method } from 'axios';

export interface RequestParamsI {
  method: Method;
  uri: string;
  body?: Record<string, unknown>;
}
