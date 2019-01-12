let currentTaskListId = null;
let currentTaskListSlug = null;
const taskListTitle = document.getElementById('task-list-title');
const tasksLists  = $('#tasks-lists')
const tasksListsInput  = $('#tasks-lists-input')
const tasksTable  = $('#tasks-table')

function getTasksLists() {
    $.get('/api/tasks-lists', data => {
        index = 0;
        for (item of data.task_lists) { 
            tasksLists.append(`
                <a data-taskListId="${item.id}" class="list-group-item list-group-item-action tasks-lists-item ${ index == 0 ? 'active' : ''}" onclick="getTask(${item.id})">
                <i class="material-icons">list</i> 
                ${item.name}
                <button class="tasks-lists-delete btn p-0 m-0 ml-2 text-right" onclick="removeTaskList(${item.id})"><i class="material-icons p-0 m-0 ">delete</i></button>
                <a>
                `);
            index++;
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
            ${item.name}
            <button class="tasks-lists-delete btn p-0 m-0 ml-2 text-right" onclick="removeTaskList(${item.id})"><i class="material-icons p-0 m-0 ">delete</i></button>
            <a>
            `);
        tasksListsInput.val('');
    });
}

function removeTaskList(id) {
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

function getTask(id){
    this.currentTaskListId = id;
    $('.tasks-lists-item').removeClass('active');
    $(`[data-taskListId=${id}]`).addClass('active');
    $('.task').remove();
    $.get(`/api/tasks-lists/${id}`, data => {
        taskListTitle.innerHTML  = data.task_lists.name;
    });  

    $.get(`/api/tasks-lists/${id}/tasks`, data => {
        for (item of data.tasks) {
            tasksTable.append(`
                <tr class="task">
                    <td>
                        <span class="bmd-form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="" checked="">
                                    <span class="checkbox-decorator"><span class="check"></span></span>
                                </label>
                            </div>
                        </span>
                    </td>

                    <td class="align-middle">${item.title}</td>
                    <td class="align-middle">${item.description}</td>
                    <td class="text-center">
                        <button class="btn btn-primary">Editar</button>
                    </td>
                </tr>
                `);
        }
    });   
}

$(document).ready(function () {
    getTasksLists();
    $('.sortable').sortable();
    $('.sortable-table').sortable();
});