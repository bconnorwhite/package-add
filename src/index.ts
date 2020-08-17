import { getPackageManagerName, PackageManagerName } from "which-pm-lockfile";
import exec, { Flags } from "@bconnorwhite/exec";

export type Save = "prod" | "dev" | "peer" | "optional" | "exact" | "bundle" | "tilde";

export type Options = {
  registry?: string;
  save?: Save;
  ignoreWorkspaceRootCheck?: boolean;
}

type PackageManager = {
  command: PackageManagerName;
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

export async function getCommand(pkg: string | string[], options: Options = {}) {
  return getPackageManagerName().then((name) => {
    const pm = packageManagers[name ?? "yarn"];
    return {
      command: pm.command,
      args: [pm.install].concat(pkg),
      flags: {
        registry: options.registry,
        ...getSaveFlags(options.save, pm),
        ["ignore-workspace-root-check"]: pm.workspaces && options.ignoreWorkspaceRootCheck
      }
    };
  });
};

const install = async (pkg: string | string[], options: Options = {}) => {
  return getCommand(pkg, options).then((command) => exec(command));
}

export default install;
