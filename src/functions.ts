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

export async function add_todo(todo_list: Todo[], description: string) {
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

  write_to_File(todo_list);
}

export const mark_todo = (
  todo_list: Todo[],
  index: number,
  status: string
) => {
  todo_list[index].status = status;
};

export const delete_todo = (todo_list: Todo[], index: number) => {
  todo_list.splice(index, 1);
};

export const update_todo = (
  todo_list: Todo[],
  index: number,
  description: string
) => {
  todo_list[index].description = description;
};

export async function update_list(
  func: (
    todo_list: Todo[],
    index: number,
    desc_or_status: string
  ) => void,
  todo_list: Todo[],
  id: string,
  desc_or_status: string
) {
  for (let i = 0; i < todo_list.length; i++) {
    if (id === todo_list[i].id.toString()) {
      func(todo_list, i, desc_or_status);
    }
  }
  write_to_File(todo_list);
}

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
