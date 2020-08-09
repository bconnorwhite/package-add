# install-pkg
Programmatically install packages. Supports yarn, npm, and pnpm.

```ts
install(pkg: string | string[], options: Options) => SpawnSyncReturns<Buffer>

type Options = {
  registry?: string;
  save?: Save;
  ignoreWorkspaceRootCheck?: boolean;
}
```

```ts
import install from "install-pkg";

install(["react", "react-dom"]);

// Equivalent of:
// yarn add react react-dom
// npm install react react-dom
// pnpm add react react-dom
```
