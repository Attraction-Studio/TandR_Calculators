import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  GRID_MASS_OPTIONS,
  ZONE_FACTORS,
  IMPORTANCE_LEVELS,
  GRID_TYPES,
  CONNECTION_TYPES,
  DUCTILITY_OPTIONS,
} from "../data/suspendedCeilingData.js";
import { BAFFLE_PROFILE_OPTIONS } from "../data/baffleCeilingData.js";

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

const TR_LOGO_URL =
  "https://cdn.prod.website-files.com/68ec24dc82bba0539e7b250e/68f9601e0e77127756c8c260_tris_logo-black-p-500.png";

// Cache for logo base64 data
let logoBase64Cache = null;

/**
 * Load an image from URL and convert to base64
 */
async function loadImageAsBase64(url) {
  if (logoBase64Cache) {
    return logoBase64Cache;
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        logoBase64Cache = reader.result;
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Failed to load logo:", error);
    return null;
  }
}

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
    this.logoData = null;

    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  /**
   * Load the logo before generating PDF
   */
  async loadLogo() {
    this.logoData = await loadImageAsBase64(TR_LOGO_URL);
  }

  /**
   * Helper to safely get value from state (handles refs)
   */
  getValue(key) {
    const value = this.state[key];
    return value?.value !== undefined ? value.value : value;
  }

  /**
   * Helper to get label from options array based on value
   */
  getLabel(options, value) {
    if (value === undefined || value === null) return "N/A";
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : String(value);
  }

  /**
   * Add T&R header with logo
   */
  addHeader() {
    // Add logo if available
    if (this.logoData) {
      // Logo dimensions - maintain aspect ratio (original is 500x244)
      const logoWidth = 50;
      const logoHeight = logoWidth * (375 / 500);
      this.doc.addImage(
        this.logoData,
        "PNG",
        this.margin,
        this.currentY - 5,
        logoWidth,
        logoHeight,
      );
      this.currentY += logoHeight + 2;
    } else {
      // Fallback to text if logo fails to load
      this.doc.setFontSize(24);
      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFont("helvetica", "bold");
      this.doc.text("T&R INTERIOR SYSTEMS", this.margin, this.currentY);
      this.currentY += 8;
    }

    this.doc.setFontSize(10);
    this.doc.setTextColor(...COLORS.secondary);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      "Suspended Ceiling Seismic Calculator",
      this.margin,
      this.currentY,
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
      "F",
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
  addBadgeSection(number, title, resultText = "", chip = null) {
    const badgeSize = 8;
    const badgeX = this.margin;

    if (chip) {
      // Draw colored abbreviation chip
      this.doc.setFontSize(5.5);
      this.doc.setFont("helvetica", "bold");
      const chipWidth = Math.max(8, this.doc.getTextWidth(chip.abbr) + 4);
      const chipHeight = 4;
      this.doc.setFillColor(...chip.color);
      this.doc.roundedRect(
        badgeX,
        this.currentY + 1.5,
        chipWidth,
        chipHeight,
        0.8,
        0.8,
        "F",
      );
      this.doc.setTextColor(...COLORS.white);
      this.doc.text(chip.abbr, badgeX + chipWidth / 2, this.currentY + 4, {
        align: "center",
      });

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(10);
      this.doc.text(title, badgeX + chipWidth + 3, this.currentY + 5.5);
    } else {
      // Draw circular numbered badge
      this.doc.setFillColor(...COLORS.primary);
      this.doc.circle(
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        badgeSize / 2,
        "F",
      );

      this.doc.setTextColor(...COLORS.white);
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(10);
      this.doc.text(
        number.toString(),
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        { align: "center", baseline: "middle" },
      );

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(11);
      this.doc.text(title, badgeX + badgeSize + 5, this.currentY + 6);
    }

    // Result text (right aligned)
    if (resultText) {
      this.doc.setTextColor(...COLORS.text);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(
        resultText,
        this.pageWidth - this.margin,
        this.currentY + 6,
        { align: "right" },
      );
    }

    this.currentY += badgeSize + 5;
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
  }

  ensureSpace(needed = 20) {
    if (this.currentY + needed > this.pageHeight - 35) {
      this.addPage();
    }
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
      this.currentY,
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
      this.currentY,
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
      "FD",
    );
    this.doc.setFontSize(8);
    this.doc.setTextColor(220, 53, 69);
    const warningText =
      "© This design is for 2 way exposed 24mm CBI or Phonic 1 grid only and cannot be used with any other manufacturer's grid";
    const splitWarning = this.doc.splitTextToSize(
      warningText,
      this.pageWidth - 2 * this.margin - 6,
    );
    this.doc.text(splitWarning, this.margin + 3, this.currentY + 4);
    this.currentY += 15;

    // 1. Limit State Type
    const limitStateLogic = this.state.limitStateLogic || {};
    // Access the .value of the computed refs within limitStateLogic
    const limitStateMain = limitStateLogic?.limitStateMain?.value || "ULS";
    const sls2Display = limitStateLogic?.liveCalcSLS2Display?.value || "";
    const limitState = limitStateMain + sls2Display;
    this.addBadgeSection(1, "Limit State Type", limitState, {
      abbr: "T",
      color: [128, 0, 128],
    });
    this.currentY += 3;

    // 2. Seismic Weight
    const seismicWeight = this.getValue("seismicWeight");
    const weightResult = `${
      typeof seismicWeight === "number" ? seismicWeight.toFixed(2) : "0.00"
    } kg/m²`;
    this.addBadgeSection(2, "Seismic Weight", weightResult, {
      abbr: "Sw",
      color: [101, 208, 201],
    });

    this.doc.setFontSize(8);
    // Grid Mass
    const gridMassValue = this.getValue("gridMass");
    // Attempt to find label for grid mass if it matches a known option, otherwise descriptive text
    // Since gridMass is a number (e.g. 1.1), we can try to find it in GRID_MASS_OPTIONS
    const gridMassOption = GRID_MASS_OPTIONS.find(
      (opt) => opt.value === gridMassValue,
    );
    const gridMassLabel = gridMassOption
      ? gridMassOption.label
      : "Custom Grid Mass";

    this.doc.text(`Grid Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${gridMassLabel} (${gridMassValue || 0} kg/m²)`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Tile Mass
    this.doc.text(`Tile Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("tileMass") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Luminaires
    this.doc.text(`Luminaires`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("luminaries") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Insulation
    this.doc.text(`Insulation`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("insulation") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Other
    this.doc.text(`Other`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("otherLoads") || 0} kg/m²`, // Corrected key from 'other' to 'otherLoads'
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Design Distributed Load
    this.doc.text(`Design Distributed Load`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("deadLoad") || 0} kg/m²`, // Corrected key from 'designDistributedLoad' to 'deadLoad'
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 8;

    // 3. Seismic Force
    this.ensureSpace(30);
    const seismicForces = this.getValue("seismicForces");
    const ulsForce = seismicForces?.uls || 0;
    const forceResult = `ULS = ${
      typeof ulsForce === "number" ? ulsForce.toFixed(2) : "0.00"
    } kg/m²`;
    this.addBadgeSection(3, "Seismic Force", forceResult, {
      abbr: "Sf",
      color: [0, 141, 144],
    });

    this.doc.setFontSize(8);

    // Zone Factor
    const zoneFactorValue = this.getValue("zoneFactor");
    const zoneFactorLabel = this.getLabel(ZONE_FACTORS, zoneFactorValue);
    this.doc.text(`Zone Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      `${zoneFactorLabel} (Z=${zoneFactorValue})`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Importance Level
    const importanceLevelValue = this.getValue("importanceLevel");
    const importanceLevelLabel = this.getLabel(
      IMPORTANCE_LEVELS,
      importanceLevelValue,
    );
    this.doc.text(`Importance Level`, this.margin + 5, this.currentY);
    this.doc.text(
      String(importanceLevelLabel || "N/A"),
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Floor Height
    const floorHeightValue = this.getValue("floorHeight");
    const ceilingHeightValue = this.getValue("ceilingHeight");
    this.doc.text(
      `Floor Height / Ceiling Height`,
      this.margin + 5,
      this.currentY,
    );
    this.doc.text(
      `${floorHeightValue || 0}m / ${ceilingHeightValue || 0}m`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Floor Height Factor
    this.doc.text(`Floor Height Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("floorFactorValue")?.toFixed(2) || "N/A"), // Corrected key
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // ULS Ductility
    const ductilityValue = this.getValue("ductility");
    this.doc.text(`ULS Ductility`, this.margin + 5, this.currentY);
    this.doc.text(String(ductilityValue || 1), this.margin + 50, this.currentY);
    this.currentY += 8;

    // 4. Limiting Main Tee Length
    this.ensureSpace(15);
    const limitingLengths =
      this.getValue("adjustedLimitingLengths") ||
      this.getValue("limitingLengths");
    const mainTeeLength = limitingLengths?.uls?.main || 0;
    const mainResult = `ULS = ${
      typeof mainTeeLength === "number" ? mainTeeLength.toFixed(1) : "0.0"
    } m`;
    this.addBadgeSection(4, "Limiting Main Tee Length (max)", mainResult, {
      abbr: "Lmt",
      color: [246, 181, 62],
    });
    this.currentY += 3;

    // 5. Limiting Cross Tee Length
    this.ensureSpace(15);
    const crossTeeLength = limitingLengths?.uls?.cross || 0;
    const crossResult = `ULS = ${
      typeof crossTeeLength === "number" ? crossTeeLength.toFixed(1) : "0.0"
    } m`;
    this.addBadgeSection(5, "Limiting Cross Tee Length (max)", crossResult, {
      abbr: "Lct",
      color: [255, 102, 0],
    });
    this.currentY += 5;

    // Grid details
    this.doc.setFontSize(8);

    // Grid Type - lookup label
    const gridTypeValue = Number(this.getValue("gridType")) || 1;
    const gridTypeLabel = this.getLabel(GRID_TYPES, gridTypeValue);
    this.doc.text(`Grid Type`, this.margin + 5, this.currentY);
    this.doc.text(gridTypeLabel, this.margin + 50, this.currentY);
    this.currentY += 4;

    // Connection Type - lookup label
    const connectionTypeValue = Number(this.getValue("connectionType")) || 1;
    const connectionTypeLabel = this.getLabel(
      CONNECTION_TYPES,
      connectionTypeValue,
    );
    this.doc.text(`Connection Type`, this.margin + 5, this.currentY);
    this.doc.text(connectionTypeLabel, this.margin + 50, this.currentY);
    this.currentY += 4;

    // Tee Spacing - use gridSpacing from state
    const gridSpacing = this.getValue("gridSpacing") || {
      main: 1.2,
      cross: 0.6,
    };
    this.doc.text(`Main Tee Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      String(gridSpacing.main || 1.2) + " m",
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Cross Tee Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      String(gridSpacing.cross || 0.6) + " m",
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Validation results - include supplied values from options
    const maxMainSupplied =
      this.options.maxMainTeeSupplied || this.getValue("maxMainTee") || 0;
    const maxCrossSupplied =
      this.options.maxCrossTeeSupplied || this.getValue("maxCrossTee") || 0;

    this.doc.text(
      `Maximum measured Main Tee Length as per plans supplied`,
      this.margin + 5,
      this.currentY,
    );
    this.doc.text(
      String(maxMainSupplied) + " m",
      this.margin + 115,
      this.currentY,
    );
    // Check validation
    const mainValid = maxMainSupplied <= mainTeeLength;
    this.doc.setTextColor(...(mainValid ? COLORS.success : COLORS.danger));
    this.doc.text(
      mainValid ? "✓" : "✗",
      this.pageWidth - this.margin - 5,
      this.currentY,
    );
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 4;

    this.doc.text(
      `Maximum measured Cross Tee Length as per plans supplied`,
      this.margin + 5,
      this.currentY,
    );
    this.doc.text(
      String(maxCrossSupplied) + " m",
      this.margin + 115,
      this.currentY,
    );
    // Check validation
    const crossValid = maxCrossSupplied <= crossTeeLength;
    this.doc.setTextColor(...(crossValid ? COLORS.success : COLORS.danger));
    this.doc.text(
      crossValid ? "✓" : "✗",
      this.pageWidth - this.margin - 5,
      this.currentY,
    );
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 6;

    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      "No seismic breaks required. Fix two, float two.",
      this.margin + 5,
      this.currentY,
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
        this.pageWidth - 2 * this.margin - 5,
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
      "F",
    );
    this.doc.text("MT", this.pageWidth - this.margin - 32.5, this.currentY);
    this.currentY += 8;

    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
    this.doc.setFontSize(9);
    this.doc.text(
      `Main Tee = ${String(maxSpacing.maxMainTeeSpace || "6.0")} m`,
      this.margin,
      this.currentY,
    );
    this.currentY += 5;
    this.doc.text(
      `Cross Tee = ${String(maxSpacing.maxCrossTeeSpace || "6.0")} m`,
      this.margin,
      this.currentY,
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
      this.pageWidth - 2 * this.margin,
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
        this.pageWidth - 2 * this.margin,
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
      this.pageWidth - 2 * this.margin,
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
        this.pageWidth - 2 * this.margin,
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
  async save() {
    await this.loadLogo();
    this.generate();
    const fileName = `TR-Seismic-Calculator-${this.options.jobName.replace(
      /[^a-z0-9]/gi,
      "_",
    )}-${new Date().toISOString().split("T")[0]}.pdf`;
    this.doc.save(fileName);
  }
}

/**
 * Export function to generate and download PDF
 */
export async function exportSuspendedCeilingPDF(calculatorState, options) {
  const exporter = new PDFExporter(calculatorState, options);
  await exporter.save();
}

/**
 * Plasterboard Ceiling PDF Exporter
 * Generates professional PDF reports for the Plasterboard Ceiling Calculator
 */
class PlasterboardPDFExporter {
  constructor(calculatorState, options = {}) {
    this.state = calculatorState;
    this.options = {
      jobName: options.jobName || "Untitled Project",
      preparedFor: options.preparedFor || "",
      notes: options.notes || "",
      maxMainTeeSupplied: options.maxMainTeeSupplied || 0,
      maxCrossTeeSupplied: options.maxCrossTeeSupplied || 0,
      ...options,
    };
    this.logoData = null;

    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  async loadLogo() {
    this.logoData = await loadImageAsBase64(TR_LOGO_URL);
  }

  getValue(key) {
    const value = this.state[key];
    return value?.value !== undefined ? value.value : value;
  }

  getLabel(options, value) {
    if (value === undefined || value === null) return "N/A";
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : String(value);
  }

  addHeader() {
    // Add logo if available
    if (this.logoData) {
      const logoWidth = 50;
      const logoHeight = logoWidth * (375 / 500);
      this.doc.addImage(
        this.logoData,
        "PNG",
        this.margin,
        this.currentY - 5,
        logoWidth,
        logoHeight,
      );
      this.currentY += logoHeight + 2;
    } else {
      this.doc.setFontSize(24);
      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFont("helvetica", "bold");
      this.doc.text("T&R INTERIOR SYSTEMS", this.margin, this.currentY);
      this.currentY += 8;
    }

    this.doc.setFontSize(10);
    this.doc.setTextColor(...COLORS.secondary);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      "Suspended Plasterboard Grid System Seismic Calculator",
      this.margin,
      this.currentY,
    );
    this.currentY += 10;
  }

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

    const pageNum = this.doc.internal.getCurrentPageInfo().pageNumber;
    this.doc.setFont("helvetica", "italic");
    this.doc.text(`Page ${pageNum}`, this.pageWidth / 2, this.pageHeight - 10, {
      align: "center",
    });
  }

  addPage() {
    this.doc.addPage();
    this.currentY = this.margin;
    this.addHeader();
  }

  addBadgeSection(number, title, resultText = "", chip = null) {
    const badgeSize = 8;
    const badgeX = this.margin;

    if (chip) {
      this.doc.setFontSize(5.5);
      this.doc.setFont("helvetica", "bold");
      const chipWidth = Math.max(8, this.doc.getTextWidth(chip.abbr) + 4);
      const chipHeight = 4;
      this.doc.setFillColor(...chip.color);
      this.doc.roundedRect(
        badgeX,
        this.currentY + 1.5,
        chipWidth,
        chipHeight,
        0.8,
        0.8,
        "F",
      );
      this.doc.setTextColor(...COLORS.white);
      this.doc.text(chip.abbr, badgeX + chipWidth / 2, this.currentY + 4, {
        align: "center",
      });

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(10);
      this.doc.text(title, badgeX + chipWidth + 3, this.currentY + 5.5);
    } else {
      this.doc.setFillColor(...COLORS.primary);
      this.doc.circle(
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        badgeSize / 2,
        "F",
      );

      this.doc.setTextColor(...COLORS.white);
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(10);
      this.doc.text(
        number.toString(),
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        { align: "center", baseline: "middle" },
      );

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(11);
      this.doc.text(title, badgeX + badgeSize + 5, this.currentY + 6);
    }

    if (resultText) {
      this.doc.setTextColor(...COLORS.text);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(
        resultText,
        this.pageWidth - this.margin,
        this.currentY + 6,
        { align: "right" },
      );
    }

    this.currentY += badgeSize + 5;
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
  }

  ensureSpace(needed = 20) {
    if (this.currentY + needed > this.pageHeight - 35) {
      this.addPage();
    }
  }

  generateMainPage() {
    this.addHeader();

    // Title
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text(
      "T&R Seismic Calculator - Suspended Plasterboard Grid System",
      this.margin,
      this.currentY,
    );
    this.currentY += 8;

    // Job details
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
      this.currentY,
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
      this.currentY,
    );
    this.currentY += 8;

    // Warning box
    this.doc.setDrawColor(220, 53, 69);
    this.doc.setFillColor(255, 243, 205);
    this.doc.roundedRect(
      this.margin,
      this.currentY,
      this.pageWidth - 2 * this.margin,
      12,
      2,
      2,
      "FD",
    );
    this.doc.setFontSize(8);
    this.doc.setTextColor(220, 53, 69);
    const warningText =
      "© This design is for T&R Suspended Plasterboard Grid System only and cannot be used with other manufacturer's ceiling products.";
    const splitWarning = this.doc.splitTextToSize(
      warningText,
      this.pageWidth - 2 * this.margin - 6,
    );
    this.doc.text(splitWarning, this.margin + 3, this.currentY + 4);
    this.currentY += 15;

    // 1. Limit State Type
    const limitStateLogic = this.getValue("limitStateLogic");
    const limitState = limitStateLogic?.limitStateMain?.value || "SLS";
    const sls2Display = limitStateLogic?.liveCalcSLS2Display?.value || "";
    this.addBadgeSection(
      1,
      "Limit State Type",
      `${limitState} ${sls2Display}`,
      { abbr: "T", color: [128, 0, 128] },
    );
    this.currentY += 3;

    // 2. Seismic Weight
    const seismicWeight = this.getValue("seismicWeight");
    const weightResult = `${
      typeof seismicWeight === "number" ? seismicWeight.toFixed(2) : "0.00"
    } kg/m²`;
    this.addBadgeSection(2, "Seismic Weight", weightResult, {
      abbr: "Sw",
      color: [101, 208, 201],
    });

    this.doc.setFontSize(8);
    const mainTee = this.getValue("mainTeeSpacing");
    const crossTee = this.getValue("crossTeeSpacing");
    this.doc.text(`Grid Layout`, this.margin + 5, this.currentY);
    this.doc.text(
      `Main Tee @ ${mainTee}mm | Cross Tee @ ${crossTee}mm`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Grid Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("gridMass")?.toFixed(2) || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Lining Weight`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("liningWeight") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Luminaires`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("luminaries") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Insulation`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("insulation") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Other`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("otherLoads") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Design Distributed Load`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("deadLoad") || 3} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 8;

    // 3. Seismic Force
    this.ensureSpace(30);
    const seismicForces = this.getValue("seismicForces");
    const forceResult = `SLS=${seismicForces?.sls || 0} | ULS=${
      seismicForces?.uls || 0
    } kg/m²`;
    this.addBadgeSection(3, "Seismic Force", forceResult, {
      abbr: "Sf",
      color: [0, 141, 144],
    });

    this.doc.setFontSize(8);

    // Zone Factor
    const zoneFactorValue = this.getValue("zoneFactor");
    const zoneFactorLabel = this.getLabel(ZONE_FACTORS, zoneFactorValue);
    this.doc.text(`Zone Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      `${zoneFactorLabel} (Z=${zoneFactorValue})`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Importance Level
    const importanceLevelValue = this.getValue("importanceLevel");
    const importanceLevelLabel = this.getLabel(
      IMPORTANCE_LEVELS,
      importanceLevelValue,
    );
    this.doc.text(`Importance Level`, this.margin + 5, this.currentY);
    this.doc.text(
      String(importanceLevelLabel || "N/A"),
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Height Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("heightFactor") || "N/A"),
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 8;

    // 4. Limiting Main Tee Length
    this.ensureSpace(15);
    const maxTeeLengths = this.getValue("maxAllowableTeeLengths");
    const mainTeeLength = maxTeeLengths?.main?.uls || 0;
    const mainResult = `SLS=${
      maxTeeLengths?.main?.sls?.toFixed(2) || 0
    }m | ULS=${mainTeeLength.toFixed(2)}m`;
    this.addBadgeSection(4, "Limiting Main Tee Length (max)", mainResult, {
      abbr: "Mt",
      color: [228, 44, 26],
    });
    this.currentY += 3;

    // 5. Limiting Cross Tee Length
    this.ensureSpace(15);
    const crossTeeLength = maxTeeLengths?.cross?.uls || 0;
    const crossResult = `SLS=${
      maxTeeLengths?.cross?.sls?.toFixed(2) || 0
    }m | ULS=${crossTeeLength.toFixed(2)}m`;
    this.addBadgeSection(5, "Limiting Cross Tee Length (max)", crossResult, {
      abbr: "Ct",
      color: [255, 102, 0],
    });
    this.currentY += 5;

    // Capacity details
    this.doc.setFontSize(8);
    this.doc.text(`Wall Fastener Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("wallFastenerSpacing") || 600}mm`,
      this.margin + 60,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(
      `Plasterboard Fixing Spacing`,
      this.margin + 5,
      this.currentY,
    );
    this.doc.text(
      `${this.getValue("plasterboardFixingSpacing") || 300}mm`,
      this.margin + 60,
      this.currentY,
    );
    this.currentY += 6;

    // Validation results
    this.doc.text(
      `Maximum measured Main Tee Length as per plans supplied: ${this.options.maxMainTeeSupplied}m`,
      this.margin + 5,
      this.currentY,
    );
    const mainValid = this.options.maxMainTeeSupplied <= mainTeeLength;
    this.doc.setTextColor(...(mainValid ? COLORS.success : COLORS.danger));
    this.doc.text(
      mainValid ? "✓" : "✗",
      this.pageWidth - this.margin - 5,
      this.currentY,
    );
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 4;

    this.doc.text(
      `Maximum measured Cross Tee Length as per plans supplied: ${this.options.maxCrossTeeSupplied}m`,
      this.margin + 5,
      this.currentY,
    );
    const crossValid = this.options.maxCrossTeeSupplied <= crossTeeLength;
    this.doc.setTextColor(...(crossValid ? COLORS.success : COLORS.danger));
    this.doc.text(
      crossValid ? "✓" : "✗",
      this.pageWidth - this.margin - 5,
      this.currentY,
    );
    this.doc.setTextColor(...COLORS.text);
    this.currentY += 6;

    if (mainValid && crossValid && !this.getValue("showBackBrace")) {
      this.doc.setFont("helvetica", "bold");
      this.doc.text(
        "No seismic breaks required. Fix two, float two.",
        this.margin + 5,
        this.currentY,
      );
    }

    this.addFooter();
  }

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

    const braceCapacityResult = this.getValue("braceCapacityResult");
    const braceData = [
      ["Brace Type", String(this.getValue("braceType") || "A")],
      ["Plenum Height (mm)", String(this.getValue("plenumHeight") || "400")],
      ["Brace Capacity (kg)", String(braceCapacityResult?.capacity || "N/A")],
      [
        "Bracing Requirement",
        String(braceCapacityResult?.requirement || "N/A"),
      ],
    ];

    autoTable(this.doc, {
      startY: this.currentY,
      body: braceData,
      theme: "plain",
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 80 },
        1: { cellWidth: "auto" },
      },
      margin: { left: this.margin, right: this.margin },
    });

    this.currentY = this.doc.lastAutoTable.finalY + 10;

    // Area Per Brace
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Area Per Brace", this.margin, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    this.doc.text(
      `Area per Brace = ${this.getValue("areaPerBrace")?.toFixed(1) || 0} m²`,
      this.margin,
      this.currentY,
    );
    this.currentY += 10;

    // Back Brace Layout
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Back Brace Layout", this.margin, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(9);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    this.doc.text(
      `Total Ceiling Area: ${this.getValue("ceilingArea") || 0} m²`,
      this.margin,
      this.currentY,
    );
    this.currentY += 5;
    this.doc.text(
      `Minimum Number of Braces: ${this.getValue("minimumBraces") || 0}`,
      this.margin,
      this.currentY,
    );
    this.currentY += 10;

    // Brace placement guidelines
    const requirements = [
      "Place braces near ceiling corners.",
      "Place braces near discontinuities / breaks in the ceiling.",
      "Place braces near the ceiling edges.",
      "Evenly distribute the remaining number of braces throughout the ceiling.",
      "Check that the area that is supported by each brace does not exceed the maximum area per brace.",
    ];

    this.doc.setFontSize(8);
    requirements.forEach((req) => {
      const bullet = "• ";
      this.doc.text(bullet + req, this.margin, this.currentY);
      this.currentY += 4;
    });

    this.currentY += 8;

    // Seismic Clearance
    this.doc.setFontSize(12);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text("Back Bracing Seismic Clearance", this.margin, this.currentY);
    this.currentY += 8;

    const seismicClearance = this.getValue("seismicClearance");
    autoTable(this.doc, {
      startY: this.currentY,
      head: [["Type of Design", "Required Clearance (mm)"]],
      body: [
        ["SLS", String(seismicClearance?.sls || "10")],
        ["ULS", String(seismicClearance?.uls || "10")],
      ],
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: COLORS.lightGray,
        textColor: COLORS.text,
        fontStyle: "bold",
      },
      margin: { left: this.margin, right: this.margin },
    });

    this.addFooter();
  }

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
        this.pageWidth - 2 * this.margin,
      );
      this.doc.text(splitNotes, this.margin, this.currentY);
      this.currentY += splitNotes.length * 5 + 10;
    }

    // Warning
    this.doc.setFontSize(9);
    this.doc.setTextColor(220, 53, 69);
    this.doc.setFont("helvetica", "bold");
    const warning =
      "© This design is for T&R Suspended Plasterboard Grid System only and cannot be used with other manufacturer's ceiling products.";
    const splitWarning = this.doc.splitTextToSize(
      warning,
      this.pageWidth - 2 * this.margin,
    );
    this.doc.text(splitWarning, this.margin, this.currentY);
    this.currentY += splitWarning.length * 5 + 8;

    // Disclaimers
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "italic");

    const disclaimers = [
      "This seismic design guide is provided to determine the installation requirements and details for the ceiling system. The calculations are based on conservative assumptions. Reduced seismic bracing for individual sites may be possible if a suitably qualified engineer carries out a site specific design.",
      "This guide has been prepared by JSK Consulting Engineers for T&R Interior Systems with the usual care and thoroughness of the consulting profession. On the basis of the assumptions and limitations presented in the guide, application of the guide is up to the users discretion and outside the control of JSK Consulting Engineers.",
      "If the building is outside the assumptions and limitations detailed then a suitable site specific seismic design should be performed by a qualified Chartered Professional Engineer. This guide should not be used as a calculation template for a PS1; site specific design should be carried out for these cases also.",
      "Allowance for relative motion between the ceiling and structure must be provided by floating edges. If the perimeter bracing method is used then two perpendicular edges must be fixed with the remaining two floating. If back bracing to the upper structure is used, then all edges must be floating. Floating edges must also be provided around rigid or separately braced items that pass through the ceiling.",
      "Consult a structural engineer for the expected earthquake deflections of the structure.",
      "© The T&R Seismic System has been developed in conjunction with JSK Consulting Engineers and T&R Interior Systems. It remains the intellectual property of T&R Interior Systems and may not be used with other products.",
    ];

    disclaimers.forEach((disclaimer) => {
      const lines = this.doc.splitTextToSize(
        disclaimer,
        this.pageWidth - 2 * this.margin,
      );
      this.doc.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 3.5 + 4;
    });

    this.addFooter();
  }

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

  async save() {
    await this.loadLogo();
    this.generate();
    const fileName = `TR-Plasterboard-Seismic-${this.options.jobName.replace(
      /[^a-z0-9]/gi,
      "_",
    )}-${new Date().toISOString().split("T")[0]}.pdf`;
    this.doc.save(fileName);
  }
}

/**
 * Export function to generate and download PDF for Plasterboard Calculator
 */
export async function exportPlasterboardCeilingPDF(calculatorState, options) {
  const exporter = new PlasterboardPDFExporter(calculatorState, options);
  await exporter.save();
}

/**
 * Baffle Ceiling PDF Exporter
 * Generates professional PDF reports for the Baffle Ceiling Calculator
 */
class BafflePDFExporter {
  constructor(calculatorState, options = {}) {
    this.state = calculatorState;
    this.options = {
      jobName: options.jobName || "Untitled Project",
      preparedFor: options.preparedFor || "",
      notes: options.notes || "",
      ...options,
    };
    this.logoData = null;

    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
  }

  async loadLogo() {
    this.logoData = await loadImageAsBase64(TR_LOGO_URL);
  }

  getValue(key) {
    const value = this.state[key];
    return value?.value !== undefined ? value.value : value;
  }

  getLabel(options, value) {
    if (value === undefined || value === null) return "N/A";
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : String(value);
  }

  addHeader() {
    // Add logo if available
    if (this.logoData) {
      const logoWidth = 50;
      const logoHeight = logoWidth * (375 / 500);
      this.doc.addImage(
        this.logoData,
        "PNG",
        this.margin,
        this.currentY - 5,
        logoWidth,
        logoHeight,
      );
      this.currentY += logoHeight + 2;
    } else {
      this.doc.setFontSize(24);
      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFont("helvetica", "bold");
      this.doc.text("T&R INTERIOR SYSTEMS", this.margin, this.currentY);
      this.currentY += 8;
    }

    this.doc.setFontSize(10);
    this.doc.setTextColor(...COLORS.secondary);
    this.doc.setFont("helvetica", "normal");
    this.doc.text(
      "Baffle Ceiling Seismic Calculator",
      this.margin,
      this.currentY,
    );
    this.currentY += 10;
  }

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

    const pageNum = this.doc.internal.getCurrentPageInfo().pageNumber;
    this.doc.setFont("helvetica", "italic");
    this.doc.text(`Page ${pageNum}`, this.pageWidth / 2, this.pageHeight - 10, {
      align: "center",
    });
  }

  addPage() {
    this.doc.addPage();
    this.currentY = this.margin;
    this.addHeader();
  }

  addBadgeSection(number, title, resultText = "", chip = null) {
    const badgeSize = 8;
    const badgeX = this.margin;

    if (chip) {
      this.doc.setFontSize(5.5);
      this.doc.setFont("helvetica", "bold");
      const chipWidth = Math.max(8, this.doc.getTextWidth(chip.abbr) + 4);
      const chipHeight = 4;
      this.doc.setFillColor(...chip.color);
      this.doc.roundedRect(
        badgeX,
        this.currentY + 1.5,
        chipWidth,
        chipHeight,
        0.8,
        0.8,
        "F",
      );
      this.doc.setTextColor(...COLORS.white);
      this.doc.text(chip.abbr, badgeX + chipWidth / 2, this.currentY + 4, {
        align: "center",
      });

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(10);
      this.doc.text(title, badgeX + chipWidth + 3, this.currentY + 5.5);
    } else {
      this.doc.setFillColor(...COLORS.primary);
      this.doc.circle(
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        badgeSize / 2,
        "F",
      );

      this.doc.setTextColor(...COLORS.white);
      this.doc.setFont("helvetica", "bold");
      this.doc.setFontSize(10);
      this.doc.text(
        number.toString(),
        badgeX + badgeSize / 2,
        this.currentY + badgeSize / 2,
        { align: "center", baseline: "middle" },
      );

      this.doc.setTextColor(...COLORS.primary);
      this.doc.setFontSize(11);
      this.doc.text(title, badgeX + badgeSize + 5, this.currentY + 6);
    }

    if (resultText) {
      this.doc.setTextColor(...COLORS.text);
      this.doc.setFont("helvetica", "bold");
      this.doc.text(
        resultText,
        this.pageWidth - this.margin,
        this.currentY + 6,
        { align: "right" },
      );
    }

    this.currentY += badgeSize + 5;
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "normal");
  }

  ensureSpace(needed = 20) {
    if (this.currentY + needed > this.pageHeight - 35) {
      this.addPage();
    }
  }

  generateMainPage() {
    this.addHeader();

    // Title
    this.doc.setFontSize(14);
    this.doc.setFont("helvetica", "bold");
    this.doc.setTextColor(...COLORS.primary);
    this.doc.text(
      "T&R Seismic Calculator - Baffle Ceiling",
      this.margin,
      this.currentY,
    );
    this.currentY += 8;

    // Job details
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
      this.currentY,
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
      this.currentY,
    );
    this.currentY += 8;

    // Warning box
    this.doc.setDrawColor(220, 53, 69);
    this.doc.setFillColor(255, 243, 205);
    this.doc.roundedRect(
      this.margin,
      this.currentY,
      this.pageWidth - 2 * this.margin,
      12,
      2,
      2,
      "FD",
    );
    this.doc.setFontSize(8);
    this.doc.setTextColor(220, 53, 69);
    const warningText =
      "© This design is for T&R Baffle Ceiling Systems only and cannot be used with other manufacturer's ceiling products.";
    const splitWarning = this.doc.splitTextToSize(
      warningText,
      this.pageWidth - 2 * this.margin - 6,
    );
    this.doc.text(splitWarning, this.margin + 3, this.currentY + 4);
    this.currentY += 15;

    // 1. Limit State Type
    const limitStateLogic = this.getValue("limitStateLogic");
    const limitState = limitStateLogic?.limitStateMain?.value || "SLS";
    const sls2Display = limitStateLogic?.liveCalcSLS2Display?.value || "";
    this.addBadgeSection(
      1,
      "Limit State Type",
      `${limitState} ${sls2Display}`,
      { abbr: "T", color: [128, 0, 128] },
    );
    this.currentY += 3;

    // 2. Seismic Weight
    const seismicWeight = this.getValue("seismicWeight");
    const weightResult = `${
      typeof seismicWeight === "number" ? seismicWeight.toFixed(2) : "0.00"
    } kg/m²`;
    this.addBadgeSection(2, "Seismic Weight", weightResult, {
      abbr: "Sw",
      color: [101, 208, 201],
    });

    this.doc.setFontSize(8);
    this.doc.text(`Profile Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("profileMass") || 0} kg/m`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Baffle Spacing`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("baffleSpacing") || 0} m`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Baffle Mass`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("baffleMass")?.toFixed(2) || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Strongback Mass`, this.margin + 5, this.currentY);
    this.doc.text(`1.27 kg/m²`, this.margin + 50, this.currentY);
    this.currentY += 4;
    this.doc.text(`Luminaires`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("luminaries") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Services`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("services") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Other`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("otherLoads") || 0} kg/m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 8;

    // 3. Seismic Force
    this.ensureSpace(30);
    const seismicForces = this.getValue("seismicForces");
    const forceResult = `SLS=${seismicForces?.sls || 0} | ULS=${
      seismicForces?.uls || 0
    } kg/m²`;
    this.addBadgeSection(3, "Seismic Force", forceResult, {
      abbr: "Sf",
      color: [0, 141, 144],
    });

    this.doc.setFontSize(8);

    // Zone Factor
    const zoneFactorValue = this.getValue("zoneFactor");
    const zoneFactorLabel = this.getLabel(ZONE_FACTORS, zoneFactorValue);
    this.doc.text(`Zone Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      `${zoneFactorLabel} (Z=${zoneFactorValue})`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;

    // Importance Level
    const importanceLevelValue = this.getValue("importanceLevel");
    const importanceLevelLabel = this.getLabel(
      IMPORTANCE_LEVELS,
      importanceLevelValue,
    );
    this.doc.text(`Importance Level`, this.margin + 5, this.currentY);
    this.doc.text(
      String(importanceLevelLabel || "N/A"),
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Height Factor`, this.margin + 5, this.currentY);
    this.doc.text(
      String(this.getValue("heightFactor") || "N/A"),
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 8;

    // 4. Area Per Brace
    this.ensureSpace(15);
    const areaPerBrace = this.getValue("areaPerBrace");
    this.addBadgeSection(
      4,
      "Area Per Brace",
      `${areaPerBrace?.toFixed(1) || 0} m²`,
      { abbr: "Ab", color: [246, 181, 62] },
    );
    this.currentY += 3;

    // 5. Minimum Braces
    this.ensureSpace(15);
    const minimumBraces = this.getValue("minimumBraces");
    this.addBadgeSection(
      5,
      "Minimum Number of Braces",
      `${minimumBraces || 0}`,
      { abbr: "#b", color: [255, 102, 0] },
    );
    this.currentY += 3;

    // 6. Max Brace Spacing
    this.ensureSpace(15);
    const maxBraceSpacing = this.getValue("maxBraceSpacing");
    this.addBadgeSection(
      6,
      "Max Brace Spacing",
      `${maxBraceSpacing?.toFixed(1) || 0} m`,
      { abbr: "Bs", color: [228, 44, 26] },
    );
    this.currentY += 5;

    // Brace details
    this.ensureSpace(25);
    this.doc.setFontSize(8);
    this.doc.text(`Plenum Height`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("plenumHeight") || 0} m`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`Ceiling Area`, this.margin + 5, this.currentY);
    this.doc.text(
      `${this.getValue("ceilingArea") || 0} m²`,
      this.margin + 50,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(`StratoBrace Capacity`, this.margin + 5, this.currentY);
    this.doc.text(`250 kg`, this.margin + 50, this.currentY);
    this.currentY += 8;

    // Seismic Clearance
    this.ensureSpace(20);
    const seismicClearance = this.getValue("seismicClearance");
    this.doc.setFont("helvetica", "bold");
    this.doc.text(
      `Required Seismic Clearance:`,
      this.margin + 5,
      this.currentY,
    );
    this.doc.setFont("helvetica", "normal");
    this.currentY += 4;
    this.doc.text(
      `SLS = ${seismicClearance?.sls || 0} mm`,
      this.margin + 5,
      this.currentY,
    );
    this.currentY += 4;
    this.doc.text(
      `ULS = ${seismicClearance?.uls || 0} mm`,
      this.margin + 5,
      this.currentY,
    );

    this.addFooter();
  }

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
        this.pageWidth - 2 * this.margin,
      );
      this.doc.text(splitNotes, this.margin, this.currentY);
      this.currentY += splitNotes.length * 5 + 10;
    }

    // Warning
    this.doc.setFontSize(9);
    this.doc.setTextColor(220, 53, 69);
    this.doc.setFont("helvetica", "bold");
    const warning =
      "© This design is for T&R Baffle Ceiling Systems only and cannot be used with other manufacturer's ceiling products.";
    const splitWarning = this.doc.splitTextToSize(
      warning,
      this.pageWidth - 2 * this.margin,
    );
    this.doc.text(splitWarning, this.margin, this.currentY);
    this.currentY += splitWarning.length * 5 + 8;

    // Disclaimers
    this.doc.setFontSize(8);
    this.doc.setFont("helvetica", "normal");
    this.doc.setTextColor(...COLORS.text);
    this.doc.setFont("helvetica", "italic");

    const disclaimers = [
      "This seismic design guide is provided to determine the installation requirements and details for the ceiling system. The calculations are based on conservative assumptions. Reduced seismic bracing for individual sites may be possible if a suitably qualified engineer carries out a site specific design.",
      "This guide has been prepared by JSK Consulting Engineers for T&R Interior Systems with the usual care and thoroughness of the consulting profession. Application of the guide is up to the users discretion and outside the control of JSK Consulting Engineers.",
      "If the building is outside the assumptions and limitations detailed then a suitable site specific seismic design should be performed by a qualified Chartered Professional Engineer.",
      "Consult a structural engineer for the expected earthquake deflections of the structure.",
      "© The T&R Seismic System has been developed in conjunction with JSK Consulting Engineers and T&R Interior Systems. It remains the intellectual property of T&R Interior Systems and may not be used with other products.",
    ];

    disclaimers.forEach((disclaimer) => {
      const lines = this.doc.splitTextToSize(
        disclaimer,
        this.pageWidth - 2 * this.margin,
      );
      this.doc.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 3.5 + 4;
    });

    this.addFooter();
  }

  generate() {
    this.generateMainPage();
    this.generateNotesPage();
  }

  async save() {
    await this.loadLogo();
    this.generate();
    const fileName = `TR-Baffle-Seismic-${this.options.jobName.replace(
      /[^a-z0-9]/gi,
      "_",
    )}-${new Date().toISOString().split("T")[0]}.pdf`;
    this.doc.save(fileName);
  }
}

/**
 * Export function to generate and download PDF for Baffle Calculator
 */
export async function exportBaffleCeilingPDF(calculatorState, options) {
  const exporter = new BafflePDFExporter(calculatorState, options);
  await exporter.save();
}
