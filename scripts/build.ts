import type { BunPlugin } from 'bun';
import { watch } from 'fs';
import { transform } from 'lightningcss';
import { readFileSync } from 'node:fs';
import header from '../header.txt';

const cssMinifyPlugin: BunPlugin = {
  name: 'css-minify-plugin',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, ({ path }) => {
      const rawCss = readFileSync(path);
      const { code } = transform({
        code: rawCss,
        filename: path,
        minify: true,
      });
      return {
        contents: code.toString(),
        loader: 'text',
      };
    });
  },
};

async function build() {
  try {
    const result = await Bun.build({
      banner: header,
      entrypoints: ['./src/index.ts'],
      minify: true,
      naming: { entry: '[name].user.[ext]' },
      outdir: './dist',
      plugins: [cssMinifyPlugin],
    });

    if (!result.success) {
      console.error('Build failed');
      for (const message of result.logs) {
        console.error(message);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

build();

if (process.argv.includes('--dev')) {
  watch('./src', { recursive: true }, () => {
    build();
  });

  const server = Bun.serve({
    fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === '/index.user.js') {
        return new Response(Bun.file('./dist/index.user.js'));
      }
      return new Response('404');
    },
  });

  console.log(`http://localhost:${server.port}/index.user.js`);
}
