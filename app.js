const schema = require('./schema');
const ajv = require('./validate');

const validationFunctions = {
    requiredProps: 'test',
    control: 'test',
};
const lint = ajv.compile(validationFunctions);
const valid = lint(schema);
if (!valid) lint.errors.map((el) => console.log(el.message));
