export const accountOptions = [
  { value: 'savings', label: 'Savings' },
  { value: 'investment', label: 'Investment' },
  { value: 'retirement', label: 'Retirement' },
];

export const periodicityOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const dayOptions = {
  weekly: [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
  ],
  biweekly: [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
  ],
  monthly: [
    { value: 'start', label: 'First business day of the month' },
    { value: 'middle', label: 'The 15th of the month' },
    { value: 'end', label: 'Last business day of the month' },
  ],
};

export const maritalOptions = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married/Partnered' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'separated', label: 'Separated' },
  { value: 'widow', label: 'Widow(er)' },
];

export const employmentOptions = [
  {
    value: 'employed',
    label: 'Employed',
    fields: [
      { name: 'employer', label: 'Your Company', type: 'text' },
      { name: 'title', label: 'Your Title', type: 'text' },
      { name: 'industryKind', label: 'Your Industry', type: 'text' },
      { name: 'annualIncome', label: 'What is your annual income?', type: 'currency' },
    ],
  },
  {
    value: 'selfEmployed',
    label: 'Self-Employed',
    fields: [
      { name: 'employer', label: 'Your Company', type: 'text' },
      { name: 'title', label: 'Your Title', type: 'text' },
      { name: 'industryKind', label: 'Your Industry', type: 'text' },
      { name: 'annualIncome', label: 'What is your annual income?', type: 'currency' },
    ],
  },
  {
    value: 'unemployed',
    label: 'Not currently working',
    fields: [
      { name: 'incomeSource', label: 'What is your main source of income?', type: 'currency' },
      { name: 'revenue', label: 'What is your annual income?', type: 'currency' },
    ],
  },
  {
    value: 'student',
    label: 'Student',
    fields: [
      { name: 'incomeSource', label: 'What is your main source of income?', type: 'currency' },
      { name: 'revenue', label: 'What is your annual income?', type: 'currency' },
    ],
  },
  {
    value: 'retired',
    label: 'Retired',
    fields: [
      { name: 'incomeSource', label: 'What is your main source of income?', type: 'currency' },
      { name: 'revenue', label: 'What is your annual income?', type: 'currency' },
    ],
  },
];

export const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

export const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'GU', label: 'Guam' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'VI', label: 'U.S. Virgin Islands' },
];

export const transactionStatusOptions = [
  { value: 'all', label: 'All' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'processing', label: 'Processing' },
];

export const fundingTypeOptions = [
  { value: 'all', label: 'All' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'dividend', label: 'Dividend' },
  { value: 'fee', label: 'Fee' },
];

export const moneyTypeAnswers = [
  { value: 'totally_like_me', label: 'Totally like me' },
  { value: 'a_lot_like_me', label: 'A lot like me' },
  { value: 'sometimes_me', label: 'Sometimes me' },
  { value: 'not_really_me', label: 'Not really me' },
  { value: 'totally_not_me', label: 'Totally not me' },
];
