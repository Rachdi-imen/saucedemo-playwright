// Données des utilisateurs
export const Users = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  INVALID_USER: {
    username: '',
    password: '',
  },
};

// Messages d'erreur attendus
export const ErrorMessages = {
  LOCKED_USER: 'Epic sadface: Sorry, this user has been locked out.',
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
};
