const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword('requiredProps', {
    validate: function validate(schema, data) {
        validate.errors = [];
        const rootProps = ['stepOrders', 'title', 'properties', 'type'];
        const props = ['description', 'type'];
        function checkProps(p, d) {
            if (!(p in d))
                validate.errors.push({
                    keyword: 'validate',
                    message: `Property ${p} is required`,
                    params: { keyword: 'validate' },
                });
        }
        rootProps.map((e) => {
            checkProps(e, data);
        });

        for (const el in data.properties) {
            props.map((e) => {
                checkProps(e, data.properties[el]);
            });
            for (const c in data.properties[el].properties) {
                props.map((i) => {
                    checkProps(i, data.properties[el].properties[c]);
                });
            }
        }
        return validate.errors.lenght === 0 ? true : false;
    },
    errors: true,
});

ajv.addKeyword('control', {
    validate: function validate(schema, data) {
        validate.errors = [];

        for (const el in data.properties) {
            for (const c in data.properties[el].properties) {
                const prop = data.properties[el].properties[c];
                if (!(prop.control === 'toggle' && prop.type !== 'boolean'))
                    validate.errors.push({
                        keyword: 'validate',
                        message: `Toggle type must be boolean`,
                        params: { keyword: 'validate' },
                    });
            }
        }
        return validate.errors.lenght === 0 ? true : false;
    },
    errors: true,
});

module.exports = ajv;
