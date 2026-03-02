# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # Full build: clean → tsc (ESM) → tsc (CJS) → rollup bundles
npm run test         # Run all tests with mocha
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run report       # Run tests with c8 coverage
npm run release      # Bump version + update CHANGELOG (standard-version)
npm run gen-openapi  # Regenerate TypeScript types from OpenAPI specs
```

**Run a single test file:**
```bash
npx mocha --reporter=dot test/api/factory.spec.ts
```

**Debug HTTP requests:**
```bash
DEBUG=ebay:* npm run test
```

## Dual Output Architecture

The build produces two module formats from the same TypeScript source:
- **ESM** (`dist/`): `tsc` with `tsconfig.json` (`module: node16`)
- **CJS** (`lib/`): `tsc` with `tsconfig.cjs.json` (`module: commonjs`) + `lib/package.json` injected with `{"type":"commonjs"}` to prevent conflicts
- **Browser bundles**: rollup processes `lib/index.js` → UMD (`lib/ebay-api.min.js`) and `dist/eBayApi.js` → ESM (`dist/ebay-api.min.mjs`)

## Class Hierarchy

```
Base (config + req)
  └── Api (+ auth + digital signature helpers)
       ├── Auth (OAuth2 + AuthNAuth)
       ├── ApiFactory (creates all API instances, lazily cached)
       │    ├── Restful (base for all REST endpoints)
       │    │    └── Each API endpoint class (Browse, Inventory, etc.)
       │    └── Traditional (XML-based APIs)
       │         └── XMLRequest (builds/parses XML, calls req)
       └── eBayApi (main public entry point, lazy getters per API group)
```

**`IEBayApiRequest`** is the HTTP abstraction interface. The default implementation is `AxiosRequest`. Tests inject mock stubs implementing this interface directly.

## Adding a New RESTful API Endpoint

1. Create class in `src/api/restful/<group>/<name>/index.ts` extending `Restful`
2. Set `static id = 'Name'` and implement `get basePath()` returning the eBay API path
3. Add the OpenAPI JSON spec to `specs/`, configure it in `redocly.yaml`, run `npm run gen-openapi` to generate types in `src/types/restful/specs/`
4. Implement methods using `this.get()`, `this.post()`, etc. (inherited from `Restful`)
5. Wire it into `ApiFactory` and the relevant group index type

## Key Patterns

**Token refresh**: Both `Restful` and `Traditional` automatically retry on `401`/`EBayInvalidAccessToken` by calling `OAuth2.refreshToken()` and replaying the request.

**Digital Signature**: Opt-in per request via `.sign` getter on any `Restful` instance (e.g., `eBay.sell.finances.sign.getPayouts()`). Traditional APIs also support `sign: true` in config.

**`returnResponse`**: By default, only `response.data` is returned. Pass `returnResponse: true` in `apiConfig` to get the full Axios response.

**`apix` / `apiz`**: Convenience getters on `Restful` to switch the API subdomain for specific eBay endpoints that use `apix.ebay.com` or `apiz.ebay.com`.

## TypeScript Constraints

- All imports of interfaces and type aliases **must** use `import type` (or inline `type` modifier) in test files. The mocha 11 + Node.js v24 loader chain resolves `.js` extensions synchronously, bypassing ts-node for transitive imports — runtime will throw if a type-only named export is imported as a value.
- TypeScript `noUnusedLocals` and `noUnusedParameters` are enabled — all declared variables/parameters must be used.
- OpenAPI-generated type files in `src/types/restful/specs/` are excluded from the main `tsconfig.json`'s `include` array but are referenced directly by the API classes.

## OpenAPI Type Generation

eBay OpenAPI 3 specs live in `specs/*.json`. `redocly.yaml` maps each spec to a generated TypeScript file via `openapi-typescript`. Run `npm run gen-openapi` after updating any spec. The generated files define an `operations` type that each API class implements via `OpenApi<operations>`.

## Release Process

`npm run release` uses `standard-version` which reads `.versionrc.json`. It bumps `package.json`, `package-lock.json`, updates `CHANGELOG.md`, and patches the version string in `README.md` via `scripts/update-readme-release.cjs`.
