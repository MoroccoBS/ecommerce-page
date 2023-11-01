enum Field {
  email = "email",
  password = "password",
  name = "name",
}
type Variants = "LOGIN" | "REGISTER";

type Errors = {
  [key: string]: string;
};

const useFormValidation = () => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid Email";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const validateName = (name: string) => {
    if (name.length < 3) {
      return "Name must be at least 3 characters";
    }
    return "";
  };

  const validateField = (field: Field, value: string) => {
    switch (field) {
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "name":
        return validateName(value);
      default:
        return "";
    }
  };

  const validateForm = (credentials: any, variants: Variants) => {
    let errors: Errors = {};
    Object.keys(credentials).forEach((field) => {
      const value = credentials[field];
      const error = validateField(field as Field, value);
      if (error) {
        errors[field] = error;
      }
    });

    if (variants === "REGISTER" && Object.keys(errors).length === 0) {
      errors["name"] = validateName(credentials.name);
    }

    return errors;
  };

  return {
    validateForm,
  };
};
