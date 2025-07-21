import { z } from 'zod';

/**
 * @description Validation schema for the login form.
 */
export const loginSchema = z.object({
  email: z.string().email('A valid email is required.'),
  password: z.string().min(1, 'Password is required.'),
});

/**
 * @description Validation schema for the registration form.
 */
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('A valid email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  // Basic validation for file upload; more complex checks can be added if needed.
  profileImage: z.any().optional(), 
});


/**
 * @description Validation schema for the first step of session creation.
 */
export const createSessionStep1Schema = z.object({
  role: z.string().min(3, 'Job role is required and must be at least 3 characters.'),
  experience: z.string().min(1, 'Please select an experience level.'),
  topicsToFocus: z.array(z.string()).min(1, 'Please select at least one topic.'),
  numberOfQuestions: z.number().min(3, "Must be at least 3 questions.").max(15, "Cannot exceed 15 questions."),
});


/**
 * @description Validation schema for the second step of session creation.
 */
export const createSessionStep2Schema = z.object({
  description: z.string().max(300, 'Description cannot exceed 300 characters.').optional(),
});