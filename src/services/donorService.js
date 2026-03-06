import { fetchUtil } from '../utils/fetchUtil';

export const donorSignup = (data) => fetchUtil('/donor/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});

// Add other donor related API calls here...
