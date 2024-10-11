"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var filepath = 'todos.json';
var todos = [];
//Load and save
var loadTodos = function () {
    if (fs.existsSync(filepath)) {
        var data = fs.readFileSync(filepath, 'utf-8');
        todos = JSON.parse(data);
    }
};
//existsSyns -> To check the existence of paramente in this case parameter is filename
//readFileSync -> to read the file
//JSON.parse -> parses the JSON into todos array
//save function
var saveTodos = function () {
    fs.writeFileSync(filepath, JSON.stringify(todos, null, 2));
};
//writeFileSync -> to write the secon parameter into first paramenter
//first paramenter -> filepath
//second parameterJSON.stringify(todos, null, 2)
//stringify -> it converts todos array to a JSON string
//display function
var displayTodos = function () {
    if (todos.length === 0) {
        console.log("No todos Found");
    }
    else {
        todos.forEach(function (todo) {
            console.log("".concat(todo.id, ": [").concat(todo.completed ? 'x' : ' ', "] ").concat(todo.task));
        });
    }
};
//add and complete function
var addTodo = function (task) {
    var newTodo = { id: todos.length + 1, task: task, completed: false };
    todos.push(newTodo);
    saveTodos();
    console.log("Add todo: ".concat(task));
};
var completeTodo = function (id) {
    var todo = todos.find(function (todo) { return todo.id === id; });
    if (todo) {
        todo.completed = true;
        saveTodos();
        console.log("Completed todo: ".concat(todo.task));
    }
    else {
        console.log("Todo with id ".concat(id, " not found."));
    }
};
var main = function () {
    loadTodos();
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdin,
    });
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', function (line) {
        var _a = line.trim().split(' '), command = _a[0], args = _a.slice(1);
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
    rl.on('close', function () {
        console.log('Exiting the app. Goodbye!');
    });
};
main();
