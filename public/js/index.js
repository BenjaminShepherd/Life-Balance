/**
 * =====FORMS=====
 * #signup - on submit (done?)
 * #login - on submit
 * #new-task - on submit (done?)
 */

$(document).ready(function () {

  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("click", ".todo-item", completeTodo);

  // jQuery for signup page
  $("#signup-form").on("submit", function (event) {
    event.preventDefault();

    var newUser = {
      User: $("input[name='username']").val().trim(),
      password: $("input[name='password']").val().trim()
    };

    console.log(newUser);
    // making ajax call with new user data
    $.ajax({
      url: "/signup",
      method: "POST",
      data: newUser
    }).then(function () {
      console.log("Added new user");
    });
  });

  // jQuery for new task
  $(".new-task").keydown(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      $(".new-task").submit();
      var data = {
        task: $(this).val().trim(),
        SelectionId: $(this).data("category"),
        UserId: 1
      };
      // making ajax request with new task data
      $.ajax({
        url: "/api/todos",
        method: "POST",
        data: data
      }).then(function () {
        // console.log(data);
        console.log("Added new task");
        location.reload();
      });

      $(".add-todo-item").hide();
      $(".new-task").val("");
    }
  });

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedTodo = $(this).data("id");
    if (event.which === 13) {
      var text = $(this).children("input[type='text']").val().trim();
      $(this).blur();
      // updateTodo(updatedTodo);
      $(this).children("lable").text(text);
      console.log(updatedTodo);
      console.log(text);
      $.ajax({
        url: ("/api/todos/:id"),
        method: "PUT",
        data: {
          id: updatedTodo,
          task: text
        }
      }).then(function () {
        console.log("Task updated.");
        location.reload();
      });
    }
    $(this).closest("li").removeClass("edit-input");
  }


  function completeTodo() {
    var currentTodo = $(this).data("id");
    var checked = $(this).children("input[type=checkbox]").prop("checked");
    if (checked) {
      $(this).fadeOut("slow");
      $.ajax({
        url: "/api/todos/complete/:id",
        method: "PUT",
        data: {
          id: currentTodo,
          status: checked
        }
      }).then(function () {
        console.log("Task completed.");
        // location.reload();
      });
    }
  }
  /**
  *
  * The forms are set up to use: $("#signup input[name=username-or-whatever]")
  * to target the individual inputs.
  *
  * We'll need an event listener, and object from the form data and an ajax call? Yeah? Is that all we do here?
  */

  /**
  * === we will need ===
  * "/api/todos" to get todos on page load
  */

  /**
   * === we will need these post routes ===
   * get "/signup" - for the "signup" page
   * get "/login" - for the "login" page
   */

  /**
  * .todo-item - on click
  *
  *  id from data="id"
  *  === we will need this put route ===
  * "/api/todos" + id
  *
  */

  /**
  * .delete - on click
  *
  *  id from data="id"
  *  === we will need this delete route ===
  *  "/api/todos/" + id
  */

  // $.ajax("/", {
  //   type: "GET"
  // }).then(
  //   function () {
  //     console.log("workd");
  //     location.reload();
  //   }
  // )
});
