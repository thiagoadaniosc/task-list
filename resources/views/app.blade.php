<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lista de Tarefas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons">
    {{-- <link rel="stylesheet" href="{{asset('css/bootstrap-reboot.min.css')}}"> --}}
    <link rel="stylesheet" href="{{asset('css/bootstrap-material-design.css')}}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@7.33.1/dist/sweetalert2.min.css">
</head>
<body>
    <div class="container-fluid p-0">
        <nav class="navbar navbar-dark bg-primary" style="height: 60px">
            <a class="navbar-brand" href="#">
                # Lista de Tarefas
            </a>
        </nav>
        
        <main class="row m-0">
            <div class="col-xl-3 bg-light p-0 border-right" id="sidebar" style="height: calc(100vh - 60px);  overflow-x:auto">
                <h5 class="text-center mt-3">Listas de Tarefas</h5>
                <hr>
                <div class="list-group sortable" id="tasks-lists">
                    {{-- Tasks Lists--}}
                </div>
                <div class="px-4 pb-5">
                    <input type="text" class="form-control w-100" id="tasks-lists-input" placeholder="Nova Lista" aria-describedby="basic-addon2">
                    <button class="btn btn-secondary mt-1 btn-raised w-100" type="button" onclick="createTaskList()"> Criar Lista </button>
                </div>
            </div>
            
            <div class="col-9 p-4" id="main-task">

                <h5 class="text-primary d-inline" id="task-list-title"></h5>
                <button class="btn btn-primary p-0" onclick="editTaskList()"><i class="material-icons text-primary p-1 m-0" style="font-size: 15px">edit</i></button>
                
                <table class="table table-hover">
                {{--     <thead>
                        <tr>
                            <th scope="col" style="width: auto" class="text-center"></th>
                            <th scope="col" class="text-center">Titulo</th>
                            <th scope="col" class="text-center">Descrição</th>
                            <th scope="col" class="text-center">Ação</th>
                        </tr>
                    </thead> --}}
                    <tbody class="sortable-table" id="tasks-table">
                        {{-- Tarefas --}}
                        {{-- Tarefas --}}
                    </tbody>
                    {{-- Adicionar Tarega --}}
                    <tbody>
                        <tr class="new-task">
                            <td class="align-middle"><i class="material-icons text-primary">add</i></td>
                            <td><input type="text" class="form-control w-100" id="task-title-input" placeholder="Título"></td>
                            <td><input type="text" class="form-control w-100" id="task-description-input" placeholder="Descrição"></td>
                            <td class="text-center">
                                <button class="btn btn-primary" onclick="storeTask()">Adicionar</button>
                            </td>
                        </tr>
                        {{-- Adicionar Tarega --}}

                    </tbody>
                </table>
            </div>
        </main>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js" integrity="sha384-fA23ZRQ3G/J53mElWqVJEGJzU0sTs+SvzG8fXVWP+kJQ1lwFAOkcUOysnlKJC33U" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@7.33.1/dist/sweetalert2.all.min.js"></script>

    <script src="{{asset('/js/bootstrap-material-design.js')}}"></script>
    <script src="{{asset('/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('/js/app.js')}}"></script>
</body>
</html>