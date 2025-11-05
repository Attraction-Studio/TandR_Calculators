(function () {
  "use strict";

  let tt = "";
  let tt2 = "";
  let mapload = 0;

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    // Get all elements
    const div1_1 = document.getElementById("scb_div1_1");
    const div1_2 = document.getElementById("scb_div1_2");
    const div1_3 = document.getElementById("scb_div1_3");
    const div1_4 = document.getElementById("scb_div1_4");
    const div1_5 = document.getElementById("scb_div1_5");
    const div1_6 = document.getElementById("scb_div1_6");
    const div1_7 = document.getElementById("scb_div1_7");
    const results = document.getElementById("scb_results");
    const needs = document.getElementById("scb_needs");
    const multistate = document.getElementById("scb_multistate");
    const downloadresult = document.getElementById("scb_downloadresult");
    const downloading = document.getElementById("scb_downloading");
    const baffleerror2 = document.getElementById("scb_baffleerror2");
    const bbdi = document.getElementById("scb_bbdi");
    const bcdi = document.getElementById("scb_bcdi");
    const brgi = document.getElementById("scb_brgi");

    const beginBtn = document.getElementById("scb_begin");
    const st1dBtn = document.getElementById("scb_st1d");
    const st2dBtn = document.getElementById("scb_st2d");
    const st1aBtn = document.getElementById("scb_st1a");
    const st1bBtn = document.getElementById("scb_st1b");
    const st1cBtn = document.getElementById("scb_st1c");
    const st1eBtn = document.getElementById("scb_st1e");
    const st2aBtn = document.getElementById("scb_st2a");
    const st2bBtn = document.getElementById("scb_st2b");
    const st2cBtn = document.getElementById("scb_st2c");
    const st2eBtn = document.getElementById("scb_st2e");
    const bbdBtn = document.getElementById("scb_bbd");
    const bcdBtn = document.getElementById("scb_bcd");
    const brgBtn = document.getElementById("scb_brg");
    const bafflespaceInput = document.getElementById("scb_bafflespace");
    const baffleerror = document.getElementById("scb_baffleerror");
    const downloadmodal = document.getElementById("scb_downloadmodal");
    const printitBtn = document.getElementById("scb_printit");
    const downloadform = document.getElementById("scb_downloadform");
    const pdf = document.getElementById("scb_pdf");
    const downloadlink = document.getElementById("scb_downloadlink");

    const total0aElements = document.querySelectorAll(".scb_total0a");
    const sls2Elements = document.querySelectorAll(".scb_sls2");
    const total0Elements = document.querySelectorAll(".scb_total0");
    const pheightElements = document.querySelectorAll(".scb_pheight");
    const mapshowElements = document.querySelectorAll(".scb_mapshow");
    const mapdiv = document.getElementById("scb_mapdiv");
    const calctxtElements = document.querySelectorAll(".scb_calctxt");

    // Helper functions
    function hideElement(element) {
      if (element) {
        element.style.display = "none";
      }
    }

    function showElement(element) {
      if (element) {
        element.style.display = "";
      }
    }

    function toggleElement(element) {
      if (element) {
        element.style.display = element.style.display === "none" ? "" : "none";
      }
    }

    function hideElements(elements) {
      elements.forEach(function (el) {
        if (el) {
          el.style.display = "none";
        }
      });
    }

    function showElements(elements) {
      elements.forEach(function (el) {
        if (el) {
          el.style.display = "";
        }
      });
    }

    // Initialize: hide elements on load
    hideElement(div1_1);
    hideElement(div1_2);
    hideElement(div1_3);
    hideElement(div1_4);
    hideElement(div1_5);
    hideElement(div1_6);
    hideElement(div1_7);
    hideElements(pheightElements);
    hideElement(results);
    hideElement(multistate);
    hideElement(downloadresult);
    hideElement(downloading);
    hideElement(baffleerror2);
    hideElement(bbdi);
    hideElement(bcdi);
    hideElement(brgi);

    // Begin button
    if (beginBtn) {
      beginBtn.addEventListener("click", function () {
        hideElement(needs);
        showElement(results);
      });
    }

    // SLS2 toggle
    if (st1dBtn) {
      st1dBtn.addEventListener("click", function () {
        tt2 = "SLS2";
        total0aElements.forEach(function (el) {
          el.textContent = "+SLS2";
        });
        showElement(multistate);
        showElement(div1_1);
        showElements(sls2Elements);
        const sls2test = document.getElementById("scb_sls2test");
        if (sls2test) sls2test.value = "1";
      });
    }

    if (st2dBtn) {
      st2dBtn.addEventListener("click", function () {
        tt2 = "";
        showElement(div1_1);
        noclick();
        hideElements(sls2Elements);
        hideElement(multistate);
        total0aElements.forEach(function (el) {
          el.textContent = "";
        });
        const sls2test = document.getElementById("scb_sls2test");
        if (sls2test) sls2test.value = "0";
      });
    }

    // ULS buttons
    function setULS() {
      tt = "ULS";
      const lst = document.getElementById("scb_lst");
      if (lst) lst.value = "ULS";
      total0Elements.forEach(function (el) {
        el.textContent = "ULS";
      });
      yesclick();
    }

    if (st1aBtn) {
      st1aBtn.addEventListener("click", setULS);
    }
    if (st1bBtn) {
      st1bBtn.addEventListener("click", setULS);
    }
    if (st1cBtn) {
      st1cBtn.addEventListener("click", setULS);
    }

    // SLS button
    if (st1eBtn) {
      st1eBtn.addEventListener("click", function () {
        tt = "SLS";
        const lst = document.getElementById("scb_lst");
        if (lst) lst.value = "SLS";
        total0Elements.forEach(function (el) {
          el.textContent = "SLS";
        });
        yesclick();
      });
    }

    // Step 2 buttons
    if (st2aBtn) {
      st2aBtn.addEventListener("click", function () {
        showElement(div1_2);
        noclick();
      });
    }

    if (st2bBtn) {
      st2bBtn.addEventListener("click", function () {
        showElement(div1_3);
        noclick();
      });
    }

    if (st2cBtn) {
      st2cBtn.addEventListener("click", function () {
        showElement(div1_4);
        noclick();
      });
    }

    if (st2eBtn) {
      st2eBtn.addEventListener("click", function () {
        showElement(div1_5);
        noclick();
      });
    }

    // Map show
    mapshowElements.forEach(function (el) {
      el.addEventListener("click", function () {
        if (mapload === 0 && mapdiv) {
          mapdiv.innerHTML =
            '<iframe src="https://www.google.com/maps/d/embed?mid=10bhne8TlErYtzZIwt3-e_dYP_yo&z=5" width="640" height="480" style="width:100%; border:none;"></iframe>';
          mapload = 1;
        }
      });
    });

    // Baffle space validation
    if (bafflespaceInput) {
      bafflespaceInput.addEventListener("change", function () {
        const bsp = parseFloat(this.value);
        if (bsp < 0.1 || bsp > 1) {
          this.classList.add("scb_errorinput");
          if (baffleerror) baffleerror.classList.add("scb_errormessage");
          showElement(baffleerror2);
        } else {
          this.classList.remove("scb_errorinput");
          if (baffleerror) baffleerror.classList.remove("scb_errormessage");
          hideElement(baffleerror2);
        }
      });
    }

    // Toggle buttons
    if (bbdBtn) {
      bbdBtn.addEventListener("click", function () {
        toggleElement(bbdi);
      });
    }

    if (bcdBtn) {
      bcdBtn.addEventListener("click", function () {
        toggleElement(bcdi);
      });
    }

    if (brgBtn) {
      brgBtn.addEventListener("click", function () {
        toggleElement(brgi);
      });
    }

    // Calculation trigger
    calctxtElements.forEach(function (el) {
      el.addEventListener("change", function () {
        calc();
      });
    });

    // Bootstrap modal handler (if using Bootstrap)
    if (downloadmodal) {
      downloadmodal.addEventListener("show.bs.modal", function (event) {
        const button = event.relatedTarget;
        const donet = button ? button.getAttribute("data-done") : "";
        if (printitBtn) {
          printitBtn.setAttribute("data-done", donet);
        }
        showElement(downloadform);
        hideElement(downloadresult);
        hideElement(downloading);
      });
    }

    // Print/Download button
    if (printitBtn) {
      printitBtn.addEventListener("click", function () {
        const donet = this.getAttribute("data-done");

        const projectname = document.getElementById("scb_projectname");
        const byname = document.getElementById("scb_byname");
        const dnote = document.getElementById("scb_dnote");
        const lst = document.getElementById("scb_lst");
        const sls2test = document.getElementById("scb_sls2test");
        const sw = document.getElementById("scb_sw");
        const gridmass = document.getElementById("scb_gridmass");
        const strongbackmass = document.getElementById("scb_strongbackmass");
        const strongbackmasst = document.getElementById("scb_strongbackmasst");
        const bafflemass = document.getElementById("scb_bafflemass");
        const luminaries = document.getElementById("scb_luminaries");
        const insulation = document.getElementById("scb_insulation");
        const other = document.getElementById("scb_other");
        const carea = document.getElementById("scb_carea");
        const apb = document.getElementById("scb_apb");
        const minbraces = document.getElementById("scb_minbraces");
        const bspace = document.getElementById("scb_bspace");
        const rclearance = document.getElementById("scb_rclearance");
        const sf1 = document.getElementById("scb_sf1");
        const sf2 = document.getElementById("scb_sf2");
        const sf3 = document.getElementById("scb_sf3");
        const zonefactor = document.getElementById("scb_zonefactor");
        const insttype = document.getElementById("scb_insttype");
        const floorweight = document.getElementById("scb_floorweight");

        const pdata = {
          done: donet,
          projectname: projectname ? projectname.value : "",
          byname: byname ? byname.value : "",
          dnote: dnote ? dnote.value : "",
          lst: lst ? lst.textContent : "",
          sls2test: sls2test ? sls2test.value : "",
          sw: sw ? sw.textContent : "",
          gridmass: gridmass ? gridmass.value : "",
          gridmasst: gridmass
            ? gridmass.options[gridmass.selectedIndex]
              ? gridmass.options[gridmass.selectedIndex].text
              : ""
            : "",
          bafflespace: bafflespaceInput ? bafflespaceInput.value : "",
          bafflemass: bafflemass ? bafflemass.textContent : "",
          strongbackmass: strongbackmass ? strongbackmass.textContent : "",
          strongbackmasst: strongbackmasst ? strongbackmasst.textContent : "",
          luminaries: luminaries ? luminaries.value : "",
          insulation: insulation ? insulation.value : "",
          other: other ? other.value : "",
          carea: carea ? carea.value : "",
          apb: apb ? apb.textContent : "",
          minbraces: minbraces ? minbraces.textContent : "",
          bspace: bspace ? bspace.textContent : "",
          rclearance: rclearance ? rclearance.textContent : "",
          sf1: sf1 ? sf1.textContent : "",
          sf2: sf2 ? sf2.textContent : "",
          sf3: sf3 ? sf3.textContent : "",
          zone: zonefactor ? zonefactor.value : "",
          zonet: zonefactor
            ? zonefactor.options[zonefactor.selectedIndex]
              ? zonefactor.options[zonefactor.selectedIndex].text
              : ""
            : "",
          insttype: insttype ? insttype.value : "",
          floorweight: floorweight ? floorweight.value : "",
          floorweightt: floorweight
            ? floorweight.options[floorweight.selectedIndex]
              ? floorweight.options[floorweight.selectedIndex].text
              : ""
            : "",
        };

        hideElement(downloadform);
        showElement(downloading);

        fetch("/products/sesimicpdf_baffle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pdata),
        })
          .then(function (response) {
            return response.text();
          })
          .then(function (data) {
            showElement(pdf);
            if (downloadlink) {
              downloadlink.setAttribute("href", data);
            }
            hideElement(downloading);
            showElement(downloadresult);
          })
          .catch(function (error) {
            console.error("Error:", error);
            hideElement(downloading);
          });
      });
    }

    // yesclick function
    function yesclick() {
      showElement(div1_6);
      showElement(div1_7);
      hideElement(div1_5);
      if (tt === "SLS2" || tt === "ULS") {
        const imp1 = document.getElementById("scb_imp1");
        if (imp1) {
          imp1.disabled = true;
          hideElement(imp1);
        }
      }
      if (tt2 !== "") {
        showElement(multistate);
      } else {
        hideElement(multistate);
      }
    }

    window.yesclick = yesclick;

    // noclick function
    function noclick() {
      hideElement(div1_6);
      hideElement(div1_7);
    }

    window.noclick = noclick;

    // calc function
    function calc() {
      const gridmassInput = document.getElementById("scb_gridmass");
      const gridmass = Number(gridmassInput ? gridmassInput.value : 0);
      const gridmassTxtElements = document.querySelectorAll(
        ".scb_gridmass-txt, #scb_gridmass-txt"
      );
      gridmassTxtElements.forEach(function (el) {
        el.textContent = gridmass;
      });

      const bafflespace = Number(bafflespaceInput ? bafflespaceInput.value : 0);
      const bafflemass = gridmass / bafflespace;
      const bafflemassEl = document.getElementById("scb_bafflemass");
      if (bafflemassEl) {
        bafflemassEl.textContent = bafflemass.toFixed(2);
      }

      const luminariesInput = document.getElementById("scb_luminaries");
      const luminaries = Number(luminariesInput ? luminariesInput.value : 0);
      const luminariesElements = document.querySelectorAll(".scb_luminaries");
      luminariesElements.forEach(function (el) {
        el.textContent = luminaries;
      });

      const insulationInput = document.getElementById("scb_insulation");
      const insulation = Number(insulationInput ? insulationInput.value : 0);
      const insulationElements = document.querySelectorAll(".scb_insulation");
      insulationElements.forEach(function (el) {
        el.textContent = insulation;
      });

      const otherInput = document.getElementById("scb_other");
      const other = Number(otherInput ? otherInput.value : 0);
      const otherElements = document.querySelectorAll(".scb_other");
      otherElements.forEach(function (el) {
        el.textContent = other;
      });

      const total1 = (
        bafflemass +
        1.27 +
        luminaries +
        insulation +
        other
      ).toFixed(2);
      const total1Elements = document.querySelectorAll(".scb_total1");
      total1Elements.forEach(function (el) {
        el.textContent = total1;
      });

      const zonefactorInput = document.getElementById("scb_zonefactor");
      const zonefactor = Number(zonefactorInput ? zonefactorInput.value : 0);
      const zonefactorTxt = document.getElementById("scb_zonefactor-txt");
      if (zonefactorTxt) {
        zonefactorTxt.textContent = zonefactor;
      }

      const insttypeInput = document.getElementById("scb_insttype");
      const insttype = Number(insttypeInput ? insttypeInput.value : 0);
      const insttypeTxt = document.getElementById("scb_insttype-txt");
      if (insttypeTxt) {
        insttypeTxt.textContent = insttype;
      }

      let returnfactorSLS = 0.3325;
      let returnfactorSLS2 = 0.3325;
      let returnfactorULS = 0.3325;

      if (insttype === 2) {
        returnfactorSLS2 = 0.665;
        returnfactorULS = 1.33;
      } else if (insttype === 3) {
        returnfactorSLS2 = 0.9975;
        returnfactorULS = 1.729;
      }

      const partSLS = 1;
      const partULS = 0.55;

      const floorweightInput = document.getElementById("scb_floorweight");
      const floorfactor = Number(floorweightInput ? floorweightInput.value : 0);
      const floorweightTxt = document.getElementById("scb_floorweight-txt");
      if (floorweightTxt) {
        floorweightTxt.textContent = floorfactor;
      }

      const total2 = (
        zonefactor *
        returnfactorSLS *
        floorfactor *
        partSLS *
        parseFloat(total1)
      ).toFixed(1);
      const total2a = (
        zonefactor *
        returnfactorSLS2 *
        floorfactor *
        partSLS *
        parseFloat(total1)
      ).toFixed(1);
      const total2b = (
        zonefactor *
        returnfactorULS *
        floorfactor *
        partULS *
        parseFloat(total1)
      ).toFixed(1);

      const total2Elements = document.querySelectorAll(".scb_total2");
      total2Elements.forEach(function (el) {
        el.textContent = total2;
      });
      const total2aElements = document.querySelectorAll(".scb_total2a");
      total2aElements.forEach(function (el) {
        el.textContent = total2a;
      });
      const total2bElements = document.querySelectorAll(".scb_total2b");
      total2bElements.forEach(function (el) {
        el.textContent = total2b;
      });

      const ctypeInput = document.getElementById("scb_ctype");
      const ctype = Number(ctypeInput ? ctypeInput.value : 0);
      const ctypeSelected = ctypeInput
        ? ctypeInput.options[ctypeInput.selectedIndex]
        : null;
      const d45 = ctypeSelected ? ctypeSelected.getAttribute("data-d45") : "";
      const ctxt = ctypeSelected ? ctypeSelected.getAttribute("data-txt") : "";

      let ctxt2 = "";
      if (ctxt === "1") {
        ctxt2 = "64x35x0.55mm or 92x35x0.55mm Steel Stud";
      } else if (ctxt === "2") {
        ctxt2 = "92x35x0.75mm Steel Stud";
      } else if (ctxt === "3") {
        ctxt2 =
          "Boxed 64x35x0.75mm Steel Stud or Boxed 92x35x0.75mm Steel Stud";
      } else {
        ctxt2 = "Boxed 92x35x0.75mm Steel Stud";
      }

      const length45 = document.getElementById("scb_45length");
      if (length45) {
        length45.textContent = d45;
      }
      const bracearmTxt = document.getElementById("scb_bracearm-txt");
      if (bracearmTxt) {
        bracearmTxt.textContent = ctxt2;
      }

      let high1;
      if (tt === "ULS") {
        high1 = Math.max(
          parseFloat(total2),
          parseFloat(total2a),
          parseFloat(total2b)
        );
      } else {
        high1 = Math.max(parseFloat(total2), parseFloat(total2b));
      }

      const sfmaxElements = document.querySelectorAll(".scb_sfmax");
      sfmaxElements.forEach(function (el) {
        el.textContent = high1;
      });

      const apb = ((250 * 0.7) / high1).toFixed(1);
      const apbElements = document.querySelectorAll(".scb_apb");
      apbElements.forEach(function (el) {
        el.textContent = apb;
      });

      const careaInput = document.getElementById("scb_carea");
      const area = Number(careaInput ? careaInput.value : 0);
      const careaElements = document.querySelectorAll(".scb_carea");
      careaElements.forEach(function (el) {
        el.textContent = area;
      });

      const minbraces = Math.ceil(area / parseFloat(apb));
      const minbracesElements = document.querySelectorAll(".scb_minbraces");
      minbracesElements.forEach(function (el) {
        el.textContent = minbraces;
      });

      const bspace = (parseFloat(apb) / 2.4).toFixed(1);
      const bspaceElements = document.querySelectorAll(".scb_bspace");
      bspaceElements.forEach(function (el) {
        el.textContent = bspace;
      });

      let idf;
      if (tt === "ULS") {
        idf = 0.025;
      } else {
        idf = 0.0075;
      }

      const pheight = ctypeSelected ? Number(ctypeSelected.text) : 0;
      const rclearance = pheight * idf;

      const phtElements = document.querySelectorAll(".scb_pht");
      phtElements.forEach(function (el) {
        el.textContent = pheight;
      });
      const idfElements = document.querySelectorAll(".scb_idf");
      idfElements.forEach(function (el) {
        el.textContent = idf * 100;
      });
      const rclearanceElements = document.querySelectorAll(".scb_rclearance");
      rclearanceElements.forEach(function (el) {
        el.textContent = (rclearance * 1000).toFixed(1);
      });
    }

    window.calc = calc;
    // Expose tt and tt2 for global access (used in calc function)
    Object.defineProperty(window, "tt", {
      get: function () {
        return tt;
      },
      set: function (value) {
        tt = value;
      },
    });
    Object.defineProperty(window, "tt2", {
      get: function () {
        return tt2;
      },
      set: function (value) {
        tt2 = value;
      },
    });
  });
})();
