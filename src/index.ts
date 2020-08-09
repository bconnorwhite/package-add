import getPreferred from "preferred-pm";
import exec, { Flags } from "@bconnorwhite/exec";

export type Name = "yarn" | "npm" | "pnpm";
export type Save = "prod" | "dev" | "peer" | "optional" | "exact" | "bundle" | "tilde";

export type Options = {
  registry?: string;
  save?: Save;
  ignoreWorkspaceRootCheck?: boolean;
}

type PackageManager = {
  command: Name;
  install: string;
  savePrefix: string;
  save: Save[];
  workspaces: boolean;
}

const packageManagers: {
  [name: string]: PackageManager;
} = {
  yarn: {
    command: "yarn",
    install: "add",
    savePrefix: "",
    save: ["dev", "peer", "optional", "exact", "tilde"],
    workspaces: true
  },
  npm: {
    command: "npm",
    install: "install",
    savePrefix: "save-",
    save: ["prod", "dev", "optional", "exact", "bundle"],
    workspaces: false
  },
  pnpm: {
    command: "pnpm",
    install: "add",
    savePrefix: "save-",
    save: ["prod", "dev", "peer", "optional", "exact"],
    workspaces: true
  }
}

function getSaveFlags(save: Save | undefined, pm: PackageManager): Flags {
  let retval: Flags = {};
  if(save && pm.save.includes(save)) {
    retval[`${pm.savePrefix}${save}`] = true;
  }
  return retval;
}

const install = (pkg: string | string[], options: Options = {}) => {
  const preferred = getPreferred(process.cwd()) ?? { name: "yarn" };
  const pm = packageManagers[preferred.name];
  return exec({
    command: pm.command,
    args: [pm.install].concat(pkg),
    flags: {
      registry: options.registry,
      ...getSaveFlags(options.save, pm),
      ["ignore-workspace-root-check"]: pm.workspaces && options.ignoreWorkspaceRootCheck
    }
  });
}

export default install;
