import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute role="STUDENT">
      <main style={{ padding: "24px" }}>
        <h1>Student Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </main>
    </ProtectedRoute>
  );
}