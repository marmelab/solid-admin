import { required as solidRequired } from '@modular-forms/solid';

export const required = (message = 'ra.validation.required') => solidRequired(message);
