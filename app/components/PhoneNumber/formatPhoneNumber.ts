export default function formatPhoneNumber(value: string): string {
  if (value) {
    const formattedPhoneNumber =
      value.length === 7
        ? `${value.slice(0, 3)}-${value.slice(3, value.length)}`
        : `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, value.length)}`;

    return formattedPhoneNumber;
  }

  return '';
}
