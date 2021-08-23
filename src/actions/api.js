import axios from 'axios';
import * as types from 'constants/reduxTypeContants';

export const clientServer = process.env.REACT_APP_CLIENT;
console.log('Testd Go Client Server:', clientServer);

export const apiUrl = process.env.REACT_APP_API_URL;

const testdGoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDMzNTQ0MDZ9.31BgsjfTAtph4s9k7cTs4DaK78qDMSwg8MndggSUbrk';

// set token when page refreshes 
axios.defaults.headers.common['testd-jwt-go'] = testdGoToken;

const dispatchError = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: error.response ? error.response.data : error,
    status: error.response ? error.response.status : error.status
  });
}

export const uploadImage = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/upload-image`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

// Rapid Pass API's
export const getScheduleRapidPass = (token, id) => dispatch =>
  axios.get(`${apiUrl}/schedule/rapid-pass/${id}`, {
    headers: {
      'testd-jwt-schedule': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

// Testd AC API's
export const validateLocationDepartment = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/validate-loc-dep`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const fetchEndpointDetails = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/fetch-endpoint-details`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const findTestdAcUser = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/find-user`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const verifyCheckOtp = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/verify-check-otp`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getTestdAcUser = (token, id) => dispatch =>
  axios.get(`${apiUrl}/testd-ac/user/${id}`, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateTestdAcUser = (token, id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/testd-ac/user/${id}`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const createTestdAcUser = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/user`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getTestdAcPatient = (token, user_id) => dispatch =>
  axios.get(`${apiUrl}/testd-ac/patient/${user_id}`, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateTestdAcPatient = (token, user_id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/testd-ac/patient/${user_id}`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const uploadTestdAcImage = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/upload-image`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const createTestdAcDependent = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/dependent`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const resendOtp = (token, reqPayload) => dispatch =>
  axios.post(`${apiUrl}/testd-ac/resend-otp`, reqPayload, {
    headers: {
      'testd-jwt-ac': token
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

// Testd Go
export const fetchGoEndpoint = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/go/fetch-endpoint`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const authenticateGoUser = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/go/authenticate`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const createGoUser = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/go/user`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateGoUser = (id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/go/user/${id}`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const createGoDependent = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/go/dependent`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const getGoPatient = (user_id) => dispatch =>
  axios.get(`${apiUrl}/go/patient/${user_id}`).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const updateGoPatient = (user_id, reqPayload) => dispatch =>
  axios.put(`${apiUrl}/go/patient/${user_id}`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });

export const uploadGoImage = (reqPayload) => dispatch =>
  axios.post(`${apiUrl}/go/upload-image`, reqPayload).then(res => {
    return res.data;
  }).catch(error => {
    dispatchError(dispatch, types.SHOW_ALERT_DIALOG, error);
    return { success: false };
  });