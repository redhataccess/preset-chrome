import { Request, Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import serverSideInclude from 'server-side-include';
import { getProxyAgent } from './proxy';

const localRegex = /^(dev|qa|stage)\.foo\.redhat\.com/i;
const chromePaths = ['/services', '/webassets', '/chrome_themes'];

export const setupChrome = (app: Express): void => {
  const reverseProxy = createProxyMiddleware({
    target: 'https://access.redhat.com',
    changeOrigin: true,
    agent: getProxyAgent(),
    router: (req: Request) => {
      const host = req.get('host') || 'localhost';
      const localMatch = host.match(localRegex);
      if (localMatch) {
        return `https://access.${localMatch[1]}.redhat.com`;
      }
    },
  });

  app.use(chromePaths, reverseProxy);
  app.use(
    serverSideInclude({
      getHost: (req: Request) =>
        req.protocol + '://' + (req.get('host') || 'localhost'),
    })
  );
};

export default setupChrome;
module.exports = setupChrome;
