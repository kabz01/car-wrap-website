# How to Add Screenshots to README

## Quick Steps

### 1. Take Screenshots
While your development server is running at `http://localhost:3000`, take screenshots of:
- Homepage
- Car Wraps Gallery page
- Services page
- Contact page
- Dark mode version

### 2. Save Screenshots
Save your screenshots in the `public/screenshots/` folder with these names:
- `homepage.png`
- `car-wraps-gallery.png`
- `services.png`
- `contact.png`
- `dark-mode.png`

### 3. Update README.md
Replace the placeholder images in `README.md` with your actual screenshots.

**Current placeholder:**
```markdown
![Homepage](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Homepage+Screenshot)
```

**Replace with:**
```markdown
![Homepage](public/screenshots/homepage.png)
```

### 4. Commit and Push
```bash
git add public/screenshots/
git add README.md
git commit -m "Add website screenshots to README"
git push origin main
```

## Screenshot Tips

### Using Windows Snipping Tool
1. Press `Win + Shift + S`
2. Select the area to capture
3. Save from clipboard

### Using Browser DevTools
1. Open DevTools (F12)
2. Press `Ctrl + Shift + P`
3. Type "screenshot"
4. Choose "Capture full size screenshot"

### Recommended Image Sizes
- **Homepage**: 1920x1080 (full width)
- **Gallery**: 1920x1080
- **Other pages**: 1920x1080
- Compress images to reduce file size (use tinypng.com)

## Alternative: GitHub URLs
After uploading to `public/screenshots/`, use GitHub raw URLs in README:
```markdown
![Homepage](https://raw.githubusercontent.com/kabz01/car-wrap-company/main/public/screenshots/homepage.png)
```

This ensures screenshots display properly on GitHub!
