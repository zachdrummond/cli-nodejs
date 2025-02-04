import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function package_boilerplate() {
  console.log("WORKS!");
  const packageName = process.argv[2];
  console.log(packageName);
}
