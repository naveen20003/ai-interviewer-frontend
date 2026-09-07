import ProtectedRoute from "@/components/protected-route";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}