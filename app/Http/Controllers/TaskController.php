<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
  public function index($id){
    $data['tasks'] = Task::where('task_list_id', $id)
    ->orderBy('priority_order', 'asc')
    ->get();
    return response()->json($data, 200);
  }

  public function store(Request $request, $id){
   $task = new Task();
   $task->title = $request->title;
   $task->description = $request->description;
   $task->task_list_id = $id;
    	$task->status = 'pendente'; //pendente or concluido
      $priority_order = 1;
      $previousTask = Task::where('task_list_id', $id)->orderBy('priority_order', 'desc')->first();
      if ($previousTask) {
        $priority_order = $previousTask->priority_order + $priority_order; 
      }
      $task->priority_order = $priority_order;
      if ($task->save()) {
        $data['task'] = $task;
        $data['status'] = 'success';
        return response()->json($data, 200);
      } else {
        $data['status'] = 'error';
        return response()->json($data, 400);
      }

    }

    public function delete($id){
      Task::find($id)->delete();
      $data['status'] = 'success';
      return response()->json($data, 200);
    }

    public function changeStatus($id) {
      $task = Task::find($id);
      $task->status = $task->status == 'pendente' ? 'concluido' : 'pendente';
      $task->save();
      $data['task'] = $task;
      $data['status'] = 'success';
      return response()->json($data, 200);
    }

    public function updatePositions(Request $request) {
      if ( $request->has('tasks') ){
        $pos = 1;
        foreach ($request->tasks as $id):
          $task = Task::find($id);
          $task->priority_order = $pos;
          $task->save();
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
