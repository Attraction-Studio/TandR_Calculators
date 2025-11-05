# Webflow Elements Reference - Seismic Calculator Baffle

This document lists all required element attributes and IDs for the `seismic_calculator_baffle.js` calculator to function correctly in Webflow.

## Prefix Convention

All elements use the `scb_` prefix (Seismic Calculator Baffle).

---

## Form Elements (Webflow Forms)

### Input Fields

| Element        | Attribute | Value               | Type        | Notes                      |
| -------------- | --------- | ------------------- | ----------- | -------------------------- |
| Grid Mass      | `id`      | `scb_gridmass`      | select      | Required                   |
| Baffle Space   | `id`      | `scb_bafflespace`   | number/text | Required, validate 0.1-1.0 |
| Luminaries     | `id`      | `scb_luminaries`     | number/text | Required                   |
| Insulation     | `id`      | `scb_insulation`    | number/text | Required                   |
| Other          | `id`      | `scb_other`         | number/text | Required                   |
| Ceiling Area   | `id`      | `scb_carea`         | number/text | Required                   |
| Zone Factor    | `id`      | `scb_zonefactor`    | select      | Required                   |
| Installation Type | `id`   | `scb_insttype`      | select      | Required                   |
| Floor Weight   | `id`      | `scb_floorweight`   | select      | Required                   |
| Ceiling Type   | `id`      | `scb_ctype`         | select      | Required, must have data-d45 and data-txt attributes |
| SLS2 Test      | `id`      | `scb_sls2test`      | hidden/input | Required (hidden field)    |
| LST            | `id`      | `scb_lst`           | hidden/input | Required (hidden field)    |

### Download Modal Fields

| Element        | Attribute | Value               | Type        | Notes                      |
| -------------- | --------- | ------------------- | ----------- | -------------------------- |
| Project Name   | `id`      | `scb_projectname`   | text        | For PDF generation         |
| By Name        | `id`      | `scb_byname`        | text        | For PDF generation         |
| Notes          | `id`      | `scb_dnote`         | textarea    | For PDF generation         |

---

## Button Elements

| Element          | Attribute | Value       | Type   | Notes                                    |
| ---------------- | --------- | ----------- | ------ | ---------------------------------------- |
| Begin            | `id`      | `scb_begin` | button | Starts the calculator                    |
| SLS2 Enable      | `id`      | `scb_st1d`  | button | Enables SLS2 mode                        |
| SLS2 Disable     | `id`      | `scb_st2d`  | button | Disables SLS2 mode                      |
| ULS Option 1     | `id`      | `scb_st1a`  | button | Sets ULS mode                            |
| ULS Option 2     | `id`      | `scb_st1b`  | button | Sets ULS mode                            |
| ULS Option 3     | `id`      | `scb_st1c`  | button | Sets ULS mode                            |
| SLS Option       | `id`      | `scb_st1e`  | button | Sets SLS mode                            |
| Step 2 Option A  | `id`      | `scb_st2a`  | button | Shows div1-2                              |
| Step 2 Option B  | `id`      | `scb_st2b`  | button | Shows div1-3                              |
| Step 2 Option C  | `id`      | `scb_st2c`  | button | Shows div1-4                              |
| Step 2 Option E  | `id`      | `scb_st2e`  | button | Shows div1-5                              |
| BBD Toggle       | `id`      | `scb_bbd`   | button | Toggles bbd info                         |
| BCD Toggle       | `id`      | `scb_bcd`   | button | Toggles bcd info                         |
| BRG Toggle       | `id`      | `scb_brg`   | button | Toggles brg info                         |
| Print/Download   | `id`      | `scb_printit` | button | Triggers PDF download (requires data-done attribute) |

---

## Display Elements (Regular Blocks)

### Main Containers

| Element         | Attribute | Value         | Notes                                     |
| --------------- | --------- | ------------- | ----------------------------------------- |
| Needs Section   | `id`      | `scb_needs`   | Initially visible, hidden after begin     |
| Results Section | `id`      | `scb_results` | Initially hidden, shown after begin       |
| Multi-state     | `id`      | `scb_multistate` | Initially hidden, shown for SLS2 mode  |
| Download Form   | `id`      | `scb_downloadform` | Form in download modal               |
| Download Result | `id`      | `scb_downloadresult` | Result display in modal            |
| Downloading     | `id`      | `scb_downloading` | Loading indicator in modal          |
| PDF Container   | `id`      | `scb_pdf`     | PDF display container                     |
| Download Link   | `id`      | `scb_downloadlink` | Link to download PDF                   |

### Step Divisions

| Element     | Attribute | Value         | Notes                                     |
| ----------- | --------- | ------------- | ----------------------------------------- |
| Div 1-1     | `id`      | `scb_div1_1`  | Initially hidden                          |
| Div 1-2     | `id`      | `scb_div1_2`  | Initially hidden                          |
| Div 1-3     | `id`      | `scb_div1_3`  | Initially hidden                          |
| Div 1-4     | `id`      | `scb_div1_4`  | Initially hidden                          |
| Div 1-5     | `id`      | `scb_div1_5`  | Initially hidden                          |
| Div 1-6     | `id`      | `scb_div1_6`  | Initially hidden                          |
| Div 1-7     | `id`      | `scb_div1_7`  | Initially hidden                          |

### Calculation Results

| Element         | Attribute | Value              | Notes                    |
| --------------- | --------- | ------------------ | ------------------------ |
| Grid Mass Text  | `id`      | `scb_gridmass-txt` | Display grid mass         |
| Baffle Mass     | `id`      | `scb_bafflemass`   | Calculated baffle mass    |
| Strongback Mass | `id`      | `scb_strongbackmass` | Display strongback mass |
| Strongback Type | `id`      | `scb_strongbackmasst` | Display type           |
| Zone Factor Text | `id`     | `scb_zonefactor-txt` | Display zone factor   |
| Installation Type Text | `id` | `scb_insttype-txt` | Display inst type    |
| Floor Weight Text | `id`    | `scb_floorweight-txt` | Display floor weight |
| 45 Length       | `id`      | `scb_45length`     | Display 45 degree length  |
| Brace Arm Text  | `id`      | `scb_bracearm-txt` | Display brace arm type    |
| APB             | `id`      | `scb_apb`          | Display area per brace    |
| Min Braces      | `id`      | `scb_minbraces`    | Display minimum braces    |
| B Space         | `id`      | `scb_bspace`       | Display brace spacing     |
| R Clearance     | `id`      | `scb_rclearance`   | Display required clearance |
| SF1             | `id`      | `scb_sf1`          | Display seismic factor 1  |
| SF2             | `id`      | `scb_sf2`          | Display seismic factor 2  |
| SF3             | `id`      | `scb_sf3`          | Display seismic factor 3  |
| SW              | `id`      | `scb_sw`            | Display SW value          |
| Imp1            | `id`      | `scb_imp1`          | Disabled/hidden for ULS/SLS2 |

### Error Messages

| Element          | Attribute | Value              | Notes                    |
| ---------------- | --------- | ------------------ | ------------------------ |
| Baffle Error     | `id`      | `scb_baffleerror`  | Error message container  |
| Baffle Error 2   | `id`      | `scb_baffleerror2` | Error message display    |

### Info Toggles

| Element     | Attribute | Value     | Notes                    |
| ----------- | --------- | --------- | ------------------------ |
| BBD Info    | `id`      | `scb_bbdi` | Initially hidden         |
| BCD Info    | `id`      | `scb_bcdi` | Initially hidden         |
| BRG Info    | `id`      | `scb_brgi` | Initially hidden         |

### Map Display

| Element     | Attribute | Value          | Notes                    |
| ----------- | --------- | -------------- | ------------------------ |
| Map Div     | `id`      | `scb_mapdiv`   | Google Maps iframe container |

---

## Classes

### Calculation Trigger Class

Add the class `scb_calctxt` to any input/select that should trigger calculation when changed:
- Grid Mass
- Baffle Space
- Luminaries
- Insulation
- Other
- Ceiling Area
- Zone Factor
- Installation Type
- Floor Weight
- Ceiling Type

### Display Classes (Multiple Elements)

These classes can be applied to multiple elements for bulk updates:

| Class Name          | Purpose                               |
| ------------------- | ------------------------------------- |
| `scb_total0`        | Display total0 (ULS/SLS indicator)    |
| `scb_total0a`       | Display total0a (SLS2 indicator)      |
| `scb_total1`        | Display total1 calculation            |
| `scb_total2`        | Display total2 calculation            |
| `scb_total2a`       | Display total2a calculation           |
| `scb_total2b`       | Display total2b calculation           |
| `scb_sfmax`         | Display maximum seismic factor         |
| `scb_apb`           | Display area per brace                |
| `scb_minbraces`     | Display minimum braces                |
| `scb_bspace`        | Display brace spacing                 |
| `scb_carea`         | Display ceiling area                  |
| `scb_pht`           | Display profile height                |
| `scb_idf`           | Display IDF value                     |
| `scb_rclearance`    | Display required clearance            |
| `scb_gridmass-txt`  | Display grid mass text                |
| `scb_luminaries`    | Display luminaries value              |
| `scb_insulation`    | Display insulation value              |
| `scb_other`         | Display other value                   |
| `scb_sls2`          | Elements shown only in SLS2 mode      |
| `scb_pheight`       | Profile height elements (initially hidden) |
| `scb_mapshow`       | Map show button/trigger               |
| `scb_errorinput`   | Error styling class for inputs         |
| `scb_errormessage` | Error styling class for messages      |

---

## Bootstrap Modal (if using Bootstrap)

| Element          | Attribute | Value              | Notes                                    |
| ---------------- | --------- | ------------------ | ---------------------------------------- |
| Download Modal  | `id`      | `scb_downloadmodal` | Bootstrap modal, listens for `show.bs.modal` event |

The modal should have a button with `data-done` attribute that triggers it.

---

## Select Options Data Attributes

### Ceiling Type (`scb_ctype`)

The select options must have:
- `data-d45` - 45 degree length value
- `data-txt` - Text identifier (1, 2, 3, or other)

---

## Element Summary by Category

### Required IDs (40+ elements)

**Inputs/Selects (13):**
1. `scb_gridmass` - Grid mass select
2. `scb_bafflespace` - Baffle space input
3. `scb_luminaries` - Luminaries input
4. `scb_insulation` - Insulation input
5. `scb_other` - Other input
6. `scb_carea` - Ceiling area input
7. `scb_zonefactor` - Zone factor select
8. `scb_insttype` - Installation type select
9. `scb_floorweight` - Floor weight select
10. `scb_ctype` - Ceiling type select (with data attributes)
11. `scb_sls2test` - SLS2 test (hidden)
12. `scb_lst` - LST (hidden)
13. `scb_projectname`, `scb_byname`, `scb_dnote` - PDF form fields

**Buttons (16):**
1. `scb_begin` - Begin button
2. `scb_st1d`, `scb_st2d` - SLS2 toggle buttons
3. `scb_st1a`, `scb_st1b`, `scb_st1c` - ULS buttons
4. `scb_st1e` - SLS button
5. `scb_st2a`, `scb_st2b`, `scb_st2c`, `scb_st2e` - Step 2 buttons
6. `scb_bbd`, `scb_bcd`, `scb_brg` - Toggle buttons
7. `scb_printit` - Print/Download button

**Containers (10):**
1. `scb_needs` - Needs section
2. `scb_results` - Results section
3. `scb_div1_1` through `scb_div1_7` - Step divisions
4. `scb_multistate` - Multi-state container
5. `scb_downloadform`, `scb_downloadresult`, `scb_downloading` - Modal elements
6. `scb_pdf`, `scb_downloadlink` - PDF elements

**Display Elements (15+):**
1. `scb_gridmass-txt`, `scb_bafflemass`, `scb_strongbackmass`, `scb_strongbackmasst`
2. `scb_zonefactor-txt`, `scb_insttype-txt`, `scb_floorweight-txt`
3. `scb_45length`, `scb_bracearm-txt`
4. `scb_apb`, `scb_minbraces`, `scb_bspace`, `scb_rclearance`
5. `scb_sf1`, `scb_sf2`, `scb_sf3`, `scb_sw`
6. `scb_imp1` - Imp1 element

**Error/Info Elements (4):**
1. `scb_baffleerror`, `scb_baffleerror2`
2. `scb_bbdi`, `scb_bcdi`, `scb_brgi`
3. `scb_mapdiv` - Map container

### Required Classes (20+)

See Classes section above for complete list.

---

## Implementation Checklist

- [ ] Create form with all input fields (IDs listed above)
- [ ] Add all select dropdowns with required data attributes
- [ ] Add all button elements with correct IDs
- [ ] Create all container divs (scb_div1_1 through scb_div1_7)
- [ ] Add results container (scb_results, initially hidden)
- [ ] Add needs container (scb_needs, initially visible)
- [ ] Add all display elements for calculated values
- [ ] Add `scb_calctxt` class to inputs that should trigger calculation
- [ ] Add display classes to result elements (e.g., `.scb_total1`, `.scb_total2`)
- [ ] Set up Bootstrap modal for downloads (if using Bootstrap)
- [ ] Add error styling classes (`scb_errorinput`, `scb_errormessage`)
- [ ] Set all initially hidden elements to display: none
- [ ] Add Google Maps iframe container (scb_mapdiv)
- [ ] Ensure ceiling type select has data-d45 and data-txt attributes on options

---

## Notes

- All hidden elements should be set to `display: none` in Webflow initially
- The `scb_bafflespace` input should validate between 0.1 and 1.0
- Ceiling type select options must include `data-d45` and `data-txt` attributes
- The download modal requires Bootstrap's modal event system (or custom implementation)
- PDF download endpoint: `/products/sesimicpdf_baffle` (POST request)
- The calculator uses `fetch` API for PDF generation (no jQuery)
- Google Maps iframe loads on first click of `.scb_mapshow` elements
- `tt` and `tt2` variables are exposed globally for calculation logic
- Ensure all numeric inputs accept decimal values

---

## API Endpoint

The PDF generation requires a POST endpoint at `/products/sesimicpdf_baffle` that accepts JSON data with all the form fields listed in the download modal section.

