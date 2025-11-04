$(function () {
  $("#results").hide();

  $("#calc").click(function (event) {
    event.preventDefault();
    var height = $("#height").val();
    var width = $("#width").val();
    var area = height * width;
    $("#area").html(area);

    var opts = $("input[name='opts']:checked").val();

    if (opts == 1) {
      $("#r1,#zr1").html("Ceiling Tiles (1200mm x 600mm)");
      $("#r2,#zr2").html(Math.ceil(area / 0.72));
      $("#r3,#zr3").html(Math.ceil(area * 0.694));
      $("#r4,#zr4").html(Math.ceil(area * 0.694));
      $("#r5,#zr5").html(Math.ceil(area * 0.694));
      $("#r6,#zr6").html(Math.ceil((area * 0.833) / 3.6));
      $("#r7,#zr7").html(Math.ceil((area * 1.666) / 1.2));
      $("#r8,#zr8").html(Math.ceil((width * 2 + height * 2) / 3));

      $(".ct2").hide();
    } else {
      $("#r1,#zr1").html("Ceiling Tiles (600mm x 600mm)");
      $("#r2,#zr2").html(Math.ceil(area / 0.36));
      $("#r3,#zr3").html(Math.ceil(area * 0.694));
      $("#r4,#zr4").html(Math.ceil(area * 0.694));
      $("#r5,#zr5").html(Math.ceil(area * 0.694));
      $("#r6,#zr6").html(Math.ceil((area * 0.833) / 3.6));
      $("#r7,#zr7").html(Math.ceil((area * 1.666) / 1.2));
      $("#r7a,#zr7a").html(Math.ceil((area * 0.833) / 0.6));
      $("#r8,#zr8").html(Math.ceil((width * 2 + height * 2) / 3));
      $(".ct2").show();
    }

    var r2 = Number($("#zr2").text());
    var r3 = Number($("#zr3").text());
    var r4 = Number($("#zr4").text());
    var r5 = Number($("#zr5").text());
    var r6 = Number($("#zr6").text());
    var r7 = Number($("#zr7").text());
    var r7a = Number($("#zr7a").text());
    var r8 = Number($("#zr8").text());

    //$('#b2').html(Math.ceil(r2/20));
    //$('#b3').html(Math.ceil(r3/20));
    //$('#b4').html(Math.ceil(r4/20));
    //$('#b5').html(Math.ceil(r5/20));
    $("#b6").html(Math.ceil(r6 / 20));
    $("#b7").html(Math.ceil(r7 / 60));
    $("#b7a").html(Math.ceil(r7a / 60));
    //$('#b8').html(Math.ceil(r8/20));

    $("#varianceInput").val(0);
    $("#results").show("slow");
  });

  $("#vdown").click(function (event) {
    event.preventDefault();
    var variance = Number($("#varianceInput").val());
    variance -= 1;
    if (variance < 0) {
      variance = 0;
    }
    if (variance > 5) {
      variance = 5;
    }
    vary(variance);
    $("#varianceInput").val(variance);
  });
  $("#vup").click(function (event) {
    event.preventDefault();
    var variance = Number($("#varianceInput").val());
    variance += 1;
    if (variance < 0) {
      variance = 0;
    }
    if (variance > 5) {
      variance = 5;
    }
    vary(variance);
    $("#varianceInput").val(variance);
  });

  $(".ch").change(function () {
    $("#results").hide("slow");
  });
});

function vary(variance) {
  var r2 = Number($("#zr2").text());
  var r3 = Number($("#zr3").text());
  var r4 = Number($("#zr4").text());
  var r5 = Number($("#zr5").text());
  var r6 = Number($("#zr6").text());
  var r7 = Number($("#zr7").text());
  var r7a = Number($("#zr7a").text());
  var r8 = Number($("#zr8").text());

  $("#r2").html(Math.round((r2 / 100) * variance + r2));
  $("#r3").html(Math.round((r3 / 100) * variance + r3));
  $("#r4").html(Math.round((r4 / 100) * variance + r4));
  $("#r5").html(Math.round((r5 / 100) * variance + r5));
  $("#r6").html(Math.round((r6 / 100) * variance + r6));
  $("#r7").html(Math.round((r7 / 100) * variance + r7));
  $("#r7a").html(Math.round((r7a / 100) * variance + r7a));
  $("#r8").html(Math.round((r8 / 100) * variance + r8));

  //$('#b2').html(Math.ceil(Number($('#r2').text())/20));
  //$('#b3').html(Math.ceil(Number($('#r3').text())/20));
  //$('#b4').html(Math.ceil(Number($('#r4').text())/20));
  //$('#b5').html(Math.ceil(Number($('#r5').text())/20));
  $("#b6").html(Math.ceil(Number($("#r6").text()) / 20));
  $("#b7").html(Math.ceil(Number($("#r7").text()) / 60));
  $("#b7a").html(Math.ceil(Number($("#r7a").text()) / 60));
  //$('#b8').html(Math.ceil(Number($('#r8').text())/20));
}
