import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = new URL(req.url, 'http://localhost:3000');
        const pathname = parsedUrl.pathname;

        // Enhance res with status and json helper methods if missing
        const response = res as any;
        if (!response.status) {
          response.status = (code: number) => {
            res.statusCode = code;
            return response;
          };
        }
        if (!response.json) {
          response.json = (data: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return response;
          };
        }

        // Attach query params to req
        (req as any).query = Object.fromEntries(parsedUrl.searchParams.entries());

        try {
          if (pathname === '/api/health' || pathname === '/api/health/') {
            const healthHandler = (await import('./api/health.js')).default;
            return await healthHandler(req, res);
          }
          if (pathname === '/api/resale' || pathname === '/api/resale/' || pathname.startsWith('/api/[resale]')) {
            const resaleHandler = (await import('./api/resale.js')).default;
            return await resaleHandler(req, res);
          }
          next();
        } catch (err: any) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
