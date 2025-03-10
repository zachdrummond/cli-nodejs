import { execSync } from "child_process";
import fs from "fs/promises";
import path from "path";

export default async function package_boilerplate(
  commands: string[]
): Promise<void> {
  const packageName = commands[1];

  if (!packageName) {
    console.error("Error: Please provide a name for your package.");
    process.exit(1);
  }

  const packagePath = path.join("packages", packageName);

  try {
    // Step 1: Ensure directory exists
    await fs.mkdir(packagePath, { recursive: true });

    // Step 2: Initialize the new package
    execSync(
      `npm init -w ./${packagePath} --scope=@cli-nodejs -y`,
      { stdio: "inherit", encoding: "utf-8" }
    );

    // Step 3: Create tsconfig.json
    const tsconfig = {
      extends: "../../tsconfig.json",
      compilerOptions: {
        declaration: true,
        rootDir: "./src",
        outDir: "./dist",
      },
      include: ["src/**/*"],
      exclude: ["dist"],
    };

    await fs.writeFile(
      path.join(packagePath, "tsconfig.json"),
      JSON.stringify(tsconfig, null, 2)
    );

    // Step 3: Create README.md
    const readmeContent = `
# ${packageName}

## Description
<Insert description here>

## Features
- <Insert features here>

## Usage
- <Insert usage here>

## Tools
- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)`;

    await fs.writeFile(path.join(packagePath, "README.md"), readmeContent);

    // Step 5: Create src/index.ts
    const srcDir = path.join(packagePath, "src");
    await fs.mkdir(srcDir, { recursive: true });
    await fs.writeFile(
      path.join(srcDir, `${packageName}.ts`),
      `
    export default function ${packageName}() {
      console.log("Hello from ${packageName}!");
    }`
    );

    console.log(`Package "${packageName}" created successfully.`);
  } catch (error: any) {
    console.error(`Failed to create package: ${error.message}`);
    process.exit(1);
  }
}
