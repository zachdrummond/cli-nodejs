/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />

import {
  add_todo,
  get_list,
  print_todos,
  update_list,
  help,
} from "./functions";

export async function taskhub(commands: string[]) {
  let taskhub_list: Todo[] = [];

  const command = commands[1];
  let id: string = commands[2];
  let desc_or_status: string = "";

  taskhub_list = await get_list();

  switch (command) {
    case "add":
      desc_or_status = commands[2];
      add_todo(taskhub_list, desc_or_status);
      break;
    case "delete":
    case "mark":
    case "update":
      if (taskhub_list.length == 0) {
        console.log("Your list of tasks is empty.");
      } else {
        desc_or_status = commands[2];
        update_list(command, taskhub_list, id, desc_or_status);
      }
      break;
    case "list":
      if (taskhub_list.length == 0) {
        console.log("Your list of tasks is empty.");
      } else {
        desc_or_status = commands[2];
        print_todos(taskhub_list, desc_or_status);
      }
      break;
    case "help":
    default:
      help();
  }
}
