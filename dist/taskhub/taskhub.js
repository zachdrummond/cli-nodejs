"use strict";
/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskhub = taskhub;
const functions_1 = require("./functions");
async function taskhub(commands) {
    let taskhub_list = [];
    const command = commands[1];
    let id = commands[2];
    let desc_or_status = "";
    taskhub_list = await (0, functions_1.get_list)();
    switch (command) {
        case "add":
            desc_or_status = commands[2];
            (0, functions_1.add_todo)(taskhub_list, desc_or_status);
            break;
        case "delete":
        case "mark":
        case "update":
            if (taskhub_list.length == 0) {
                console.log("Your list of tasks is empty.");
            }
            else {
                desc_or_status = commands[2];
                (0, functions_1.update_list)(command, taskhub_list, id, desc_or_status);
            }
            break;
        case "list":
            if (taskhub_list.length == 0) {
                console.log("Your list of tasks is empty.");
            }
            else {
                desc_or_status = commands[2];
                (0, functions_1.print_todos)(taskhub_list, desc_or_status);
            }
            break;
        case "help":
        default:
            (0, functions_1.help)();
    }
}
