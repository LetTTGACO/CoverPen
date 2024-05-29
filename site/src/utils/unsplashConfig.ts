import { createApi } from "unsplash-js";

const key = process.env.REACT_APP_API_ACCESS_KEY;
// @ts-ignore
const unsplash = createApi({
  // TODO API 密钥
  accessKey: key,
});

export default unsplash;
