import * as fs from "node:fs/promises";

export async function get_todo_list(file_path: string): Promise<Todo[]> {
  try {
    const data = await fs.readFile(file_path, "utf-8");
    return data ? (JSON.parse(data) as Todo[]) : [];
  } catch (err: any) {
    throw err;
  }
}
