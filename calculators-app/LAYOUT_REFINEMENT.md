# Layout Refinement - Suspended Ceiling Calculator

## 🎯 Goal
Match the original calculator's layout and content structure while maintaining modern Vue architecture.

---

## 📋 Original Calculator Structure

Based on the reference screenshots and markdown files:

### **Layout Pattern:**
```
┌─────────────────────────────────────────────────────────┐
│                    MAIN CONTENT (2/3)                   │  SIDEBAR (1/3)
│                                                         │  ┌──────────────┐
│  Educational Content                                    │  │ LIVE CALCS   │
│  - Long explanatory text                               │  │              │
│  - Multiple sections with headings                     │  │ T: ULS       │
│  - Lists and detailed information                      │  │ Sw: 10.1     │
│                                                         │  │ Sf: 5.32     │
│  ┌─────────────────────────────────────────────┐      │  │ Lmt: 13.4m   │
│  │ PROMINENT QUESTION BOX                      │      │  │ ...          │
│  │                                             │      │  │              │
│  │ Question text here...                       │      │  │ (Sticky)     │
│  │                                             │      │  └──────────────┘
│  │ [Input/Selection UI]                        │      │
│  │                                             │      │
│  └─────────────────────────────────────────────┘      │
│                                                         │
│  More educational content...                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🆕 New Components Created

### **1. QuestionBox.vue**
A prominent, styled container for questions within the content flow.

**Features:**
- Border and background to stand out
- Optional title
- Contains the actual input/selection UI
- Embedded naturally in the content

**Usage:**
```vue
<QuestionBox title="Does any part create a life safety hazard?">
  <p>Hazards include...</p>
  <RadioGroup v-model="answer" :options="options" />
</QuestionBox>
```

### **2. CalculationSidebar.vue**
A sticky sidebar for live calculation readout.

**Features:**
- Sticky positioning (follows scroll)
- Border and title
- Shows live calculation values
- Updates as user progresses

**Usage:**
```vue
<CalculationSidebar>
  <div>T - Limit State Type: {{ limitState }}</div>
  <div>Sw - Seismic Weight: {{ weight }} kg/m²</div>
</CalculationSidebar>
```

---

## 📐 New Layout Structure

### **Grid System:**
```vue
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <!-- Main Content: 2/3 width -->
  <div class="lg:col-span-2">
    <h2>Step Title</h2>
    
    <!-- Educational content -->
    <div class="prose">
      <h3>Section 1</h3>
      <p>Long explanatory text...</p>
      
      <h3>Section 2</h3>
      <p>More information...</p>
      
      <!-- Prominent question box -->
      <QuestionBox title="Question?">
        <RadioGroup />
      </QuestionBox>
      
      <InfoBox>Additional notes...</InfoBox>
    </div>
  </div>
  
  <!-- Sidebar: 1/3 width -->
  <div class="lg:col-span-1">
    <CalculationSidebar>
      <!-- Live calculations -->
    </CalculationSidebar>
  </div>
</div>
```

---

## ✅ Step 1 Refactored

### **Content Added:**
- ✅ Full "What is limit state design?" explanation
- ✅ SLS1 description
- ✅ SLS2 description with risk warning
- ✅ ULS description with bullet points
- ✅ Life safety hazard question with examples
- ✅ Supplemental NZS 1170.5 information
- ✅ Operational requirements note

### **Layout:**
- ✅ 2/3 main content column
- ✅ 1/3 calculation sidebar
- ✅ Prominent question box for limit state selection
- ✅ InfoBox for additional notes
- ✅ Proper heading hierarchy

### **Calculation Sidebar:**
Currently shows:
- T - Limit State Type (live updates)
- Placeholder for future calculations

---

## 🎨 Visual Improvements

### **Question Box Styling:**
```css
- Border: 2px solid black
- Background: Light gray (bg-gray-50)
- Padding: 1.5rem
- Margin: 2rem vertical
- Title: Bold, uppercase tracking
```

### **Calculation Sidebar:**
```css
- Border: 2px solid black
- Background: White
- Padding: 1.5rem
- Position: Sticky (top: 1rem)
- Title with bottom border
```

### **Typography:**
- Main headings: text-3xl font-bold
- Section headings: text-xl font-semibold
- Body text: paragraph-18px (Webflow class)
- Lists: Proper spacing and indentation

---

## 📱 Responsive Behavior

### **Desktop (lg+):**
- 2/3 + 1/3 column layout
- Sidebar sticky on scroll
- Full content width

### **Mobile/Tablet:**
- Single column stack
- Sidebar below content
- Full width elements

---

## 🔄 Comparison

### **Before (QuestionCard):**
```
┌─────────────────────────────────────────┐
│ CONTEXT (Left)    │    ANSWER (Right)   │
│                   │                     │
│ Explanation...    │  [Input UI]         │
│                   │                     │
└─────────────────────────────────────────┘
```

### **After (New Layout):**
```
┌────────────────────────────┐  ┌──────────┐
│ MAIN CONTENT               │  │ SIDEBAR  │
│                            │  │          │
│ Long educational text...   │  │ T: ULS   │
│                            │  │ Sw: -    │
│ ┌────────────────────────┐ │  │ Sf: -    │
│ │ QUESTION BOX           │ │  │          │
│ │ [Input UI]             │ │  │ (Sticky) │
│ └────────────────────────┘ │  │          │
│                            │  │          │
│ More content...            │  │          │
└────────────────────────────┘  └──────────┘
```

---

## 📝 Content Source

All content for Step 1 taken from:
- `Reference-copy/suspended_ceiling_calculator/page-3.md`

Calculation sidebar structure from:
- `Reference-copy/suspended_ceiling_calculator/Right-Column-Readout.md`

---

## 🚀 Next Steps

### **Immediate:**
1. Test Step 1 in browser
2. Verify layout on mobile/desktop
3. Check calculation sidebar stickiness

### **Then:**
4. Refactor Step 2 with page-2.md content
5. Add remaining steps with proper content
6. Populate calculation sidebar with live values
7. Add images where referenced (IMAGE 1, IMAGE 2, etc.)

---

## 💡 Key Benefits

### **1. Better Content Presentation**
- Educational content flows naturally
- Not split into left/right columns
- Easier to read and understand

### **2. Prominent Questions**
- Questions stand out visually
- Embedded in context
- Clear call-to-action

### **3. Live Feedback**
- Sticky sidebar always visible
- Shows calculations as they update
- Matches original calculator UX

### **4. Professional Feel**
- Matches original layout intent
- Modern, clean design
- Responsive and accessible

---

## 🎯 Design Philosophy

**Original Approach (QuestionCard):**
- Good for simple Q&A
- Left-right split
- Minimal content

**New Approach (Content + QuestionBox):**
- Better for educational content
- Natural reading flow
- Prominent question boxes
- Sticky calculation feedback
- **Matches original calculator structure**

---

## ✅ Status

- [x] QuestionBox component created
- [x] CalculationSidebar component created
- [x] Step 1 refactored with full content
- [x] Layout matches original structure
- [ ] Test in browser
- [ ] Add remaining steps
- [ ] Populate calculation sidebar
- [ ] Add images

**Ready for testing!** 🎉
