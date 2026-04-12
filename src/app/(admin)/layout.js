// src/app/(admin)/layout.js
import { AuthProvider } from "../../context/AuthContext"; // Ensure this path is correct

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black">
        {/* The AuthProvider now protects all pages inside (admin) */}
        {children}
      </div>
    </AuthProvider>
  );
}
