import axios from 'axios';

// Config
import envs from 'config/environments';

const instance = axios.create({
  baseURL: envs.baseApiUrl,
  params: {
    ts: envs.ts,
    apikey: envs.apiKey,
    hash: envs.hash
  }
});

export default instance;
