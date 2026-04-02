// Wrapper para que cPanel Passenger pueda arrancar Next.js con `node server.js`.
// Ejecuta sobre el build ya generado por `next build`.

const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = false;

const app = next({ dev, hostname: "0.0.0.0", port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, "0.0.0.0", () => {
      // eslint-disable-next-line no-console
      console.log(`Next.js listo en http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error al preparar Next.js:", err);
    process.exit(1);
  });

