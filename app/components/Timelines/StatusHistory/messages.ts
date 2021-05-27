import { defineMessages } from 'react-intl';

export const scope = 'wismo.components.status-history';

export default defineMessages({
  AWAITING_BILLING: {
    id: `${scope}.AWAITING_BILLING`,
  },
  CANCELED: {
    id: `${scope}.CANCELED`,
  },
  COMPLETED: {
    id: `${scope}.COMPLETED`,
  },
  NEEDS_VERIFICATION: {
    id: `${scope}.NEEDS_VERIFICATION`,
  },
  PROCESSED: {
    id: `${scope}.PROCESSED`,
  },
  REQUESTED: {
    id: `${scope}.REQUESTED`,
  },
  SCHEDULED: {
    id: `${scope}.SCHEDULED`,
  },
});
