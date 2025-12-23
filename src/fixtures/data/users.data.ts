export const Users = {
  STANDARD: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce'
  },
  LOCKED: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.LOCKED_PASSWORD || 'secret_sauce'
  }
} as const;

// Messages d'erreur
export const ErrorMessages = {
  LOCKED_USER: 'Sorry, this user has been locked out.',
  USERNAME_REQUIRED: 'Username is required',
  PASSWORD_REQUIRED: 'Password is required'
} as const;
