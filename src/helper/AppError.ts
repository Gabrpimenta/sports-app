export class AppError {
  public readonly message: string;

  public readonly status: string | number;

  constructor(message = '', status = '') {
    this.message = message;
    this.status = String(status);
  }
}

export default AppError;
