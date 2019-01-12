<?php

namespace App\Http\Controllers;

use App\TaskList;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    public function index(){ // Retorna todas as listas de tarefas
        $data['task_lists'] = TaskList::all();
        return response()->json($data, 200);
    }

    public function show($id){ // Retorna uma lista de tarefa identificada por ID
        $data['task_lists'] = TaskList::where('id', $id)->first();
        return response()->json($data, 200);
    }

    public function store(Request $request){ // Armazena uma nova lista de Tarefa
        $taskList = new TaskList();
        $taskList->name = $request->name;
        $taskList->slug = str_slug($request->name);
        $taskList->save();
        $data['task_list'] = $taskList;
        $data['status'] = 'success';
        return response()->json($data, 200);
    }

    public function create(){ // Retorna a View para cadastrar nova Lista de Tarefa

    }

    public function delete($id){
        TaskList::find($id)->delete();
        $data['status'] = 'success';
        return response()->json($data, 200);
    }

    public function update() {
        // if ($request->has('id')) {
            //     $TaskList = TaskList::find($re);
            // }
    }
    
}
