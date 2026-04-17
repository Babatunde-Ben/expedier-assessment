export interface SpendingDatum {
  day: string;
  moneyIn: number;
  moneyOut: number;
}

export const WEEKLY_SPENDING: SpendingDatum[] = [
  { day: "Mon", moneyIn: 900, moneyOut: 1000 },
  { day: "Tues", moneyIn: 1900, moneyOut: 500 },
  { day: "Wed", moneyIn: 500, moneyOut: 700 },
  { day: "Thurs", moneyIn: 1100, moneyOut: 600 },
  { day: "Fri", moneyIn: 1900, moneyOut: 700 },
  { day: "Sat", moneyIn: 1100, moneyOut: 2100 },
  { day: "Sun", moneyIn: 300, moneyOut: 1300 },
];
