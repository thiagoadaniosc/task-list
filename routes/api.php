<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => '/tasks-lists'], function (){
    Route::get('/', 'TaskListController@index');
    Route::get('/{id}', 'TaskListController@show');
    Route::put('/update-positions', 'TaskListController@updatePositions');
    Route::put('/{id}', 'TaskListController@update');
    Route::post('/', 'TaskListController@store');
    Route::delete('/{id}', 'TaskListController@delete');
    
    Route::put('/tasks/update-positions', 'TaskController@updatePositions');
    Route::get('{id}/tasks/', 'TaskController@index');
    Route::post('{id}/tasks/', 'TaskController@store');
    Route::put('/tasks/{id}/status', 'TaskController@changeStatus');
    Route::put('/tasks/{id}', 'TaskController@update');
    Route::delete('/tasks/{id}', 'TaskController@delete');
});