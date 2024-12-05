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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs/promises"));
const process = __importStar(require("node:process"));
if (process.argv.length > 2) {
    const commands = process.argv.slice(2);
    const command = commands[0];
    switch (command) {
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
async function update_todo_list(description) {
    const todo = {
        id: 1,
        description: description,
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date()
    };
    get_current_id();
    try {
        await fs.writeFile('todo-list.json', JSON.stringify(todo));
        console.log(todo);
    }
    catch (err) {
        console.log(err);
    }
}
async function get_current_id() {
    try {
        const data = await fs.readFile('to-do-list.json', { encoding: 'utf8' });
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}
