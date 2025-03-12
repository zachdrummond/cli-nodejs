import * as process from "node:process";
import github_api from "@cli-nodejs/github-api";
import package_boilerplate from "@cli-nodejs/pkg-bp";
import taskhub from "@cli-nodejs/taskhub";

const commands = process.argv.slice(2);

switch (commands[0]) {
  case "github-api":
  case "gh-api":
  case "gh":
    console.log("GITHUB API");
    github_api();
    break;
  case "boilerplate":
  case "bp":
  case "pkg-bp":
    package_boilerplate(commands);
    break;
  case "taskhub":
    taskhub(commands);
    break;
  case "help":
  default:
    console.log(
      "CLI Commander - A command line interface application used to command all packages within cli-nodejs."
    );
    console.log("\nOptions:");
    console.log("taskhub       Track and manage your tasks.");
    console.log(
      "boilerplate   Create the boilerplate files for a new package."
    );
    console.log("help          Show the list of command options.");
    break;
}
