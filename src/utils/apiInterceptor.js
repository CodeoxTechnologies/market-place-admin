import axios from "axios";
import { getGlobalCookie } from ".";
var axiosInstance = axios.create({});
axiosInstance.defaults.baseURL = "https://api2.poundkw.com/api/";
axiosInstance.interceptors.request.use(
  function (config) {
    let accessToken = getGlobalCookie('accessToken');
    let refreshToken = getGlobalCookie('refreshToken');
    let apiKey = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFkbWluIiwiYnVzaW5lc3NOYW1lIjoiUG91bmQgS3V3YWl0Iiwic291cmNlVHlwZSI6IldlYiBBcHBsaWNhdGlvbiIsImlhdCI6MTY3Mzc5MjE3OSwiZXhwIjoxNzM2OTA3Mzc5fQ.KFkDaxtpaDQ5-mcO1GMXmXX_vZdEiI9BwBGmIh29I5g_RhM2NfMcqDcfvuvBE-FusXikweg_0p3Oyoj0A-1K4FF2m8Hx0UtfdQYfmYVXnCWtG0XmfV3dR4oTBp3TH1vZRk0z0bxiXdvkqdCABC8vLpxAsAJeVi3UqsZ1tDR7yNHHOO8--y9u2qfxaRZbdz_h9pB9mboBeufsXatvPe2syUrGtdXeWuqc3aMaSHsdEqO0p3vAbE6qx9ElxyUNjYySYFyHRbpl-nDbvyuc7k944yETEyQsh5E8XwHfQ8u72nKlGESD3Yqi07EhDwanmn4_AnDWyu8qE_Zlk55k6cVA5w'
    config.headers["x-access-token"] = `${accessToken}`;
    config.headers['x-refresh-token'] = `${refreshToken}`
    config.headers['x-api-key'] = apiKey

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);
export default axiosInstance;
