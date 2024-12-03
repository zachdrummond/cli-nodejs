import * as fs from 'node:fs/promises';
import process from "node:process";

if(process.argv.length > 2){
    const commands = process.argv.slice(2);
    const command = commands[0];

    switch(command){
        case 'add':
            const task = commands[1];
            update_todo_list(task);
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

async function update_todo_list(data){
    try {
        await fs.writeFile('todo-list.json', data);
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}