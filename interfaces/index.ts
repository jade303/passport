import { Strategy } from 'passport';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

declare global {
    namespace Express {
      interface User{
        id: number;
        name: string;
        email: string;
        password: string;
        admin: boolean;
      }
    }
  }