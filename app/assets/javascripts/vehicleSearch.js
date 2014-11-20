$(document).ready(function() {

  var makeSelect = $("#vehicle_make").val();
  $("#vehicle_make").on("change", function() {
    makeSelect = $("#vehicle_make").val();
    getModelData();
  });

  var yearSelect = $("#vehicle_model_year").val();
  $("#vehicle_model_year").on("change", function() {
    yearSelect = parseInt($("#vehicle_model_year").val());
    modelSelect = $("#vehicle_model").val();
    getModelData();
    getTrimData();
  })

  $("#vehicle_model").on("click", function() {
    getModelData();
  });

  var modelSelect = '';
  $("#vehicle_model").on("change", function() {
    modelSelect = $("#vehicle_model").val();
    getTrimData();
    trimSelect = $("#vehicle_trim").val();
    getEngineSize();
  });

  // $("#vehicle_trim").on("click", function() {
  //   getModelData();
  //   getTrimData();
  // })

  var trimSelect = '';
  $("#vehicle_trim").on("change", function() {
    trimSelect = $("#vehicle_trim").val();
    getEngineSize();
  })

  $("#vehicle_style").on("click", function() {
    getEngineSize();
  });

  var engineSelect = '';
  $("#vehicle_style").on("change", function() {
    engineSelect = $("#vehicle_trim").val().attr("trim-id");
  })
  function getModelData() {
    $.ajax({
      url: "https://api.edmunds.com/api/vehicle/v2/"+makeSelect+"/models?fmt=json&year="+yearSelect+"&api_key="+gon.edmunds_key,
      dataType: "json",
      method: "GET",
      success: function(data) {
        if(data.models.length == 0) {
          $("#vehicle_model").html("<option>No Models Found</option>");
        }
        for(var i = 0; i < data.models.length; i++) {
          if( i == 0 ) {
            $("#vehicle_model").html("<option>"+data.models[i].name+"</option>");
          }
          else {
            $("#vehicle_model").append("<option>"+data.models[i].name+"</option>");
          }
        }
      } 
    });
  }

  function getTrimData() {
    $.ajax({
      url: "https://api.edmunds.com/api/vehicle/v2/"+makeSelect+"/"+modelSelect+"/"+yearSelect+"?fmt=json&api_key="+gon.edmunds_key,
        dataType: "json",
        method: "GET",
        success: function(data) {
          var trimArray = [];
          $("#vehicle_trim").html("");
          for(var i = 0; i < data.styles.length; i++) {
            if( jQuery.inArray(data.styles[i].trim, trimArray) == -1 ) {
              trimArray.push(data.styles[i].trim);
              var joinedTrim = data.styles[i].trim.split(" ").join("");
              $("#vehicle_trim").append("<option id='"+joinedTrim+"' trim-id='"+data.styles[i].id+"'>"+data.styles[i].trim+"</option>");
            }
          }
        }
    });
  }

  function getEngineSize() {
    var joinedTrim = $("#vehicle_trim").val().split(" ").join("");
    console.log(joinedTrim);
    console.log($("#"+joinedTrim+""));
    var trimId = $("#"+joinedTrim+"").attr("trim-id");
    console.log(trimId);
    $.ajax({
      url: "https://api.edmunds.com/api/vehicle/v2/styles/"+trimId+"/engines?fmt=json&api_key="+gon.edmunds_key,
      dataType: "json",
      method: "GET",
      success: function(data) {
        $("#vehicle_style").html("");
        for(var i = 0; i < data.engines.length; i++) {
          if(data.engines[i].availability == "STANDARD") {
            if(data.engines[i].configuration == "V") {
              $("#vehicle_style").append("<option>" + data.engines[i].configuration + data.engines[i].cylinder + " " + data.engines[i].size + " L</option>");
            } else {
              $("#vehicle_style").append("<option>" + data.engines[i].configuration + " " + data.engines[i].cylinder + " Cyl " + data.engines[i].size + "L</option>");
            }
          }
        }
      }
    });
  }
});