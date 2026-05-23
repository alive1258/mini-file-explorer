# Mini File Explorer

A lightweight and responsive file explorer application built with React/Next.js, TypeScript, and Tailwind CSS. The application allows users to create, rename, delete, and manage folders/files in a hierarchical structure similar to a desktop file manager.

---

## 🚀 Live Demo

- Live URL: https://mini-file-explorer-rosy.vercel.app

---

# 📌 Features

## Folder & File Management

- Create folders and text files
- Rename folders and files
- Delete folders/files
- Recursive folder deletion support

## Navigation

- Expand/collapse folder tree
- Nested folder support
- Sidebar tree navigation
- Open folders in the main panel

## Text File Editor

- Open text files
- Edit content
- Save changes instantly

## UI & UX

- Responsive layout
- Clean and minimal interface
- Reusable components
- Optimized state management

## Data Persistence

- LocalStorage support
- Mock JSON initialization
- State persists after page refresh

---

# 🛠️ Tech Stack

| Technology         | Purpose            |
| ------------------ | ------------------ |
| React.js / Next.js | Frontend Framework |
| TypeScript         | Type Safety        |
| Tailwind CSS       | Styling            |
| LocalStorage       | Persistence        |
| Redux              | State Management   |

---

# 📂 Project Structure

```bash
mini-file-explorer/
├── src/
│   ├── app/
│   │   ├── store.ts
│   │   └── hooks.ts
│   │
│   ├── features/
│   │   └── fileSystem/
│   │       ├── fileSystemSlice.ts
│   │       └── fileSystemTypes.ts
│   │
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── FolderTree.tsx
│   │   │
│   │   ├── MainPanel/
│   │   │   ├── MainPanel.tsx
│   │   │   ├── FileItem.tsx
│   │   │   └── CreateMenu.tsx
│   │   │
│   │   ├── Modals/
│   │   │   ├── CreateItemModal.tsx
│   │   │   ├── RenameModal.tsx
│   │   │   └── TextEditorModal.tsx
│   │   │
│   │   └── common/
│   │       └── Icons.tsx
│   │
│   ├── utils/
│   │   └── localStorage.ts
│   │
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── tsconfig.node.json
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/mini-file-explorer.git
```

## 2. Navigate to Project Folder

```bash
cd mini-file-explorer
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

# 🧠 Application Architecture

## File System Data Structure

```ts
type FileSystemItem = {
  id: string;
  name: string;
  type: "folder" | "text";
  content?: string;
  children?: FileSystemItem[];
};
```

---

# 🔄 State Management

The application uses:

- React Redux
- LocalStorage synchronization

## Why Redux ?

- Centralized and predictable state management
- Simplifies handling nested folder/file structures
- Easier scalability for larger applications
- Cleaner reducer and action management
- Better debugging and maintainability
- Minimal boilerplate compared to traditional Redux

## Persistence

The file system state is synchronized with LocalStorage to ensure:

- Data persists after page refresh
- Better user experience
- No backend dependency required

---

# 🎨 UI Design Decisions

## Sidebar

- Recursive folder tree rendering
- Expand/collapse state handling
- Active folder highlighting

## Main Panel

- Displays selected folder contents
- File actions available inline
- Responsive grid/list layout

## Editor Modal

- Dedicated editor for text files
- Save/cancel support

---

# 📱 Responsive Design

The application is optimized for:

- Desktop
- Tablet
- Mobile devices

Tailwind utility classes are used extensively for responsiveness.

---

# 🧪 Core Functionalities

| Feature                  | Status |
| ------------------------ | ------ |
| Create Folder            | ✅     |
| Create Text File         | ✅     |
| Rename Item              | ✅     |
| Delete Item              | ✅     |
| Recursive Delete         | ✅     |
| Expand/Collapse          | ✅     |
| Text Editing             | ✅     |
| LocalStorage Persistence | ✅     |
| Responsive Design        | ✅     |

---

# 🧹 Code Quality

This project follows:

- Component reusability
- Clean architecture
- Separation of concerns
- Type-safe implementation
- ESLint best practices
- Readable folder structure

---

# 📝 Challenges Faced

Some implementation challenges included:

- Recursive tree rendering
- Managing deeply nested updates
- Recursive deletion handling
- Synchronizing localStorage with state
- Keeping components reusable and scalable

---

# ✅ Conclusion

This project demonstrates:

- Strong React fundamentals
- TypeScript proficiency
- Component-driven architecture
- State management understanding
- Clean UI implementation
- Scalable frontend structure

The application was designed with maintainability, readability, and user experience in mind.

---

# 👨‍💻 Author

**Your Name**  
Zamirul Kabir

- Portfolio: https://zamirul-kabir-portfolio.vercel.app/
- LinkedIn: https://www.linkedin.com/in/zamirul-kabir/

---

# 📄 License

This project is licensed under the MIT License.
