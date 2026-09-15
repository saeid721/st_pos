# Bundle & Loading Performance Optimization

This build preserves the existing React UI, routes, API contracts, business logic, and project structure while reducing initial JavaScript through route-level and feature-level code splitting.

## Changes
- Converted admin/store page route component imports to `React.lazy()` so pages load only when their route is opened.
- Added lightweight `React.Suspense` loading fallbacks to route wrappers.
- Lazy-loaded dashboard chart modules so Recharts is not required in the dashboard shell chunk.
- Lazy-loaded the store dashboard module from the dashboard page.
- Moved `jspdf` and `jspdf-autotable` to dynamic imports so PDF generation libraries load only when a PDF is generated.

## Validation
Run on the target Windows environment:

```powershell
npm install
npm run lint
npm run build
npm run dev
```

Then verify the main initial chunk and route chunks in `dist/assets` and test login, navigation, dashboard, reports, PDF export, charts, and responsive layouts.
