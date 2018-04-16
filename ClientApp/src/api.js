// Inspired by https://css-tricks.com/using-fetch/

const commonSettings = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

export function post(url, data) {
  return fetch(url, {
    ...commonSettings,
    method: 'POST',
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function put(url, data) {
  return fetch(url, {
    ...commonSettings,
    method: 'PUT',
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function get(url) {
  return fetch(url, {
    ...commonSettings,
    method: 'GET',
  }).then(handleResponse);
}

export function remove(url) {
  return fetch(url, {
    ...commonSettings,
    method: 'DELETE',
  }).then(handleResponse);
}

function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const noContent = response.headers.get('content-length') === '0';
  if (noContent) {
    return handleNoContentResponse(response);
  }
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response);
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response);
  } else if (contentType.includes('text/plain')) {
    return handleTextResponse(response);
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`);
  }
}

function handleJSONResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    } else {
      return Promise.reject({
        ...json,
        status: response.status,
        statusText: response.statusText,
      });
    }
  });
}
function handleTextResponse(response) {
  return response.text().then(text => {
    if (response.ok) {
      return text;
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        message: text,
      });
    }
  });
}

function handleNoContentResponse(response) {
  if (response.ok) {
    return Promise.resolve();
  } else {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText,
      message:
        'We are sorry, something seems to have gone wrong. Please try again.',
    });
  }
}
