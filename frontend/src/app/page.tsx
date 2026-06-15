interface HealthResponse {
  status: string;
  timestamp: string;
  environment: string;
}

export default async function HomePage() {
  let backendData: HealthResponse | null = null;
  let errorMsg = "";

  try {
    const apiUrl = process.env.BACKEND_INTERNAL_URL || "http://localhost:8080";
    const res = await fetch(`${apiUrl}/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch data from the backend server");
    backendData = await res.json();
  } catch (err: any) {
    console.error("SSR Error:", err.message);
    errorMsg = "Unable to establish a connection with the backend service via SSR.";
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Distributed Systems Platform</h1>
      <p>Frontend successfully initialized using <strong>SSR</strong></p>
      <hr style={{ margin: "2rem auto", maxWidth: "600px", border: "0", borderTop: "1px solid #ccc" }} />
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        {errorMsg ? (
          <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
        ) : (
          <div style={{ background: "#e8f5e9", padding: "1.5rem", borderRadius: "8px", border: "1px solid #c8e6c9" }}>
            <h2 style={{ marginTop: 0, color: "#2e7d32" }}>Data retrieved via Docker internal network:</h2>
            <p><strong>Java Status:</strong> {backendData?.status}</p>
            <p><strong>Server Time:</strong> {backendData?.timestamp}</p>
            <p><strong>Environment:</strong> {backendData?.environment}</p>
          </div>
        )}
      </div>
    </main>
  );
}