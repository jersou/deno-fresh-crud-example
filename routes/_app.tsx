import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fake-mail-api-server</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/ReactToastify.css" />
      </head>
      <body class="bg-slate-50">
        <Component />
      </body>
    </html>
  );
}
