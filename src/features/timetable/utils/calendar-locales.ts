import type { LocaleInput } from "@fullcalendar/react";
import enGbLocale from "@fullcalendar/react/locales/en-gb";
import jaLocale from "@fullcalendar/react/locales/ja";

export const myLocale: LocaleInput = {
  code: "my-MM",

  prevText: "ရှေ့",
  nextText: "နောက်",
  todayText: "ယနေ့",

  yearText: "နှစ်",
  monthText: "လ",
  weekTextLong: "အပတ်",
  weekTextShort: "အပတ်",
  dayText: "ရက်",
  listText: "စာရင်း",

  allDayText: "တစ်နေကုန်",

  moreLinkText(n: number) {
    return "နောက်ထပ် " + n + " ခု";
  },

  noEventsText: "ပြသရန် အချိန်ဇယား မရှိပါ",
};

const customJaLocale: LocaleInput = {
  ...jaLocale,

  monthText: "月",
  weekTextLong: "週",
  weekTextShort: "週",
  dayText: "日",
};

const customEnGbLocale: LocaleInput = {
  ...enGbLocale,

  todayText: "Today",
  monthText: "Month",
  weekTextLong: "Week",
  weekTextShort: "Week",
  dayText: "Day",
  prevText: "Prev",
  nextText: "Next",
};

export const calendarLocales: LocaleInput[] = [
  customEnGbLocale,
  customJaLocale,

  {
    ...customJaLocale,
    code: "ja-JP",
  },

  {
    ...customEnGbLocale,
    code: "en-GB",
  },

  myLocale,
];
