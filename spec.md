# AI Tools Directory

## Current State
- Backend: Motoko with Tool type (id, name, description, category, websiteUrl, logoEmoji, dateAdded)
- Backend APIs: getAllTools, getToolById, getSimilarTools, getToolsByCategory, searchTools, getLatestTools, addTool, addPendingTool, getCategories
- Frontend: React + TanStack Router with routes: /, /categories, /tool/$toolId, /category/$slug, SEO pages, /news-feed
- Tool detail page shows hero info and similar tools
- Navbar has Home, Categories, and Guides dropdown

## Requested Changes (Diff)

### Add
- New `/compare` page: ComparisonPage with two tool selector dropdowns and a comparison table
- Comparison table rows: Price, Features, Rating, Ease of Use (static curated data per-tool, frontend only)
- "Compare" button/link on tool detail pages and tool cards that pre-selects that tool as Tool A
- Navbar entry for "Compare Tools" 
- A static comparison data map in the frontend keyed by tool name/id with price, features (list), rating (0–5), ease of use (0–5)

### Modify
- App.tsx: add /compare route
- Navbar.tsx: add "Compare" link to desktop nav and mobile menu

### Remove
- Nothing

## Implementation Plan
1. Create ComparisonPage.tsx with:
   - Two searchable select dropdowns to pick Tool A and Tool B from all tools
   - Static comparison metadata per tool (price tier, features list, rating, ease of use score)
   - Comparison table with row headers: Price, Key Features, Rating, Ease of Use
   - Visual indicators (badges, star ratings, check icons) for each attribute
   - "Add to Compare" entry point from URL query params (?toolA=id&toolB=id) for deep linking
   - Empty/partial state UI when 0 or 1 tool selected
2. Add comparisonRoute to App.tsx
3. Add "Compare" link to Navbar desktop + mobile menus
4. Add "Compare" button on ToolDetailPage linking to /compare?toolA={toolId}
