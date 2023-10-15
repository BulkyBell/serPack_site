import {
  format,
  differenceInCalendarYears,
  parseISO,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  addDays,
  addMinutes,
  addMonths,
  addYears,
} from 'date-fns';
import { es } from 'date-fns/locale';

export class DateTime {
  // Formato a nivel de front
  static defaultDateFormat = 'dd/MM/yyyy';
  static defaultDateTimeFormat = 'dd/MM/yyyy HH:mm:ss';
  static defaultBackEndDateTimeFormat = "yyyy-MM-dd'T'HH:mm:ss"; //IsoDateTime
  static defaultTimeFormat = 'HH:mm:ss';
  static defaultShortTimeFormat = 'HH:mm';
  static recurrenceRuleDateFormat = 'YYYYMMDD';

  // Formato para el back
  static defaultDateTimeSerialization = 'yyyy-MM-ddTHH:mm:ss';

  static newDate() {
    return new Date().toLocaleString(navigator.language, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  }

  static format(date: number | Date | string, dateFormat: string, locale: any = { locale: es }): string {
    let _date: number | Date;

    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }

    return format(_date, dateFormat, locale);
  }

  static diffInYears(dateLeft: number | Date | string, dateRight: number | Date | string): number {
    let _dateLeft: number | Date, _dateRight: number | Date;

    if (typeof dateLeft === 'string') {
      _dateLeft = parseISO(dateLeft);
    } else {
      _dateLeft = dateLeft;
    }

    if (typeof dateRight === 'string') {
      _dateRight = parseISO(dateRight);
    } else {
      _dateRight = dateRight;
    }

    return differenceInCalendarYears(_dateLeft, _dateRight);
  }

  static diffInDays(dateLeft: number | Date | string, dateRight: number | Date | string): number {
    let _dateLeft: number | Date, _dateRight: number | Date;

    if (typeof dateLeft === 'string') {
      _dateLeft = parseISO(dateLeft);
    } else {
      _dateLeft = dateLeft;
    }

    if (typeof dateRight === 'string') {
      _dateRight = parseISO(dateRight);
    } else {
      _dateRight = dateRight;
    }

    return differenceInDays(_dateLeft, _dateRight);
  }

  static diffInHours(dateLeft: number | Date | string, dateRight: number | Date | string): number {
    let _dateLeft: number | Date, _dateRight: number | Date;

    if (typeof dateLeft === 'string') {
      _dateLeft = parseISO(dateLeft);
    } else {
      _dateLeft = dateLeft;
    }

    if (typeof dateRight === 'string') {
      _dateRight = parseISO(dateRight);
    } else {
      _dateRight = dateRight;
    }

    return differenceInHours(_dateLeft, _dateRight);
  }

  static diffInMinutes(dateLeft: number | Date | string, dateRight: number | Date | string): number {
    let _dateLeft: number | Date, _dateRight: number | Date;

    if (typeof dateLeft === 'string') {
      _dateLeft = parseISO(dateLeft);
    } else {
      _dateLeft = dateLeft;
    }

    if (typeof dateRight === 'string') {
      _dateRight = parseISO(dateRight);
    } else {
      _dateRight = dateRight;
    }

    return differenceInMinutes(_dateLeft, _dateRight);
  }

  static toDate(date: string) {
    return parseISO(date);
  }

  static dateToStdISOString(date: Date): string {
    return date.toISOString();
  }

  static getDateWithTimeToZeros(date: any, fmt: string): string {
    let _date: Date;
    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }
    _date.setHours(0);
    _date.setHours(0);
    _date.setMinutes(0);
    _date.setSeconds(0);
    _date.setMilliseconds(0);

    return format(_date, fmt);
  }

  static addMinutes(date: any, minutes: number) {
    let _date: Date;
    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }

    //return addMilliseconds(_date, minutes*60000); //date-fns
    return addMinutes(_date, minutes); //date-fns
  }

  static addMonths(date: any, months: number) {
    let _date: Date;
    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }
    return addMonths(_date, months); //date-fns
  }

  static addYears(date: any, months: number) {
    let _date: Date;
    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }
    return addYears(_date, months); //date-fns
  }

  static addDays(date: any, days: number) {
    let _date: Date;
    if (typeof date === 'string') {
      _date = parseISO(date);
    } else {
      _date = date;
    }
    return addDays(_date, days); //date-fns
  }

  static addDaysToDate(dates: string, days: number = 1) {
    const [dateComponents, timeComponents] = dates.split('T');
    const [year, month, day] = dateComponents.split('-');
    const [hours, minutes, seconds] = timeComponents.split(':');

    const date = new Date(+year, +month, +day + days, +hours, +minutes, +seconds).toISOString().slice(0, 10);

    return DateTime.format(date, this.defaultDateFormat);
  }
}
