(function () {
  "use strict";

  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    // Get all elements
    const results = document.getElementById("cce_results");
    const calcBtn = document.getElementById("cce_calc");
    const lengthInput = document.getElementById("cce_length");
    const widthInput = document.getElementById("cce_width");
    const areaDisplay = document.getElementById("cce_area");
    const varianceInput = document.getElementById("cce_varianceInput");
    const vdownBtn = document.getElementById("cce_vdown");
    const vupBtn = document.getElementById("cce_vup");

    // Result elements
    const r1 = document.getElementById("cce_r1");
    const r2 = document.getElementById("cce_r2");
    const r3 = document.getElementById("cce_r3");
    const r4 = document.getElementById("cce_r4");
    const r6 = document.getElementById("cce_r6");
    const r7 = document.getElementById("cce_r7");
    const r7a = document.getElementById("cce_r7a");
    const r8 = document.getElementById("cce_r8");

    // Hidden result elements (for variance calculations)
    const zr1 = document.getElementById("cce_zr1");
    const zr2 = document.getElementById("cce_zr2");
    const zr3 = document.getElementById("cce_zr3");
    const zr4 = document.getElementById("cce_zr4");
    const zr6 = document.getElementById("cce_zr6");
    const zr7 = document.getElementById("cce_zr7");
    const zr7a = document.getElementById("cce_zr7a");
    const zr8 = document.getElementById("cce_zr8");

    // Conditional display elements
    const ct2Elements = document.querySelectorAll(".cce_ct2");

    // Helper function to show/hide elements
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

    // Initialize: hide results on load
    if (results) {
      hideElement(results);
    }

    // Calculate function
    function calculate() {
      const length = parseFloat(lengthInput.value) || 0;
      const width = parseFloat(widthInput.value) || 0;
      const area = length * width;

      if (areaDisplay) {
        areaDisplay.textContent = area;
      }

      // Get selected option
      const selectedOpt = document.querySelector(
        'input[name="cce_opts"]:checked'
      );
      const opts = selectedOpt ? selectedOpt.value : "1";

      if (opts == "1") {
        // Option 1: 1200mm x 600mm tiles
        const tileText = "Ceiling Tiles (1200mm x 600mm)";
        if (r1) r1.textContent = tileText;
        if (zr1) zr1.textContent = tileText;

        if (r2) r2.textContent = Math.ceil(area / 0.72);
        if (zr2) zr2.textContent = Math.ceil(area / 0.72);

        if (r3) r3.textContent = Math.ceil(area * 0.694);
        if (zr3) zr3.textContent = Math.ceil(area * 0.694);

        if (r4) r4.textContent = Math.ceil(area * 0.694);
        if (zr4) zr4.textContent = Math.ceil(area * 0.694);

        if (r6) r6.textContent = Math.ceil((area * 0.833) / 3.6);
        if (zr6) zr6.textContent = Math.ceil((area * 0.833) / 3.6);

        if (r7) r7.textContent = Math.ceil((area * 1.666) / 1.2);
        if (zr7) zr7.textContent = Math.ceil((area * 1.666) / 1.2);

        if (r8) r8.textContent = Math.ceil((width * 2 + length * 2) / 3);
        if (zr8) zr8.textContent = Math.ceil((width * 2 + length * 2) / 3);

        // Hide conditional element
        hideElements(ct2Elements);
      } else {
        // Option 2: 600mm x 600mm tiles
        const tileText = "Ceiling Tiles (600mm x 600mm)";
        if (r1) r1.textContent = tileText;
        if (zr1) zr1.textContent = tileText;

        if (r2) r2.textContent = Math.ceil(area / 0.36);
        if (zr2) zr2.textContent = Math.ceil(area / 0.36);

        if (r3) r3.textContent = Math.ceil(area * 0.694);
        if (zr3) zr3.textContent = Math.ceil(area * 0.694);

        if (r4) r4.textContent = Math.ceil(area * 0.694);
        if (zr4) zr4.textContent = Math.ceil(area * 0.694);

        if (r6) r6.textContent = Math.ceil((area * 0.833) / 3.6);
        if (zr6) zr6.textContent = Math.ceil((area * 0.833) / 3.6);

        if (r7) r7.textContent = Math.ceil((area * 1.666) / 1.2);
        if (zr7) zr7.textContent = Math.ceil((area * 1.666) / 1.2);

        if (r7a) r7a.textContent = Math.ceil((area * 0.833) / 0.6);
        if (zr7a) zr7a.textContent = Math.ceil((area * 0.833) / 0.6);

        if (r8) r8.textContent = Math.ceil((width * 2 + length * 2) / 3);
        if (zr8) zr8.textContent = Math.ceil((width * 2 + length * 2) / 3);

        // Show conditional element
        showElements(ct2Elements);
      }

      // Calculate box quantities
      const r2Val = zr2 ? Number(zr2.textContent) : 0;
      const r3Val = zr3 ? Number(zr3.textContent) : 0;
      const r4Val = zr4 ? Number(zr4.textContent) : 0;
      const r6Val = zr6 ? Number(zr6.textContent) : 0;
      const r7Val = zr7 ? Number(zr7.textContent) : 0;
      const r7aVal = zr7a ? Number(zr7a.textContent) : 0;
      const r8Val = zr8 ? Number(zr8.textContent) : 0;

      // Reset variance and show results
      if (varianceInput) {
        varianceInput.value = 0;
      }

      if (results) {
        showElement(results);
        // Add smooth transition class if needed
        results.style.transition = "opacity 0.3s ease-in-out";
      }
    }

    // Variance function
    function vary(variance) {
      const r2Val = zr2 ? Number(zr2.textContent) : 0;
      const r3Val = zr3 ? Number(zr3.textContent) : 0;
      const r4Val = zr4 ? Number(zr4.textContent) : 0;
      const r6Val = zr6 ? Number(zr6.textContent) : 0;
      const r7Val = zr7 ? Number(zr7.textContent) : 0;
      const r7aVal = zr7a ? Number(zr7a.textContent) : 0;
      const r8Val = zr8 ? Number(zr8.textContent) : 0;

      if (r2) r2.textContent = Math.round((r2Val / 100) * variance + r2Val);
      if (r3) r3.textContent = Math.round((r3Val / 100) * variance + r3Val);
      if (r4) r4.textContent = Math.round((r4Val / 100) * variance + r4Val);
      if (r6) r6.textContent = Math.round((r6Val / 100) * variance + r6Val);
      if (r7) r7.textContent = Math.round((r7Val / 100) * variance + r7Val);
      if (r7a) r7a.textContent = Math.round((r7aVal / 100) * variance + r7aVal);
      if (r8) r8.textContent = Math.round((r8Val / 100) * variance + r8Val);
    }

    // Event listeners
    if (calcBtn) {
      calcBtn.addEventListener("click", function (event) {
        event.preventDefault();
        calculate();
      });
    }

    if (vdownBtn) {
      vdownBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let variance = Number(varianceInput ? varianceInput.value : 0);
        variance -= 1;
        if (variance < 0) {
          variance = 0;
        }
        if (variance > 5) {
          variance = 5;
        }
        vary(variance);
        if (varianceInput) {
          varianceInput.value = variance;
        }
      });
    }

    if (vupBtn) {
      vupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let variance = Number(varianceInput ? varianceInput.value : 0);
        variance += 1;
        if (variance < 0) {
          variance = 0;
        }
        if (variance > 5) {
          variance = 5;
        }
        vary(variance);
        if (varianceInput) {
          varianceInput.value = variance;
        }
      });
    }

    // Hide results when inputs change
    const changeHandlers = document.querySelectorAll(".cce_ch");
    changeHandlers.forEach(function (element) {
      element.addEventListener("change", function () {
        if (results) {
          hideElement(results);
        }
      });
    });
  });
})();
