import * as inquirer from 'inquirer';
import TodoCollection from '../service/TodoCollection';
import TodoItem from '../model/TodoItem';
import { data } from '../data';
import { Commands } from '../model/Commands';

class TodoConsole{
    private todoCollection : TodoCollection;

    private showComleted : boolean;

    constructor(){
        this.showComleted = true;
        const sampleTodos: TodoItem[] = data.map(
            (item) => new TodoItem(item.id, item.task, item.complete)
        );

        this.todoCollection = new TodoCollection('My Todo List', sampleTodos);

    }

    displayTodoList():void{
        console.log(
            `===========${this.todoCollection.userName}===========` + 
            `(${this.todoCollection.getItemCounts().incomplete} items todo)`
        );
        this.todoCollection
            .getTodoItems(this.showComleted)
            .forEach((item) => item.printDetails());
    }

    promptUser():void{
        console.clear();
        this.displayTodoList();

        inquirer.prompt({
            type:'list',
            name:'command',
            message:'Choose option',
            choices: Object.values(Commands),
        }).then((answers) => {
            switch(answers["command"]){
                case Commands.Toggle:
                    this.showComleted = !this.showComleted;
                    this.promptUser();
                    break;
                case Commands.Add:
                    this.promptAdd();
                    break;
            }
        });
    }

    promptAdd() : void{
        console.clear();
        inquirer.prompt({
            type: "input",
            name: "add",
            message: "Enter task :"
        }).then((answers) =>{
            if(answers["add"] !== ""){
                this.todoCollection.addTodo(answers["add"]);
            }
            this.promptUser();
        })
    }
}

export default TodoConsole;