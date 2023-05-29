export default ({ $axios, $config: { baseUrlIam, secretToken } }) => {
  $axios.defaults.baseURL = baseUrlIam;
  $axios.defaults.headers.Authorization = secretToken;
};
