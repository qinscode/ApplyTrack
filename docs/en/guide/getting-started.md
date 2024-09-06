# Getting Started

## Installation

### Prerequisites

- Node.js: v20.12.2 or higher
- pnpm: v9.1.0 or higher

### Clone the repository

```bash
git clone https://github.com/TinsFox/shadcnui-boilerplate.git
```

### Install dependencies

```bash
cd shadcnui-boilerplate
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## File Structure

```bash
.
├── .dockerignore
├── .editorconfig
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── README-zh_CN.md
├── CONTRIBUTING.md
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── assets/
│   │   ├── logo/
│   │   │   ├── eslint.svg
│   │   │   └── faker.svg
│   │   └── stories/
│   │       └── assets/
│   │           └── tutorials.svg
│   ├── components/
│   ├── constants/
│   │   └── index.ts
│   ├── global.d.ts
│   ├── i18n/
│   │   └── locales/
│   │       └── zh-CN.json
│   ├── lib/
│   │   └── route-builder.ts
│   ├── pages/
│   │   ├── (admin)/
│   │   │   └── (with-layout)/
│   │   │       └── list/
│   │   │           ├── data/
│   │   │           │   ├── schema.ts
│   │   │           │   └── tasks.json
│   │   │           └── index.tsx
│   │   └── (main)/
│   │       └── index.tsx
│   ├── styles/
│   │   ├── dev.css
│   │   └── tailwind.css
│   └── stories/
│       └── Configure.mdx
└── .storybook/
    └── main.ts
```

Root Directory: Contains essential configuration files and documentation.

- Dockerfile: Instructions for building a Docker image for the project.
- **README.md**: Overview and instructions for the project.
- **package.json**: Lists dependencies and scripts for the project.
- **tsconfig.json**: TypeScript configuration file.
- **vite.config.ts**: Configuration for Vite, the build tool.
- **src/**: Main source code directory.
- **assets/**: Contains images and SVG files used in the project.
- **components/**: Placeholder for reusable UI components.
- **constants/**: Holds constant values and configurations.
- **global.d.ts**: Type definitions for global variables.
- **i18n/**: Internationalization files for localization.
- **lib/**: Utility functions and libraries.
- **pages/**: Contains page components, organized by routes.
- **styles/**: CSS files for styling the application.
- **stories/**: Storybook files for developing and testing UI components.
- **.storybook/**: Configuration for Storybook, a tool for developing UI components in isolation.


## What's Next?

- To learn more about shadcn/ui, please refer to the [official documentation](https://ui.shadcn.com/docs).
- To create a new page, please refer to the [routing guide](./routing.md).
- Once your app is ready for production, please refer to the [deploy guide](./deploy.md).

> [!IMPORTANT]
> [FAQ](./faq.md)
