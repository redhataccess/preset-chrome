import https, { Agent } from "https";
import createHttpsProxyAgent, { HttpsProxyAgent } from "https-proxy-agent";

const proxyConfig = {
  http: process.env.http_proxy || process.env.HTTP_PROXY,
  https: process.env.https_proxy || process.env.HTTPS_PROXY,
  noProxy: process.env.no_proxy || process.env.NO_PROXY,
};

export const getProxyAgent = (): HttpsProxyAgent | Agent => {
  try {
    if (proxyConfig.https) {
      return createHttpsProxyAgent(proxyConfig.https);
    }
  } catch (error) {
    console.error(error);
  }
  return  new https.Agent();
};
