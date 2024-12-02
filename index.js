import process from "node:process";

if(process.argv.length > 2){
    const commands = process.argv.slice(2);
    console.log(commands);
}