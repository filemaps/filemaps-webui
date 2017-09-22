export class FileMap {
  id: number;
  title: string = '';
  base: string = '';
  file: string = '';
  opened: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
