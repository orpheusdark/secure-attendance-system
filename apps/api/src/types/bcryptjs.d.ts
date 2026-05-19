declare module 'bcryptjs' {
  export function compare(value: string, hash: string): Promise<boolean>;
  export function hash(value: string, saltRounds: number): Promise<string>;
}
