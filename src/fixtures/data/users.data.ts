export const Users = {
  STANDARD: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED: { username: 'locked_out_user', password: 'secret_sauce' },
  INVALID_USER: { username: '', password: '' }
};

export const ErrorMessages = {
  LOCKED_USER: 'Sorry, this user has been locked out.',
  USERNAME_REQUIRED: 'Username is required'
};
