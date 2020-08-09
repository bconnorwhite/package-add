# package-add
Programmatically install packages. Supports yarn, npm, and pnpm.

```ts
install(pkg: string | string[], options: Options) => Promise<SpawnSyncReturns<Buffer>>

type Options = {
  registry?: string;
  save?: Save;
  ignoreWorkspaceRootCheck?: boolean;
}
```

```ts
import install from "package-add";

install(["react", "react-dom"]);

// Equivalent of:
// yarn add react react-dom
// npm install react react-dom
// pnpm add react react-dom
```
