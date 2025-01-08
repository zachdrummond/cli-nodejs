import Table from "cli-table";
import * as fs from "node:fs/promises";
import path from "path";

// Location of taskhub-list.json
const file_path: string = path.join(__dirname, "taskhub-list.json");

/**
 * @returns Current Date Time - MM/DD/YYYY HH:MM
 */
const get_current_date = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

/**
 * Recreates taskhub-list.json based on given taskhub_list
 * @param taskhub_list
 */
async function write_to_File(taskhub_list: Todo[]): Promise<void> {
  try {
    await fs.writeFile(file_path, JSON.stringify(taskhub_list, null, 2));
  } catch (err) {
    throw err;
  }
}

export async function get_list(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (err: any) {
    // Handles file does not exist error
    if (err.errno === -4058 && err.code === "ENOENT") return [];
    throw err;
  }
}

export const add_todo = (taskhub_list: Todo[], description: string) => {
  let todo_id: number = 0;

  if (taskhub_list.length === 0) {
    todo_id = 1;
  } else {
    todo_id = taskhub_list[taskhub_list.length - 1].id;
    todo_id++;
  }

  const todo: Todo = {
    id: todo_id,
    description: description,
    status: "todo",
    createdAt: get_current_date(),
    updatedAt: get_current_date(),
  };

  taskhub_list.push(todo);
  print_todos([todo]);

  write_to_File(taskhub_list);
};

export const update_list = (
  command: string,
  taskhub_list: Todo[],
  id: string,
  desc_or_status: string
) => {
  for (let i = 0; i < taskhub_list.length; i++) {
    if (id === taskhub_list[i].id.toString()) {
      switch (command) {
        case "delete":
          print_todos(taskhub_list.splice(i, 1));
          break;
        case "mark":
          taskhub_list[i].status = desc_or_status;
          taskhub_list[i].updatedAt = get_current_date();
          print_todos([taskhub_list[i]]);
          break;
        case "update":
          taskhub_list[i].description = desc_or_status;
          taskhub_list[i].updatedAt = get_current_date();
          print_todos([taskhub_list[i]]);
          break;
        default:
          break;
      }
    }
  }
  write_to_File(taskhub_list);
};

export const print_todos = (taskhub_list: Todo[], status: string = "") => {
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
