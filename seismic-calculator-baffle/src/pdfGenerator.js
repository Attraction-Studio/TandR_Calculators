// Lazy load pdfmake - only import when PDF generation is needed
// This prevents pdfmake from being bundled into the main app
let pdfMake = null
let fontsLoaded = false
let pdfFonts = null

// Helper to load fonts from a module
function loadFontsFromModule(fontModule) {
  if (fontsLoaded) return
  
  try {
    if (fontModule.pdfMake && fontModule.pdfMake.vfs) {
      pdfMake.vfs = fontModule.pdfMake.vfs
      fontsLoaded = true
      return true
    } else if (fontModule.default) {
      const defaultExport = fontModule.default
      if (defaultExport.pdfMake && defaultExport.pdfMake.vfs) {
        pdfMake.vfs = defaultExport.pdfMake.vfs
        fontsLoaded = true
        return true
      } else if (defaultExport.vfs) {
        pdfMake.vfs = defaultExport.vfs
        fontsLoaded = true
        return true
      }
    } else if (fontModule.vfs) {
      pdfMake.vfs = fontModule.vfs
      fontsLoaded = true
      return true
    }
  } catch (error) {
    console.warn('Error loading fonts from module:', error)
  }
  return false
}

// Initialize pdfmake and fonts - load from CDN to reduce bundle size
async function initializePdfMake() {
  if (pdfMake) return pdfMake
  
  // Load pdfmake from CDN (reduces main bundle size by ~2MB)
  if (typeof window !== 'undefined' && window.pdfMake) {
    // Already loaded via CDN
    pdfMake = window.pdfMake
  } else {
    // Try to load from CDN
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.20/pdfmake.min.js')
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.20/vfs_fonts.min.js')
      pdfMake = window.pdfMake
    } catch (error) {
      // Fallback to bundled version
      console.warn('CDN load failed, using bundled pdfmake:', error)
      const pdfMakeModule = await import('pdfmake/build/pdfmake')
      pdfMake = pdfMakeModule.default || pdfMakeModule
      
      // Load fonts
      try {
        const pdfFontsModule = await import('pdfmake/build/vfs_fonts')
        pdfFonts = pdfFontsModule.default || pdfFontsModule
        loadFontsFromModule(pdfFonts)
      } catch (e) {
        console.warn('Could not load bundled fonts:', e)
      }
    }
  }
  
  // Initialize vfs
  if (pdfMake && !pdfMake.vfs) {
    pdfMake.vfs = pdfMake.vfs || {}
  }
  
  return pdfMake
}

// Helper to load script from CDN
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// Helper function to create section header with badge
function createSectionHeader(badgeColor, badgeText, title, value) {
  return {
    table: {
      widths: [32, '*', 'auto'],
      body: [
        [
          {
            stack: [
              {
                canvas: [
                  {
                    type: 'ellipse',
                    x: 16,
                    y: 16,
                    r1: 14,
                    r2: 14,
                    color: badgeColor
                  }
                ],
                width: 32,
                height: 32
              },
              {
                text: badgeText,
                color: '#ffffff',
                fontSize: 11,
                bold: true,
                absolutePosition: { x: 4, y: 10 },
                width: 24,
                alignment: 'center'
              }
            ],
            width: 32,
            height: 32,
            margin: [0, 0, 0, 0]
          },
          {
            text: title,
            bold: true,
            fontSize: 12,
            margin: [8, 10, 0, 0]
          },
          {
            text: value || '',
            bold: true,
            fontSize: 12,
            alignment: 'right',
            margin: [0, 10, 0, 0]
          }
        ]
      ]
    },
    layout: 'noBorders',
    margin: [0, 0, 0, 12]
  }
}

export async function generatePDF(data) {
  // Initialize pdfmake and fonts (lazy loaded)
  await initializePdfMake()
  
  // If fonts still aren't loaded, log warning but continue
  if (!fontsLoaded && Object.keys(pdfMake.vfs).length === 0) {
    console.warn('pdfmake fonts not available - PDF may not render correctly')
  }
  const {
    projectname = '',
    byname = '',
    dnote = '',
    lst = '',
    sls2test = '0',
    sw = '',
    gridmass = '',
    gridmasst = '',
    bafflespace = '',
    bafflemass = '',
    strongbackmass = '1.27',
    strongbackmasst = '41x21x1.2 PST Channel',
    luminaries = '',
    insulation = '',
    other = '',
    carea = '',
    apb = '',
    minbraces = '',
    bspace = '',
    rclearance = '',
    zone = '',
    zonet = '',
    insttype = '',
    floorweight = '',
    floorweightt = ''
  } = data

  // Get current date
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  // Get gridmass text
  const gridmassText = gridmasst || (() => {
    const gridmassMap = {
      '1.3': '100mm by 30mm (Gridlux compatible)',
      '1.7': '135mm by 30mm',
      '1.8': '150mm by 25mm',
      '2.4': '150mm by 30mm (Gridlux compatible)'
    }
    return gridmassMap[gridmass] || gridmass
  })()

  // Get floor weight text
  const floorWeightText = floorweightt || (() => {
    const floorWeightMap = {
      '3': '0 - 3m',
      '4': '3.1 - 6m',
      '5': '6.1 - 9m',
      '6': '9.1m +'
    }
    return floorWeightMap[floorweight] || floorweight
  })()

  // Get importance level text
  const importanceLevelText = (() => {
    const insttypeMap = {
      '1': 'Importance Level 1',
      '2': 'Importance Level 2',
      '3': 'Importance Level 3'
    }
    return insttypeMap[insttype] || `Importance Level ${insttype}`
  })()

  // Calculate seismic forces
  const sls = data.sf1 || ''
  const sls2 = data.sf2 || ''
  const uls = data.sf3 || ''

  // Limit state display
  const limitStateDisplay = lst + (sls2test === '1' ? ' + SLS2' : '')

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10
    },
    // Ensure fonts are configured
    fonts: {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    },
    content: [
      // Header with logo
      {
        columns: [
          {
            width: 80,
            stack: [
              {
                canvas: [
                  {
                    type: 'ellipse',
                    x: 0,
                    y: 0,
                    r1: 30,
                    r2: 30,
                    color: '#00a896',
                    fillOpacity: 1
                  }
                ],
                width: 60,
                height: 60
              }
            ]
          },
          {
            width: '*',
            stack: [
              {
                text: 'INT&RIOR SYSTEMS',
                fontSize: 20,
                bold: true,
                color: '#00a896',
                margin: [10, 0, 0, 0]
              },
              {
                text: 'Guiding Design • Informed Interiors',
                fontSize: 10,
                color: '#00a896',
                margin: [10, 2, 0, 0]
              }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Title
      {
        text: 'T&R Seismic Calculator - Baffle Ceilings',
        fontSize: 18,
        bold: true,
        color: '#1e3a8a',
        margin: [0, 0, 0, 15]
      },

      // Project Info
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: `Job Name: ${projectname || ''}`, margin: [0, 0, 0, 5] },
              { text: `Prepared for: ${byname || ''}`, margin: [0, 0, 0, 5] }
            ]
          },
          {
            width: 'auto',
            text: `Date: ${dateStr}`,
            alignment: 'right'
          }
        ],
        margin: [0, 0, 0, 15]
      },

      // Disclaimer
      {
        text: '© This design is valid only for use with the T&R Aluminium Baffle Ceiling System and cannot be used with any other system.',
        color: '#dc2626',
        bold: true,
        fontSize: 10,
        margin: [0, 0, 0, 20]
      },

      // Limit State Type
      {
        ...createSectionHeader('#8b5cf6', 'T', 'Limit State Type', limitStateDisplay),
        margin: [0, 0, 0, 20]
      },

      // Seismic Weight
      {
        ...createSectionHeader('#00a896', 'Sw', 'Seismic Weight', `${sw} kg/m²`),
        margin: [0, 20, 0, 12]
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Profile:', margin: [0, 0, 0, 5] },
              { text: 'Baffle Spacing (m):', margin: [0, 0, 0, 5] },
              { text: 'Baffle Mass (kg/m²):', margin: [0, 0, 0, 5] },
              { text: 'Strongback Mass (kg/m²):', margin: [0, 0, 0, 5] },
              { text: 'Services:', margin: [0, 8, 0, 5] },
              { text: '  Luminaires incl. Gridlux (kg/m²):', margin: [20, 0, 0, 5] },
              { text: '  Services Allowance (kg/m²):', margin: [20, 0, 0, 5] },
              { text: '  Other:', margin: [20, 0, 0, 5] }
            ]
          },
          {
            width: 'auto',
            stack: [
              { text: gridmassText, alignment: 'right', margin: [0, 0, 0, 5] },
              { text: bafflespace || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: bafflemass || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: strongbackmass || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: strongbackmasst || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: luminaries || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: insulation || '', alignment: 'right', margin: [0, 0, 0, 5] },
              { text: other || '', alignment: 'right', margin: [0, 0, 0, 5] }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // Seismic Force
      {
        ...createSectionHeader('#006d77', 'Sf', 'Seismic Force', ''),
        margin: [0, 20, 0, 12]
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Zone Factor:', margin: [0, 0, 0, 5] },
              { text: 'Type of Installation:', margin: [0, 0, 0, 5] },
              { text: 'Floor Height Factor:', margin: [0, 0, 0, 5] }
            ]
          },
          {
            width: 'auto',
            stack: [
              { text: `${zonet || ''} Zone ${zone || ''}`, alignment: 'right', margin: [0, 0, 0, 5] },
              { text: importanceLevelText, alignment: 'right', margin: [0, 0, 0, 5] },
              { text: floorWeightText, alignment: 'right', margin: [0, 0, 0, 5] }
            ]
          }
        ],
        margin: [0, 0, 0, 10]
      },
      {
        text: [
          { text: 'SLS = ', bold: true },
          { text: sls || '' },
          { text: '\n' },
          ...(sls2test === '1' ? [{ text: 'SLS2 = ', bold: true }, { text: sls2 || '' }, { text: '\n' }] : []),
          { text: 'ULS = ', bold: true },
          { text: uls || '' }
        ],
        margin: [0, 10, 0, 20]
      },

      // Ceiling Area
      createSectionHeader('#22c55e', 'Ca', 'Ceiling Area (m²)', carea || ''),

      // Area per brace
      createSectionHeader('#f97316', 'Ab', 'Area per brace (m²)', apb || ''),

      // Min # of braces
      createSectionHeader('#ea580c', '#b', 'Min. # of braces', minbraces || ''),

      // Max Brace Spacing
      createSectionHeader('#a16207', 'Bs', 'Max. Brace Spacing (m)', bspace || ''),

      // Required Seismic Clearance
      createSectionHeader('#006d77', 'Sc', 'Required Seismic Clearance (mm)', rclearance || ''),

      // Notes section if provided
      ...(dnote ? [{
        text: 'Notes:',
        bold: true,
        margin: [0, 20, 0, 5]
      }, {
        text: dnote,
        margin: [0, 0, 0, 30]
      }] : []),

      // Footer
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 30, 0, 20]
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Wellington Head Office:', bold: true, margin: [0, 0, 0, 3] },
              { text: '12 Glover Street' },
              { text: 'Ngauranga' },
              { text: 'Wellington 6035' },
              { text: '04 499 5915' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Auckland:', bold: true, margin: [0, 0, 0, 3] },
              { text: '19-21 Fairfax Avenue' },
              { text: 'Penrose' },
              { text: 'Auckland 1061' },
              { text: '09 571 0395' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Christchurch:', bold: true, margin: [0, 0, 0, 3] },
              { text: '69 Disraeli Street' },
              { text: 'Addington' },
              { text: 'Christchurch 8023' },
              { text: '03 366 2507' }
            ]
          }
        ]
      },

      // Page break for notes page
      { text: '', pageBreak: 'before' },

      // Notes Page
      {
        text: 'Notes',
        fontSize: 18,
        bold: true,
        color: '#1e3a8a',
        margin: [0, 0, 0, 15]
      },

      {
        text: '© This design is valid only for use with the T&R Aluminium Baffle Ceiling System and cannot be used with any other system.',
        color: '#dc2626',
        bold: true,
        fontSize: 10,
        margin: [0, 0, 0, 15]
      },

      {
        text: [
          'The calculated minimum number of braces is based on the assumption that the ceiling load is evenly shared between all braces. ',
          'In practice the actual bracing requirements will often exceed the minimum due to ceiling shape and motion control. ',
          'It is recommended that a Reflected Ceiling Plan (RCP) be annotated with bracing according to the following guidelines:'
        ],
        margin: [0, 0, 0, 10]
      },

      {
        ul: [
          'Bracing should be laid out evenly throughout the ceiling area',
          'Strongbacks closest to the ceiling edges should be braced',
          'Thereafter every second strongback must be braced. It is preferable that every strongback is braced',
          'If a strongback is broken along its length each shall be considered as a separate strongback, and braced accordingly'
        ],
        margin: [0, 0, 0, 15]
      },

      {
        text: 'For complex ceiling shapes, professional engineering advice should be sought.',
        margin: [0, 0, 0, 20]
      },

      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 0, 0, 15]
      },

      {
        text: [
          'This guide allows a designer to calculate required bracing for suspended baffle ceilings. ',
          'The calculations are based on conservative assumptions. ',
          'Reduced seismic bracing designs for individual sites may be possible if a suitably qualified Chartered Professional Engineer carries out a site-specific design. ',
          'This guide should not be used as a calculation template for a PS-1; specific seismic design should be carried out for these cases.'
        ],
        margin: [0, 0, 0, 15]
      },

      {
        text: 'Please note;',
        bold: true,
        margin: [0, 0, 0, 5]
      },
      {
        text: [
          'All services and systems above the ceiling must be individually restrained. ',
          'This is not covered by the T&R Suspended Ceiling Calculator. ',
          'Clearance must be maintained between components to prevent seismic interaction between the ceiling and the services.'
        ],
        margin: [0, 0, 0, 15]
      },

      {
        text: [
          'This guide has been prepared by JSK Consulting Engineers for T&R Interior Systems with the usual care and thoroughness of the consulting profession. ',
          'Interpretation and application of this guide is outside the control of the engineer and therefore is the users\' responsibility. ',
          'This guide does not constitute a producer statement or engineer\'s certification, and is not for use with trafficable ceilings or ceilings which support partition walls or any other service load.'
        ],
        margin: [0, 0, 0, 15]
      },

      {
        text: [
          'Allowance for relative motion between the ceiling and structure must be provided by floating edges. ',
          'Back bracing to the above structure will be used as the primary load path to structure, therefore all edges must be floating. ',
          'Floating edges must also be provided around rigid or separately braced items that pass through the ceiling. ',
          'The amount of clearance should be checked by an engineer on a case-by-case basis.'
        ],
        margin: [0, 0, 0, 15]
      },

      {
        text: 'Consult a structural engineer for the expected earthquake deflections of the structure.',
        margin: [0, 0, 0, 20]
      },

      {
        text: [
          '© The T&R Seismic System has been developed in conjunction with JSK Consulting Engineers and T&R Interior Systems.\n\n',
          'It remains the intellectual property of T&R Interior Systems and may not be used with other products.'
        ],
        margin: [0, 0, 0, 30]
      },

      // Footer on notes page
      {
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }],
        margin: [0, 30, 0, 20]
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Wellington Head Office:', bold: true, margin: [0, 0, 0, 3] },
              { text: '12 Glover Street' },
              { text: 'Ngauranga' },
              { text: 'Wellington 6035' },
              { text: '04 499 5915' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Auckland:', bold: true, margin: [0, 0, 0, 3] },
              { text: '19-21 Fairfax Avenue' },
              { text: 'Penrose' },
              { text: 'Auckland 1061' },
              { text: '09 571 0395' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Christchurch:', bold: true, margin: [0, 0, 0, 3] },
              { text: '69 Disraeli Street' },
              { text: 'Addington' },
              { text: 'Christchurch 8023' },
              { text: '03 366 2507' }
            ]
          }
        ]
      }
    ]
  }

  // Generate and download PDF
  pdfMake.createPdf(docDefinition).download('T&R_Seismic_Calculator_Baffle.pdf')
}

