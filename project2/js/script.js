function getAlldata() {
  $('#pre-load').removeClass("fadeOut");
    $.ajax({
        url: 'php/getAll.php',
        type: 'GET',
        dataType: 'json',

        success: function (result){
            var resultCode = result.status.code;

            if(resultCode == 200){
              $('#personnelTable').empty();
              for(let i = 0 ; i < result.data.length ; i++){
                var $tr = $('<tr>').append(
                  $('<td class="align-middle text-nowrap">').text(result.data[i].lastName + ', ' + result.data[i].firstName),
                  $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(result.data[i].department),
                  $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(result.data[i].location),
                  $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(result.data[i].email),
                  $('<td class="text-end text-nowrap">').append($(`<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id=${result.data[i].id}><i class="fa-solid fa-pencil fa-fw"></i></button><button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id=${result.data[i].id}><i class="fa-solid fa-trash fa-fw"></i></button>`))
                );
                $('#personnelTable').append($tr);
                
              }
              $('#pre-load').addClass("fadeOut");

            } else {
                
              }
            },

        error: function (jqXHR, textStatus, errorThrown) {
        
        }
    });
}

function getDepartments() {
  $('#pre-load').removeClass("fadeOut");
  $.ajax({
    url: 'php/getAllDepartments.php',
    type: 'GET',
    dataType: 'json',

    success: function (result){
        var resultCode = result.status.code;

        if(resultCode == 200){
          $('#departmentsTable').empty();
          for(let i = 0 ; i < result.data.length ; i++){
            var $tr = $('<tr>').append(
              $('<td class="align-middle text-nowrap">').text(result.data[i].name),
              $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(result.data[i].location),
              $('<td class="align-middle text-end text-nowrap">').append($(`<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id=${result.data[i].id} data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal"><i class="fa-solid fa-trash fa-fw"></i></button>`)
            ));
            $('#departmentsTable').append($tr);

            $('#editPersonnelDepartment').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));

            $('#addPersonnelDepartment').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));

            $('#departmentFilter').append($('<option>', {
              value: result.data[i].name,
              text: result.data[i].name
            }));

            $('#deleteDepartment').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));
          }
          $('#pre-load').addClass("fadeOut");


        } else {
            
          }
        },

    error: function (jqXHR, textStatus, errorThrown) {
    
    }
});
}

function getLocations(){
  $('#pre-load').removeClass("fadeOut");
  $.ajax({
    url: 'php/getAllLocations.php',
    type: 'GET',
    dataType: 'json',

    success: function (result){
        var resultCode = result.status.code;

        if(resultCode == 200){
          $('#locationsTable').empty();
          for(let i = 0 ; i < result.data.length ; i++){
            var $tr = $('<tr>').append(
              $('<td class="align-middle text-nowrap">').text(result.data[i].name),
              $('<td class="align-middle text-end text-nowrap">').append($(`<button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id=${result.data[i].id} data-bs-toggle="modal" data-bs-target="#deleteLocationModal"><i class="fa-solid fa-trash fa-fw"></i></button>`))
            );
            $('#locationsTable').append($tr);

            $('#addDepartmentLocation').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));
            $('#locationFilter').append($('<option>', {
              value: result.data[i].name,
              text: result.data[i].name
            }));
            $('#deleteLocation').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));
          }  
          $('#pre-load').addClass("fadeOut");       

        } else {
            
          }
        },

    error: function (jqXHR, textStatus, errorThrown) {
    
    }
});
}

window.onload = () =>{
    getAlldata();
    getDepartments();
    getLocations();
};



$("#refreshBtn").click(function () {
  
    if ($("#personnelBtn").hasClass("active")) {
        
        getAlldata();
        
    } else {
        
        if ($("#departmentsBtn").hasClass("active")) {
        
        getDepartments();
        
        } else {
        
        getLocations();
        
        }
        
    }

});


$("#editPersonnelModal").on("show.bs.modal", function (e) {
  
    $.ajax({
      url:
        "php/getPersonnelByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          // Update the hidden input with the employee id so that
          // it can be referenced when the form is submitted
  
          $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
  
          $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
          $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
          $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
          $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);
  
          $("#editPersonnelDepartment").html("");
  
          $.each(result.data.department, function () {
            $("#editPersonnelDepartment").append(
              $("<option>", {
                value: this.id,
                text: this.name
              })
            );
          });
          $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
        
        } else {
          $("#editPersonnelModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      },
        error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
            "Error retrieving data"
        );
        }
    });
});

$("#editPersonnelForm").on("submit", function (e) {
      
    e.preventDefault();
  
    $.ajax({
      url:
        "php/editPersonnel.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $("#editPersonnelEmployeeID").val(),
        lastName:$("#editPersonnelLastName").val(),
        firstName:$("#editPersonnelFirstName").val(),
        jobTitle:$("#editPersonnelJobTitle").val(),
        email:$("#editPersonnelEmailAddress").val(),
        departmentID:$("#editPersonnelDepartment option:selected").val(),
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          alert('Personnel Data Saved')
          getAlldata();
          $('#editPersonnelModal').modal('hide');
        
        } else {
          
        }
      },
        error: function (jqXHR, textStatus, errorThrown) {
        
        }
    });
    
  });

$('#deletePersonnelModal').on("show.bs.modal", function (e){
  $.ajax({
    url:
      "php/getPersonnelByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#deletePersonnelID").val(result.data.personnel[0].id);
        $("#deletePersonnelName").text('Delete Employee:   ' + result.data.personnel[0].lastName + ', ' + result.data.personnel[0].firstName + '  ?');
      
      } else {

      }
    },
      error: function (jqXHR, textStatus, errorThrown) {

      }
  });
})

$('#deletePersonnelButton').on("click", function() {

  $.ajax({
    url:
      "php/deletePersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $('#deletePersonnelID').val()
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Personnel Deleted');
        getAlldata();
        $('#deletePersonnelModal').modal('hide');
      
      } else {

      }
    },
      error: function (jqXHR, textStatus, errorThrown) {

      }
  });
})

$('#deleteDepartmentModal').on('show.bs.modal', function(e){
  var selected = $(e.relatedTarget).attr("data-id");
  $('#deleteDepartment').val(selected);
})

$('#deleteDepartmentButton').on("click", async function() {
  var usedDepartments = [];

  await $.ajax({
    url: 'php/getAll.php',
    type: 'GET',
    dataType: 'json',

    success: function (result){
        var resultCode = result.status.code;

        if(resultCode == 200){
          
          for(let i = 0 ; i < result.data.length ; i++){
            usedDepartments.push(result.data[i].department)            
          }
          
        } else {
            
          }
        },

    error: function (jqXHR, textStatus, errorThrown) {
    
    }
  });
  var selectedDepartment = $('#deleteDepartment option:selected').text();
  console.log(usedDepartments);
  console.log(selectedDepartment);

  if(usedDepartments.includes(selectedDepartment)){
    alert('This department has personnel assigned to it! Please change this before deleting.');
  } else(
    $.ajax({
      url:
        "php/deleteDepartmentByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $('#deleteDepartment option:selected').val()
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          alert('Department Deleted');
          getAlldata();
          getDepartments();
          $('#deleteDepartmentModal').modal('hide');
        
        } else {
  
        }
      },
        error: function (jqXHR, textStatus, errorThrown) {
  
        }
    })
  )
  
});

$('#deleteLocationModal').on('show.bs.modal', function(e){
  var selected = $(e.relatedTarget).attr("data-id");
  $('#deleteLocation').val(selected);
})

$('#deleteLocationButton').on("click", function() {
  var usedLocations = [];

  $.ajax({
    url: 'php/getAll.php',
    type: 'GET',
    dataType: 'json',

    success: function (result){
        var resultCode = result.status.code;

        if(resultCode == 200){
          
          for(let i = 0 ; i < result.data.length ; i++){
            usedLocations.push(result.data[i].location)            
          }
          
        } else {
            
          }
        },

    error: function (jqXHR, textStatus, errorThrown) {
    
    }
  });
  var selectedLocation = $('#deleteLocation option:selected').text();

  if(usedLocations.includes(selectedLocation)){
    alert('This Location has personnel assigned to it! Please change this before deleting.')
  } else(
    $.ajax({
      url:
        "php/deleteLocation.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $('#deleteLocation option:selected').val()
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          alert('Location Deleted');
          getAlldata();
          getDepartments();
          getLocations();
          $('#deleteLocationModal').modal('hide');
        
        } else {
  
        }
      },
        error: function (jqXHR, textStatus, errorThrown) {
  
        }
    })
  )
  
});




$("#addPersonnelForm").on("submit", function (e) {
    
  e.preventDefault();

  $.ajax({
    url:
      "php/addPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      lastName:$("#addPersonnelLastName").val(),
      firstName:$("#addPersonnelFirstName").val(),
      jobTitle:$("#addPersonnelJobTitle").val(),
      email:$("#addPersonnelEmailAddress").val(),
      departmentID:$("#addPersonnelDepartment option:selected").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Personnel Added')
        getAlldata();
        $('#addPersonnelModal').modal('hide');
      
      } else {
        
      }
    },
      error: function (jqXHR, textStatus, errorThrown) {
      
      }
  });
  
});


$("#addDepartmentForm").on("submit", function (e) {
    
  e.preventDefault();

  $.ajax({
    url:
      "php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addDepartmentDepartment").val(),
      locationID: $("#addDepartmentLocation option:selected").val()
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Department Added')
        getDepartments();
        $('#addDepartmentModal').modal('hide');
      
      } else {
        
      }
    },
      error: function (jqXHR, textStatus, errorThrown) {
      
      }
  });
  
});

$("#addLocationForm").on("submit", function (e) {
    
  e.preventDefault();

  $.ajax({
    url:
      "php/addLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: $("#addLocationLocation option:selected").val()
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Location Added')
        getLocations();
        $('#addLocationModal').modal('hide');
      
      } else {
        
      }
    },
      error: function (jqXHR, textStatus, errorThrown) {
      
      }
  });
  
});

$("#filterForm").on("submit", function (e) {

  e.preventDefault();

  var valueDep = $('#departmentFilter option:selected').val();
  var valueLoc = $('#locationFilter option:selected').val();

  if(valueDep && valueLoc){
    $('#personnelTable tr').each(function(){
      var found = 'false';
      $(this).each(function(){
        if(($(this).text().toLowerCase().indexOf(valueDep.toLowerCase()) >= 0) && ($(this).text().toLowerCase().indexOf(valueLoc.toLowerCase()) >= 0)){
          found = 'true';
        }
      });
      if(found == 'true'){
  
        $(this).show();
  
      } else{
  
        $(this).hide();
  
      }
    });
  } else if(valueDep){
    search_table_personnel(valueDep);
  } else if(valueLoc){
    search_table_personnel(valueLoc);
  } else{
    $('#personnelTable tr').each(function(){
      $(this).each(function(){
        $(this).show();
      })
    })
  }

});

$('#filterRefreshBtn').on("click", function(){
  $('#personnelTable tr').each(function(){
    $(this).each(function(){
      $(this).show();
    })
  })
  $('#departmentFilter').val('');
  $('#locationFilter').val('');

})



$("#searchInput").on("keyup", function () {

  if ($("#personnelBtn").hasClass("active")) {

        
    search_table_personnel($(this).val());
    
} else {
    
    if ($("#departmentsBtn").hasClass("active")) {
    
    search_table_department($(this).val());
    
    } else {
    
      search_table_location($(this).val());
    
    }
    
}
  
});



function search_table_personnel(value){
  $('#personnelTable tr').each(function(){
    var found = 'false';
    $(this).each(function(){
      if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
        found = 'true';
      }
    });
    if(found == 'true'){

      $(this).show();

    } else{

      $(this).hide();

    }
  });
}
function search_table_department(value){
  $('#departmentsTable tr').each(function(){
    var found = 'false';
    $(this).each(function(){
      if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
        found = 'true';
      }
    });
    if(found == 'true'){

      $(this).show();

    } else{

      $(this).hide();

    }
  });
}
function search_table_location(value){
  $('#locationsTable tr').each(function(){
    var found = 'false';
    $(this).each(function(){
      if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0){
        found = 'true';
      }
    });
    if(found == 'true'){

      $(this).show();

    } else{

      $(this).hide();

    }
  });
}