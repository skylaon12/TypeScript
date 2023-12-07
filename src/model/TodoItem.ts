class TodoItem{
    
    constructor(
        public id: number,
        public task: string,
        public complete: boolean = false
        ){
        this.id = id;
        this.task = task;
        this.complete = complete;
    }

    // 파라미터, 리턴이 존재하지 않기 때문에 void로 명시
    printDetails(): void{
        console.log(
            `${this.id}\t${this.task}\t${this.complete ? '\t(complete)':''}`
            );
    }
}

export default TodoItem;