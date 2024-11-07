export const customPasswordValidation = (value, helpers) => {
    if (!/[A-Z]/.test(value)) {
        return helpers.message("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(value)) {
        return helpers.message("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(value)) {
        return helpers.message("Password must contain at least one number");
    }
    if (!/[@$!%*?&]/.test(value)) {
        return helpers.message("Password must contain at least one special character");
    }
    if (value.length < 8) {
        return helpers.message("Password must be at least 8 characters long");
    }
    return value; // Valid password, return as is
};

export const customEmailValidation = (value, helpers) => {
    if (!/^[a-zA-Z0-9._%+-]+/.test(value)) {
        return helpers.message("Email must start with letters, numbers, or valid special characters (._%+-)");
    }
    if (!/@/.test(value)) {
        return helpers.message("Email must contain an '@' symbol");
    }
    if (!/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return helpers.message("Email domain must contain letters and a valid TLD (e.g., '.com')");
    }
    return value; // Valid email, return as is
};