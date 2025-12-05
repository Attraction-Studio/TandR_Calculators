import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * T&R Interior Systems PDF Export Utility
 * Generates professional PDF reports for the Suspended Ceiling Calculator
 */

const COLORS = {
  primary: [0, 122, 135], // T&R teal
  secondary: [108, 117, 125], // Gray
  text: [33, 37, 41], // Dark gray
  lightGray: [248, 249, 250],
  white: [255, 255, 255],
  success: [40, 167, 69],
  warning: [255, 193, 7],
  danger: [220, 53, 69],
};

const OFFICE_INFO = {
  wellington: {
    name: "Wellington",
    address: "14 Hutt Park Road, Seaview, Lower Hutt 5010",
    phone: "04 568 5949",
    email: "sales@trinteriors.co.nz",
  },
  auckland: {
    name: "Auckland",
    address: "Unit 3, 8 Pavilion Drive, Airport Oaks, Auckland 2022",
    phone: "09 275 5258",
    email: "auckland@trinteriors.co.nz",
  },
  christchurch: {
    name: "Christchurch",
    address: "Unit 4, 18 Whakatiki Street, Upper Riccarton, Christchurch 8041",
    phone: "03 343 0370",
    email: "christchurch@trinteriors.co.nz",
  },
};

class PDFExporter {
  constructor(calculatorState, options = {}) {
    this.state = calculatorState;
    this.options = {
      jobName: options.jobName || "Untitled Project",
      preparedFor: options.preparedFor || "",
      notes: options.notes || "",
      ...options,
    };

    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  /**
   * Helper to safely get value from state (handles refs)
   */
  getValue(key) {
    const value = this.state[key];
    return value?.value !== undefined ? value.value : value;
  }

  /**
   * Add T&R header
   */
  addHeader() {
    this.doc.setFontSize(24);
    this.doc.setTextColor(...COLORS.primary);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("T&R INTERIOR SYSTEMS", this.margin, this.currentY);

    this.doc.setFontSize(10);
    this.doc.setTextColor(...COLORS.secondary);
    this.doc.setFont("helvetica", "normal");
    this.currentY += 8;
    this.doc.text(
      "Suspended Ceiling Seismic Calculator",
      this.margin,
      this.currentY
    );
    this.currentY += 10;
  }

  /**
   * Add footer with office information
   */
  addFooter() {
    const footerY = this.pageHeight - 25;

    this.doc.setFontSize(7);
    this.doc.setTextColor(...COLORS.secondary);
    this.doc.setFont("helvetica", "normal");

    const colWidth = (this.pageWidth - 2 * this.margin) / 3;
    let xPos = this.margin;

    Object.values(OFFICE_INFO).forEach((office) => {
      this.doc.setFont("helvetica", "bold");
      this.doc.text(office.name, xPos, footerY);
      this.doc.setFont("helvetica", "normal");
      this.doc.text(office.address, xPos, footerY + 3);
      this.doc.text(`Ph: ${office.phone}`, xPos, footerY + 6);
      this.doc.text(office.email, xPos, footerY + 9);
      xPos += colWidth;
    });

    // Page number
    const pageNum = this.doc.internal.getCurrentPageInfo().pageNumber;
    this.doc.setFont("helvetica", "italic");
    this.doc.text(`Page ${pageNum}`, this.pageWidth / 2, this.pageHeight - 10, {
      align: "center",
    });
  }

  /**
   * Add a new page
   */
  addPage() {
    this.doc.addPage();
    this.currentY = this.margin;
    this.addHeader();
  }

  /**
   * Add section header
   */
  addSectionHeader(title, number = "") {
    this.doc.setFillColor(...COLORS.primary);
    this.doc.rect(
      this.margin,
      this.currentY,
      this.pageWidth - 2 * this.margin,
      8,
      "F"
    );

    this.doc.setTextColor(...COLORS.white);
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(12);

    const headerText = number ? `${number}. ${title}` : title;
    this.doc.text(headerText, this.margin + 3, this.currentY + 5.5);

    this.currentY += 12;
    this.doc.setTextColor(...COLORS.text);
  }

  /**
   * Add key-value table
   */
  addKeyValueTable(data, columns = 1) {
    const keys = Object.keys(data);
    const tableData = [];

    for (let i = 0; i < keys.length; i += columns) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        if (i + j < keys.length) {
          const key = keys[i + j];
          row.push(key, data[key]);
        } else {
          row.push("", "");
        }
      }
      tableData.push(row);
    }

    autoTable(this.doc, {
      startY: this.currentY,
      head: [],
      body: tableData,
      theme: "plain",
      styles: {
        fontSize: 9,
        cellPadding: 2,
      },
      columnStyles:
        columns === 2
          ? {
              0: { fontStyle: "bold", cellWidth: 50 },
              1: { cellWidth: 40 },
              2: { fontStyle: "bold", cellWidth: 50 },
              3: { cellWidth: 40 },
            }
          : {
              0: { fontStyle: "bold", cellWidth: 60 },
              1: { cellWidth: "auto" },
            },
      margin: { left: this.margin, right: this.margin },
    });

    this.currentY = this.doc.lastAutoTable.finalY + 5;
  }

  /**
   * Generate cover page
   */
  generateCoverPage() {
    this.addHeader();

    // Title
    this.doc.setFontSize(18);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("T&R Seismic Calculator", this.margin, this.currentY);
    this.currentY += 10;

    // Job details
    const jobDetails = {
      "Job Name": this.options.jobName,
      "Prepared for": this.options.preparedFor || "N/A",
      Date: new Date().toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    this.addKeyValueTable(jobDetails, 1);

    // Warning box
    this.currentY += 10;
    this.doc.setDrawColor(...COLORS.warning);
    this.doc.setFillColor(255, 243, 205);
    this.doc.roundedRect(
      this.margin,
      this.currentY,
      this.pageWidth - 2 * this.margin,
      20,
      2,
      2,
      "FD"
    );

    this.doc.setFontSize(9);
    this.doc.setTextColor(...COLORS.text);
    const warningText =
      "WARNING: This calculator is for T&R Interiors suspended ceiling grid systems only. Results may not be applicable to other grid systems.";
    const splitWarning = this.doc.splitTextToSize(
      warningText,
      this.pageWidth - 2 * this.margin - 10
    );
    this.doc.text(splitWarning, this.margin + 5, this.currentY + 5);

    this.currentY += 25;

    // Limit State Type
    this.addSectionHeader("Limit State Type", "1");
    const limitState =
      this.getValue("limitStateType") === "uls_sls2" ? "ULS + SLS2" : "ULS";
    this.addKeyValueTable({ "Limit State Type": limitState }, 1);

    this.addFooter();
  }

  /**
   * Generate seismic weight page
   */
  generateSeismicWeightPage() {
    this.addPage();

    this.addSectionHeader("Seismic Weight", "2");

    const gridType =
      this.getValue("gridType") === 1
        ? "Main Tee @ 1200 | Cross Tee @ 600"
        : "Main Tee @ 600";

    const weightData = {
      "Grid Type": gridType,
      "Tile Mass": `${this.getValue("tileMass") || 0} kg`,
      Services: this.getValue("services") || "Luminaires",
      Insulation: `${this.getValue("insulation") || 0} kg`,
      Other: `${this.getValue("other") || 0} kg`,
      "Design Distributed Load": `${
        this.getValue("designDistributedLoad") || 0
      } kg`,
    };

    this.addKeyValueTable(weightData, 2);

    this.currentY += 5;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(10);
    const seismicWeight = this.getValue("seismicWeight");
    this.doc.text(
      `Total Seismic Weight: ${
        typeof seismicWeight === "number" ? seismicWeight.toFixed(1) : "0.0"
      } kg/m²`,
      this.margin,
      this.currentY
    );

    this.addFooter();
  }

  /**
   * Generate seismic force page
   */
  generateSeismicForcePage() {
    this.addPage();

    this.addSectionHeader("Seismic Force", "3");

    const forceData = {
      "Zone Factor": this.getValue("zoneFactor") || "N/A",
      "Type of Installation": this.getValue("installationType") || "N/A",
      "Floor Height Factor": this.getValue("floorHeightFactor") || "N/A",
      "ULS Ductility": this.getValue("ductilityFactor") || "N/A",
    };

    this.addKeyValueTable(forceData, 2);

    this.currentY += 5;
    const seismicForces = this.getValue("seismicForces");
    const ulsForce = seismicForces?.uls || 0;
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(10);
    this.doc.text(
      `ULS = ${
        typeof ulsForce === "number" ? ulsForce.toFixed(1) : "0.0"
      } kg/m²`,
      this.margin,
      this.currentY
    );

    this.addFooter();
  }

  /**
   * Generate grid capacity page
   */
  generateGridCapacityPage() {
    this.addPage();

    this.addSectionHeader("Grid Capacity", "4");

    const gridCapacityCalcs = this.getValue("gridCapacityCalculations");

    const capacityData = {
      "Grid Type": this.getValue("gridType") || "N/A",
      "Connection Type": this.getValue("connectionType") || "N/A",
      "Stud Type": this.getValue("studType") || "N/A",
      "Limiting Main Tee Length": `${
        gridCapacityCalcs?.limitingMainTeeLength?.toFixed(1) || "0.0"
      } m`,
      "Limiting Cross Tee Length": `${
        gridCapacityCalcs?.limitingCrossTeeLength?.toFixed(1) || "0.0"
      } m`,
      "Max Main Tee": `${this.getValue("maxMainTee") || 0} m`,
      "Max Cross Tee": `${this.getValue("maxCrossTee") || 0} m`,
    };

    this.addKeyValueTable(capacityData, 2);

    this.addFooter();
  }

  /**
   * Generate back brace page
   */
  generateBackBracePage() {
    this.addPage();

    this.addSectionHeader("Back Brace Requirements", "5");

    const braceData = {
      "Brace Type": this.getValue("braceType") || "N/A",
      "Brace Capacity": `${this.getValue("braceCapacity") || 0} kg`,
      "Ceiling Area": `${this.getValue("ceilingArea") || 0} m²`,
      "Area per Brace": `${this.getValue("braceArea") || 0} m²`,
      "Number of Braces": this.getValue("numberOfBraces") || 0,
    };

    this.addKeyValueTable(braceData, 2);

    // Maximum Spacing
    this.currentY += 10;
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Maximum Tee Spacing", this.margin, this.currentY);
    this.currentY += 8;

    const maxSpacing = this.getValue("backBraceCalculations") || {};
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      `Main Tee: ${maxSpacing.maxMainTeeSpace || "6.0"} m`,
      this.margin,
      this.currentY
    );
    this.currentY += 5;
    this.doc.text(
      `Cross Tee: ${maxSpacing.maxCrossTeeSpace || "6.0"} m`,
      this.margin,
      this.currentY
    );
    this.currentY += 10;

    // Clearance table
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Seismic Clearance", this.margin, this.currentY);
    this.currentY += 8;

    autoTable(this.doc, {
      startY: this.currentY,
      head: [
        [
          "Type of Design",
          "Plenum Height (mm)",
          "",
          "Interstory Drift Factor",
          "",
          "Required Clearance (mm)",
        ],
      ],
      body: [
        [
          "SLS",
          this.getValue("plenumHeight") || "400",
          "X",
          "0.0075",
          "=",
          maxSpacing.clearanceSLS || "3.0",
        ],
        [
          "ULS",
          this.getValue("plenumHeight") || "400",
          "X",
          "0.025",
          "=",
          maxSpacing.clearanceULS || "10.0",
        ],
      ],
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: COLORS.lightGray,
        textColor: COLORS.text,
        fontStyle: "bold",
      },
      margin: { left: this.margin, right: this.margin },
    });

    this.addFooter();
  }

  /**
   * Generate notes page
   */
  generateNotesPage() {
    this.addPage();

    this.addSectionHeader("Notes");

    if (this.options.notes) {
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "normal");
      const splitNotes = this.doc.splitTextToSize(
        this.options.notes,
        this.pageWidth - 2 * this.margin
      );
      this.doc.text(splitNotes, this.margin, this.currentY);
      this.currentY += splitNotes.length * 5 + 10;
    } else {
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "italic");
      this.doc.setTextColor(...COLORS.secondary);
      this.doc.text(
        "No additional notes provided.",
        this.margin,
        this.currentY
      );
      this.currentY += 10;
    }

    // Disclaimers
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);

    const disclaimers = [
      "This calculation is provided as a guide only and should be verified by a qualified engineer.",
      "T&R Interior Systems Ltd accepts no responsibility for errors or omissions.",
      "All calculations are based on NZS 1170.5:2004 and manufacturer specifications.",
    ];

    disclaimers.forEach((disclaimer) => {
      const lines = this.doc.splitTextToSize(
        disclaimer,
        this.pageWidth - 2 * this.margin
      );
      this.doc.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 4 + 3;
    });

    this.addFooter();
  }

  /**
   * Generate complete PDF
   */
  generate() {
    this.generateCoverPage();
    this.generateSeismicWeightPage();
    this.generateSeismicForcePage();
    this.generateGridCapacityPage();

    if (this.getValue("showBackBrace")) {
      this.generateBackBracePage();
    }

    this.generateNotesPage();
  }

  /**
   * Save PDF
   */
  save() {
    this.generate();
    const fileName = `TR-Seismic-Calculator-${this.options.jobName.replace(
      /[^a-z0-9]/gi,
      "_"
    )}-${new Date().toISOString().split("T")[0]}.pdf`;
    this.doc.save(fileName);
  }
}

/**
 * Export function to generate and download PDF
 */
export function exportSuspendedCeilingPDF(calculatorState, options) {
  const exporter = new PDFExporter(calculatorState, options);
  exporter.save();
}
