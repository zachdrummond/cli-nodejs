import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function package_boilerplate(commands: string[]) {
  const packageName = commands[1];

  if (!packageName) {
    console.error("Error: Please provide a name for your package.");
    process.exit(1);
  }

  // Step 1: Initialize the new package
  try {
    execSync(`npm init -w ./packages/${packageName} -y`, { stdio: "inherit" });
    console.log(`Package "${packageName}" created successfully.`);
  } catch (error: any) {
    console.error(`Failed to create package: ${error.message}`);
    process.exit(1);
  }
}
