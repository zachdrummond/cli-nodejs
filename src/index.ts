/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />

import * as process from "node:process";
import { add_todo, delete_todo, get_todo_list, update_todo, mark_todo } from "./functions";

let todo_list: Todo[] = [];

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);
  const command = commands[0];
  let id: string = commands[1];
  let description: string = "";

  (async function () {
    todo_list = await get_todo_list();

    switch (command) {
      case "add":
        description = commands[1];
        add_todo(todo_list, description);
        break;
      case "update":
        description = commands[2];
        update_todo(todo_list, id, description);
        break;
      case "delete":
        delete_todo(todo_list, id);
        break;
      case "list":
        break;
      case "mark":
        break;
        default:
        console.log("default");
    }
  })();
}
