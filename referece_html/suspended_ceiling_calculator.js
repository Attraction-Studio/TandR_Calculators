var tt = "";
var tt2 = "";
var summary2 = 0;
$(function () {
  var mapload = 0;

  $(
    "#div1-1,#div1-2,#div1-3,#div1-4,#div1-5,#div1-6,#div1-7,.pheight,#results,#multistate,#downloadresult, #downloading, #1stnote, #1stnote2, #sls2note, #ttype"
  ).hide();

  $("#begin").click(function () {
    $("#needs").hide();
    $("#results").show("slow");
  });

  $("#st1d").click(function () {
    tt2 = "";
    $(".total0a").html("");
    $("#multistate").hide();
    $(".sls2").hide();
    $("#sls2test").val("0");
    $("#sls2note").hide();
    $("#div1-4").show("slow");
    //yesclick();
  });

  $("#st2d").click(function () {
    tt2 = "SLS2";
    $(".total0a").html("+SLS2");
    $("#multistate").show();
    $(".sls2").show();
    $("#sls2test").val("1");
    $("#sls2note").show();
    $("#div1-1").show("slow");
    //noclick();
  });

  $("#st1a").click(function () {
    tt = "ULS";
    tt2 = "";
    $("#lst").val("ULS");
    $(".total0").html("ULS");
    $(".total0a").html("+SLS2");
    var summary2 = 1;
    yesclick();
  });
  $("#st1b").click(function () {
    tt = "ULS";
    tt2 = "";
    $("#lst").val("ULS");
    $(".total0").html("ULS");
    $(".total0a").html("+SLS2");
    yesclick();
  });
  $("#st1c").click(function () {
    tt = "ULS";
    tt2 = "";
    $("#lst").val("ULS");
    $(".total0").html("ULS");
    $(".total0a").html("+SLS2");
    yesclick();
  });
  $("#st1e").click(function () {
    tt = "ULS";
    $("#lst").val("ULS");
    $(".total0").html("ULS");
    $(".total0a").html("+SLS2");
    yesclick();
  });

  $("#st2a").click(function () {
    $("#div1-2").show("slow");
    var summary2 = 0;
    noclick();
  });
  $("#st2b").click(function () {
    $("#div1-3").show("slow");
    noclick();
  });
  $("#st2c").click(function () {
    $("#div1-4").show("slow");
    noclick();
  });
  $("#st2e").click(function () {
    $("#div1-5").show("slow");
    noclick();
  });

  function yesclick() {
    $("#div1-6,#div1-7").show("slow");
    $("#div1-5").hide();
    if (tt == "SLS2" || tt == "ULS") {
      $("#imp1").attr("disabled", "disabled").hide();
    }
    if (tt2 == "SLS2") {
      $("#multistate").show();
    } else {
      $("#multistate").hide();
      $("#sls2note").hide();
    }
  }
  function noclick() {
    $("#div1-6,#div1-7").hide("slow");
  }

  $(".mapshow").click(function () {
    if (mapload == 0) {
      $("#mapdiv").html(
        '<iframe src="https://www.google.com/maps/d/embed?mid=10bhne8TlErYtzZIwt3-e_dYP_yo&z=5" width="640" height="480" style="width:100%; border:none;"></iframe>'
      );
      mapload = 1;
    }
  });

  $("#pheightC").show();
  $("#bracetypedefault").hide();

  /*		
			$('#bracetype').change(function () { 
					var bt = $(this).val();
					$('.pheight').hide();
					$('#bracetypedefault').hide();
					if (bt==1) {
						$('#pheightA').show('slow');
					} else if (bt==2) {
						$('#pheightB').show('slow');
					} else {
						$('#pheightC').show('slow');
					}
					
			 });
	*/
  $(".tweight").click(function () {
    var tw = $(this).find("td:nth-child(2)").text();
    $("#tilemass").val(tw);
    $(".tweight").removeClass("success");
    $(this).addClass("success");
    $("#tmbutton").click();
    calc();
  });

  $("#explain").click(function () {
    $("#1stnote").toggle("slow");
  });

  $("#1stmty").click(function () {
    $("#addmt").val("3.0");
    calc();
  });
  $("#1stmtn").click(function () {
    $("#addmt").val("0");
    calc();
  });
  /*
			$('#1stcty').click(function () { 	
				$('#addct').val('1.2');
				calc();			 
			});
			$('#1stctn').click(function () { 	
				$('#addct').val('0');
				calc();			 
			});
			*/

  $("#explain2").click(function () {
    $("#1stnote2").toggle("slow");
  });
  $("#clipmainy").click(function () {
    $("#clipmain").val("1");
    calc();
  });
  $("#clipmainn").click(function () {
    $("#clipmain").val("0");
    calc();
  });
  $("#clipcrossy").click(function () {
    $("#clipcross").val("1");
    calc();
  });
  $("#clipcrossn").click(function () {
    $("#clipcross").val("0");
    calc();
  });

  $("#rakey").click(function () {
    $("#addrake").val("1");
    $("#rakedata").show("slow");
    calc();
  });
  $("#raken").click(function () {
    $("#addrake").val("0");
    $("#rakedata").hide("slow");
    calc();
  });
  $("#rakeangle").change(function () {
    var raval = Number($("#rakeangle").val());
    if (raval > 20) {
      alert(
        "The maximum allowable ceiling rake is limited to 20 degrees from the horizontal. If the ceiling rake exceeds this then specific design needs to be carried out by a suitably qualified engineer"
      );
    }
  });

  $("#gridmass").change(function () {
    $("#step2note, #step2note2, #step2note3, #step2note4").hide();
    if ($("#gridmass option:selected").data("note") == 1) {
      $("#step2note").show("slow");
      $("#tspace").val(1.2);
      $("#tspace2").val(0.6);
    } else if ($("#gridmass option:selected").data("note") == 2) {
      $("#step2note2").show("slow");
      $("#tspace").val(0.6);
      $("#tspace2").val(0.6);
    } else if ($("#gridmass option:selected").data("note") == 3) {
      $("#step2note3").show("slow");
      $("#tspace").val(1.2);
      $("#tspace2").val(0.6);
    } else if ($("#gridmass option:selected").data("note") == 4) {
      $("#step2note4").show("slow");
      $("#tspace").val(0.6);
      $("#tspace2").val(1.2);
    }
    calc();
  });

  $(".calctxt").change(function () {
    calc();
  });

  $("#downloadmodal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var donet = button.data("done"); // Extract info from data-* attributes
    $("#printit").data("done", donet);
    $("#downloadform").show();
    $("#downloadresult").hide();
    $("#downloading").hide();
  });

  $("#printit").click(function () {
    var donet = $(this).data("done");

    var pdata = {
      done: donet,
      projectname: $("#projectname").val(),
      byname: $("#byname").val(),
      dnote: $("#dnote").val(),
      lst: $("#lst").text(),
      sls2test: $("#sls2test").val(),
      sw: $("#sw").text(),
      gridmass: $("#gridmass").val(),
      gridmasst: $("#gridmass").find("option:selected").text(),
      tilemass: $("#tilemass").val(),
      tilemasst: $("#collapsetilemass")
        .find("tr.success")
        .find("td:nth-child(1)")
        .text(),
      luminaries: $("#luminaries").val(),
      insulation: $("#insulation").val(),
      other: $("#other").val(),
      ddload: $("#ddload").val(),
      sf1: $("#sf1").text(),
      sf2: $("#sf2").text(),
      sf3: $("#sf3").text(),
      zone: $("#zonefactor").val(),
      zonet: $("#zonefactor").find("option:selected").text(),
      insttype: $("#insttype").val(),
      floorweight: $("#floorweight-txt").text(),
      floorweightt: $("#floorfactorx").val() + "m",
      ductility: $("#ductility").find("option:selected").text(),
      lmt1: $("#lmt1").text(),
      lmt2: $("#lmt2").text(),
      lmt3: $("#lmt3").text(),
      lct1: $("#lct1").text(),
      lct2: $("#lct2").text(),
      lct3: $("#lct3").text(),
      ctype: $("#ctype-txt").text(),
      ctypet: $("#ctype").find("option:selected").text(),
      ctypev: $("#ctype").val(),
      //'ttype':$('#ttype').find('option:selected').text(),
      studtype: $("#studtype").find("option:selected").text(),
      gridtype: $("#gridtype").find("option:selected").text(),
      tspace: $("#tspace").val(),
      tspace2: $("#tspace2").val(),
      maxmtsup: $("#maxmtsup").val(),
      maxctsup: $("#maxctsup").val(),
      addmt: $("#addmt").val(),
      summary1: $("#sls2test").val(),
      summary2: summary2,
      rakeangle: $("#rakeangle").val(),
      ceilheight: $("#ceilheight").val(),
      clipmain: $("#clipmain").val(),
      clipcross: $("#clipcross").val(),
      clipnote: $("#clipnote").text(),
      clipnote2: $("#clipnote2").text(),
    };
    if (donet == 2) {
      var pdata2 = {
        bracetype: $("#bracetype").val(),
        bracetypet: $("#bracetype").find("option:selected").text(),
        //'floorweightt':$('#floorweight-txt').text(),
        pheight: $("#pheighttxt1").text(),
        hangerspace: $("#hangerspace").val(),
        bracecap: $("#bracecap").text(),
        bracearea: $("#bracearea").text(),
        bracereq: $("#bracereq").text(),
        carea: $("#carea").val(),
        nobraces: $("#nobraces").text(),
        teespace: $("#teespace").text(),
        teespace2: $("#teespace2").text(),
        clearance1: $("#clearance1").text(),
        clearance2: $("#clearance2").text(),
      };
      $.extend(pdata, pdata2);
    }
    if (donet == 3) {
      var pdata3 = {
        //'floorweightt':$('#floorweight-txt').text(),
        maxph: $("#maxph").val(),
        smuls: $("#smuls").text(),
        smsls: $("#smsls").text(),
        smsls2: $("#smusls2").text(),
        dllperh: $("#dllperh").text(),
        smbest: $("#smbest").text(),
        designtick: $("#designtick").text(),
        total2b: $("#smbest").text(),
      };
      $.extend(pdata, pdata3);
    }

    $("#downloadform").hide("slow");
    $("#downloading").show();

    $.post("/products/sesimicpdf", pdata).done(function (data) {
      $("#pdf").show("slow");
      //window.open(data);
      $("#downloadlink").attr("href", data);
      $("#downloading").hide();
      $("#downloadresult").show("slow");
    });
  });
});

function calc_floorfactor(floorfactorx) {
  var floorfactor = 0;
  if (floorfactorx <= 3) {
    floorfactor = 3;
  } else if (floorfactorx <= 4.5) {
    floorfactor = 3.5;
  } else if (floorfactorx <= 6) {
    floorfactor = 4;
  } else if (floorfactorx <= 7.5) {
    floorfactor = 4.5;
  } else if (floorfactorx <= 9) {
    floorfactor = 5;
  } else if (floorfactorx <= 10.5) {
    floorfactor = 5.5;
  } else {
    floorfactor = 6;
  }
  return floorfactor;
}

function calc() {
  var gridmass = Number($("#gridmass").val());
  $("#gridmass-txt, .gridmass-txt").html(gridmass);

  var tilemass = Number($("#tilemass").val());
  $(".tilemass").html(tilemass);
  var luminaries = Number($("#luminaries").val());
  $(".luminaries").html(luminaries);
  var insulation = Number($("#insulation").val());
  $(".insulation").html(insulation);
  var other = Number($("#other").val());
  $(".other").html(other);
  var ddload = Number($("#ddload").val());
  if (ddload < 3) {
    ddload = 3;
    $("#ddload").val(3);
  }
  $(".ddload").html(ddload);
  var total1 = (
    gridmass +
    tilemass +
    luminaries +
    insulation +
    other +
    ddload
  ).toFixed(1);
  $(".total1").html(total1);
  if (total1 > 24.78) {
    $("#weighterror").show();
  } else {
    $("#weighterror").hide();
  }

  var total1b = (gridmass + tilemass + luminaries + insulation + other).toFixed(
    1
  );
  $(".total1b").html(total1b);

  var zonefactor = Number($("#zonefactor").val());
  $("#zonefactor-txt").html(zonefactor);

  var insttype = Number($("#insttype").val());
  $("#insttype-txt").html(insttype);

  var returnfactorSLS = 0.3325;
  var returnfactorSLS2 = 0.3325;
  var returnfactorULS = 0.3325;

  if (insttype == 2) {
    returnfactorSLS2 = 0.665;
    returnfactorULS = 1.33;
  } else if (insttype == 3) {
    returnfactorSLS2 = 0.9975;
    returnfactorULS = 1.729;
  }

  var ductility = Number($("#ductility").val());

  var partSLS = 1;
  if (ductility == 1) {
    var partULS = 1;
  } else {
    var partULS = 0.85;
  }

  var floorheight = Number($("#floorheight").val());
  var ceilheight = Number($("#ceilheight").val());

  var floorfactor = calc_floorfactor(ceilheight + floorheight);

  $("#floorweight-txt").html(floorfactor);

  var zfrf = zonefactor * returnfactorSLS;
  var zfrfa = zonefactor * returnfactorSLS2;
  var zfrfb = zonefactor * returnfactorULS;

  if (zfrf > 0.7) {
    zfrf = 0.7;
  }
  if (zfrfa > 0.7) {
    zfrfa = 0.7;
  }
  if (zfrfb > 0.7) {
    zfrfb = 0.7;
  }

  var total2 = (zfrf * floorfactor * partSLS * total1).toFixed(1);
  var total2a = (zfrfa * floorfactor * partSLS * total1).toFixed(1);
  var total2b = (zfrfb * floorfactor * partULS * total1).toFixed(1);

  $(".total2").html(total2);
  $(".total2a").html(total2a);
  $(".total2b").html(total2b);

  var studtype = Number($("#studtype").val());
  var ctype = Number($("#ctype").val());
  //	var ttype =Number($('#ttype').val());
  var gridtype = Number($("#gridtype").val());
  var ulscap = 0;
  var slscap = 0;
  //		if (ctype==3) {
  //			$('#ttype').hide();
  //		} else {
  //			$('#ttype').show();
  //		}
  if (studtype == 1) {
    if (ctype == 1) {
      ulscap = 73.1;
      slscap = 73.1;
    } else if (ctype == 2) {
      ulscap = 55.1;
      slscap = 55.1;
    } else if (ctype == 3) {
      ulscap = 57.4;
      slscap = 57.4;
    }
  } else if (studtype == 2) {
    if (ctype == 1) {
      ulscap = 110.1;
      slscap = 92.5;
    } else if (ctype == 2) {
      ulscap = 55.1;
      slscap = 55.1;
    } else if (ctype == 3) {
      ulscap = 80;
      slscap = 80;
    }
  }

  if (tt == "ULS") {
    $("#ctype-txt").html(ulscap);
  } else {
    $("#ctype-txt").html(slscap);
  }
  //var slscap = ulscap;

  var tspace = Number($("#tspace").val());
  //$('#tspace-txt').html(tspace);
  var tspace2 = Number($("#tspace2").val());
  //$('#tspace-txt2').html(tspace2);

  // calc 1
  var SLSteea = Number(slscap / tspace / total2).toFixed(1);
  var SLS2teea = Number(slscap / tspace / total2a).toFixed(1);
  var ULSteea = Number(ulscap / tspace / total2b).toFixed(1);

  var SLStee2a = Number(slscap / tspace2 / total2).toFixed(1);
  var SLS2tee2a = Number(slscap / tspace2 / total2a).toFixed(1);
  var ULStee2a = Number(ulscap / tspace2 / total2b).toFixed(1);

  //$('#test0').html(SLSteea + ' ' + SLS2teea + ' ' + ULSteea + ' ' + SLStee2a + ' ' +SLS2tee2a + ' ' + ULStee2a);

  // calc 2

  if (connectionheight2 > 0) {
    // uses back bracing
    var addmt = 0;
  } else {
    var addmt = Number($("#addmt").val());
  }
  var addct = 0; //Number($('#addct').val());

  if (gridtype == 1) {
    var SLSteez = Number(88 / tspace / total2 + addmt).toFixed(1);
    var SLS2teez = Number(88 / tspace / total2a + addmt).toFixed(1);
    var ULSteez = Number(88 / tspace / total2b + addmt).toFixed(1);

    var SLStee2z = Number(80 / tspace2 / total2 + addct).toFixed(1);
    var SLS2tee2z = Number(43 / tspace2 / total2a + addct).toFixed(1);
    var ULStee2z = Number(80 / tspace2 / total2b + addct).toFixed(1);
  } else {
    var SLSteez = Number(120 / tspace / total2 + addmt).toFixed(1);
    var SLS2teez = Number(120 / tspace / total2a + addmt).toFixed(1);
    var ULSteez = Number(120 / tspace / total2b + addmt).toFixed(1);

    var SLStee2z = Number(80 / tspace2 / total2 + addct).toFixed(1);
    var SLS2tee2z = Number(42 / tspace2 / total2a + addct).toFixed(1);
    var ULStee2z = Number(80 / tspace2 / total2b + addct).toFixed(1);
  }

  //$('#test1').html(SLSteez + ' ' + SLS2teez + ' ' + ULSteez + ' ' + SLStee2z + ' ' +SLS2tee2z + ' ' + ULStee2z);

  // calc3
  if (ctype == 1) {
    slscapy = 160;
  } else {
    slscapy = 80;
  }

  var SLSteey = Number(slscapy / tspace / total2).toFixed(1);
  var SLS2teey = Number(slscapy / tspace / total2a).toFixed(1);
  var ULSteey = Number(slscapy / tspace / total2b).toFixed(1);

  var SLStee2y = Number(slscapy / tspace2 / total2).toFixed(1);
  var SLS2tee2y = Number(slscapy / tspace2 / total2a).toFixed(1);
  var ULStee2y = Number(slscapy / tspace2 / total2b).toFixed(1);

  //$('#test2').html(SLSteey + ' ' + SLS2teey + ' ' + ULSteey + ' ' + SLStee2y + ' ' +SLS2tee2y + ' ' + ULStee2y);

  var clipmain = Number($("#clipmain").val());
  var clipcross = Number($("#clipcross").val());

  if (clipmain == 1) {
    var SLStee = Number(SLSteea);
    var SLS2tee = Number(SLS2teea);
    var ULStee = Number(ULSteea);
  } else {
    var SLStee = Math.min(SLSteea, SLSteez, SLSteey);
    var SLS2tee = Math.min(SLS2teea, SLS2teez, SLS2teey);
    var ULStee = Math.min(ULSteea, ULSteez, ULSteey);
  }

  if (clipcross == 1) {
    var SLStee2 = Number(SLStee2a);
    var SLS2tee2 = Number(SLS2tee2a);
    var ULStee2 = Number(ULStee2a);
  } else {
    var SLStee2 = Math.min(SLStee2a, SLStee2z, SLStee2y);
    var SLS2tee2 = Math.min(SLS2tee2a, SLS2tee2z, SLS2tee2y);
    var ULStee2 = Math.min(ULStee2a, ULStee2z, ULStee2y);
  }

  //$('#test2').html(clipmain + ' ' + clipcross + ' ' + SLStee + ' ' + SLS2tee);

  //$('#SLStee').html(SLStee);
  //$('#SLS2tee').html(SLS2tee);
  //$('#ULStee').html(ULStee);

  var addrake = Number($("#addrake").val());
  if (addrake == 1) {
    var rakeangle = Number($("#rakeangle").val());
    //	var rakedir = Number($('#rakedir').val());
    var rakecos = Math.cos((rakeangle * Math.PI) / 180);
    var rakermf = 1 / rakecos;

    //	if (rakedir==1) { // main tee
    SLStee = SLStee / rakermf;
    SLS2tee = SLS2tee / rakermf;
    ULStee = ULStee / rakermf;
    //	} else { // cross tee
    //		SLStee2 = SLStee2/rakermf;
    //		SLS2tee2 = SLS2tee2/rakermf;
    //		ULStee2 = ULStee2/rakermf;
    //	}
  }

  $(".total3").html(SLStee.toFixed(1));
  $(".total4").html(SLStee2.toFixed(1));

  $(".total3a").html(SLS2tee.toFixed(1));
  $(".total4a").html(SLS2tee2.toFixed(1));

  $(".total3b").html(ULStee.toFixed(1));
  $(".total4b").html(ULStee2.toFixed(1));

  /*	
		if (tt2 == 'SLS2') {
			$('.total3a,.total4a').addClass('bold');
			$('.total3,.total4,.total3b,.total4b').removeClass('bold'); 
		}	else if (tt == 'SLS') { 
			$('.total3,.total4').addClass('bold');
			$('.total3a,.total4a,.total3b,.total4b').removeClass('bold'); 
		} else {
			$('.total3b,.total4b').addClass('bold');
		 	$('.total3a,.total4a,.total3,.total4').removeClass('bold'); 
		}
		*/
  if (tt == "SLS2") {
    var low3 = Math.min(SLStee, SLS2tee, ULStee);
    var low4 = Math.min(SLStee2, SLS2tee2, ULStee2);
  } else {
    var low3 = Math.min(SLStee, ULStee);
    var low4 = Math.min(SLStee2, ULStee2);
  }

  $(".total3,.total4,.total3b,.total4b,.total3a,.total4a").removeClass("bold");
  if (low3 == SLStee) {
    $(".total3").addClass("bold");
  }
  if (low3 == SLS2tee) {
    $(".total3a").addClass("bold");
  }
  if (low3 == ULStee) {
    $(".total3b").addClass("bold");
  }
  if (low4 == SLStee2) {
    $(".total4").addClass("bold");
  }
  if (low4 == SLS2tee2) {
    $(".total4a").addClass("bold");
  }
  if (low4 == ULStee2) {
    $(".total4b").addClass("bold");
  }

  var sls2midtest = 0;
  var maxmtsup = Number($("#maxmtsup").val());
  var maxctsup = Number($("#maxctsup").val());
  $(".step4tick").hide();
  $(".step4row").removeClass("bg-danger");
  if (low3 > maxmtsup && low4 > maxctsup) {
    var gomsg =
      "An edge restrained design may be used. Alternatively, a rigid hanger/back braced design may be explored";
    $("#step4tick1,#step4tick4").show();
  } else if (low3 * 2 > maxmtsup && low4 > maxctsup) {
    var gomsg =
      "The main tee length is exceeded, a seismic joint may be used to break the main tees and allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.";
    $("#step4tick2,#step4tick4").show();
    $("#step4row1").addClass("bg-danger");
    sls2midtest = 1;
  } else if (low3 > maxmtsup && low4 * 2 > maxctsup) {
    var gomsg =
      "The cross tee length is exceeded, a seismic joint must be used to break the cross tees and allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.";
    $("#step4tick1,#step4tick5").show();
    $("#step4row2").addClass("bg-danger");
  } else if (low3 * 2 > maxmtsup && low4 * 2 > maxctsup) {
    var gomsg =
      "The main tee and cross tee lengths are both exceeded, seismic joints must be used to break the main tees and cross tees to allow an edge restrained design. Alternatively, a rigid hanger/back braced design may be explored.";
    $("#step4tick2,#step4tick5").show();
    $("#step4row1,#step4row2").addClass("bg-danger");
    sls2midtest = 1;
  } else {
    var gomsg =
      "An edge restrained design is not suitable and a rigid hanger or back braced design must be explored.";
    $("#step4tick3,#step4tick6").show();
    $("#step4row1,#step4row2").addClass("bg-danger");
  }

  if (
    (tt == "SLS2" || tt2 == "SLS2") &&
    maxmtsup < SLS2tee &&
    sls2midtest == 1
  ) {
    gomsg =
      gomsg +
      "<br /><br />SLS2 tee lengths may be able to be used for edge restraint, consult with a qualified engineer.";
  }

  if (clipmain == 1) {
    var clipnote = (maxmtsup - Math.min(ULSteea, ULSteez, ULSteey)).toFixed(1);
    if (clipnote <= 0) {
      $("#clipnote").html(
        "<p><i>NOTE: Grid strengthening not required in main tee direction</i></p>"
      );
    } else {
      $("#clipnote").html(
        "<p><i>NOTE: Main Tee Grid Strengthening required for " +
          clipnote +
          "m from the fixed edge</i></p>"
      );
    }
  } else {
    $("#clipnote").html("");
  }
  if (clipcross == 1) {
    var clipnote2 = (maxctsup - Math.min(ULStee2a, ULStee2z, ULStee2y)).toFixed(
      1
    );
    if (clipnote2 <= 0) {
      $("#clipnote2").html(
        "<p><i>NOTE: Grid strengthening not required in cross tee direction</i></p>"
      );
    } else {
      $("#clipnote2").html(
        "<p><i>NOTE: Cross Tee Grid Strengthening required for " +
          clipnote2 +
          "m from the fixed edge</i></p>"
      );
    }
  } else {
    $("#clipnote2").html("");
  }

  $("#gomsg").html(gomsg).show();

  //$('#connectionheight').val(connectionheight);
  //$('#connectionheight2').val(connectionheight)
  var connectionheight = Number($("#connectionheight").val());
  var connectionheight2 = Number($("#connectionheight2").val());

  if (connectionheight2 != 0) {
    var floorfactorx = connectionheight2;
  } else if (connectionheight != 0) {
    var floorfactorx = connectionheight;
  } else {
    var floorfactorx = ceilheight + floorheight;
  }
  $("#floorfactorx").val(floorfactorx.toFixed(2));

  var floorfactor_bb = calc_floorfactor(floorfactorx);
  var total2_bb = (zfrf * floorfactor_bb * partSLS * total1).toFixed(1);
  var total2a_bb = (zfrfa * floorfactor_bb * partSLS * total1).toFixed(1);
  var total2b_bb = (zfrfb * floorfactor_bb * partULS * total1).toFixed(1);

  var maxph = Number($("#maxph").val()) / 1000;
  $(".maxph").html(maxph);
  if ($("#maxph").val() > 999) {
    $("#maxph").addClass("errorinput");
  } else {
    $("#maxph").removeClass("errorinput");
  }

  var hangerspace = Number($("#hangerspace").val());
  $(".hangersp").html(hangerspace);

  var smuls = (1.2 * hangerspace * total2b_bb * maxph).toFixed(1);
  $(".smuls").html(smuls);
  var smsls2 = (1.2 * hangerspace * total2a_bb * maxph).toFixed(1);
  $(".smsls2").html(smsls2);
  var smsls = (1.2 * hangerspace * total2_bb * maxph).toFixed(1);
  $(".smsls").html(smsls);

  var loadcombo = (1.4 * total1b + 1.7 * ddload).toFixed(1);
  $(".loadcombo").html(loadcombo);
  var dllperh = (1.2 * hangerspace * loadcombo).toFixed(1);
  if (dllperh < 50) {
    dllperh = 50;
  }
  $(".dllperh").html(dllperh);

  var smbest = Math.max(smuls, smsls2, smsls);
  $(".smbest").html(smbest);

  var designtick = (dllperh / 412 + smbest / 4.5).toFixed(1);
  $(".designtick").html(designtick);
  if (designtick < 1) {
    $(".designtick2").removeClass("text-danger").addClass("text-success");
    $(".designtick3").html("&#10004;");
  } else {
    $(".designtick2").removeClass("text-success").addClass("text-danger");
    $(".designtick3").html("&#10007;");
  }

  var bt = $("#bracetype").val();
  if (bt == 1) {
    var blookup = $("#pheightA");
  } else if (bt == 2) {
    var blookup = $("#pheightB");
  } else {
    var blookup = $("#pheightC");
  }

  var bracecap = blookup.val();
  $("#bracecap").html(bracecap);

  if (tt == "SLS") {
    var bracearea = bracecap / total2_bb;
  } else if (tt == "SLS2") {
    var bracearea = bracecap / total2a_bb;
  } else {
    var bracearea = bracecap / total2b_bb;
  }
  $("#bracearea, .bracearea, .total8").html(bracearea.toFixed(1));

  $("#bracereq").html(blookup.find(":selected").data("brace"));

  var carea = $("#carea").val();
  $("#nobraces,.total10").html(Math.ceil(carea / bracearea));

  var bsum = 6;

  var bspace = Math.sqrt(bracearea);
  bspace = bspace - (bspace % tspace); // modulus

  var bspace2 = bracearea / bspace;
  bspace2 = bspace2 - (bspace2 % tspace2);

  var teespace1 = Math.min(bsum, bspace);
  var teespace2 = Math.min(bsum, bspace2);

  $("#teespace,.total10a").html(teespace1.toFixed(1));
  $("#teespace2,.total10a2").html(teespace2.toFixed(1));

  var pheighttxt = Number(blookup.find(":selected").text());
  $(".pheighttxt").html(pheighttxt);
  $("#clearance1").html((pheighttxt * 0.0075).toFixed(1));
  $("#clearance2").html((pheighttxt * 0.025).toFixed(1));
}
