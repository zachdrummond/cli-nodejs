import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function package_boilerplate(commands: string[]) {
  console.log("WORKS!", commands);
  const packageName = commands[1];

  if(!packageName){
    console.error("Error: Please provide a name for your package.");
    process.exit(1);
  }

  const packagePath = path.join('packages', packageName);
  console.log(packagePath);
}
