import Table from "cli-table";
import * as fs from "node:fs/promises";
import path from "path";

const file_path: string = path.join(__dirname, "todo-list.json");

const get_current_date = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

async function write_to_File(todo_list: Todo[]) {
  try {
    await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2));
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

export const add_todo = (todo_list: Todo[], description: string) => {
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
    createdAt: get_current_date(),
    updatedAt: get_current_date(),
  };

  todo_list.push(todo);
  print_todos([todo]);

  write_to_File(todo_list);
};

export const update_list = (
  command: string,
  todo_list: Todo[],
  id: string,
  desc_or_status: string
) => {
  for (let i = 0; i < todo_list.length; i++) {
    if (id === todo_list[i].id.toString()) {
      switch (command) {
        case "delete":
          print_todos(todo_list.splice(i, 1));
          break;
        case "mark":
          todo_list[i].status = desc_or_status;
          todo_list[i].updatedAt = get_current_date();
          print_todos([todo_list[i]]);
          break;
        case "update":
          todo_list[i].description = desc_or_status;
          todo_list[i].updatedAt = get_current_date();
          print_todos([todo_list[i]]);
          break;
        default:
          break;
      }
    }
  }
  write_to_File(todo_list);
};

export const print_todos = (todo_list: Todo[], status: string = "") => {
  const table = new Table({
    head: ["Id", "Description", "Status", "Created At", "Updated At"],
  });

  for (let i = 0; i < todo_list.length; i++) {
    if (!status || todo_list[i].status === status)
      table.push([
        todo_list[i].id.toString(),
        todo_list[i].description,
        todo_list[i].status,
        todo_list[i].createdAt,
        todo_list[i].updatedAt,
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

// function isValidStatus(status: string): status is Status {
//     return ["todo", "in-progress", "done"].includes(status);
// }

// let statusString: string = "todo"; // Could be dynamic
// if (isValidStatus(statusString)) {
//     let taskStatus: Status = statusString;
// } else {
//     // Handle the invalid status case
//     console.error("Invalid status value");
// }
