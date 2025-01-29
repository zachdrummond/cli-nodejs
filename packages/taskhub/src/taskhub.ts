/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\task.d.ts" />

import {
  add_task,
  get_list,
  print_tasks,
  update_list,
  help,
} from "./functions";

export async function taskhub(commands: string[]) {
  let taskhub_list: Task[] = [];

  const command = commands[1];
  let id: string = commands[2];
  let desc_or_status: string = "";

  taskhub_list = await get_list();

  switch (command) {
    case "add":
      desc_or_status = commands[2];
      add_task(taskhub_list, desc_or_status);
      break;
    case "delete":
    case "mark":
    case "update":
      if (taskhub_list.length == 0) {
        console.log("Your list of tasks is empty.");
      } else {
        desc_or_status = commands[3];
        update_list(command, taskhub_list, id, desc_or_status);
      }
      break;
    case "list":
      if (taskhub_list.length == 0) {
        console.log("Your list of tasks is empty.");
      } else {
        desc_or_status = commands[2];
        print_tasks(taskhub_list, desc_or_status);
      }
      break;
    case "help":
    default:
      help();
  }
}
