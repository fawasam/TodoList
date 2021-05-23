//selectors


const todoInput=document.querySelector(".todo-input")
const todoBtn=document.querySelector(".todo-btn")
const todoList=document.querySelector(".todo-list")
const filterOpt=document.querySelector(".todo-filter")
//console.log(todoInput,todoBtn,todoList);

//events listeners

document.addEventListener("DOMContentLoaded",getTodos)
todoBtn.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck)
filterOpt.addEventListener("click",filterTodo)



//function

function addTodo(e){
    //prevent from submitting
    e.preventDefault()

    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //li create
    const newTodoList = document.createElement("li")
    newTodoList.innerText=todoInput.value
    newTodoList.classList.add("todo-item")
    todoDiv.appendChild(newTodoList)

    //add todo to localstorage
    saveLocal(todoInput.value)

    //check btn create
    const cmpltBtn=document.createElement("button")
    cmpltBtn.innerHTML='<i class="fa fa-check"></i>'
    cmpltBtn.classList.add("cmplt-btn")
    todoDiv.appendChild(cmpltBtn)
    //trash btn
    const dltBtn=document.createElement("button")
    dltBtn.innerHTML='<i class="fa fa-trash"></i>'
    dltBtn.classList.add("dlt-btn")
    todoDiv.appendChild(dltBtn)
    //append to list 
    todoList.appendChild(todoDiv)

    //clear toinput value
    todoInput.value =""
   // console.log(todoList);


}
 function deleteCheck(e){
    // console.log(e.target.classList)
     const item =e.target
    // console.log(item.classList);
     //delete todo
     if(item.classList[0]==="dlt-btn")
     {
         const todo =item.parentElement;
         //animation
         todo.classList.add("fall")
         removeLocalTodo(todo)
         todo.addEventListener("transitionend",function(){
            todo.remove()
         })

     }
     //check todo 

     if(item.classList[0]==="cmplt-btn"){
        const todo =item.parentElement;
        todo.classList.toggle("completed")


     }

 }

 function filterTodo(e){
     const todos =todoList.childNodes;
     todos.forEach(function(todo){
        // console.log(todo)
        // console.log(e.target.value);        
         switch(e.target.value)
         {
             case "all" :
                 todo.style.display="flex";
                 break;
             case "completed":
                 if(todo.classList.contains("completed")){
                     todo.style.display = "flex"
                 }else{
                     todo.style.display = "none"
                 } 
                 break;
             case "pending":
                 if(!todo.classList.contains("completed")) 
                 {
                     todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }        
                break;
         }
     })

 }


 function saveLocal(todo){
     // check already in there
     let todos;
     if(localStorage.getItem("todos")=== null){
         todos=[]
     }else{
         todos=JSON.parse(localStorage.getItem("todos"))
     }
     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
    
 }


 function getTodos(){
     let todos;
     if(localStorage.getItem("todos")=== null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        
    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //li create
    const newTodoList = document.createElement("li")
    newTodoList.innerText=todo;
    newTodoList.classList.add("todo-item")
    todoDiv.appendChild(newTodoList)

    //check btn create
    const cmpltBtn=document.createElement("button")
    cmpltBtn.innerHTML='<i class="fa fa-check"></i>'
    cmpltBtn.classList.add("cmplt-btn")
    todoDiv.appendChild(cmpltBtn)
    //trash btn
    const dltBtn=document.createElement("button")
    dltBtn.innerHTML='<i class="fa fa-trash"></i>'
    dltBtn.classList.add("dlt-btn")
    todoDiv.appendChild(dltBtn)
    //append to list 
    todoList.appendChild(todoDiv)


    })

 }

 function removeLocalTodo(todo)
 {
    let todos;
    if(localStorage.getItem("todos")=== null){
       todos=[]
   }else{
       todos=JSON.parse(localStorage.getItem("todos"))
   }
    const todoIndex =todo.children[0].innerText
        todos.splice(todos.indexOf(todoIndex),1)
        localStorage.setItem("todos",JSON.stringify(todos))
 }