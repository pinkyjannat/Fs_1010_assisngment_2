$(document).ready(function(){

var incompleteTasksHolder = $('#incomplete-tasks');
var completedTasksHolder = $('#completed-tasks');

    $("#btnin").click(function(){
        
        $("#container").append('<span><input type="checkbox" class="chck">' + $("#txtin").val() + '<br /></span>');
        
    
        $("input:checkbox").click(function () {
            var $this = $(this);
            if (this.checked) {
                $this.parent().addClass('completed');
            } else {
                $this.parent().removeClass('completed');
            }
        });
    });


    
// ---  Function for Editing an existing task ---
var editTask = function () {
    var listItem = $(this).parent();
    var listTextInput = listItem.find('input[type="text"]');
    var listLabel = listItem.find('label');
    if ( listItem.hasClass('editMode') ) {
      listLabel.text( listTextInput.val() );
      listTextInput.removeAttr('value');
      listItem.removeAttr('class');
      $(this).text('Edit');
    } else {    
      listTextInput.val( listLabel.text() );
      listItem.addClass('editMode');
      $(this).text('Save');
    }
  };
  
  // ---  Function for Deleting an existing task ---
  var deleteTask = function () {
    $(this).parent().remove();
  };
  
  // ---  Function for Adding a new task ---
  var addTask = function() {
    var taskInput = $('#new-task');
    if ( taskInput.val() == '' ) {
      alert('You Can\'t add a Empty Task');
    } else {
      var listItem = $('<li><input type="checkbox"><label>' + taskInput.val() + '</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>');
      incompleteTasksHolder.append(listItem);
      taskInput.val('');
      //Bind Event Handler to the task that was Added
      var newTaskAdded = incompleteTasksHolder.find('li').last();
      newTaskAdded.find('.edit').on('click', editTask);
      newTaskAdded.find('.delete').on('click', deleteTask);
      newTaskAdded.find('input[type="checkbox"]').on('click', markTask);
    }
  };
  
  // ---  Function for Marking a task Complete or Incomplete ---
  var markTask = function() {
    //This function will check if the task is in edit mode, if true will change it
    function checkEditState(task) {
      if ( task.hasClass('editMode') ) {  
        task.find('label').text( task.find('input[type="text"]').val() )
        task.find('input[type="text"]').removeAttr('value');
        task.removeAttr('class');
        task.find('.edit').text('Edit');
      }
    }
    
    if ( $(this).closest('ul').attr('id') == 'incomplete-tasks' ) {
      var completedTask = $(this).parent().remove();
      checkEditState(completedTask);
      completedTask.find('input[type="checkbox"]').prop( "checked", true );    
      bindTaskEvents( completedTask );
      completedTasksHolder.append(completedTask);
    } else {
      var taskToComplete = $(this).parent().remove();
      checkEditState(taskToComplete);
      taskToComplete.find('input[type="checkbox"]').removeAttr('checked');
      bindTaskEvents( taskToComplete );
      incompleteTasksHolder.append(taskToComplete);
    }
  };
  
  // --- Function for binding Event Handler ---
  function bindTaskEvents (item) {
    item.find('.edit').on('click', editTask);
    item.find('.delete').on('click', deleteTask);
    item.find('input[type="checkbox"]').on('click', markTask);
  }
  
  // Binding Event handlers to Add, checkboxes, edit and delete
  $('#new-task').next().on('click', addTask);
  bindTaskEvents( $('li') );
  







});

