export function getApiUrl() {
  const env = process.env.VERCEL_ENV;
  if (env === "development") {
    return `http://${process.env.VERCEL_URL}`;
  } else {
    return `https://${process.env.VERCEL_URL}`;
  }
}
