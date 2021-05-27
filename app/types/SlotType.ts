export const SlotTypes = ['AM', 'PM', 'AH', 'AN', null] as const;

type SlotType = typeof SlotTypes[number];

export default SlotType;
