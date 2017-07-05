import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import assign from 'lodash/assign';

export function removeEmptyContent(content) {
  const orderedKeys = [
    'money_type_description',
    'money_type_characteristics',
    'money_type_might',
    'money_type_think_or_say',
    'money_type_recommendation',
  ];

  return content.map((item) => {
    const notEmptyContents = omitBy(item.content, isEmpty);
    const orderedContents = pick(notEmptyContents, orderedKeys);

    return assign({}, item, { content: orderedContents });
  });
}
