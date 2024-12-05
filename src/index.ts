import * as fs from 'node:fs/promises';
import * as process from "node:process";
import path from "path";

type todo = {
    id: number,
    description: string,
    status: "todo"| "in-progress"| "done",
    createdAt: Date,
    updatedAt: Date
};

const file_path:string = path.join(__dirname, 'todo-list.json');
const todo_list:todo[] = [];

if(process.argv.length > 2){
    const commands = process.argv.slice(2);
    const command = commands[0];

    switch(command){
        case 'add':
            const description: string = commands[1];
            update_todo_list(description);
            break;
        case 'update':
            console.log('update');
            break;
        case 'delete':
            console.log('delete');
            break;
        case 'list':
            console.log('list');
            break;
        default:
            console.log('default');
    }
}

async function update_todo_list(description: string){

    const todo: todo = {
        id: 1,
        description: description,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    todo_list.push(todo);

    try {
        await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2), {flag: 'a+'});
        console.log(todo);
    } catch (err) {
        console.log(err);
    }
}

async function get_todo_list() {
  try {
    const data = await fs.readFile(file_path, { encoding: 'utf8' });
    console.log(JSON.parse(data), typeof JSON.parse(data));
  } catch (err) {
    console.log(err);
  }
}
