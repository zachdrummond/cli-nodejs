"use strict";
/// <reference path="C:\Users\zachd\Documents\Coding\cli-nodejs\types\todo.d.ts" />
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
const process = __importStar(require("node:process"));
const functions_1 = require("./functions");
let todo_list = [];
if (process.argv.length > 2) {
    const commands = process.argv.slice(2);
    const command = commands[0];
    let id = commands[1];
    let desc_or_status = "";
    (async function () {
        todo_list = await (0, functions_1.get_list)();
        switch (command) {
            case "add":
                desc_or_status = commands[1];
                (0, functions_1.add_todo)(todo_list, desc_or_status);
                break;
            case "delete":
            case "mark":
            case "update":
                desc_or_status = commands[2];
                (0, functions_1.update_list)(command, todo_list, id, desc_or_status);
                break;
            case "list":
                desc_or_status = commands[1];
                (0, functions_1.list_todos)(todo_list, desc_or_status);
                break;
            default:
                console.log("default");
        }
    })();
}
