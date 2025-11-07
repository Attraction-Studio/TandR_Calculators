# Test Cases - Suspended Ceiling Calculator

Quick reference test cases to verify calculations match legacy version.

---

## Test Case 1: Basic Design (Auckland, IL2, Standard Grid)

### Inputs
```
Limit State: ULS
Zone: Auckland (0.13)
Importance Level: 2
Floor Height: 3.0m
Ceiling Height: 3.0m

Grid Mass: 1.1 (Main @ 1200 | Cross @ 600)
Tile Mass: 3.5 (Mineral Fibre 600x600x15mm)
Luminaries: 2.0 kg/m²
Insulation: 1.0 kg/m²
Other: 0.5 kg/m²

Stud Type: Concrete/Masonry
Connection Type: 31x19x0.6mm BMT
Grid Type: Standard

Specify Connection: No
Strengthen Main: No
Strengthen Cross: No
Raked: No

Max Main Tee: 6.0m
Max Cross Tee: 3.0m
```

### Expected Results
```
Seismic Weight: 10.1 kg/m²
Floor Factor: 4.0
Seismic Force (ULS): ~5.32 kgf/m²
Limiting Main Tee: ~13.4m
Limiting Cross Tee: ~6.7m
Result: PASS (both tees within limits)
```

---

## Test Case 2: Wellington High Seismic (IL3, Heavy Tiles)

### Inputs
```
Limit State: ULS
Zone: Wellington (0.4)
Importance Level: 3
Floor Height: 6.0m
Ceiling Height: 3.0m

Grid Mass: 1.1
Tile Mass: 8.6 (Mineral Fibre 1200x600x19mm)
Luminaries: 3.0 kg/m²
Insulation: 2.0 kg/m²
Other: 1.0 kg/m²

Stud Type: Concrete/Masonry
Connection Type: 31x19x0.6mm BMT
Grid Type: Standard

Specify Connection: No
Strengthen Main: No
Strengthen Cross: No
Raked: No

Max Main Tee: 8.0m
Max Cross Tee: 4.0m
```

### Expected Results
```
Seismic Weight: 18.7 kg/m²
Floor Factor: 5.0
Seismic Force (ULS): Higher due to Wellington zone + IL3
Limiting lengths: Shorter due to higher forces
Result: May require seismic joints or strengthening
```

---

## Test Case 3: Raked Ceiling (15 degrees)

### Inputs
```
Same as Test Case 1, but:
Raked: Yes
Rake Angle: 15°
```

### Expected Results
```
Limiting Main Tee: Reduced by ~3.5% (cos 15° adjustment)
Limiting Cross Tee: Unchanged (rake only affects main)
```

---

## Test Case 4: Grid Strengthening

### Inputs
```
Same as Test Case 1, but:
Strengthen Main: Yes
Max Main Tee: 15.0m
```

### Expected Results
```
Limiting Main Tee: Increased (only limited by tee capacity)
Strengthening Distance: ~1.6m from fixed edge
Result: Should pass with strengthening note
```

---

## Test Case 5: Maximum Weight (Edge Case)

### Inputs
```
Limit State: ULS
Zone: Auckland (0.13)
Importance Level: 2
Floor Height: 3.0m
Ceiling Height: 3.0m

Grid Mass: 1.6 (600x600 grid)
Tile Mass: 13.0 (Mineral Fibre 1200x600x25mm)
Luminaries: 5.0 kg/m²
Insulation: 2.0 kg/m²
Other: 0.2 kg/m²

Stud Type: Concrete/Masonry
Connection Type: 31x19x0.6mm BMT
Grid Type: Standard

Max Main Tee: 6.0m
Max Cross Tee: 3.0m
```

### Expected Results
```
Seismic Weight: 24.8 kg/m² (just over limit!)
Warning: "Seismic weight exceeds maximum (24.78 kg/m²)"
Calculator should still work but show warning
```

---

## Test Case 6: Specify Connection Location

### Inputs
```
Same as Test Case 1, but:
Specify Connection: Yes
```

### Expected Results
```
Limiting Main Tee: Increased by 3.0m
(e.g., if was 13.4m, now 16.4m)
```

---

## Test Case 7: Steel Stud Construction

### Inputs
```
Same as Test Case 1, but:
Stud Type: Steel Stud
```

### Expected Results
```
Connection capacity changes
Limiting lengths may be different
(Steel stud typically has higher capacity)
```

---

## Test Case 8: Heavy Duty Grid

### Inputs
```
Same as Test Case 1, but:
Grid Type: Heavy Duty
```

### Expected Results
```
Grid capacity increases
Limiting lengths increase
More likely to pass
```

---

## Test Case 9: Maximum Rake Angle

### Inputs
```
Same as Test Case 1, but:
Raked: Yes
Rake Angle: 20°
```

### Expected Results
```
Limiting Main Tee: Reduced by ~6% (cos 20°)
No error (20° is maximum allowed)
```

---

## Test Case 10: Excessive Rake Angle (Should Error)

### Inputs
```
Same as Test Case 1, but:
Raked: Yes
Rake Angle: 25°
```

### Expected Results
```
Error message: "Maximum allowable ceiling rake is 20° from horizontal..."
Calculator should show error but not crash
```

---

## Quick Verification Steps

For each test case:

1. **Enter all inputs** in the calculator
2. **Check intermediate values:**
   - Seismic weight displays correctly
   - Grid spacing shows correct values
   - Step completion works
3. **Check final results:**
   - Seismic forces calculated
   - Limiting lengths displayed
   - Pass/fail indicators correct
   - Recommendation text appropriate
4. **Compare with legacy:**
   - Open legacy calculator
   - Enter same inputs
   - Verify results match (within rounding)

---

## Automated Testing (Future)

These test cases can be converted to unit tests:

```javascript
describe('Suspended Ceiling Calculator', () => {
  test('Test Case 1: Basic Design', () => {
    const weight = calculateSeismicWeight({
      gridMass: 1.1,
      tileMass: 3.5,
      luminaries: 2.0,
      insulation: 1.0,
      other: 0.5,
      deadLoad: 3.0,
    });
    expect(weight).toBeCloseTo(10.1, 1);
  });
  
  // ... more tests
});
```

---

## Notes

- All calculations should match legacy within ±0.1 due to rounding
- Pass/fail logic should be identical
- Recommendation text should be similar (wording may vary slightly)
- Edge cases (max weight, max angle) should be handled gracefully

**Use these test cases to verify the calculator works correctly!** ✅
