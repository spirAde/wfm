const currentFullYear = new Date().getFullYear().toString();

const currentCentury = currentFullYear.slice(-3, -2);

const currentDecade = currentFullYear.slice(-2, -1);
const nextDecade = Number(currentDecade) + 1;

const currentYear = currentFullYear.slice(-1);
const nextYear = Number(currentYear) + 1;

function isZero(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value, 10) === 0;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

const patterns = {
  phone: 'XXX-XXX-XXXX',
  zipCode: 'XXXXX',
  ssn: 'XXX-XX-XXXX',
  bankRoutingNumber: 'XXXXXXXXX',
  bankAccountNumber: 'XXXXXXXXXXXXXXXXX',
  date: (value) => {
    // regexps should be seen as the inverse of the assumed values month, day, year
    const regexp = {
      month: {
        leadingZero: /^(?:([2-9]))$/,
        moreThanMax: /^(?:(1[3-9]))$/,
      },
      day: {
        leadingZero: /^(?:([4-9]))$/,
        moreThanMax: /^(?:(3[2-9]))$/,
      },
      year: {
        millenary: /^(?:([3-9]|0))$/,
        century: /^(?:(1[0-8])|(2[1-9]))$/,
        decade: new RegExp(`^(?:2${currentCentury}([${nextDecade}-9]))$`),
        year: new RegExp(`^(?:2${currentCentury}${currentDecade}([${nextYear}-9]))$`),
      },
    };

    const formatted = value.replace('///g', '');

    let month = formatted.substring(0, 2);
    let day = formatted.substring(2, 4);
    let year = formatted.substring(4, 8);

    if (month) {
      month = month.replace(regexp.month.leadingZero, (match, $1) => `0${$1}`);
      month = month.replace(regexp.month.moreThanMax, '12');
    }

    if (day) {
      day = day.replace(regexp.day.leadingZero, (match, $1) => `0${$1}`);
      day = day.replace(regexp.day.moreThanMax, '31');
    }

    if (year) {
      year = year.replace(regexp.year.millenary, '1');
      year = year.replace(
        regexp.year.century,
        (match, $1, $2, offset, string) => string.replace($1, '19').replace($2, '20'),
      );
      year = year.replace(regexp.year.decade, currentFullYear.slice(-4, -1));
      year = year.replace(regexp.year.year, currentFullYear);
    }

    return month + (day ? `/${day}` : '') + (year ? `/${year}` : '');
  },
  currency: (value, decimalSeparator) => {
    let valueStr = value || isZero(value)
      ? value.toString().replace(/^0+(?!\.|$)/, '') // remove leading zeros
      : '';

    if (valueStr === '.') valueStr = '0.'; // add leading zero if start typing with dot

    const numRegex = new RegExp('\\d' + '|' + escapeRegExp('.'), 'g');

    if (!valueStr || !(valueStr.match(numRegex))) {
      return '';
    }

    let formattedValue = valueStr.match(numRegex).join('');

    let beforeDecimal = formattedValue;
    let afterDecimal = '';

    const hasDecimals = formattedValue.indexOf('.') !== -1;

    if (decimalSeparator && hasDecimals) {
      const parts = formattedValue.replace(/(.*\.[0-9][0-9]?).*/g, '$1').split('.');

      beforeDecimal = parts[0];
      afterDecimal = parts[1];
    }

    beforeDecimal = beforeDecimal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');

    formattedValue = beforeDecimal + (hasDecimals && decimalSeparator || '') + afterDecimal;

    return formattedValue;
  },
};

export default patterns;
