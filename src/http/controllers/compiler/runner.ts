/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
export class Runner {
  constructor() {}

  run(
    file: string,
    directory: string,
    filename: string,
    extension: string,
    callback: (data: string) => void,
  ): void {
    console.log(file)
  }
}
