"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.print_todos = exports.update_list = exports.add_todo = void 0;
exports.get_list = get_list;
const cli_table_1 = __importDefault(require("cli-table"));
const fs = __importStar(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
// Location of taskhub-list.json
const file_path = path_1.default.join(__dirname, "taskhub-list.json");
/**
 * @returns Current Date Time - MM/DD/YYYY HH:MM
 */
const get_current_date = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${month}/${day}/${year} ${hours}:${minutes}`;
};
/**
 * Recreates taskhub-list.json based on given taskhub_list
 * @param taskhub_list
 */
async function write_to_File(taskhub_list) {
    try {
        await fs.writeFile(file_path, JSON.stringify(taskhub_list, null, 2));
    }
    catch (err) {
        throw err;
    }
}
async function get_list() {
    try {
        const data = await fs.readFile(file_path, "utf-8");
        return data ? JSON.parse(data) : [];
    }
    catch (err) {
        // Handles file does not exist error
        if (err.errno === -4058 && err.code === "ENOENT")
            return [];
        throw err;
    }
}
const add_todo = (taskhub_list, description) => {
    let todo_id = 0;
    if (taskhub_list.length === 0) {
        todo_id = 1;
    }
    else {
        todo_id = taskhub_list[taskhub_list.length - 1].id;
        todo_id++;
    }
    const todo = {
        id: todo_id,
        description: description,
        status: "todo",
        createdAt: get_current_date(),
        updatedAt: get_current_date(),
    };
    taskhub_list.push(todo);
    (0, exports.print_todos)([todo]);
    write_to_File(taskhub_list);
};
exports.add_todo = add_todo;
const update_list = (command, taskhub_list, id, desc_or_status) => {
    for (let i = 0; i < taskhub_list.length; i++) {
        if (id === taskhub_list[i].id.toString()) {
            switch (command) {
                case "delete":
                    (0, exports.print_todos)(taskhub_list.splice(i, 1));
                    break;
                case "mark":
                    taskhub_list[i].status = desc_or_status;
                    taskhub_list[i].updatedAt = get_current_date();
                    (0, exports.print_todos)([taskhub_list[i]]);
                    break;
                case "update":
                    taskhub_list[i].description = desc_or_status;
                    taskhub_list[i].updatedAt = get_current_date();
                    (0, exports.print_todos)([taskhub_list[i]]);
                    break;
                default:
                    break;
            }
        }
    }
    write_to_File(taskhub_list);
};
exports.update_list = update_list;
const print_todos = (taskhub_list, status = "") => {
    const table = new cli_table_1.default({
        head: ["Id", "Description", "Status", "Created At", "Updated At"],
    });
    for (let i = 0; i < taskhub_list.length; i++) {
        if (!status || taskhub_list[i].status === status)
            table.push([
                taskhub_list[i].id.toString(),
                taskhub_list[i].description,
                taskhub_list[i].status,
                taskhub_list[i].createdAt,
                taskhub_list[i].updatedAt,
            ]);
    }
    console.log(table.toString());
};
exports.print_todos = print_todos;
const help = () => {
    console.log("TaskHub - A command line application used to track and manage your tasks.");
    console.log("\nOptions:");
    console.log("add       Add a new task to your list of tasks.");
    console.log("delete    Delete a task from your list of tasks.");
    console.log("update    Update a task from your list of tasks.");
    console.log("mark      Change the status of a task from your list of tasks.");
    console.log("list      List all of your tasks or filter them by status.");
    console.log("help      Show the list of command options.");
};
exports.help = help;
