const getApiBaseUrl = (path = '') => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim() || import.meta.env.CODESPACE_NAME?.trim() || import.meta.env.CODESPACE?.trim();
  const host = window.location.hostname;
  const isCodespaceHost = host.includes('app.github.dev') || host.includes('github.dev');
  const baseUrl = codespaceName || isCodespaceHost
    ? `https://${codespaceName || host.replace(/-5173$/, '')}-8000.app.github.dev/api${path}`
    : `http://localhost:8000/api${path}`;

  return baseUrl;
};

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && payload.data && Array.isArray(payload.data.results)) {
    return payload.data.results;
  }

  return [];
};

const fetchJson = async (endpoint) => {
  const response = await fetch(getApiBaseUrl(endpoint));

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
};

export { fetchJson, getApiBaseUrl, normalizeCollection };
