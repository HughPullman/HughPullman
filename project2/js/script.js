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
          $('#addPersonnelDepartment').empty();
          $('#editPersonnelDepartment').empty();
          $('#departmentFilter').empty();
          $('#deleteDepartment').empty();
          $('#departmentFilter').append($('<option>', {
            value: '',
            text: 'All Departments'
          }))
          for(let i = 0 ; i < result.data.length ; i++){
            var $tr = $('<tr>').append(
              $('<td class="align-middle text-nowrap">').text(result.data[i].name),
              $('<td class="align-middle text-nowrap d-none d-md-table-cell">').text(result.data[i].location),
              $('<td class="align-middle text-end text-nowrap">').append($(`<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id=${result.data[i].id}><i class="fa-solid fa-pencil fa-fw"></i></button><button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id=${result.data[i].id}><i class="fa-solid fa-trash fa-fw"></i></button>`)
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

            $("#addPersonnelDepartment").append($("#addPersonnelDepartment option")
                              .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
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

          $(".deleteDepartmentBtn").on('click', function() {

          
            $('#deleteDepartmentID').val($(this).attr("data-id"));
            
          
            $.ajax({
              url: 'php/checkDepartmentUse.php',
              type: 'POST',
              dataType: 'json',
              data:{
                id: $(this).attr("data-id")
              },
          
              success: function (result){
                  var resultCode = result.status.code;
          
                  if(resultCode == 200){
                    
                  if(result.data[0].departmentCount == 0){
                    $('#areYouSureDeptName').text('Delete:  ' + result.data[0].departmentName);
                    $('#deleteDepartmentModal').modal('show');
                  } else {
                    $('#cantDeleteDeptName').text(result.data[0].departmentName);
                    $('#pc').text(result.data[0].departmentCount);
                    $('#cantDeleteDepartmentModal').modal('show');
                  }
                    
                  } else {
                      
                    }
                  },
          
              error: function (jqXHR, textStatus, errorThrown) {
              
              }
          });
          });


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
          $('#addDepartmentLocation').empty();
          $('#locationFilter').empty();
          $('#deleteLocation').empty();
          $('#editDepartmentLocation').empty();
          $('#locationFilter').append($('<option>', {
            value: '',
            text: 'All Locations'
          }))
          for(let i = 0 ; i < result.data.length ; i++){
            var $tr = $('<tr>').append(
              $('<td class="align-middle text-nowrap">').text(result.data[i].name),
              $('<td class="align-middle text-end text-nowrap">').append($(`<button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id=${result.data[i].id}><i class="fa-solid fa-pencil fa-fw"></i></button><button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id=${result.data[i].id}><i class="fa-solid fa-trash fa-fw"></i></button>`))
            );
            $('#locationsTable').append($tr);

            
            $('#addDepartmentLocation').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));

            $("#addDepartmentLocation").append($("#addDepartmentLocation option")
                              .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            }));

            
            $('#locationFilter').append($('<option>', {
              value: result.data[i].name,
              text: result.data[i].name
            }));

            
            $('#deleteLocation').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));

            
            $('#editDepartmentLocation').append($('<option>', {
              value: result.data[i].id,
              text: result.data[i].name
            }));
          }  
          $('#pre-load').addClass("fadeOut");
          
          $(".deleteLocationBtn").on('click', function() {
         
            $('#deleteLocationID').val($(this).attr("data-id"));
                      
            $.ajax({
              url: 'php/checkLocationUse.php',
              type: 'POST',
              dataType: 'json',
              data:{
                id: $(this).attr("data-id")
              },
          
              success: function (result){
                  var resultCode = result.status.code;
          
                  if(resultCode == 200){
                    
                  if(result.data[0].locationCount == 0){
                    $('#areYouSureLocaName').text('Delete:  ' + result.data[0].locationName);
                    $('#deleteLocationModal').modal('show');
                  } else {
                    $('#cantDeleteLocaName').text(result.data[0].locationName);
                    $('#pcL').text(result.data[0].locationCount);
                    $('#cantDeleteLocationModal').modal('show');
                  }
                    
                  } else {
                      
                    }
                  },
          
              error: function (jqXHR, textStatus, errorThrown) {
              
              }
          });
          });

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

  
  $("#editDepartmentModal").on("show.bs.modal", function (e) {
  
    $.ajax({
      url:
        "php/getDepartmentByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr("data-id")
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          $("#editDepartmentID").val(result.data[0].id); 
          $("#editDepartmentName").val(result.data[0].name);  
          $("#editDepartmentLocation").val(result.data[0].locationID);
        
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

$("#editDepartmentForm").on("submit", function (e) {

  e.preventDefault();

  $.ajax({
    url:
      "php/editDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editDepartmentID").val(),
      name:$("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation option:selected").val()
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Department Data Saved')
        getDepartments();
        getAlldata();
        $('#editDepartmentModal').modal('hide');
      
      } else {
        
      }
    },
      error: function (jqXHR, textStatus, errorThrown) {
      
      }
  });
  
});

$("#editLocationModal").on("show.bs.modal", function (e) {
  
  $.ajax({
    url:
      "php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id")
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        $("#editLocationID").val(result.data[0].id); 
        $("#editLocationName").val(result.data[0].name);  
      
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

$("#editLocationForm").on("submit", function (e) {

  e.preventDefault();

  $.ajax({
    url:
      "php/editLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $("#editLocationID").val(),
      name:$("#editLocationName").val(),
    },
    success: function (result) {
      var resultCode = result.status.code;

      if (resultCode == 200) {
        alert('Department Data Saved')
        getDepartments();
        getAlldata();
        getLocations();
        $('#editDepartmentModal').modal('hide');
      
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
});
  


$('#deleteDepartmentButton').on('click', function(){
  $.ajax({
    url:
      "php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $('#deleteDepartmentID').val()
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
});

$('#deleteLocationButton').on('click', function(){
  $.ajax({
    url:
      "php/deleteLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $('#deleteLocationID').val()
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
});
      
    


$('#deleteLocationModal').on('show.bs.modal', function(e){
  var selected = $(e.relatedTarget).attr("data-id");
  $('#deleteLocation').val(selected);
})

$('#deleteLocationButton').on("click", async function() {
  var usedLocations = [];

  await $.ajax({
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
      name: $("#addLocationLocation").val()
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

  if(valueDep){
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

$('#departmentFilter').on('change', function() {
  $('#locationFilter').val('');
});
$('#locationFilter').on('change', function() {
  $('#departmentFilter').val('');
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


$('#addBtn').on('click', function(){

  if ($("#personnelBtn").hasClass("active")) {
        
    $('#addPersonnelModal').modal('show');
    
  } else {
    
    if ($("#departmentsBtn").hasClass("active")) {
    
      $('#addDepartmentModal').modal('show');
    
    } else {
    
      $('#addLocationModal').modal('show');
    
    }
    
  }
})

