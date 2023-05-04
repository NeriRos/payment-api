export class SendMailDto {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly template: string,
    public readonly data: { [name: string]: string },
  ) {}
}
