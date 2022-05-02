// prettier-ignore
export function validator(data, config) {
    const errors = {};
    const validate = (validateMethod, data, config) => {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired":
            statusValidate = data.trim() === "";
            break;
        case "isEmail": {
            const mailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = (!mailRegExp.test(data));
            break;
        }
        case "isCapital": {
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = (!capitalRegExp.test(data));
            break;
        }
        case "isContainDigit": {
            const digitRegExp = /\d+/g;
            statusValidate = (!digitRegExp.test(data));
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    };
    for (const fildName in data) {
        for (const validateMethod in config[fildName]) {
            const error = validate(
                validateMethod,
                data[fildName],
                config[fildName][validateMethod]
            );
            if (error && !errors[fildName]) errors[fildName] = error;
        }
    }
    return errors;
}
