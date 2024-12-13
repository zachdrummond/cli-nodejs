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
exports.get_todo_list = get_todo_list;
exports.add_todo_list = add_todo_list;
const fs = __importStar(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
const file_path = path_1.default.join(__dirname, "todo-list.json");
const get_current_date = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    return `${month}-${day}-${year}`;
};
async function get_todo_list() {
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
async function add_todo_list(todo_list, description) {
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
    try {
        await fs.writeFile(file_path, JSON.stringify(todo_list, null, 2));
    }
    catch (err) {
        throw err;
    }
}
