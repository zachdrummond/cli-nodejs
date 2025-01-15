export declare function get_list(): Promise<Todo[]>;
export declare const add_todo: (taskhub_list: Todo[], description: string) => void;
export declare const update_list: (command: string, taskhub_list: Todo[], id: string, desc_or_status: string) => void;
export declare const print_todos: (taskhub_list: Todo[], status?: string) => void;
export declare const help: () => void;
