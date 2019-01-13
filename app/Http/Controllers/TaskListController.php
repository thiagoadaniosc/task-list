<?php

namespace App\Http\Controllers;

use App\TaskList;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    public function index(){ // Retorna todas as listas de tarefas
        $data['task_lists'] = TaskList::orderBy('priority_order', 'asc')->get();
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
        $priority_order = 1;
        $previousTask = TaskList::orderBy('priority_order', 'desc')->first();
        if ($previousTask) {
            $priority_order = $previousTask->priority_order + $priority_order; 
        }
        $taskList->priority_order = $priority_order;
        $taskList->save();
        $data['task_list'] = $taskList;
        $data['status'] = 'success';
        return response()->json($data, 200);
    }

    public function delete($id){
        TaskList::find($id)->delete();
        $data['status'] = 'success';
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        $taskList = TaskList::find($id);
        $taskList->name = $request->name;
        $taskList->save();
         $data['status'] = 'success';
        return response()->json($data, 200);
    }

    public function updatePositions(Request $request) {
        if ( $request->has('tasksLists') ){
            $pos = 1;
            foreach ($request->tasksLists as $id):
                $taskList = TaskList::find($id);
                $taskList->priority_order = $pos;
                $taskList->save();
                $pos++;
            endforeach;
            $data['status'] = 'success';
            return response()->json($data, 200);
        } else {
            $data['status'] = 'error';
            return response()->json($data, 404);
        }

    }
    
}
