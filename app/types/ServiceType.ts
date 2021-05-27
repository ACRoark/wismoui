export const ServiceTypes = [
  'ECC_D1_1',
  'ECC_D1_7',
  'ECC_D1_9',
  'ECC_D10',
  'ECC_D3_2',
  'ECC_D3_3',
  'ECC_D3_S',
  'ECC_D4_S',
  'ECC_D5',
  'ECC_R1_1',
  'ECC_R1_2',
  'ECC_R7',
  'ECC_R8',
  'ECC_R8A',
  'ECCND3_2',
  'ECCND3_S',
  'ECCND4_S',
  'ECCR18D1_1',
  'ECCR18D1_7',
  'ECCR18D1_9',
  'ECCR18D10',
  'ECCR18D3_3',
  'ECCR18D3_S',
  'ECCR18D32S',
  'EFC_D1_1',
  'EFC_D1_7',
  'EFC_D1_8',
  'EFC_D1_9',
  'EFC_D10',
  'EFC_D3_1',
  'EFC_D3_2',
  'EFC_D3_3',
  'EFC_D3_S',
  'EFC_D3_WP',
  'EFC_D4_S',
  'EFC_D5',
  'EFC_D9_OVB',
  'EFC_D9_UNB',
  'EFC_R1_1',
  'EFC_R1_2',
  'EFC_R3',
  'EFC_R7',
  'EFC_R8_P',
  'EFC_R8_S',
  'EFC_R8A',
  'EFC_RDG',
  'EFCND1_7',
  'EFCND3_2',
  'EFCND3_S',
  'EFCND3_WP',
  'EFCND4_S',
  'EFCNR8',
  'EFCR18D1_1',
  'EFCR18D1_7',
  'EFCR18D1_9',
  'EFCR18D10',
  'EFCR18D3_3',
  'EFCR18D3_S',
  'EFCR18D32S',
  'EFCR18D4_S',
  'EFCR18D5',
  'EFR_D1',
  'EFR_D1_1',
  'EFR_D1_2',
  'EFR_D1_4',
  'EFR_D1_5',
  'EFR_D1_7',
  'EFR_D1_8',
  'EFR_D1_9',
  'EFR_D1_9FL',
  'EFR_D1_A',
  'EFR_D1_B',
  'EFR_D2',
  'EFR_D5',
  'EFR_D9_OVB',
  'EFR_D9_UNB',
  'EFRND1',
  'EFRND1_7',
  'EFRND2',
  'EFRR18D1_1',
  'EFRR18D1_2',
  'EFRR18D1_6',
  'EFRR18D1_7',
  'EFRR18D1_9',
  'GCC_GS_1H',
  'GCC_GS_1NH',
  'GCC_S_H',
  'GCR_2A1_H',
  'GCR_2A1_NH',
  'GCR_2A2_H',
  'GCR_2A2_NH',
  'GCR_A_H',
  'GCR_A_LIA',
  'GCR_A_NH',
  'GCR_AS_H',
  'GFC_GS_1_L',
  'GFC_GS_1H',
  'GFC_GS_1NH',
  'GFC_GS1HA',
  'GFC_GS1NHA',
  'GFC_S_H',
  'GFC_S_HA',
  'GFC_S_NHA',
  'GFR_2A_L',
  'GFR_2A1_H',
  'GFR_2A1_HA',
  'GFR_2A1_NH',
  'GFR_2A1NHA',
  'GFR_2A2_H',
  'GFR_2A2_HA',
  'GFR_2A2_NH',
  'GFR_2A2NHA',
  'GFR_A_H',
  'GFR_A_HA',
  'GFR_A_L',
  'GFR_A_LIA',
  'GFR_A_NH',
  'GFR_A_NHA',
  'GFR_AS_H',
] as const;

type ServiceType = typeof ServiceTypes[number];

export default ServiceType;
