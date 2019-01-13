let currentTaskListId = null;
let currentTaskListSlug = null;
const taskListTitle = document.getElementById('task-list-title');
const tasksLists  = $('#tasks-lists')
const tasksListsInput  = $('#tasks-lists-input')
const tasksTable  = $('#tasks-table')
const taskTitleInput = $('#task-title-input');
const taskDescriptionInput = $('#task-description-input');

function getTasksLists() {
    $.get('/api/tasks-lists', data => {
        for (item of data.task_lists) { 
            tasksLists.append(`
                <a data-taskListId="${item.id}" class="list-group-item list-group-item-action tasks-lists-item ${ currentTaskListId == item.id ? 'active' : ''}" onclick="getTask(${item.id})">
                <i class="material-icons">list</i> 
                <span class="task-list-sidebar-title">${item.name}</span>
                <button class="tasks-lists-delete btn p-0 m-0 ml-2 text-right" onclick="removeTaskList(${item.id})"><i class="material-icons p-0 m-0 ">delete</i></button>
                <a>
                `);
        }
    });
}

function createTaskList(){
    let requestData = {
        name : tasksListsInput.val()
    };
    $.post('/api/tasks-lists',requestData, data => {
        let item = data.task_list;
        tasksLists.append(`
            <a data-taskListId="${item.id}"  class="list-group-item list-group-item-action tasks-lists-item" onclick="getTask(${item.id})">
            <i class="material-icons">list</i> 
            <span class="task-list-sidebar-title">${item.name}</span>
            <button class="tasks-lists-delete btn p-0 m-0 ml-2 text-right" onclick="removeTaskList(${item.id})"><i class="material-icons p-0 m-0 ">delete</i></button>
            <a>
            `);
        tasksListsInput.val('');
    });
}

function editTaskList() {
    (async () => { 
        const {value: text} = await Swal({
            input               : 'text',
            inputPlaceholder    : 'Titulo',
            inputValue          : taskListTitle.innerHTML,
            showCancelButton    : true
        })

        if (text && text != taskListTitle.innerHTML) {
           $.ajax({
            type    : "PUT",
            url     : `/api/tasks-lists/${currentTaskListId}`,
            data    : {name: text},
            success: function (data) {
                taskListTitle.innerHTML = text;
                $(`[data-taskListId='${currentTaskListId}']`).find('.task-list-sidebar-title').html(text);
            }
        });
       }
   })()
}

function removeTaskList(id) {
    let e = window.event;
    e.stopPropagation();
    Swal({
      title: 'Você tem certeza ?',
      text: "Você não poderá reverter isso!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Deletar!',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.value) {
        $.ajax({
            type: "DELETE",
            url: `/api/tasks-lists/${id}`,
            success: function (data) {
                $(`[data-taskListId=${id}]`).remove();
                Swal(
                  'Feito!',
                  'Lista de tarefa removida.',
                  'success'
                  );

            }
        });
    }
})
}

function tasksListsSortable () {
   $('.sortable').sortable({
    update : function (){
     let tasksLists = [];
     for (taskList of $('.sortable .tasks-lists-item').toArray() ) {
        tasksLists.push(taskList.getAttribute('data-taskListId'));
    }
    $.ajax({
        type: "PUT",
        url: `/api/tasks-lists/update-positions`,
        data: {tasksLists : tasksLists}
    });
}
});
}

function tasksSortable(){
    $('.sortable-table').sortable({
        update : function (){
         let tasks = [];
         for (task of $('.sortable-table .task').toArray() ) {
            tasks.push(task.getAttribute('data-taskId'));
        }
        $.ajax({
            type: "PUT",
            url: `/api/tasks-lists/tasks/update-positions`,
            data: {tasks : tasks}
        });
    }
});
}

function getTask(id){
    if($(window).width() < 1200) {
        $('#sidebar').addClass('d-none');
    }
    currentTaskListId = id;
    window.history.pushState("", "Lista de Tarefas", `/${id}`);
    $('.tasks-lists-item').removeClass('active');
    $(`[data-taskListId=${id}]`).addClass('active');
    $('.task').remove();
    $('#main-task').removeClass('d-none');
    $.get(`/api/tasks-lists/${id}`, data => {
        if(!data.task_lists){
            $('#main-task').addClass('d-none');
            return false;
        }
        taskListTitle.innerHTML  = data.task_lists.name;
    });  

    $.get(`/api/tasks-lists/${id}/tasks`, data => {
        for (item of data.tasks) {
            insertTaskOnTable(item);
        }
    });   
}

function storeTask() {
    let requestData = {
        title       : taskTitleInput.val(),
        description : taskDescriptionInput.val(),
    };
    $.post(`/api/tasks-lists/${currentTaskListId}/tasks`, requestData, data => {
        insertTaskOnTable(data.task);
        taskDescriptionInput.val('');
        taskTitleInput.val('');
    });
}

function editTask(id) {
    (async () => { 
        let taskTitle = $(`[data-taskId="${id}"] .task-title`);
        let taskDescription = $(`[data-taskId="${id}"] .task-description`);
        const {value: formValues} = await Swal({
          title: 'Editar Tarefa',
          html:
          `<input id="swal-input1" value="${taskTitle.html()}" placeholder="Titulo" class="swal2-input">` +
          `<input id="swal-input2" value="${taskDescription.html()}" placeholder="Descrição" class="swal2-input">`,
          focusConfirm: false,
          showCancelButton    : true,
          preConfirm: () => {
            return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
            ]
        }})

        if (formValues) {
            let task = formValues;      
            console.log(task);
           $.ajax({
            type    : "PUT",
            url     : `/api/tasks-lists/tasks/${id}`,
            data    : {title: task[0], description: task[1]},
            success: function (data) {
                taskTitle.html(data.task.title);
                taskDescription.html(data.task.description);
            }
            });
        }

    })()
}

function changeTaskStatus(id) {
    $.ajax({
        type: "PUT",
        url: `/api/tasks-lists/tasks/${id}/status`,
        success: function (data) {
            let task = $(`[data-taskId='${id}']`);
            if (data.task.status == 'concluido') {
                task.addClass('bg-light');
            } else {
                task.removeClass('bg-light');
            }
        }
    });
}

function removeTask(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/tasks-lists/tasks/${id}`,
        success: function (data) {
            $(`[data-taskId=${id}]`).remove();
        }
    });   
}

function insertTaskOnTable(item){
   tasksTable.append(`
    <tr class="task ${item.status == 'concluido' ? 'bg-light' : ''}" data-taskId="${item.id}">
    <td>
    <span class="bmd-form-group">
    <div class="checkbox">
    <label>
    <input type="checkbox" class="task-checkbox" ${item.status == 'concluido' ? 'checked=""' : ''} onclick="changeTaskStatus(${item.id})">
    <span class="checkbox-decorator"><span class="check"></span></span>
    </label>
    </div>
    </span>
    </td>

    <td class="align-middle task-title">${item.title}</td>
    <td class="align-middle task-description">${item.description}</td>
    <td class="text-center">
    <button class="btn btn-primary pb-0 m-0" onclick="editTask(${item.id})"><i class="material-icons">edit</i></button>
    <button class="btn btn-primary pb-0 m-0" onclick="removeTask(${item.id})"><i class="material-icons">delete</i></button>
    </td>
    </tr>
    `);
}

function init(){
    getTasksLists();
    currentTaskListId = window.location.pathname.substring(1, window.location.pathname.length);
    tasksListsSortable();
    tasksSortable();
    if (window.location.pathname == '/') {
        $('#main-task').addClass('d-none');
    } else {
        getTask(window.location.pathname.substring(1, window.location.pathname.length));
    }
}

$(document).ready(function () {
    init();
});