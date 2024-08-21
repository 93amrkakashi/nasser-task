export const validateAuthInputs = (inputs, rules) => {
  const errors = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = inputs[field]?.trim();

    if (rule.required && !value) {
      errors[field] = rule.message || "هذا الحقل مطلوب!";
    } else if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.patternMessage || `صيغة ${field} غير صحيحة`;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[field] =
        rule.minLengthMessage ||
        `${field} يجب أن يكون على الأقل ${rule.minLength} حروف`;
    }
  }

  return errors;
};

export const validateBookInputs = (book, rules) => {
  let errors = {};

  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    if (rule.required && !book[field].trim()) {
      errors[field] = rule.message;
    } else if (rule.minLength && book[field].length < rule.minLength) {
      errors[field] = `يجب أن يكون ${field} على الأقل ${rule.minLength} أحرف`;
    }
  });

  return errors;
};
