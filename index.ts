import * as fs from 'node:fs/promises';
import process from "node:process";

type todo = {
    id: number,
    description: string,
    status: "todo"| "in-progress"| "done",
    createdAt: Date,
    updatedAt: Date
};

if(process.argv.length > 2){
    const commands = process.argv.slice(2);
    const command = commands[0];

    switch(command){
        case 'add':
            const description = commands[1];
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

    try {
        await fs.writeFile('todo-list.json', todo);
        console.log(todo);
    } catch (err) {
        console.log(err);
    }
}