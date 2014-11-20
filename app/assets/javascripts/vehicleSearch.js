$(document).ready(function() {

  var makeSelect = $("#make").val();
  $("#make").on("change", function() {
    makeSelect = $("#make").val();
    getModelData();
  });

  var yearSelect = $("#year").val();
  $("#year").on("change", function() {
    yearSelect = parseInt($("#year").val());
    modelSelect = $("#model").val();
    getModelData();
    getTrimData();
  })

  $("#model").on("click", function() {
    getModelData();
  });

  var modelSelect = '';
  $("#model").on("change", function() {
    modelSelect = $("#model").val();
    getTrimData();
    trimSelect = $("#trim").val();
    getEngineSize();
  });

  // $("#trim").on("click", function() {
  //   getModelData();
  //   getTrimData();
  // })

  var trimSelect = '';
  $("#trim").on("change", function() {
    trimSelect = $("#trim").val();
    getEngineSize();
  })

  $("#engine-size").on("click", function() {
    getEngineSize();
  });

  var engineSelect = '';
  $("#engine-size").on("change", function() {
    engineSelect = $("#trim").val().attr("trim-id");
  })
  function getModelData() {
    $.ajax({
      url: "https://api.edmunds.com/api/vehicle/v2/"+makeSelect+"/models?fmt=json&year="+yearSelect+"&api_key="+gon.edmunds_key,
      dataType: "json",
      method: "GET",
      success: function(data) {
        if(data.models.length == 0) {
          $("#model").html("<option>No Models Found</option>");
        }
        for(var i = 0; i < data.models.length; i++) {
          if( i == 0 ) {
            $("#model").html("<option>"+data.models[i].name+"</option>");
          }
          else {
            $("#model").append("<option>"+data.models[i].name+"</option>");
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
          $("#trim").html("");
          for(var i = 0; i < data.styles.length; i++) {
            if( jQuery.inArray(data.styles[i].trim, trimArray) == -1 ) {
              trimArray.push(data.styles[i].trim);
              var joinedTrim = data.styles[i].trim.split(" ").join("");
              $("#trim").append("<option id='"+joinedTrim+"' trim-id='"+data.styles[i].id+"'>"+data.styles[i].trim+"</option>");
            }
          }
        }
    });
  }

  function getEngineSize() {
    var joinedTrim = $("#trim").val().split(" ").join("");
    console.log(joinedTrim);
    console.log($("#"+joinedTrim+""));
    var trimId = $("#"+joinedTrim+"").attr("trim-id");
    console.log(trimId);
    $.ajax({
      url: "https://api.edmunds.com/api/vehicle/v2/styles/"+trimId+"/engines?fmt=json&api_key="+gon.edmunds_key,
      dataType: "json",
      method: "GET",
      success: function(data) {
        $("#engine-size").html("");
        for(var i = 0; i < data.engines.length; i++) {
          if(data.engines[i].availability == "STANDARD") {
            if(data.engines[i].configuration == "V") {
              $("#engine-size").append("<option>" + data.engines[i].configuration + data.engines[i].cylinder + " " + data.engines[i].size + " L</option>");
            } else {
              $("#engine-size").append("<option>" + data.engines[i].configuration + " " + data.engines[i].cylinder + " Cyl " + data.engines[i].size + "L</option>");
            }
          }
        }
      }
    });
  }
});