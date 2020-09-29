import { basicReducer } from '../../../utils/basicReducer';
import { backendReducer } from '../backend.reducer';
import { SET_BACKEND } from '../backend.actions';
import { CommerceTools } from '../../../backends/CommerceTools';

describe('backend reducer', () => {
  it('SET_BACKEND', () => {
    basicReducer(backendReducer, [
      {
        action: {
          type: SET_BACKEND,
          value: new CommerceTools({
            backend: 'commercetools',
            host: 'https://auth.europe-west1.gcp.commercetools.com',
            projectKey: 'ulta-amp',
            clientId: '4h4q7if8FAsycH1Qtba6WhPQ',
            clientSecret: 'DFwdLEY3b0Y2YGRMZwBOvmIrwcIVoL6f',
            apiUrl: 'https://api.europe-west1.gcp.commercetools.com'
          })
        },
        expected: new CommerceTools({
          backend: 'commercetools',
          host: 'https://auth.europe-west1.gcp.commercetools.com',
          projectKey: 'ulta-amp',
          clientId: '4h4q7if8FAsycH1Qtba6WhPQ',
          clientSecret: 'DFwdLEY3b0Y2YGRMZwBOvmIrwcIVoL6f',
          apiUrl: 'https://api.europe-west1.gcp.commercetools.com'
        })
      },
      { action: { type: '', value: null }, expected: {}}
    ]);
  });
});
