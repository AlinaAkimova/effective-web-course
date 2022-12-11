const envs = import.meta.env;
export default {
  apiKey: envs.VITE_API_KEY,
  baseApiUrl: envs.VITE_BASE_API_URL,
  ts: envs.VITE_TS,
  hash: envs.VITE_HASH
};
