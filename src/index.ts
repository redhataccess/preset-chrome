import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import serverSideInclude from 'server-side-include';
import { getProxyAgent } from './proxy';

const localRegex = /^(dev|qa|stage)\.foo\.redhat\.com/i;
const reversePaths = [
  '/api',
  '/blogs',
  '/chrome_themes',
  '/hydra',
  '/hydrafs',
  '/login',
  '/node',
  '/rs',
  '/services',
  '/solutions',
  '/webassets',
];

export const setupChrome = (app: express.Application): void => {
  const reverseProxy = createProxyMiddleware({
    target: 'https://access.redhat.com',
    changeOrigin: true,
    agent: getProxyAgent(),
    router: (req: express.Request) => {
      const host = req.get('host') || 'localhost';
      const localMatch = host.match(localRegex);
      if (localMatch) {
        return `https://access.${localMatch[1]}.redhat.com`;
      }
    },
  });

  app.use(reversePaths, reverseProxy);
  app.use(
    serverSideInclude({
      getHost: (req: express.Request) =>
        req.protocol + '://' + (req.get('host') || 'localhost'),
    })
  );
};

export default setupChrome;
module.exports = setupChrome;
