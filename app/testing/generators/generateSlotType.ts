import { SlotType, SlotTypes } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateSlotType = (): SlotType => SlotTypes[generateRandomNumber(0, SlotTypes.length - 1)] as SlotType;

export default generateSlotType;
