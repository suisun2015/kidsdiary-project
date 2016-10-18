export function getFormValues(form) {
  if (!form) return {};
  return Object.keys(form).filter((key) => !key.startsWith('_'))
    .reduce((prev, key) => {
      const nextKeyValue = {};
      nextKeyValue[key] = form[key].value !== undefined ? form[key].value : form[key].defaultValue;
      return Object.assign({}, prev, nextKeyValue);
    }, {});
}
