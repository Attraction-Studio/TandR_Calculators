# Testing Guide - Suspended Ceiling Calculator

## ✅ Registration Complete

The calculator has been successfully registered in `App.vue`:
- Import added
- Calculator registry updated
- Available flag set to `true`

---

## 🚀 How to Test

### 1. Start Dev Server

```bash
cd calculators-app
npm run dev
```

The app will start at `http://localhost:5173` (or similar)

### 2. Navigate to Calculator

- Click on **"Suspended Ceiling Seismic Calculator"** in the navigation
- You should see the calculator load with Step 1

---

## 🧪 Testing Checklist

### **Step 1: Limit State Selection**
- [ ] QuestionCard displays with left-right layout
- [ ] Context text visible on left
- [ ] Radio buttons work (ULS/SLS)
- [ ] Step 2 appears after selection

### **Step 2: Site Information**
- [ ] Zone factor dropdown populates (137 locations)
- [ ] Can search/select location
- [ ] Importance level dropdown works
- [ ] Floor height input accepts numbers
- [ ] Ceiling height input accepts numbers
- [ ] Step 3 appears when all filled

### **Step 3: Seismic Weight**
- [ ] Grid mass dropdown works
- [ ] Warning appears for special grid types
- [ ] Tile mass table displays correctly
- [ ] Can click row to select tile
- [ ] All weight inputs work
- [ ] **Live calculation sidebar:**
  - [ ] Total weight displays
  - [ ] Component breakdown shows
  - [ ] Updates in real-time
  - [ ] Warning shows if over 24.78 kg/m²
- [ ] Step 4 appears when grid + tile selected

### **Step 4: Grid Configuration**
- [ ] Wall construction type dropdown works
- [ ] Connection type dropdown works
- [ ] Grid type dropdown works
- [ ] Grid spacing displays correctly (auto-calculated)
- [ ] Step 5 appears when all selected

### **Step 5: Design Options**
- [ ] All 3 QuestionCards display
- [ ] **Connection location:**
  - [ ] Radio buttons work
  - [ ] Context text visible
- [ ] **Grid strengthening:**
  - [ ] Main tee radio works
  - [ ] Cross tee radio works
- [ ] **Rake angle:**
  - [ ] Radio buttons work
  - [ ] Input appears when "Yes" selected
  - [ ] Error shows if > 20 degrees
- [ ] Step 6 appears (always)

### **Step 6: Validation**
- [ ] Max main tee input works
- [ ] Max cross tee input works
- [ ] Results section appears when both filled

### **Results Section**
- [ ] Key values display correctly:
  - [ ] Seismic weight
  - [ ] Floor factor
  - [ ] Seismic force (SLS)
  - [ ] Seismic force (ULS)
- [ ] Limiting lengths display:
  - [ ] Main tee limiting length
  - [ ] Cross tee limiting length
- [ ] Pass/fail indicators:
  - [ ] Green checkmark if pass
  - [ ] Red X if fail
  - [ ] Comparison text correct
- [ ] Design recommendation:
  - [ ] Text displays
  - [ ] Color-coded (info/warning)
- [ ] Grid strengthening notes:
  - [ ] Only shows when strengthening selected
  - [ ] Distances calculated correctly

---

## 🔍 Calculation Verification

### Test Case 1: Simple Design (Should Pass)

**Inputs:**
- Limit State: ULS
- Zone: Auckland (0.13)
- Importance Level: 2
- Floor Height: 3m
- Ceiling Height: 3m
- Grid Mass: 1.1 (Main @ 1200 | Cross @ 600)
- Tile Mass: 3.5 (Mineral Fibre 600x600x15mm)
- Luminaries: 2.0
- Insulation: 1.0
- Other: 0
- Stud Type: Concrete/Masonry
- Connection Type: 31x19x0.6mm BMT
- Grid Type: Standard
- No strengthening
- Not raked
- Max Main Tee: 6m
- Max Cross Tee: 3m

**Expected Results:**
- Seismic Weight: ~9.6 kg/m²
- Floor Factor: 4.0
- Seismic Force (ULS): Should be reasonable
- Design: Should likely pass

### Test Case 2: Heavy Design (May Fail)

**Inputs:**
- Same as above but:
- Tile Mass: 13.0 (Mineral Fibre 1200x600x25mm)
- Luminaries: 5.0
- Max Main Tee: 12m
- Max Cross Tee: 8m

**Expected Results:**
- Seismic Weight: ~22.1 kg/m² (close to limit)
- Design: May fail, should recommend seismic joints

### Test Case 3: Raked Ceiling

**Inputs:**
- Same as Test Case 1 but:
- Raked: Yes
- Rake Angle: 15°

**Expected Results:**
- Limiting lengths should be adjusted
- Calculations should account for angle

---

## 🐛 Common Issues to Check

### **Console Errors**
Open browser DevTools (F12) and check for:
- [ ] No import errors
- [ ] No component errors
- [ ] No calculation errors
- [ ] No prop validation warnings

### **Styling Issues**
- [ ] All text readable
- [ ] Borders visible
- [ ] Spacing correct
- [ ] Responsive on mobile (resize browser)

### **Calculation Issues**
- [ ] Numbers format correctly (decimals)
- [ ] No NaN or Infinity values
- [ ] Zero values handled gracefully
- [ ] Negative values prevented

### **Interaction Issues**
- [ ] All inputs respond to changes
- [ ] Dropdowns open/close properly
- [ ] Radio buttons toggle correctly
- [ ] Conditional sections show/hide smoothly

---

## 📱 Responsive Testing

Test at these breakpoints:
- [ ] **Mobile:** 375px width
- [ ] **Tablet:** 768px width
- [ ] **Desktop:** 1024px+ width

Check:
- [ ] Columns stack on mobile
- [ ] Sticky sidebar works on desktop
- [ ] All text readable at all sizes
- [ ] Buttons/inputs appropriately sized

---

## ♿ Accessibility Testing

- [ ] Tab through all inputs (keyboard navigation)
- [ ] All inputs have labels
- [ ] Error messages are announced
- [ ] Focus indicators visible
- [ ] Color contrast sufficient

---

## 🎯 Performance Testing

- [ ] Initial load is fast
- [ ] Calculations are instant
- [ ] No lag when typing
- [ ] Smooth transitions
- [ ] No memory leaks (check DevTools)

---

## 📊 Comparison with Legacy

Open both calculators side-by-side:
- Legacy: `referece_html/suspended_ceiling_calculator.html`
- Modern: `http://localhost:5173` (select calculator #2)

Compare results for same inputs:
- [ ] Seismic weight matches
- [ ] Seismic forces match
- [ ] Limiting lengths match
- [ ] Design recommendations match

---

## ✅ Sign-Off Checklist

Before marking as complete:
- [ ] All steps work correctly
- [ ] All calculations verified
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Accessible
- [ ] Performance is good
- [ ] Matches legacy calculations

---

## 🚨 If You Find Issues

### Quick Fixes:

**Missing dropdown options:**
- Check data import in component
- Verify option format matches component props

**Calculations wrong:**
- Check computed property logic
- Verify function parameters
- Compare with legacy JS

**Styling broken:**
- Check Tailwind classes
- Verify Webflow classes loaded
- Check for typos in class names

**Component not showing:**
- Check conditional logic
- Verify step completion computed properties
- Check v-show/v-if conditions

---

## 📝 Notes

- The calculator uses the same formulas as the legacy version
- All data structures extracted from legacy HTML
- Pure functions ensure testable calculations
- Progressive disclosure keeps UI clean

**Ready to test!** Run `npm run dev` and start testing! 🚀
