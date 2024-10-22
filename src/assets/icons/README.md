# Icons

## Guidelines for Managing Icons

### File Naming
- **Kebab Case**: Name icon files in kebab case for readability and URL compatibility.
- **Example**: `eye.svg`, `eye-slashed.svg`

### Code References
- **PascalCase**: Reference icons in the code, especially in `@/types/icon-names.ts`, using PascalCase.
- **Conversion Example**: 
   - File: `eye.svg` → Code Reference: `Eye`
   - File: `eye-slashed.svg` → Code Reference: `EyeSlashed`

### Updating Types
- Add new icon names to `@/types/icon-names.ts` following the PascalCase convention.
- After adding new icons, run the script to update icon names automatically:
  ```bash
  yarn update-icons
  ```
  OR
  ```bash
  npm run update-icon
  ```