import { defineMessages } from 'react-intl';

export const scope = 'wismo.components.search-form-error';

export default defineMessages({
  inactive: {
    id: `${scope}-inactive`,
  },
  invalid: {
    id: `${scope}-invalid`,
  },
  orderNotFound: {
    id: `${scope}-order-not-found`,
  },
  recaptchaFailed: {
    id: `${scope}-recaptcha-failed`,
  },
  unavailable: {
    id: `${scope}-unavailable`,
  },
  unexpected: {
    id: `${scope}-unexpected`,
  },
});
