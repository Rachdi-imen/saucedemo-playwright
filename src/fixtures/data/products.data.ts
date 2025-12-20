export const Products = {
  BACKPACK: {
    name: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
    price: '$29.99',
  },

  BIKE: {
    name: 'Sauce Labs Bike Light',
    description: "A red light isn't the desired state in testing",
    price: '$9.99',
  },

  BOLT_TSHIRT: {
    name: 'Sauce Labs Bolt T-Shirt',
    description: 'Get your testing superhero on',
    price: '$15.99',
  },
} as const;

/**
 * Product sorting options
 */
export const SortOptions = {
  NAME_A_Z: 'az',
  NAME_Z_A: 'za',
  PRICE_LOW_HIGH: 'lohi',
  PRICE_HIGH_LOW: 'hilo',
} as const;
