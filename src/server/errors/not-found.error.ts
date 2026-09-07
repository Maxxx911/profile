export class NotFoundError extends Error {
  constructor(entity: string, identifier: string) {
    super(`${entity} "${identifier}" not found`);
    this.name = "NotFoundError";
  }
}
