ok# Frontend Responsiveness Plan

## Information Gathered:
- The project is a React application with multiple pages (HomePage, DonorLogin, DonorHome, ReceiverLogin, etc.)
- Main CSS files: index.css, App.css, styles.css
- Components use both inline styles and Bootstrap classes
- Critical issue: Fixed negative margins (e.g., -812px, -1300px) that break on mobile

## Plan:

### 1. Create Responsive CSS (App.css)
- Add media queries for mobile/tablet breakpoints
- Add responsive utility classes

### 2. Fix HomePage.jsx
- Replace fixed pixel margins with Bootstrap grid/flex classes
- Use responsive text alignment
- Fix carousel height for mobile

### 3. Fix DonorHome.jsx  
- Replace fixed negative margins with responsive alternatives
- Make navbar responsive with toggle button

### 4. Fix DonorLogin.jsx
- Add responsive padding and margins
- Ensure form is usable on mobile

### 5. Fix ReceiverLogin.jsx
- Adjust carousel and card for mobile
- Ensure proper spacing

### 6. Fix Footer.jsx (if needed)
- Make footer responsive

## Files to be edited:
1. rclient/src/App.css - Add responsive styles
2. rclient/src/components/HomePage.jsx - Fix layout
3. rclient/src/components/donors/DonorHome.jsx - Fix layout  
4. rclient/src/components/donors/DonorLogin.jsx - Add responsive styles
5. rclient/src/components/receivers/ReceiverLogin.jsx - Add responsive styles

## Followup steps:
- Test the changes by running the development server
- Verify all pages work on mobile viewport

