export class HttpException extends Error {
  status: number;
  override message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export interface UserPayload {
  userId: string;
  email: string;
}

export interface UserInterface {
  id: string;
  email: string;
}

export interface MyContext {
  user: UserInterface | null;
}
