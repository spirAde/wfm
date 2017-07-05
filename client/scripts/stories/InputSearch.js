import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import CenterDecorator from './decorators/CenterDecorator';

import { InputSearch } from '../components/UI';

const stringList = [
  'Bank of America',
  'BB&T',
  'Chase',
  'Wells Fargo',
  'Citi',
  'US Bank',
  'USAA',
  'Capital One 360',
  'Capital One',
  'Charles Schwab',
];

const objectList = [
  { value: 'bofa', label: 'Bank of America' },
  { value: 'bbt', label: 'BB&T' },
  { value: 'chase', label: 'Chase' },
  { value: 'wells', label: 'Wells Fargo' },
  { value: 'citi', label: 'Citi' },
  { value: 'us', label: 'US Bank' },
  { value: 'usaa', label: 'USAA' },
  { value: 'capone360', label: 'Capital One 360' },
  { value: 'capone', label: 'Capital One' },
  { value: 'schwab', label: 'Charles Schwab' },
];

const customList = [
  { value: 'bofa', label: 'Bank of America', href: 'https://www.bankofamerica.com/' },
  { value: 'bbt', label: 'BB&T', href: 'https://www.bbt.com/' },
  { value: 'chase', label: 'Chase', href: 'https://www.chase.com/' },
  { value: 'wells', label: 'Wells Fargo', href: 'https://www.wellsfargo.com/' },
  { value: 'citi', label: 'Citi', href: 'https://online.citi.com' },
  { value: 'us', label: 'US Bank', href: 'https://www.usbank.com/' },
  { value: 'usaa', label: 'USAA', href: 'https://www.usaa.com/' },
  { value: 'capone360', label: 'Capital One 360', href: 'https://www.capitalone.com/bank/' },
  { value: 'capone', label: 'Capital One', href: 'https://www.capitalone.com/' },
  { value: 'schwab', label: 'Charles Schwab', href: 'https://www.schwab.com/' },
];

const emptyResult = (
  <div>
    Empty result
  </div>
);

const renderItem = ({ value, label, href }) => (
  <a href={href}>
    <span>{label}</span>
  </a>
);

storiesOf('InputSearch', module)
  .addDecorator(CenterDecorator)
  .add('string items', () => (
    <InputSearch
      list={stringList}
    />
  ))
  .add('emptyResult', () => (
    <InputSearch
      list={stringList}
      emptyResult={emptyResult}
    />
  ))
  .add('object(value, label) items', () => (
    <InputSearch
      list={objectList}
      emptyResult={emptyResult}
    />
  ))
  .add('custom render item', () => (
    <InputSearch
      list={customList}
      renderItem={renderItem}
      emptyResult={emptyResult}
    />
  ))
  .add('onSelect event', () => (
    <InputSearch
      list={objectList}
      emptyResult={emptyResult}
      placeholder="Enter your bank"
      onSelect={action('select event')}
    />
  ));
