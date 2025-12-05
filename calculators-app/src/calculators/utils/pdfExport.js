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
   * Add numbered badge section header (like in the example PDF)
   */
  addBadgeSection(number, title, resultText = "") {
    const badgeSize = 8;
    const badgeX = this.margin;

    // Draw circular badge
    this.doc.setFillColor(...COLORS.primary);
    this.doc.circle(
      badgeX + badgeSize / 2,
      this.currentY + badgeSize / 2,
      badgeSize / 2,
      "F"
    );

    // Badge number
    this.doc.setTextColor(...COLORS.white);
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(10);
    this.doc.text(
      number.toString(),
      badgeX + badgeSize / 2,
      this.currentY + badgeSize / 2 + 3,
      { align: "center" }
    );

    // Section title
    this.doc.setTextColor(...COLORS.primary);
    this.doc.setFontSize(11);
    this.doc.text(title, badgeX + badgeSize + 5, this.currentY + 6);

    // Result text (right aligned)
    if (resultText) {
      this.doc.setTextColor(...COLORS.text);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(
        resultText,
        this.pageWidth - this.margin,
        this.currentY + 6,
        { align: "right" }
      );
    }

    this.currentY += badgeSize + 5;
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
  }

  /**
   * Generate consolidated main page with all calculations
   */
  generateMainPage() {
    this.addHeader();

    // Title
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("T&R Seismic Calculator", this.margin, this.currentY);
    this.currentY += 8;

    // Job details - compact
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.text);
    this.doc.text("Job Name", this.margin, this.currentY);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(this.options.jobName, this.margin + 40, this.currentY);
    this.currentY += 5;

    this.doc.setFont("helvetica", "bold");
    this.doc.text("Prepared for", this.margin, this.currentY);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      this.options.preparedFor || "N/A",
      this.margin + 40,
      this.currentY
    );
    this.currentY += 5;

    this.doc.setFont("helvetica", "bold");
    this.doc.text("Date", this.margin, this.currentY);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      new Date().toLocaleDateString("en-NZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      this.margin + 40,
      this.currentY
    );
    this.currentY += 8;

    // Warning box - more compact
    this.doc.setDrawColor(220, 53, 69);
    this.doc.setFillColor(255, 243, 205);
    this.doc.roundedRect(
      this.margin,
      this.currentY,
      this.pageWidth - 2 * this.margin,
      12,
      2,
      2,
      "FD"
    );
    this.doc.setFontSize(8);
    this.doc.setTextColor(220, 53, 69);
    const warningText =
      "© This design is for 2 way exposed 24mm CBI or Phonic 1 grid only and cannot be used with any other manufacturer's grid";
    const splitWarning = this.doc.splitTextToSize(
      warningText,
      this.pageWidth - 2 * this.margin - 6
    );
    this.doc.text(splitWarning, this.margin + 3, this.currentY + 4);
    this.currentY += 15;

    // 1. Limit State Type
    const limitState =
      this.getValue("limitStateType") === "uls_sls2" ? "ULS +SLS2" : "ULS";
    this.addBadgeSection(1, "Limit State Type", limitState);
    this.currentY += 3;

    // 2. Seismic Weight
    const seismicWeight = this.getValue("seismicWeight");
    const weightResult = `${
      typeof seismicWeight === "number" ? seismicWeight.toFixed(1) : "0.0"
    } kg/m²`;
    this.addBadgeSection(2, "Seismic Weight", weightResult);

    this.doc.setFontSize(8);
    const gridType =
      this.getValue("gridType") === 1
        ? "Main Tee @ 1200 | Cross Tee @ 600"
        : "Main Tee @ 600";
    this.doc.text(`Grid Type`, this.margin + 5, this.currentY);
    this.doc.text(gridType, this.margin + 50, this.currentY);
    this.currentY += 4;
    this.doc.text(`Tile Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("tileMass") || 0} kg`,
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Services`, this.margin + 5, this.currentY);
    this.doc.text(
      this.getValue("services") || "Luminaires",
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Insulation`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("insulation") || 0} kg`,
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Other`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("other") || 0} kg`,
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Design Distributed Load`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("designDistributedLoad") || 0} kg`,
      this.margin + 50,
      this.currentY
    );
    this.currentY += 8;

    // 3. Seismic Force
    const seismicForces = this.getValue("seismicForces");
    const ulsForce = seismicForces?.uls || 0;
    const forceResult = `ULS = ${
      typeof ulsForce === "number" ? ulsForce.toFixed(1) : "0.0"
    } kg/m²`;
    this.addBadgeSection(3, "Seismic Force", forceResult);

    this.doc.setFontSize(8);
    this.doc.text(`Zone Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("zoneFactor") || "N/A"),
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Type of Installation`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("installationType") || "N/A"),
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Floor Height Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("floorHeightFactor") || "N/A"),
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`ULS Ductility`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("ductilityFactor") || "N/A"),
      this.margin + 50,
      this.currentY
    );
    this.currentY += 8;

    // 4. Limiting Main Tee Length
    const gridCapacityCalcs = this.getValue("gridCapacityCalculations");
    const mainTeeLength = gridCapacityCalcs?.limitingMainTeeLength || 0;
    const mainResult = `ULS = ${
      typeof mainTeeLength === "number" ? mainTeeLength.toFixed(1) : "0.0"
    } m`;
    this.addBadgeSection(4, "Limiting Main Tee Length (max)", mainResult);
    this.currentY += 3;

    // 5. Limiting Cross Tee Length
    const crossTeeLength = gridCapacityCalcs?.limitingCrossTeeLength || 0;
    const crossResult = `ULS = ${
      typeof crossTeeLength === "number" ? crossTeeLength.toFixed(1) : "0.0"
    } m`;
    this.addBadgeSection(5, "Limiting Cross Tee Length (max)", crossResult);
    this.currentY += 5;

    // Grid details
    this.doc.setFontSize(8);
    this.doc.text(`Grid Type`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("gridType") || "CBI"),
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Connection Type`, this.margin + 5, this.currentY);
    const connType = String(this.getValue("connectionType") || "N/A");
    this.doc.text(connType, this.margin + 50, this.currentY);
    this.currentY += 4;
    this.doc.text(`Main Tee Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("maxMainTee") || 0) + " m",
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;
    this.doc.text(`Cross Tee Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("maxCrossTee") || 0) + " m",
      this.margin + 50,
      this.currentY
    );
    this.currentY += 4;

    // Validation results
    this.doc.text(
      `Maximum measured Main Tee Length as per plans supplied`,
      this.margin + 5,
      this.currentY
    );
    this.doc.setTextColor(...COLORS.success);
    this.doc.text("✓", this.pageWidth - this.margin - 5, this.currentY);
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 4;
    this.doc.text(
      `Maximum measured Cross Tee Length as per plans supplied`,
      this.margin + 5,
      this.currentY
    );
    this.doc.setTextColor(...COLORS.success);
    this.doc.text("✓", this.pageWidth - this.margin - 5, this.currentY);
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 6;

    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      "No seismic breaks required. Fix two, float two.",
      this.margin + 5,
      this.currentY
    );

    this.addFooter();
  }

  /**
   * Generate back brace page (matches example PDF page 2)
   */
  generateBackBracePage() {
    this.addPage();

    // Back Bracing header
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Back Bracing", this.margin, this.currentY);
    this.currentY += 10;

    // Brace details table
    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);

    const braceData = [
      [
        "Brace Type",
        String(this.getValue("braceType") || "StratoBrace (recommended)"),
      ],
      ["Plenum Height (mm)", String(this.getValue("plenumHeight") || "400")],
      ["Brace Capacity (kg)", String(this.getValue("braceCapacity") || "250")],
      [
        "Stud Type / Bracing requirement",
        "Please refer to Specification Drawing",
      ],
    ];

    autoTable(this.doc, {
      startY: this.currentY,
      body: braceData,
      theme: "plain",
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 80 },
        1: { cellWidth: "auto" },
      },
      margin: { left: this.margin, right: this.margin },
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;

    // Back Brace Layout Spacing
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Back Brace Layout Spacing", this.margin, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    const layoutText =
      "The back bracing should be arranged as per AS/NZS 2785:2020. A summary of requirements is below:";
    this.doc.text(layoutText, this.margin, this.currentY);
    this.currentY += 8;

    // Requirements bullets
    const requirements = [
      "All ceiling edges should be floated (unless single direction back bracing is used)",
      "Braces should be laid out in a 'grid' pattern, the area supported by each brace must not exceed the area per brace calculated below.",
      "The distance between the first line of bracing and the perimeter walls should not exceed half the brace spacing",
      "Position braces at grid connections between main and cross tees.",
      "Typically, there should be at least 4 braces per ceiling, however 2 braces can be used if the ceiling is very small.",
    ];

    this.doc.setFontSize(8);
    requirements.forEach((req) => {
      const bullet = "• ";
      const lines = this.doc.splitTextToSize(
        req,
        this.pageWidth - 2 * this.margin - 5
      );
      this.doc.text(bullet, this.margin, this.currentY);
      this.doc.text(lines, this.margin + 5, this.currentY);
      this.currentY += lines.length * 4 + 2;
    });

    this.currentY += 5;

    // Maximum Spacing for Tees
    const maxSpacing = this.getValue("backBraceCalculations") || {};
    this.doc.setFontSize(10);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.text);
    this.doc.text("Maximum Spacing for Tees", this.margin, this.currentY);

    // MT badge
    this.doc.setFillColor(0, 128, 0);
    this.doc.setTextColor(...COLORS.white);
    this.doc.rect(
      this.pageWidth - this.margin - 40,
      this.currentY - 5,
      15,
      6,
      "F"
    );
    this.doc.text("MT", this.pageWidth - this.margin - 32.5, this.currentY);
    this.currentY += 8;

    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(9);
    this.doc.text(
      `Main Tee = ${String(maxSpacing.maxMainTeeSpace || "6.0")} m`,
      this.margin,
      this.currentY
    );
    this.currentY += 5;
    this.doc.text(
      `Cross Tee = ${String(maxSpacing.maxCrossTeeSpace || "6.0")} m`,
      this.margin,
      this.currentY
    );
    this.currentY += 10;

    // Back Bracing Seismic Clearance
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Back Bracing Seismic Clearance", this.margin, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    const clearanceText =
      "Round the required seismic clearance up to the nearest 5mm and ensure that this clearance is used on the floating edges required in the back braced design.";
    const splitClearance = this.doc.splitTextToSize(
      clearanceText,
      this.pageWidth - 2 * this.margin
    );
    this.doc.text(splitClearance, this.margin, this.currentY);
    this.currentY += splitClearance.length * 4 + 5;

    // Clearance table
    autoTable(this.doc, {
      startY: this.currentY,
      head: [
        [
          "Type of Design",
          "Plenum height (mm)",
          "",
          "Interstory Drift Factor",
          "",
          "Required Clearance (mm)",
        ],
      ],
      body: [
        [
          "SLS",
          String(this.getValue("plenumHeight") || "400"),
          "X",
          "0.0075",
          "=",
          String(maxSpacing.clearanceSLS || "3.0"),
        ],
        [
          "ULS",
          String(this.getValue("plenumHeight") || "400"),
          "X",
          "0.025",
          "=",
          String(maxSpacing.clearanceULS || "10.0"),
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
   * Generate notes page (matches example PDF page 3)
   */
  generateNotesPage() {
    this.addPage();

    // Notes header
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Notes", this.margin, this.currentY);
    this.currentY += 10;

    // User notes
    if (this.options.notes) {
      this.doc.setFontSize(9);
      this.doc.setFont("helvetica", "normal");
      this.doc.setTextColor(...COLORS.text);
      const splitNotes = this.doc.splitTextToSize(
        this.options.notes,
        this.pageWidth - 2 * this.margin
      );
      this.doc.text(splitNotes, this.margin, this.currentY);
      this.currentY += splitNotes.length * 5 + 10;
    }

    // Warning
    this.doc.setFontSize(9);
    this.doc.setTextColor(220, 53, 69);
    this.doc.setFont("helvetica", "bold");
    const warning =
      "© This design is for 2 way exposed 24mm CBI or Phonic 1 grid only and cannot be used with any other manufacturer's grid";
    const splitWarning = this.doc.splitTextToSize(
      warning,
      this.pageWidth - 2 * this.margin
    );
    this.doc.text(splitWarning, this.margin, this.currentY);
    this.currentY += splitWarning.length * 5 + 8;

    // Disclaimers
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "italic");

    const disclaimers = [
      "This guide allows a designer to calculate required bracing for suspended ceilings. The calculations are based on conservative assumptions. Reduced seismic bracing designs for individual sites may be possible if a suitably qualified Chartered Professional Engineer carries out a site-specific design. This guide should not be used as a calculation template for PS-1; specific seismic design should be carried out for these cases.",
      "Please note: all services and systems above the ceiling must be individually restrained. This is a separate exercise and not covered by the T&R Suspended Ceiling Calculator. Clearance must be maintained between components so that they do not interact during a seismic event.",
      "This guide has been prepared by JSK Consulting Engineers for T&R Interior Systems with the usual care and thoroughness of the consulting profession. Interpretation and application of this guide is outside the control of the engineer and therefore is the users' responsibility. It does not constitute a producer statement or engineer's certification, and is not valid for use with trafficable ceilings or ceilings which support partition walls or any other service load.",
      "Allowance for relative motion between the ceiling and structure must be provided by floating edges. If the perimeter bracing method is used then two perpendicular edges must be fixed with the remaining two floating. If back bracing to the upper structure is used, then all edges must be floating. Floating edges must be detailed around rigid items or separately braced items that pass through the ceiling. The amount of clearance should be checked by an engineer on a case-by-case basis.",
      "Consult a structural engineer for the expected earthquake deflections of the structure.",
      "© The T&R Seismic System has been developed in conjunction with JSK Consulting Engineers, the University of Canterbury and T&R Interior Systems.",
      "It remains the intellectual property of T&R Interior Systems and may not be used with other products.",
    ];

    disclaimers.forEach((disclaimer) => {
      const lines = this.doc.splitTextToSize(
        disclaimer,
        this.pageWidth - 2 * this.margin
      );
      this.doc.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 3.5 + 4;
    });

    this.addFooter();
  }

  /**
   * Generate complete PDF (consolidated layout)
   */
  generate() {
    // Page 1: All main calculations
    this.generateMainPage();

    // Page 2: Back bracing (if applicable)
    if (this.getValue("showBackBrace")) {
      this.generateBackBracePage();
    }

    // Page 3: Notes and disclaimers
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
