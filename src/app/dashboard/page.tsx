"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Retell from "retell-sdk";

const client = new Retell({
  apiKey: "key_0e0343c10063157f5b7a6ae01b40", // Use environment variable
});

function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Fetch agent data when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Fetch agents (API response expected to be an array of agent objects)
        const agentResponse = await client.agent.list();

        console.log(agentResponse); // Log the response for debugging

        // Update state with fetched data
        setAgents(agentResponse); // Set agents directly from the response
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [currentPage]); // Re-fetch data whenever `currentPage` changes

  const handlePageChange = (page) => {
    if (page > 0) {
      setCurrentPage(page);
    }
  };

  const handleAgentClick = (agentId) => {
    router.push(`/dashboard/${agentId}`); // Navigate to dynamic route
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        padding: "20px",
      }}
    >
      {/* Agent List */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {agents.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {agents.map((agent) => (
              <li
                key={agent.agent_id}
                onClick={() => handleAgentClick(agent.agent_id)}
                style={{
                  padding: "15px",
                  margin: "10px 0",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {agent.agent_name || "Unnamed Agent"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading agents...</p>
        )}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              1
            </PaginationLink>
            <PaginationLink href="#" onClick={() => handlePageChange(2)}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={agents.length < 1} // Disable if no agents
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Dashboard;
