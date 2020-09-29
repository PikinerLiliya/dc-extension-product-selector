import {CommerceTools} from './CommerceTools';

export const backends = {
  COMMERCETOOLS: 'commercetools'
};

export const getBackend = (params) => {
  switch (params.backend) {
    case backends.COMMERCETOOLS:
      return new CommerceTools(params);
    default:
      return new CommerceTools(params);
  }
}