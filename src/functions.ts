import * as fs from "node:fs/promises";
import path from "path";

const file_path: string = path.join(__dirname, "todo-list.json");

const get_current_date = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();
  return `${month}-${day}-${year}`;
};

export async function get_todo_list(): Promise<Todo[]> {
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

  try {
    await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2));
  } catch (err) {
    throw err;
  }
}

export async function delete_todo(todo_list: Todo[], description: string) {
  
}
