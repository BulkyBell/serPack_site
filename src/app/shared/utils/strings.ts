export class ItiString {
  static empty = '';

  static booleanToString(value: boolean): string {
    return value ? 'Si' : 'No';
  }

  static isNullOrWhiteSpace(value: string): boolean {
    try {
      if (value == null || value === 'undefined') {
        return true;
      }

      return value.toString().replace(/\s/g, '').length < 1;
    } catch (e) {
      return false;
    }
  }

  /**
   * Ejemplo: LIN_VENDA -> linVenda, MASK@D234-> maskD234
   * @param value
   * @returns
   */
  static toCamelCase(value: string) {
    return value.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  /**
   * Ejemplo: DeEstoLePoneEspacios -> De esto le pone espacios
   * @param value
   * @returns string
   */
  static separateCamelCaseWithSpaces(value: string): string {
    return value.replace(/([A-Z]+)/g, ' $1');
  }

  /**
   * Ejemplo: De esta frase a -> DeEstaFraseA
   * @param value
   * @returns string
   */
  static convertToCamelCase(value: string): string {
    return value
      .split(' ')
      .map((palabra) => {
        return palabra[0].toUpperCase() + palabra.slice(1);
      })
      .join('');
  }

  static IsNull(value: string): boolean {
    return value == null || value === 'undefined' ? true : false;
  }

  static IsWhiteSpace(value: string): boolean {
    return value === '' ? true : false;
  }

  /**
   * Ejemplo: DeEsto-oneEspa-ios -> DeEstoOneEspacIos
   * @param value
   * @returns string
   */
  static fromKebapCaseToCamelCase(value: string) {
    return value.replace(/-./g, (x) => x[1].toUpperCase());
  }

  static splitComaToBr(value: string): string {
    const result = value.replace(/(,+)/g, '<br/>');
    return result;
  }

  static cleanCharacter(value: string, char: string): string {
    if (value == null) {
      return value;
    }
    if (value.indexOf(char) === -1) {
      return value;
    } else {
      value = value.replace(char, '');
      return ItiString.cleanCharacter(value, char);
    }
  }

  // Devuelve el primer número encontrado en el string que le pase por parámetro
  static getNumbersFromString(str) {
    const arrayNumbers = str.match(/[\d.]+/g).map(Number);
    const cleanedNumbers = arrayNumbers.filter((num) => !isNaN(num));
    return Number(cleanedNumbers.join(''));
  }

  static countChar(value, char): number {
    return (value.match(new RegExp(char, 'g')) || []).length;
  }

  static format(format, ...args): string {
    try {
      return format.toString().replace(/{(\d+(:\w*)?)}/g, (match, i) => {
        const s = match.split(':');
        if (s.length > 1) {
          i = i[0];
          match = s[1].replace('}', '');
        }

        const arg = ItiString.parsePattern(match, args[i]);
        return typeof arg !== 'undefined' && arg != null ? arg : ItiString.empty;
      });
    } catch (e) {
      return ItiString.empty;
    }
  }

  private static parsePattern(match, arg): string {
    if (arg == null || arg === undefined) {
      return arg;
    }

    switch (match) {
      case 'L':
        arg = arg.toLowerCase();
        break;
      case 'U':
        arg = arg.toUpperCase();
        break;
      case 'd':
        {
          const splitted = arg.split('-');
          if (splitted.length <= 1) {
            return arg;
          }

          let day = splitted[splitted.length - 1];
          const month = splitted[splitted.length - 2];
          const year = splitted[splitted.length - 3];
          day = day.split('T')[0];
          day = day.split(' ')[0];

          arg = day + '.' + month + '.' + year;
        }
        break;
      case 's':
        {
          const splitted = arg.replace(',', '').split('.');
          if (splitted.length <= 1) {
            return arg;
          }

          let time = splitted[splitted.length - 1].split(' ');
          if (time.length > 1) {
            time = time[time.length - 1];
          }

          const year = splitted[splitted.length - 1].split(' ')[0];
          const month = splitted[splitted.length - 2];
          const day = splitted[splitted.length - 3];

          arg = year + '-' + month + '-' + day;
          if (time.length > 1) {
            arg += 'T' + time;
          } else {
            arg += 'T' + '00:00:00';
          }
        }
        break;

      case 'n':
        if (isNaN(parseInt(arg, 10)) || arg.length <= 3) {
          break;
        }

        arg = arg.toString();
        const mod = arg.length % 3;
        let output = mod > 0 ? arg.substring(0, mod) : ItiString.empty;
        for (let i = 0; i < Math.floor(arg.length / 3); i++) {
          if (mod === 0 && i === 0) {
            output += arg.substring(mod + 3 * i, mod + 3 * i + 3);
          } else {
            output += '.' + arg.substring(mod + 3 * i, mod + 3 * i + 3);
          }
        }
        arg = output;
        break;
      default:
        break;
    }

    return arg;
  }

  private static join(delimiter, args): string {
    let temp = ItiString.empty;
    for (let i = 0; i < args.length; i++) {
      if (ItiString.isNullOrWhiteSpace(args[i]) || (typeof args[i] !== 'number' && typeof args[i] !== 'string')) {
        continue;
      }

      const arg = '' + args[i];
      temp += arg;
      for (let i2 = i + 1; i2 < args.length; i2++) {
        if (ItiString.isNullOrWhiteSpace(args[i2])) {
          continue;
        }

        temp += delimiter;
        i = i2 - 1;
        break;
      }
    }
    return temp;
  }
}

export class StringBuilder {
  values = [];

  constructor(value: string = ItiString.empty) {
    this.values = new Array(value);
  }

  toString() {
    return this.values.join('');
  }
  append(value: string) {
    this.values.push(value);
  }
  appendFormat(value: string, ...args) {
    this.values.push(ItiString.format(value, args));
  }
  clear() {
    this.values = [];
  }
}
