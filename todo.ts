import * as fs from 'fs';
import * as readline from 'readline';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}
const filepath = 'todos.json';
let todos: Todo[] =[];

//Load and save
const loadTodos = () => {
    if (fs.existsSync(filepath)) {
        const data = fs.readFileSync(filepath, 'utf-8');
        todos = JSON.parse(data);
    }
}
//existsSyns -> To check the existence of paramente in this case parameter is filename
//readFileSync -> to read the file
//JSON.parse -> parses the JSON into todos array

//save function
const saveTodos =() => {
    fs.writeFileSync(filepath, JSON.stringify(todos, null, 2));
}
//writeFileSync -> to write the secon parameter into first paramenter
//first paramenter -> filepath
//second parameterJSON.stringify(todos, null, 2)
//stringify -> it converts todos array to a JSON string

//display function
const displayTodos = () => {
    if(todos.length === 0) {
        console.log("No todos Found");
    }else{
        todos.forEach(todo => {
            console.log(`${todo.id}: [${todo.completed ? 'x' : ' '}] ${todo.task}`);
  
        });
    }
};


//add and complete function
const addTodo = (task: string) => {
    const newTodo: Todo = {id: todos.length + 1, task, completed: false};
    todos.push(newTodo);
    saveTodos();
    console.log(`Add todo: ${task}`);
};
const completeTodo = (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if(todo) {
        todo.completed = true;
        saveTodos();
        console.log(`Completed todo: ${todo.task}`);
    } else {
        console.log(`Todo with id ${id} not found.`);
    }
}

const main =() => {
    loadTodos();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdin,
    });
    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', (line) => {
        const[command, ...args] = line.trim().split(' ');

        switch (command) {
            case 'add': 
                addTodo(args.join(' '));
            break;
            case 'list':
                displayTodos();
                break;
            case 'complete':
                completeTodo(parseInt(args[0]));
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Unknown command. Use 'add', 'list', 'complete <id>', or 'exit'.");
                break;
        }
    });
    rl.on('close', () => {
        console.log('Exiting the app. Goodbye!');
    });
};
main();
