export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "250px", background: "#f4f4f4", padding: "1rem" }}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <strong>Navigation</strong>
          <a href="/dashboard">Dashboard</a>
          <a href="/users">Users</a>
          <a href="/settings">Settings</a>
        </nav>
      </aside>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
