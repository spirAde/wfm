import { employmentOptions } from '../../utils/options';

const validate = ({
  employment,
  employer,
  title,
  industryKind,
  annualIncome,
  revenue,
  incomeSource,
}) => {
  const errors = {};

  if (!employment) {
    errors.employment = 'Required.';
  } else {
    const type = find(employmentOptions, option => option.value === employment) || {};
    const fields = type.fields || [];
    const fieldsName = fields.map(field => field.name);

    if (fieldsName.includes('employer')) {
      if (!employer) {
        errors.employer = 'Required.';
      }
    }

    if (fieldsName.includes('title')) {
      if (!title) {
        errors.title = 'Required.';
      }
    }

    if (fieldsName.includes('industryKind')) {
      if (!industryKind) {
        errors.industryKind = 'Required.';
      }
    }

    if (fieldsName.includes('annualIncome')) {
      if (!annualIncome) {
        errors.annualIncome = 'Required.';
      }
    }

    if (fieldsName.includes('revenue')) {
      if (!revenue) {
        errors.revenue = 'Required.';
      }
    }

    if (fieldsName.includes('incomeSource')) {
      if (!incomeSource) {
        errors.incomeSource = 'Required.';
      }
    }
  }

  return errors;
};

export default validate;
