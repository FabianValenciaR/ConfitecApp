export class UserIndicators {
  code: string;
  name: string;
  sales: number;
  totalVisits: number;
  effectiveVisits: number;
  sequenceBreak: number;
  constructor(
    code?: string,
    name?: string,
    sales?: number,
    totalVisits?: number,
    effectiveVisits?: number,
    sequenceBreak?: number
  ) {
    this.code = !code ? "" : this.code;
    this.name = !name ? "" : this.name;
    this.sales = !sales ? 0 : this.sales;
    this.totalVisits = !totalVisits ? 0 : this.totalVisits;
    this.effectiveVisits = !effectiveVisits ? 0 : this.effectiveVisits;
    this.sequenceBreak = !sequenceBreak ? 0 : this.sequenceBreak;
  }
}
