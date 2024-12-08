import * as fs from "node:fs/promises";
import * as process from "node:process";
import path from "path";

interface Todo {
  id: number;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

const file_path: string = path.join(__dirname, "todo-list.json");
let todo_list: Todo[] = [];

if (process.argv.length > 2) {
  const commands = process.argv.slice(2);
  const command = commands[0];
  (async function () {
    todo_list = await get_todo_list();

    switch (command) {
      case "add":
        const description: string = commands[1];
        // update_todo_list(description);
        console.log(todo_list);
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

async function get_todo_list(): Promise<any> {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (err) {
    throw new Error(`Node-CLI To Do App: get_todo_list()\n` + err);
  }
}

async function update_todo_list(description: string) {
  const todo: Todo = {
    id: 1,
    description: description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todo_list.push(todo);

  try {
    await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2), {
      flag: "a+",
    });
    console.log(todo);
  } catch (err) {
    console.log(err);
  }
}
