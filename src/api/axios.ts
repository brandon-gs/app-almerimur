import _axios from "axios";
import Constants from "expo-constants";

export const baseURL = Constants.manifest.extra!.api_url;

const axios = _axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default axios;
