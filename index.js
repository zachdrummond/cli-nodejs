import process from "node:process";

if(process.argv.length > 2){
    const commands = process.argv.slice(2);

    switch(commands[0]){
        case 'add':
            console.log('add');
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