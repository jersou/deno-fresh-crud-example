# Deno Fresh CRUD example

Basic Deno Fresh projet that use SQLite or DenoKV database, a Websocket and
react-toastify.

Run with :

```
deno task start
```

## SQLite or DenoKV database

To use DenoKV database, add `"@/services/db.ts": "./services/kv.ts",` in
`imports` section of the `deno.json` file.

To use SQLite database, remove `"@/services/db.ts": "./services/kv.ts",` from
`imports` section of the `deno.json` file.
