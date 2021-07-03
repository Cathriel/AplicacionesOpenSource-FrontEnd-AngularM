export class Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;

  constructor() {
    this.pageNumber = 0;
    this.pageSize = 0;
    this.offset = 0;
    this.paged = true;
    this.unpaged = true;
  }
}
