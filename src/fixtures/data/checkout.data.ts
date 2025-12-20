export const CheckoutData = {
  VALID_USER: {
    firstName: 'IMEN',
    lastName: 'RACHDI',
    postalCode: '12345'
  },

  // Msg d'erreur
  ERROR_MESSAGES: {
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
  }
} as const;