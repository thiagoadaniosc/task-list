<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index($id){
        $data['tasks'] = Task::where('task_list_id', $id)->get();
        return response()->json($data, 200);
    }
}
