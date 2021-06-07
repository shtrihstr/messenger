import { readFileSync } from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as config  from 'config';

// @ts-ignore
import webpackConfig from '../../webpack.config';

const serverPort: number = config.get('server.http.port');
const wsServerUrl = `ws://${config.get('server.ws.host')}:${config.get('server.ws.port')}/`;

export function createHTTPServer() {
    const indexFileContent = readFileSync(path.join(__dirname, '..', '..', 'dist', 'index.html'), 'utf8')
        .replace('{{wsServerUrl}}', wsServerUrl);
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        const compiler = webpack(webpackConfig);
        app.use(webpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        }));
        app.use(webpackHotMiddleware(compiler));
    }

    app.get('/', async (req, res) => {
        res.send(indexFileContent);
    });

    app.use('/bundle.js', express.static(path.join(__dirname, '..', '..', 'dist', 'bundle.js')));

    app.listen(serverPort, '0.0.0.0', () => {
        console.log(`App listening on http://localhost:${serverPort}`);
    });

}