import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_APIURL_WEB
    : process.env.VUE_APP_APIURL_LOCAL;

const axiosConfig = {
  baseURL: apiUrl,
  timeout: 10000
};

const authedHttp = token => {
  return axios.create({
    ...axiosConfig,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export { authedHttp };
export default axios.create(axiosConfig);
