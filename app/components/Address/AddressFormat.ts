export const AddressFormats = ['block', 'street'] as const;

type AddressFormat = typeof AddressFormats[number];

export default AddressFormat;
