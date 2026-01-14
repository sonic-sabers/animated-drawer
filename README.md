# Nested Menu Drawer

An accessible, animated drawer component with smooth nested menu navigation built in React and TypeScript.

## ✨ Features

- 🎬 Smooth slide animations with direction awareness
- 📍 Intuitive back navigation with history management
- ⌨️ Full keyboard accessibility (Tab, Enter, Escape)
- 🎯 Complete ARIA support for screen readers
- 🎨 Modern design with hover states
- 📱 Responsive layout
- ⚡ 60fps performance optimized

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## 📖 Usage

```tsx
import { NestedDrawer } from "@/components/NestedDrawer";
import { MenuItem } from "@/types/menu";

const menuData: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    onClick: () => console.log("Home clicked"),
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    submenu: [
      {
        id: "software",
        label: "Software",
        icon: Code,
        onClick: () => console.log("Software clicked"),
      },
    ],
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Menu</button>

      <NestedDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuData={menuData}
      />
    </>
  );
}
```

## 📁 Project Structure

```
src/
├── components/
│   └── NestedDrawer.tsx       # Main component
├── types/
│   └── menu.ts                # TypeScript types
├── data/
│   └── sampleMenuData.ts      # Example data
├── utils/
│   ├── animation.ts           # Animation config
│   └── menuNavigation.ts      # Navigation logic
└── app/
    └── page.tsx               # Demo
```

## 🎨 Tech Stack

- **React 19** with TypeScript
- **Next.js 16** (App Router)
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Vaul** for drawer functionality

## ⌨️ Keyboard Navigation

| Key      | Action         |
| -------- | -------------- |
| `Tab`    | Navigate items |
| `Enter`  | Select item    |
| `Escape` | Back or close  |

## 🔧 API

### Props

| Prop       | Type         | Required |
| ---------- | ------------ | -------- |
| `isOpen`   | `boolean`    | ✅       |
| `onClose`  | `() => void` | ✅       |
| `menuData` | `MenuItem[]` | ✅       |

### MenuItem

```typescript
interface MenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: ComponentType;
  submenu?: MenuItem[];
  onClick?: () => void;
}
```

## ✅ Requirements Met

- ✅ Smooth animations between menu levels
- ✅ Intuitive back navigation
- ✅ Full keyboard accessibility
- ✅ Screen reader support
- ✅ Modern visual design
- ✅ Responsive layout
- ✅ Performance optimized
