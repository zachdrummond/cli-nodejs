import Table from "cli-table";
import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

declare interface Task {
  id: number,
  description: string,
  status: string,
  createdAt: string,
  updatedAt: string
}

// Location of taskhub-list.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file_path: string = path.join(__dirname, "taskhub-list.json");

/**
 * @returns Current Date Time - MM/DD/YYYY HH:MM:SS
 */
const get_current_date = (): string => {
  const now = new Date();
  return `${now.toLocaleString()}`;
};

/**
 * Recreates taskhub-list.json based on given list of tasks
 * @param taskhub_list
 */
async function write_to_File(taskhub_list: Task[]): Promise<void> {
  try {
    await fs.writeFile(file_path, JSON.stringify(taskhub_list, null, 2));
  } catch (err) {
    throw err;
  }
}

/**
 * Retrieves the current list of tasks
 * @returns Array of Tasks
 */
export async function get_list(): Promise<Task[]> {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data ? (JSON.parse(data) as Task[]) : [];
  } catch (err: any) {
    // Handles file does not exist error
    if (err.errno === -4058 && err.code === "ENOENT") return [];
    throw err;
  }
}

/**
 * Adds a new task to the list of tasks
 * @param taskhub_list
 * @param description
 */
export const add_task = (taskhub_list: Task[], description: string) => {
  let task_id: number = 0;

  if (taskhub_list.length === 0) {
    task_id = 1;
  } else {
    task_id = taskhub_list[taskhub_list.length - 1].id;
    task_id++;
  }

  const task: Task = {
    id: task_id,
    description: description,
    status: "task",
    createdAt: get_current_date(),
    updatedAt: get_current_date(),
  };

  taskhub_list.push(task);
  print_tasks([task]);

  write_to_File(taskhub_list);
};

/**
 * Updates or deletes a task based on id and desc_or_status
 * @param command delete, mark, update
 * @param taskhub_list
 * @param id
 * @param desc_or_status
 */
export const update_list = (
  command: string,
  taskhub_list: Task[],
  id: string,
  desc_or_status: string
) => {
  for (let i = 0; i < taskhub_list.length; i++) {
    if (id === taskhub_list[i].id.toString()) {
      switch (command) {
        case "delete":
          print_tasks(taskhub_list.splice(i, 1));
          break;
        case "mark":
          taskhub_list[i].status = desc_or_status;
          taskhub_list[i].updatedAt = get_current_date();
          print_tasks([taskhub_list[i]]);
          break;
        case "update":
          taskhub_list[i].description = desc_or_status;
          taskhub_list[i].updatedAt = get_current_date();
          print_tasks([taskhub_list[i]]);
          break;
        default:
          break;
      }
    }
  }
  write_to_File(taskhub_list);
};

/**
 * Prints the current list of tasks to the console
 * @param taskhub_list
 * @param status The filter for the tasks
 */
export const print_tasks = (taskhub_list: Task[], status: string = "") => {
  const table = new Table({
    head: ["Id", "Description", "Status", "Created At", "Updated At"],
  });

  for (let i = 0; i < taskhub_list.length; i++) {
    if (!status || taskhub_list[i].status === status)
      table.push([
        taskhub_list[i].id.toString(),
        taskhub_list[i].description,
        taskhub_list[i].status,
        taskhub_list[i].createdAt,
        taskhub_list[i].updatedAt,
      ]);
  }
  console.log(table.toString());
};

/**
 * Prints the list of commands for this application
 */
export const help = () => {
  console.log(
    "TaskHub - A command line application used to track and manage your tasks."
  );
  console.log("\nOptions:");
  console.log("add       Add a new task to your list of tasks.");
  console.log("delete    Delete a task from your list of tasks.");
  console.log("update    Update a task from your list of tasks.");
  console.log("mark      Change the status of a task from your list of tasks.");
  console.log("list      List all of your tasks or filter them by status.");
  console.log("help      Show the list of command options.");
};
