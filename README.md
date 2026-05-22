# 🛒 E-Commerce Products Page

A modern, full-featured e-commerce products page built with **React 19**, **TanStack Start**, **TypeScript**, and **Tailwind CSS v4**. Designed for performance, scalability, and a polished UI using shadcn/ui components.

---

## ✨ Features

- 📦 Product listing page with responsive grid layout
- 🔍 Product filtering and search functionality
- 🛍️ Product detail views with image carousels
- 🧩 Fully componentized UI using shadcn/ui (Radix UI primitives)
- 📱 Mobile-first responsive design with Tailwind CSS
- ⚡ Lightning-fast development with Vite + Bun
- ☁️ Cloudflare-ready deployment via Wrangler

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) + [React 19](https://react.dev/) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| UI Components | shadcn/ui (Radix UI) |
| Routing | TanStack Router |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Build Tool | Vite 7 |
| Package Manager | Bun |
| Deployment | Cloudflare Workers (via Wrangler) |

---

## 📁 Project Structure

```
E-COMMERCE-PRODUCTS-PAGE/
├── src/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── routes/             # TanStack Router file-based routes
│   └── ...
├── components.json         # shadcn/ui configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
├── bunfig.toml             # Bun configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- Node.js 18+ (for compatibility)

### Installation

```bash
# Clone the repository
git clone https://github.com/DeepakGaut/E-COMMERCE-PRODUCTS-PAGE.git

# Navigate into the project directory
cd E-COMMERCE-PRODUCTS-PAGE

# Install dependencies
bun install
```

### Development

```bash
bun run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
# Production build
bun run build

# Development build
bun run build:dev

# Preview the production build locally
bun run preview
```

---

## 🧹 Code Quality

```bash
# Lint the codebase
bun run lint

# Format code with Prettier
bun run format
```

---

## ☁️ Deployment

This project is configured for deployment to **Cloudflare Workers** using the `@cloudflare/vite-plugin` and Wrangler.

```bash
# Deploy to Cloudflare
bunx wrangler deploy
```

Ensure you have a Cloudflare account and are authenticated via `bunx wrangler login` before deploying.

---

## 📦 Key Dependencies

- **@tanstack/react-router** — File-based, type-safe routing
- **@tanstack/react-query** — Server state management and data fetching
- **@tanstack/react-start** — Full-stack React meta-framework
- **Radix UI** — Headless, accessible UI primitives
- **react-hook-form + zod** — Form handling with schema validation
- **embla-carousel-react** — Product image carousel
- **recharts** — Data visualization
- **sonner** — Toast notifications
- **lucide-react** — Icon library
- **date-fns** — Date formatting utilities

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for details.

---

## 👤 Author

**Deepak Gautam**  
GitHub: [@DeepakGaut](https://github.com/DeepakGaut)
