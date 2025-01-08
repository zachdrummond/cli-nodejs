/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />

import * as process from "node:process";
import {
  add_todo,
  get_list,
  print_todos,
  update_list,
  help
} from "./functions";

let todo_list: Todo[] = [];

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);
  const command = commands[0];
  let id: string = commands[1];
  let desc_or_status: string = "";

  (async function () {
    todo_list = await get_list();

    switch (command) {
      case "add":
        desc_or_status = commands[1];
        add_todo(todo_list, desc_or_status);
        break;
      case "delete":
      case "mark":
      case "update":
        desc_or_status = commands[2];
        update_list(command, todo_list, id, desc_or_status);
        break;
      case "list":
        desc_or_status = commands[1];
        print_todos(todo_list, desc_or_status);
        break;
      case "help":
      default:
        help();
    }
  })();
}
