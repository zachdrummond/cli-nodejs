import * as process from "node:process";
import { taskhub } from "./taskhub";

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);

  switch (commands[0]) {
    case "taskhub":
      taskhub(commands);
      break;
    default:
      console.log("default");
      break;
  }
}
