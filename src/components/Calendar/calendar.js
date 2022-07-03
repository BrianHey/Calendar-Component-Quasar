import { days, months } from "./helpers";
const items = [];

for (let [indexMonth, monthLabel] of Object.entries(months)) {
  const endDateMonth = new Date(2022, +indexMonth + 1, 0).getDate();
  const startDayIndex = new Date(2022, +indexMonth, 1).getDay();
  let dates = [...Array(endDateMonth + 1).keys()];
  dates = dates.slice(1);
  dates.forEach((d, i) => (dates[i] = []));

  items.push({
    month: monthLabel,
    startDayIndex,
    dates
  });
}

export default { days, items, months };
