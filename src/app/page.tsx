"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #6c63ff, #a4508b)",
        color: "#fff",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20vh",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          This Assignment is by Priyansu Kumar
        </h1>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            color: "#fff",
            backgroundColor: "#ff6f61",
            border: "none",
            borderRadius: "30px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#ff3d3d";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#ff6f61";
          }}
        >
          Go to Dashboard
        </button>
      </div>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          padding: "1rem",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)",
          color: "#fff",
          fontSize: "1rem",
        }}
      >
        <p style={{ margin: 0 }}>Thank you for giving me the opportunity</p>
      </footer>
    </div>
  );
}
