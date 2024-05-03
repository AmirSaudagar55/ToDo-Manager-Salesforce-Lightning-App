import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import saveToDo from "@salesforce/apex/ToDoController.saveToDo";

export default class CreateTask extends LightningElement {
    @api targetParent;
    taskTitle;
    dueDate;
    showDueDate = false;
    showSave = false;

    connectedCallback(){
        console.log("Target Parent : ", this.targetParent);
    }

    handleOnChange(event) {
        const fieldName = event.target.name;
        if(fieldName === "taskTitle") {
            this.taskTitle = event.target.value;
            if(this.taskTitle != "")
            {
                this.showDueDate = true;
            }
            else{
                this.showDueDate = false
            }
        }
        else if(fieldName === 'dueDate'){
            this.dueDate = event.target.value;
            if(this.dueDate != "" && this.targetParent != true)
            {
                this.showSave = true;
            }
            else{
                this.showSave = false;
            }
        }
    }

    handleClick(){
        console.log("Button Clicked on Child")
        saveToDo({title : this.taskTitle, dueDate: this.dueDate})
        .then((result) => {
            if ((result) === "Success"){
                this.taskTitle ="";
                this.dueDate = "";

                const evt = new ShowToastEvent({
                    title : "Success",
                    message : "A new item has been added in your todo list.",
                    variant : "success"
                });
                this.dispatchEvent(evt);
                this.dispatchEvent(new CustomEvent("refreshtodo"));

            }
        })
        .catch((error)=>{
            console.log("Error ::: ", error)
            const evt = new ShowToastEvent({
                title : "Error",
                message : error.body.message,
                variant : "error"
            });
            this.dispatchEvent(evt);
        });
    }

    @api handleParentClick(){
        this.handleClick();
    }
}