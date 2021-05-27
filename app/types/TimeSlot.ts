const TimeSlots = ['AM', 'PM', 'AH', 'AN'] as const;

type TimeSlot = null | typeof TimeSlots[number];

export { TimeSlot, TimeSlots };
