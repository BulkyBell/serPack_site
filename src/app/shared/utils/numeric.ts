export class Numeric {
  static defaultPrecision = 2;

  // Valores para el formato de columnas del DxDatagrid con agrupación de miles y separador de comas
  static dxColumn0decimals = { type: 'fixedPoint', precision: 0 };
  static dxColumn2decimals = { type: 'fixedPoint', precision: 2 };
  static formatThousands = '#,##0.00'; //add point in thousands -> transform 1234 to 1.234,00

  static dxColumn0decimalsCurrency = { style: 'currency', currency: 'EUR', useGrouping: true, minimumSignificantDigits: 0 };
  static dxColumn2decimalsCurrency = { style: 'currency', currency: 'EUR', useGrouping: true, precision: 2 };

  static formatFixedPoint(value: number | string, precision: number = Numeric.defaultPrecision, locale?: string): string {
    if (value == null) {
      return '';
    }
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(Number(value));
  }

  static formatCurrency(value: number | string, precision: number = Numeric.defaultPrecision, currency: string = '€', locale?: string): string {
    const formattedValue = Numeric.formatFixedPoint(value, precision, locale);
    return `${formattedValue} ${currency}`;
  }

  static formatPercent(value: number | string, precision: number = Numeric.defaultPrecision, locale?: string): string {
    const formattedValue = Numeric.formatFixedPoint(value, precision, locale);
    return `${formattedValue} %`;
  }

  static countDecimals(value: number): number {
    if (value && Math.floor(value) !== value) {
      return value.toString().split('.')[1].length || 0;
    } else {
      return 0;
    }
  }

  static round(value: number, precision: number): number {
    precision = Math.abs(precision) || 0;
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }

  static floor(value: number, precision: number): number {
    precision = Math.abs(precision) || 0;
    const multiplier = Math.pow(10, precision);
    return Math.floor(value * multiplier) / multiplier;
  }

  static stringToNumber(value: string): number {
    return parseInt(value, 10);
  }

  // Devuelve los digitos de una cadena de texto
  static getNumberFromString(str) {
    const num = str.replace(/[^0-9]/g, '');
    return this.stringToNumber(num);
  }

  static isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }

  // Devuelve true si es par y false si es impar
  static isNumeroPar(numero: number) {
    return numero % 2 == 0;
  }
}
