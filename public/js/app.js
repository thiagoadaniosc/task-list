let currentTaskListId = null;
let currentTaskListSlug = null;
const taskListTitle = document.getElementById('task-list-title');
const tasksLists  = $('#tasks-lists')
const tasksListsInput  = $('#tasks-lists-input')

function getTasksLists() {
    $.get('/api/tasks-lists', data => {
        index = 0;
        for (item of data.task_lists) { 
            tasksLists.append(`
                <a href="#" data-taskListId="${item.id}" class="list-group-item list-group-item-action tasks-lists-item ${ index == 0 ? 'active' : ''}">
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
                <a href="#" data-taskListId="${item.id}"  class="list-group-item list-group-item-action tasks-lists-item">
                <i class="material-icons">list</i> 
                ${item.name}
                <button class="tasks-lists-delete btn p-0 m-0 ml-2 text-right" onclick="removeTaskList(${item.id})"><i class="material-icons p-0 m-0 ">delete</i></button>
                <a>
            `);
            tasksListsInput.val('');
    });
}

function removeTaskList(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/tasks-lists/${id}`,
        success: function (data) {
            $(`[data-taskListId=${id}]`).remove();
        }
    });
}

$(document).ready(function () {
    getTasksLists();
});