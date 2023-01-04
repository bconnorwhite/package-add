import { getPackageManagerName, PackageManagerName } from "which-pm-lockfile";
import { exec, Flags } from "@bconnorwhite/exec";

export type Save = "prod" | "dev" | "peer" | "optional" | "exact" | "bundle" | "tilde";

export type Options = {
  registry?: string;
  save?: Save;
  ignoreWorkspaceRootCheck?: boolean;
};

type PackageManager = {
  command: PackageManagerName;
  install: string;
  savePrefix: string;
  save: Save[];
};

const yarn: PackageManager = {
  command: "yarn",
  install: "add",
  savePrefix: "",
  save: ["dev", "peer", "optional", "exact", "tilde"]
};

const npm: PackageManager = {
  command: "npm",
  install: "install",
  savePrefix: "save-",
  save: ["prod", "dev", "optional", "exact", "bundle"]
};

const pnpm: PackageManager = {
  command: "pnpm",
  install: "add",
  savePrefix: "save-",
  save: ["prod", "dev", "peer", "optional", "exact"]
};

const packageManagers = {
  yarn,
  npm,
  pnpm
} as const;

function getSaveFlags(save: Save | undefined, pm: PackageManager): Flags {
  const retval: Flags = {};
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
      args: [
        pm.install,
        ...Array.isArray(pkg) ? pkg : [pkg],
        {
          "registry": options.registry,
          "ignore-workspace-root-check": options.ignoreWorkspaceRootCheck,
          ...getSaveFlags(options.save, pm)
        }
      ]
    };
  });
}

const install = async (pkg: string | string[], options: Options = {}) => {
  return getCommand(pkg, options).then((command) => exec(command));
};

export default install;
