export class HttpException extends Error {
  status: number;
  override message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MyContext {}
