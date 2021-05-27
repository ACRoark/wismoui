const getAppointmentType = (productType: string): string => {
  const firstLetter = productType.toUpperCase().slice(0, 1);

  switch (firstLetter) {
    case 'E':
      return 'electricAppointment';
    case 'G':
      return 'gasAppointment';
    default:
      return 'serviceAppointment';
  }
};

export default getAppointmentType;
