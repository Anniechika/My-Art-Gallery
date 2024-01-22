// Validation function
export const validateInput = (name, value) => {
  let errorMessage = "";

  switch (name) {
    case "name":
      if (!value.trim()) {
        errorMessage = "Name is required";
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        errorMessage = "Email is required";
      } else if (!emailRegex.test(value)) {
        errorMessage = "Invalid email format";
      }
      break;
    case "password":
      if (!value) {
        errorMessage = "Password is required";
      } else if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters";
      }
      break;
    default:
      break;
  }

  return errorMessage;
};
