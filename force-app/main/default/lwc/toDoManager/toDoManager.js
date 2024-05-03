import { LightningElement } from 'lwc';

export default class ToDoManager extends LightningElement {
    refreshToDo(){
        console.log("refresh todo")
        this.refs.pendingToDo.refreshList();
        this.refs.completedToDo.refreshList();
    }
} 