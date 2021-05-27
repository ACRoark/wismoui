const getDteContactNumber = (category: string): string => {
  switch (category) {
    case 'R975':
      return '3132356655';
    case 'R980':
      return '8004416698';
    case 'R981':
      return '8558517152';
    case 'R982':
      return '8772000438';
    case 'R983':
      return '8663112244';
    case 'R984':
      return '8004774747';
    case 'R987':
      return '8558387258';
    default:
      console.error('Invalid Category');
      return '';
  }
};

export default getDteContactNumber;
