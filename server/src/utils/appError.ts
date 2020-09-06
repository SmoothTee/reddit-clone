export class AppError extends Error {
  statusCode: number;
  data: { [key: string]: string };
  constructor(
    statusCode: number,
    message: string,
    data: { [key: string]: string } = {}
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
