# Design Refinement - Cleaner Layout

## ✅ Changes Made

### **1. Cleaner Component Styling**

#### **QuestionBox.vue**
- ❌ Removed: Heavy 2px border
- ✅ Kept: Background color (bg-gray-50) for separation
- ✅ Updated: Cleaner typography (text-lg font-semibold)
- **Result:** Less "boxed" feel, more integrated with content

#### **CalculationSidebar.vue**
- ❌ Changed: 2px borders → 1px borders
- ✅ Kept: Clean structure and sticky positioning
- **Result:** Lighter, more refined appearance

---

### **2. Introduction Pages Added**

#### **Page 1: Introduction (Step 1)**
Content from `page-1.md`:
- T&R Seismic Calculator overview
- Importance of seismic compliance
- Usage notes and disclaimers
- "You Will Need..." checklist
- Copyright notice

**Layout:**
- Max-width: 4xl (readable content width)
- No sidebar (informational page)
- Clean typography hierarchy
- InfoBox for copyright

#### **Page 2: Design Methods (Step 2)**
Content from `page-2.md`:
- Introduction to seismic design approaches
- **1. Perimeter Fixing**
  - Explanation
  - Pros/Cons in side-by-side cards
- **2. Back Bracing**
  - Explanation
  - Pros/Cons in side-by-side cards
- Rigid hangers alternative

**Layout:**
- Max-width: 4xl
- No sidebar (informational page)
- Pros/Cons in clean gray boxes
- Grid layout for comparison

---

### **3. Updated Wizard Structure**

#### **New Step Flow:**
```
Step 1: Introduction (info page)
Step 2: Design Methods (info page)
Step 3: Limit State Selection (calculator starts)
Step 4: Site Information
Step 5: Seismic Weight
Step 6: Grid Configuration
Step 7: Design Options
Step 8: Validation
Step 9: Results
```

**Total Steps:** 9 (was 7)

#### **Progress Bar:**
- Shows all 9 steps
- First 2 steps always proceed (no validation)
- Steps 3-8 require completion
- Step 9 shows results

---

### **4. Visual Design Philosophy**

Following the **Ceiling Components Estimator** approach:

#### **Before (Heavy):**
```
┌──────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← 2px borders
│ ▓ CONTENT              ▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└──────────────────────────┘
```

#### **After (Clean):**
```
─────────────────────────── ← 1px lines
  CONTENT (bg color only)
───────────────────────────
```

**Key Changes:**
- 1px borders instead of 2px
- Background colors for separation
- No full boxes around questions
- Cleaner typography
- More whitespace
- Tighter, more considered design

---

### **5. Typography Refinement**

#### **Headings:**
- Page titles: `text-4xl font-bold`
- Section headings: `text-2xl font-semibold`
- Subsections: `text-xl font-semibold`
- Question titles: `text-lg font-semibold`

#### **Body Text:**
- Main content: `paragraph-18px` (Webflow class)
- Small text: `text-sm`
- Lists: Proper spacing with `space-y-2`

#### **Spacing:**
- Section gaps: `space-y-6`
- Vertical rhythm: `my-8`
- Consistent padding: `p-6` or `p-4`

---

### **6. Layout Patterns**

#### **Info Pages (Steps 1-2):**
```vue
<div class="max-w-4xl">
  <h2>Page Title</h2>
  <div class="prose space-y-6">
    <!-- Content -->
  </div>
</div>
```

#### **Calculator Pages (Steps 3-8):**
```vue
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">
    <!-- Main content -->
  </div>
  <div class="lg:col-span-1">
    <CalculationSidebar>
      <!-- Live calculations -->
    </CalculationSidebar>
  </div>
</div>
```

#### **Results Page (Step 9):**
```vue
<div class="border-t border-brand-black pt-8">
  <!-- Full width results -->
</div>
```

---

### **7. Pros/Cons Cards**

Clean comparison layout for design methods:

```vue
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-gray-100 p-4">
    <h4 class="font-semibold mb-2">Pros</h4>
    <ul class="list-disc pl-5 space-y-1 text-sm">
      <li>Benefit 1</li>
      <li>Benefit 2</li>
    </ul>
  </div>
  <div class="bg-gray-100 p-4">
    <h4 class="font-semibold mb-2">Cons</h4>
    <ul class="list-disc pl-5 space-y-1 text-sm">
      <li>Drawback 1</li>
      <li>Drawback 2</li>
    </ul>
  </div>
</div>
```

**Features:**
- Side-by-side comparison
- Light gray background
- Clean typography
- Easy to scan

---

## 🎨 Design Comparison

### **Ceiling Components Estimator Style:**
- Minimal borders (1px)
- Clean spacing
- Background colors for separation
- No heavy boxes
- Professional, modern feel

### **New Suspended Ceiling Calculator:**
- ✅ Matches minimal border approach
- ✅ Uses background colors effectively
- ✅ Clean typography hierarchy
- ✅ Consistent spacing
- ✅ Professional appearance

---

## 📱 Responsive Behavior

### **Desktop (lg+):**
- Info pages: Centered, max-width 4xl
- Calculator pages: 2/3 + 1/3 grid
- Sidebar sticky on scroll
- Pros/Cons side-by-side

### **Mobile/Tablet:**
- Single column stack
- Full width content
- Sidebar below main content
- Pros/Cons stack vertically

---

## ✅ Checklist

- [x] Remove heavy 2px borders
- [x] Change to 1px borders
- [x] Keep background colors for separation
- [x] Add page-1.md content (Introduction)
- [x] Add page-2.md content (Design Methods)
- [x] Update wizard to 9 steps
- [x] Update progress bar
- [x] Update canProceed logic
- [x] Clean typography
- [x] Pros/Cons comparison cards
- [x] Match Ceiling Components Estimator style

---

## 🚀 Result

A **cleaner, more professional design** that:
- Provides educational context before calculator
- Uses subtle visual separation
- Avoids "over-boxed" appearance
- Matches the gold standard (Ceiling Components Estimator)
- Maintains excellent readability
- Guides users through the process

**The calculator now has a refined, considered design!** ✨
