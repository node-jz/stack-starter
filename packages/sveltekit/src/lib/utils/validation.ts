import type { Writable } from 'svelte/store';
import * as yup from 'yup';

export async function validateSchema(
  schema: yup.ObjectSchema<any>,
  data: Record<string, any>,
  formErrors: Writable<any>,
): Promise<boolean> {
  try {
    await schema.validate(data, { abortEarly: false });
    return true;
  } catch (errors) {
    if (errors instanceof yup.ValidationError) {
      const newErrors: Record<string, string> = {};
      console.log(errors);
      errors.inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });
      formErrors.set(newErrors);
    } else {
      console.error(errors);
    }
    return false;
  }
}
export async function validateField(schema: yup.Schema<any>, field: string, value: any, formErrors: Writable<any>): Promise<boolean> {
  try {
    await schema.validateAt(field, { [field]: value });
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      formErrors.update((store) => {
        store[field] = (error as yup.ValidationError).message; // Set error message
        return store;
      });
      console.error(error.message);
    } else {
      console.error(error);
    }
    return false;
  }
}
