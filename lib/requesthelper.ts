export function getApiUrl() {
  // console.log("getApiUrl", process.env);
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return `http://localhost:3000`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
}
