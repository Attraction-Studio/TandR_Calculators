# Webflow Elements Reference - Ceiling Components Estimator

This document lists all required element attributes and IDs for the `ceiling_components_estimator.js` calculator to function correctly in Webflow.

## Prefix Convention

All elements use the `cce_` prefix (Ceiling Components Estimator).

---

## Form Elements (Webflow Forms)

### Input Fields

| Element        | Attribute | Value               | Type        | Notes                      |
| -------------- | --------- | ------------------- | ----------- | -------------------------- |
| Length Input   | `id`      | `cce_length`        | number/text | Required                   |
| Width Input    | `id`      | `cce_width`         | number/text | Required                   |
| Variance Input | `id`      | `cce_varianceInput` | number      | Readonly, used for display |

### Radio Button Options

| Element                   | Attribute | Value        | Notes       |
| ------------------------- | --------- | ------------ | ----------- |
| Option 1 (1200mm x 600mm) | `name`    | `cce_opts`   | Required    |
|                           | `id`      | `cce_opts_1` | Recommended |
|                           | `value`   | `1`          | Required    |
| Option 2 (600mm x 600mm)  | `name`    | `cce_opts`   | Required    |
|                           | `id`      | `cce_opts_2` | Recommended |
|                           | `value`   | `2`          | Required    |

### Change Handler Class

Add the class `cce_ch` to the following elements to hide results when changed:

- Length input (`cce_length`)
- Width input (`cce_width`)
- Both radio button options

---

## Button Elements

| Element          | Attribute | Value       | Type          | Notes    |
| ---------------- | --------- | ----------- | ------------- | -------- |
| Calculate Button | `id`      | `cce_calc`  | button/submit | Required |
| Variance Down    | `id`      | `cce_vdown` | button        | Required |
| Variance Up      | `id`      | `cce_vup`   | button        | Required |

---

## Display Elements (Regular Blocks)

### Results Container

| Element         | Attribute | Value         | Notes                                     |
| --------------- | --------- | ------------- | ----------------------------------------- |
| Results Section | `id`      | `cce_results` | Initially hidden, shown after calculation |

### Area Display

| Element    | Attribute | Value      | Notes                    |
| ---------- | --------- | ---------- | ------------------------ |
| Area Value | `id`      | `cce_area` | Displays calculated area |

### Result Fields (Visible)

| Element               | Attribute | Value     | Notes                       |
| --------------------- | --------- | --------- | --------------------------- |
| Tile Type Label       | `id`      | `cce_r1`  | Shows tile type description |
| Tile Quantity         | `id`      | `cce_r2`  | Number of tiles             |
| Component Quantity 1  | `id`      | `cce_r3`  | Component quantity          |
| Component Quantity 2  | `id`      | `cce_r4`  | Component quantity          |
| Component Quantity 3  | `id`      | `cce_r6`  | Component quantity          |
| Component Quantity 4  | `id`      | `cce_r7`  | Component quantity          |
| Component Quantity 4a | `id`      | `cce_r7a` | Only shown for 600mm tiles  |
| Component Quantity 5  | `id`      | `cce_r8`  | Perimeter calculation       |

### Hidden Result Fields (For Variance Calculations)

These elements store the base values and should be hidden in Webflow (display: none or visibility: hidden).

| Element              | Attribute | Value      | Notes  |
| -------------------- | --------- | ---------- | ------ |
| Hidden Tile Type     | `id`      | `cce_zr1`  | Hidden |
| Hidden Tile Quantity | `id`      | `cce_zr2`  | Hidden |
| Hidden Component 1   | `id`      | `cce_zr3`  | Hidden |
| Hidden Component 2   | `id`      | `cce_zr4`  | Hidden |
| Hidden Component 3   | `id`      | `cce_zr6`  | Hidden |
| Hidden Component 4   | `id`      | `cce_zr7`  | Hidden |
| Hidden Component 4a  | `id`      | `cce_zr7a` | Hidden |
| Hidden Component 5   | `id`      | `cce_zr8`  | Hidden |

### Conditional Display Element

| Element         | Attribute | Value     | Notes                             |
| --------------- | --------- | --------- | --------------------------------- |
| Conditional Row | `class`   | `cce_ct2` | Shown only for 600mm tiles option |

---

## Element Summary by Category

### Required IDs (13 total)

1. `cce_length` - Length input
2. `cce_width` - Width input
3. `cce_calc` - Calculate button
4. `cce_results` - Results container
5. `cce_area` - Area display
6. `cce_r1`, `cce_r2`, `cce_r3`, `cce_r4`, `cce_r6`, `cce_r7`, `cce_r7a`, `cce_r8` - Result displays (8 elements)
7. `cce_zr1`, `cce_zr2`, `cce_zr3`, `cce_zr4`, `cce_zr6`, `cce_zr7`, `cce_zr7a`, `cce_zr8` - Hidden result fields (8 elements)
8. `cce_varianceInput` - Variance input field
9. `cce_vdown` - Variance down button
10. `cce_vup` - Variance up button

### Required Classes (2 total)

1. `cce_ch` - Applied to inputs that trigger results hiding
2. `cce_ct2` - Conditional display element (shown/hidden based on tile option)

### Required Name Attribute (1 total)

1. `cce_opts` - Radio button group name

---

## Implementation Checklist

- [ ] Create form with length and width inputs (IDs: `cce_length`, `cce_width`)
- [ ] Add radio button options for tile size (name: `cce_opts`, values: `1` and `2`)
- [ ] Add calculate button (ID: `cce_calc`)
- [ ] Create results container (ID: `cce_results`, initially hidden)
- [ ] Add area display element (ID: `cce_area`)
- [ ] Add all result display elements (IDs: `cce_r1`, `cce_r2`, `cce_r3`, `cce_r4`, `cce_r6`, `cce_r7`, `cce_r7a`, `cce_r8`)
- [ ] Add hidden result elements (IDs: `cce_zr1`, `cce_zr2`, `cce_zr3`, `cce_zr4`, `cce_zr6`, `cce_zr7`, `cce_zr7a`, `cce_zr8`)
- [ ] Add variance controls (IDs: `cce_varianceInput`, `cce_vdown`, `cce_vup`)
- [ ] Add conditional display element (class: `cce_ct2`, initially hidden)
- [ ] Add `cce_ch` class to length, width inputs, and radio buttons
- [ ] Set all hidden elements (`cce_zr*`) to display: none in Webflow

---

## Notes

- All hidden elements (`cce_zr*`) should be set to `display: none` in Webflow
- The results container (`cce_results`) should be initially hidden
- The conditional element (`cce_ct2`) should be initially hidden
- Variance input should be set to readonly in Webflow
- Ensure all numeric inputs accept decimal values
- Radio buttons should have one option pre-selected (default to value `1`)
- r5 is not used in the calculator and was commented out in the code, have kept ordering of elements the same as the original code.
- Box quantity displays (b6, b7, b7a) were commented out in the original code and are not used.
