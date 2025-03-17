export class CustomError extends Error {
  constructor(errors = {general: "發生錯誤"}) {
    super(errors.general|| "發生錯誤");
    this.status = "error";
    this.errors = errors;
    this.data = {};
  }
}