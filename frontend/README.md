# TailAdmin Pro - Vue (v2.2)

[TailAdmin](https://tailadmin.com) is a modern, responsive, and customizable admin dashboard template built using Tailwind CSS and Vue.js. It is designed to help developers build beautiful and functional dashboards quickly and easily.

## Quick Links

- [✨ Visit Website](https://tailadmin.com)
- [📄 Documentation](https://tailadmin.com/docs)
- [⬇️ Download](https://tailadmin.com/download)
- [🌐 Live Site](https://nextjs-demo.tailadmin.com)

## Installation

### Prerequisites

To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)
- Recommended IDE Setup: [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

#### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

This template should help get you started developing with Vue 3 in Vite.

### Getting started

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Production build:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Update Logs

### Version 2.2.3 - [January 12, 2026]

- Removed vue-kanban package to eliminate security vulnerabilities
- Fixed TypeScript build errors in ApexCharts components
- Added proper type assertions for ApexCharts configuration options
- Resolved all npm audit vulnerabilities (0 vulnerabilities)
- Improved type safety across chart components

### Version 2.2.2 - [Dec 29, 2025]

- Added Date Picker in Statistics Chart

### Version 2.2.1 - [October 08, 2025]

- Update Tooltip design and use floating-ui/vue for better usability
- Update Popover design and use floating-ui/vue for better usability
- Fixed reported minor bugs and UI issues

### Version 2.2.0 - [July 30, 2025]

- Fixed reported minor bugs and UI issues
- Updated packages

#### 🧭 **Logistics Dashboard** – _Added_

- Redesigned logistics dashboard interface
- Delivery activity table
- Delivery tracking timeline
- Total revenue earned chart

#### 🛍️ **E-commerce Pages** – _Added_

- **Products**:

  - Product list table
  - Add product form

- **Invoices**:

  - Invoice list table
  - Single invoice view
  - View invoice modal
  - Create invoice form

- **Transactions**:

  - Transaction list table
  - Single transaction detail view

#### 🧠 **AI Assistant Suite (New App Example)** – _Newly Added_

- Text generator
- Image generator
- Code generator
- Video generator

#### 🔑 **API Key Management** – _Newly Added_

- API key dashboard
- API key table view
- Add API key modal

#### 🔌 **Integrations (Pages)** – _Newly Added_

- Integration cards UI
- Integration details modal
- Add integration modal
- Integration settings modal
- Delete integration confirmation modal

### ⚙️ **Support (New App Example)** – _Newly Added_

- Support ticket list page
- Support ticket reply interface

#### 📊 **Charts & Visuals** - _Improved_

- New bar chart design added

---

### Version 2.1.1 - [Jun 02, 2025]

#### Update Overview

- Basic Table 3 Dropdown (cropped) update

### Version 2.1.0 - [March 10, 2025]

#### Update Overview

- Added new dashboard design for saas product.
- New Metrics card
- Product performance tab with charts

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to Tailwind CSS v4 for better performance and efficiency.
- Updated class usage to match the latest syntax and features.
- Replaced deprecated class and optimized styles.

#### Next Steps

- Run npm install or yarn install to update dependencies.
- Check for any style changes or compatibility issues.
- Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
- This update keeps the project up to date with the latest Tailwind improvements. 🚀

### Version 2.0.0 - [February 2025]

Major update with Vue 3 migration and comprehensive redesign.

#### Major Improvements

- Complete migration to Vue 3 Composition API
- Updated to Vue Router 4
- Enhanced user interface with new Vue 3 components
- Improved performance with Vue 3's virtual DOM
- Better accessibility and responsive design

#### New Features

- Redesigned dashboards (Ecommerce, Analytics, Marketing, CRM)
- Collapsible sidebar with Vue 3 integration
- Enhanced navigation with Vue Router 4
- Real-time chat functionality
- Full-featured calendar with drag-and-drop
- Advanced table components
- Updated data visualization with ApexCharts

#### Breaking Changes

- Requires Vue 3 and Vue Router 4
- Chart components migrated to ApexCharts for Vue 3
- Modified routing implementation
- Updated component APIs for Vue 3 compatibility

[Read more](https://tailadmin.com/docs/update-logs/vue) on this release.

### Version 1.0.2 - [June 19, 2024]

- Fix Mobile Menu Hamburger Icon issue.

### Version 1.0.1 - [Feb 08, 2024]

#### Enhancements

- Make it functional [Multiselect Dropdown/Form Elements].
- Delete SelectGroup Components then create a SelectGroup folder and create two files under this
  folder SelectGroupOne.vue SelectGroupTwo.vue [Select Group/Form Elements & Layout].
- Update style.css file.

### Version 1.0.0 - Initial Release - [Jan 22, 2024]

- Initial release of TailAdmin Vue.

## License

Refer to our [LICENSE](https://tailadmin.com/license) page for more information.
