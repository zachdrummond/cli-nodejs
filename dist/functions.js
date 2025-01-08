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
exports.list_todos = exports.update_list = exports.add_todo = void 0;
exports.get_list = get_list;
const cli_table_1 = __importDefault(require("cli-table"));
const fs = __importStar(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
const file_path = path_1.default.join(__dirname, "todo-list.json");
const get_current_date = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${month}/${day}/${year} ${hours}:${minutes}`;
};
async function write_to_File(todo_list) {
    try {
        await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2));
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
const add_todo = (todo_list, description) => {
    let todo_id = 0;
    if (todo_list.length === 0) {
        todo_id = 1;
    }
    else {
        todo_id = todo_list[todo_list.length - 1].id;
        todo_id++;
    }
    const todo = {
        id: todo_id,
        description: description,
        status: "todo",
        createdAt: get_current_date(),
        updatedAt: get_current_date(),
    };
    todo_list.push(todo);
    write_to_File(todo_list);
};
exports.add_todo = add_todo;
const update_list = (command, todo_list, id, desc_or_status) => {
    for (let i = 0; i < todo_list.length; i++) {
        if (id === todo_list[i].id.toString()) {
            switch (command) {
                case "delete":
                    todo_list.splice(i, 1);
                    break;
                case "mark":
                    todo_list[i].status = desc_or_status;
                    todo_list[i].updatedAt = get_current_date();
                    break;
                case "update":
                    todo_list[i].description = desc_or_status;
                    todo_list[i].updatedAt = get_current_date();
                    break;
                default:
                    break;
            }
        }
    }
    write_to_File(todo_list);
};
exports.update_list = update_list;
const list_todos = (todo_list, status) => {
    const table = new cli_table_1.default();
    if (status === "") {
        table.push(todo_list);
        console.log(table.toString());
    }
    else {
        const todo_list_by_status = [];
        for (let i = 0; i < todo_list.length; i++) {
            if (todo_list[i].status === status)
                todo_list_by_status.push(todo_list[i]);
        }
        table.push(todo_list_by_status);
        console.log(table.toString());
    }
};
exports.list_todos = list_todos;
// function isValidStatus(status: string): status is Status {
//     return ["todo", "in-progress", "done"].includes(status);
// }
// let statusString: string = "todo"; // Could be dynamic
// if (isValidStatus(statusString)) {
//     let taskStatus: Status = statusString;
// } else {
//     // Handle the invalid status case
//     console.error("Invalid status value");
// }
