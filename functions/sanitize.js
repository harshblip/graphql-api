const validator = require('validator');

const sanitizeInput = (input) => {
    // Sanitize strings by trimming whitespace and escaping HTML characters
    if (typeof input === 'string') {
        return validator.escape(validator.trim(input));
    }
    // Ensure integers are indeed integers
    if (typeof input === 'number') {
        return validator.toInt(input, 10);
    }
    // Return other types as is
    return input;
};

module.exports = sanitizeInput;
