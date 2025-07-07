# React Table Interface Project

## Project Overview

This project aimed to replicate an Excel/Google Sheets-like table interface with dynamic functionalities using modern front-end technologies.

## Key Features Implemented

### Framework & Setup
- Initialized the project using **Vite** for faster development and hot module reloading.
- Integrated **Tailwind CSS** via `tailwindcss` and `@tailwindcss/vite` for utility-first styling.
- Installed and configured **@tanstack/react-table** to handle dynamic data grids.

### Code Organization
- Created modular and reusable components:
  - `Table_structure.tsx`: Manages the core table layout and interaction logic.
  - `column.tsx` and `columnConfig.tsx`: Define custom column types and configurations.
- Separated the **Ribbon** into two parts:
  - **Upper Ribbon**: Includes navigation and file options with a file-specific action bubble.
  - **Tool Ribbon**: Hosts table tools including sort functionality and action buttons.

### UI/UX Enhancements
- **Pixel-perfect UI**: Emphasis on matching design precision.
- **User Bubble**: Shows settings and logout options.
- Added interaction logs for every UI button (ensuring no "dead" UI elements).

##  Challenges Faced

1. **Sorting Issue**  
   - Current sorting is based on row index rather than column values.This limited accurate sorting by content.

2. **Complex Documentation**  
   - React Table (TanStack) has a vast and detailed documentation set which required more time to understand and planning before implementation.

3. **Keyboard Navigation**  
   - Implementing arrow key navigation between cells proved complex and is still a pending enhancement.

## Learning Outcomes
- Learned to plan and debug UI behaviors with precision, especially with keyboard and sorting interactions.

## Suggestions for Improvement
 Fix the sorting function .
-
- Add arrow key navigation by tracking focused cells.

