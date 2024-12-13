/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />

import * as fs from "node:fs/promises";
import * as process from "node:process";
import path from "path";
import { get_todo_list } from "./functions";

const file_path: string = path.join(__dirname, "todo-list.json");
let todo_list: Todo[] = [];

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);
  const command = commands[0];
  (async function () {
    todo_list = await get_todo_list(file_path);

    switch (command) {
      case "add":
        const description: string = commands[1];
        update_todo_list(description);
        break;
      case "update":
        console.log("update");
        break;
      case "delete":
        console.log("delete");
        break;
      case "list":
        console.log("list");
        break;
      default:
        console.log("default");
    }
  })();
}

async function update_todo_list(description: string) {
  let todo_id: number = 0;

  if (todo_list.length === 0) {
    todo_id = 1;
  } else {
    todo_id = todo_list[todo_list.length - 1].id;
    todo_id++;
  }

  const todo: Todo = {
    id: todo_id,
    description: description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todo_list.push(todo);

  try {
    await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2));
  } catch (err) {
    console.log(err);
  }
}
