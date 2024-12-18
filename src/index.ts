/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />

import * as process from "node:process";
import {
  add_todo,
  delete_todo,
  update_todo,
  get_list,
  update_list,
  mark_todo,
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
      case "update":
        desc_or_status = commands[2];
        // update_todo(todo_list, id, description);
        update_list(update_todo, todo_list, id, desc_or_status);
        break;
      case "delete":
        update_list(delete_todo, todo_list, id, "");
        break;
      case "list":
        break;
      case "mark":
        desc_or_status = commands[2];
        update_list(mark_todo, todo_list, id, desc_or_status);
        break;
      default:
        console.log("default");
    }
  })();
}
