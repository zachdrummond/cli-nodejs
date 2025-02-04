import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function package_boilerplate(commands: string[]) {
  const packageName = commands[1];

  if (!packageName) {
    console.error("Error: Please provide a name for your package.");
    process.exit(1);
  }

  const packagePath = path.join("packages", packageName);

  // Step 1: Initialize the new package
  try {
    execSync(`npm init -w ./${packagePath} -y`, { stdio: "inherit" });
    console.log(`Package "${packageName}" created successfully.`);

    // Step 2: Create tsconfig.json
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

    fs.writeFileSync(
      path.join(packagePath, "tsconfig.json"),
      JSON.stringify(tsconfig, null, 2)
    );

    // Step 3: Create README.md
    const readmeContent = `# ${packageName}`;
    fs.writeFileSync(path.join(packagePath, "README.md"), readmeContent);

    // Step 4: Create src/index.js
    const srcDir = path.join(packagePath, "src");
    fs.mkdirSync(srcDir, { recursive: true });
    fs.writeFileSync(path.join(srcDir, `${packageName}.js`), "");

    console.log(`Package "${packageName}" created successfully.`);
  } catch (error: any) {
    console.error(`Failed to create package: ${error.message}`);
    process.exit(1);
  }
}