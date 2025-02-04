import * as process from "node:process";
import {taskhub} from "@cli-nodejs/taskhub"
import {package_boilerplate} from "@cli-nodejs/pkg-bp";

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);

  switch (commands[0]) {
    case "taskhub":
      taskhub(commands);
      break;
    case "boilerplate":
    case "pkg-bp":
      package_boilerplate();
      break;
    case "help":
    default:
      console.log(
        "CLI Commander - A command line interface application used to command all packages within cli-nodejs."
      );
      console.log("\nOptions:");
      console.log("taskhub   Track and manage your tasks.");
      console.log("help      Show the list of command options.");
      break;
  }
}
