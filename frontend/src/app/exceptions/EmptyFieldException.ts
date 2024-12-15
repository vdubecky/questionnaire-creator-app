export class EmptyFieldException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmptyFieldException";
  }
}
