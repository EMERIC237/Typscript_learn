import { validatable } from "../project-model";
//validatate function
export function validate(value: validatable) {
  let isValid = true;
  if (value.required) {
    isValid = isValid && value.value.toString().trim().length !== 0;
  }
  if (value.minLength != null && typeof value.value === "string") {
    isValid = isValid && value.value.length >= value.minLength;
  }
  if (value.maxLength != null && typeof value.value === "string") {
    isValid = isValid && value.value.length <= value.maxLength;
  }
  return isValid;
}
