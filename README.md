<!-- auto header start -->
<div id="top" align="center">
  <h1>package-add</h1>
  <a href="https://npmjs.com/package/package-add">
    <img alt="npm" src="https://img.shields.io/npm/v/package-add.svg">
  </a>
  <a href="https://github.com/bconnorwhite/package-add">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/package-add.svg">
  </a>
</div>

<br />

<blockquote align="center">Programmatically install packages. Supports yarn, npm, and pnpm.</blockquote>

<br />

_If I should maintain this repo, please ⭐️_
<a href="https://github.com/bconnorwhite/package-add">
  <img align="right" alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/package-add?label=%E2%AD%90%EF%B8%8F&style=social">
</a>

_DM me on [Twitter](https://twitter.com/bconnorwhite) if you have questions or suggestions._
<a href="https://twitter.com/bconnorwhite">
  <img align="right" alt="Twitter Follow" src="https://img.shields.io/twitter/url?label=%40bconnorwhite&style=social&url=https%3A%2F%2Ftwitter.com%2Fbconnorwhite">
</a>

---
<!-- auto header end -->
Programmatically install packages. Supports yarn, npm, and pnpm.

## Usage

The package manager will be automatically detected:

```ts
import install from "package-add";

install("react");

// Equivalent to:
// yarn add react
// npm install react
// pnpm add react
```

You can also install multiple packages at once:
```ts
import install from "package-add";

install(["react", "react-dom"]);

// Equivalent to:
// yarn add react react-dom
// npm install react react-dom
// pnpm add react react-dom
```

Several options are available as well:

```ts
import install from "package-add";

install("lerna", {
  registry: "https://registry.npmjs.org",
  save: "dev",
  ignoreWorkspaceRootCheck: true
});

// Equivalent to:
// yarn add lerna --registry https://registry.npmjs.org --dev --ignore-workspace-root-check
// npm install lerna --registry https://registry.npmjs.org --save-dev --ignore-workspace-root-check
// pnpm add lerna --registry https://registry.npmjs.org --save-dev --ignore-workspace-root-check
```

<!-- auto footer start -->

<br />

<h2 id="dependencies">Dependencies<a href="https://www.npmjs.com/package/package-add?activeTab=dependencies"><img align="right" alt="dependencies" src="https://img.shields.io/librariesio/release/npm/package-add.svg"></a></h2>

- [@bconnorwhite/exec](https://www.npmjs.com/package/@bconnorwhite/exec): Execute commands while keeping flags easily configurable as an object
- [which-pm-lockfile](https://www.npmjs.com/package/which-pm-lockfile): Check if a project uses yarn, npm, or pnpm


<br />

<h3>Dev Dependencies</h3>

- [autorepo](https://www.npmjs.com/package/autorepo): Autorepo abstracts away your dev dependencies, providing a single command to run all of your scripts.


<br />

<h2 id="license">License <a href="https://opensource.org/licenses/MIT"><img align="right" alt="license" src="https://img.shields.io/npm/l/package-add.svg"></a></h2>

[MIT](https://opensource.org/licenses/MIT)
<!-- auto footer end -->
