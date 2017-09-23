export class FileMap {
  id: number;
  title = '';
  base = '';
  file = '';
  opened: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
