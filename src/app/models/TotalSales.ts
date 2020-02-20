export class TotalSales {
  code: string;
  name: string;
  sales: number;
  constructor(code?: string, name?: string, sales?: number) {
    this.code = !code ? "" : this.code;
    this.name = !name ? "" : this.name;
    this.sales = !sales ? 0 : this.sales;
  }
}
