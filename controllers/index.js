var arraysTaskDoing = [];
var arraysTaskDone = [];
document.getElementById('btnAddActivity').onclick = function () {
    var tasks = new Task();
    tasks.tenTask = document.getElementById('Activity').value;
    if (tasks.tenTask === '') {
        alert('Không được để trống!');
        document.getElementById('Activity').focus();
    } else {
        //console.log(tasks);
        arraysTaskDoing.push(tasks);
        document.getElementById('Activity').value = '';
        createTblTaskDoing(arraysTaskDoing);
        luuLocalStorageTaskDoing();
    }
}
var createTblTaskDoing = function (arrTasks) {
    var contentTable = '';
    for (index = 0; index < arraysTaskDoing.length; index++) {
        var myTasks = arraysTaskDoing[index];
        contentTable += `
        <tr class="border pt-3 mt-3 mb-3">
            <td class="col-8 p-2">${myTasks.tenTask}</td>
            <td class="col-4 d-flex justify-content-between p-2">
                <button class="mr-2" onclick="delTasks('${myTasks.tenTask}')"><i class="fa fa-trash-alt"></i></button>
                <button onclick="delTasksDoingAndCreateTblTasksDone('${myTasks.tenTask}')"><i class="fa fa-check-circle"></i></button>
            </td>
        </tr>
        <tr class="space"></tr>
    `
    }
    document.getElementById('tblTaskDoing').innerHTML = contentTable;
}
var createTblTaskDone = function (arrTasks) {
    var contentTable = '';
    for (index = 0; index < arraysTaskDone.length; index++) {
        var myTasks = arraysTaskDone[index];
        contentTable += `
        <tr class="border pt-3 mt-3 mb-3">
            <td class="col-8 p-2">${myTasks.tenTask}</td>
            <td class="col-4 d-flex justify-content-between p-2">
                <button class="mr-2" onclick="delTasks('${myTasks.tenTask}')"><i class="fa fa-trash-alt"></i></button>
                <button onclick="createTblTaskDoing('${myTasks.arraysTaskDoing}')"><i class="fa fa-check-circle"></i></button>
            </td>
        </tr>
        <tr class="space"></tr>
    `
    }
    document.getElementById('tblTaskDone').innerHTML = contentTable;
}
var delTasks = function (nameTask) {
    for (var index = arraysTaskDoing.length - 1; index >= 0; index--) {
        var arrTasks = arraysTaskDoing[index];
        if (arrTasks.tenTask === nameTask) {
            arraysTaskDoing.splice(index, 1);
        }
    }
    createTblTaskDoing(arraysTaskDoing);
    for (var index = arraysTaskDone.length - 1; index >= 0; index--) {
        var arrTasks = arraysTaskDone[index];
        if (arrTasks.tenTask === nameTask) {
            arraysTaskDone.splice(index, 1);
        }
    }
    createTblTaskDone(arraysTaskDone);
    luuLocalStorageTaskDoing();
    luuLocalStorageTaskDone();
}
var delTasksDoingAndCreateTblTasksDone = function (nameTask) {
    for (var index = arraysTaskDoing.length - 1; index >= 0; index--) {
        var arrTasks = arraysTaskDoing[index];
        if (arrTasks.tenTask === nameTask) {
            arraysTaskDoing.splice(index, 1);
            arraysTaskDone.push(arrTasks);
            createTblTaskDone(arraysTaskDone);
        }
    }
    createTblTaskDoing(arraysTaskDoing);
    luuLocalStorageTaskDoing();
    luuLocalStorageTaskDone();
}
var luuLocalStorageTaskDoing = function(){
    var sTasks = JSON.stringify(arraysTaskDoing);
    localStorage.setItem('arraysTaskDoing',sTasks);
}
var luuLocalStorageTaskDone = function(){
    var sTasks = JSON.stringify(arraysTaskDone);
    localStorage.setItem('arraysTaskDone',sTasks);
}
var layDuLieuLocalStorageTasksDoing = function(){
    if(localStorage.getItem('arraysTaskDoing')){
        var sTasks = localStorage.getItem('arraysTaskDoing');
        arraysTaskDoing = JSON.parse(sTasks);
        createTblTaskDoing(arraysTaskDoing);
    }
}
var layDuLieuLocalStorageTasksDone = function(){
    if(localStorage.getItem('arraysTaskDone')){
        var sTasks = localStorage.getItem('arraysTaskDone');
        arraysTaskDone = JSON.parse(sTasks);
        createTblTaskDone(arraysTaskDone);
    }
}
layDuLieuLocalStorageTasksDoing();
layDuLieuLocalStorageTasksDone();