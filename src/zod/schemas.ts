import {z} from 'zod';

export const inventoryItemSchema = z.object({
  name: z.string().min(3, {message: 'Name must be at least 3 characters.'}),
  location: z
    .string()
    .min(3, {message: 'Location must be at least 3 characters.'}),
  owner: z
    .string()
    .min(3, {message: 'Owner Name must be at least 3 characters.'}),
  quantity: z.preprocess(
    value => {
      if (value === '' || value === undefined || value === null)
        return undefined;
      const parsedValue = parseInt(value as string, 10);
      return isNaN(parsedValue) ? undefined : parsedValue;
    },
    z
      .number({
        required_error: 'Quantity must be a valid number.',
        invalid_type_error: 'Quantity must be a valid number.',
      })
      .min(0, {message: 'Quantity must be a non-negative integer.'})
      .refine(val => val !== null, {
        message: 'Quantity must be a valid number.',
      }),
  ),
});
export type InventoryItemField = z.infer<typeof inventoryItemSchema>;

export const signupSchema = z.object({
  fullname: z.string().min(3, {message: 'Minimum 3 character required!'}),
  email: z.string().email({message: 'Valid email required!'}),
  password: z.string().min(4, {message: 'Minimum 4 character required!'}),
});

export type RegisterFormField = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({message: 'Valid email required!'}),
  password: z.string().min(4, {message: 'Minimum 4 character required!'}),
});

export type LoginFormField = z.infer<typeof loginSchema>;