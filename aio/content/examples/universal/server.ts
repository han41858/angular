// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// #docregion ngExpressEngine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
// #enddocregion ngExpressEngine

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// #docregion data-request
// TODO: 보안 로직을 추가해야 합니다.
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});
// #enddocregion data-request

// #docregion static
// 정적 파일을 요청하면 /browser에서 찾아서 보냅니다.
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
// #enddocregion static

// #docregion navigation-request
// 페이지 요청은 Universal 엔진을 사용합니다.
app.get('*', (req, res) => {
  res.render('index', { req });
});
// #enddocregion navigation-request

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
