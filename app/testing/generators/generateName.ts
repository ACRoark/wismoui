import faker from 'faker';

const generateLastName = (): string => faker.name.lastName();

export default generateLastName;
