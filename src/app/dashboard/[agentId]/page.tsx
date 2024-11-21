"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { DynamicSidebar } from "@/components/ui/dynamicSidebar";
import { useState, useEffect } from "react";
import Retell from "retell-sdk";

const client = new Retell({
  apiKey: "key_0e0343c10063157f5b7a6ae01b40",
});

function AgentPage({ params }: { params: { agentId: string } }) {
  const { agentId } = params;
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [toggleTestMode, setToggleTestMode] = useState<"Test Chat" | "Test Call">("Test Chat");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("Loading...");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [llmId, setLlmId] = useState<string>("");

  // Fetch agent details on page load
  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await client.agent.retrieve(agentId);
        setAgentName(response.agent_name || "Unknown Agent");
        setType(response.response_engine.type);
        setLlmId(response.response_engine.llm_id);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      }
    };

    fetchAgentDetails();
  }, [agentId]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages((prevMessages) => [...prevMessages, chatInput]);
      setChatInput(""); // Clear the input field
    }
  };


  const handleCallButtonClick = async () => {
    alert("Call was made successfully!");
    try {
      const body = JSON.stringify({
        from_number: fromNumber,
        to_number: toNumber,
        override_agent_id: agentId,
        metadata: {},
        retell_llm_dynamic_variables: {
          customer_name: customerName,
        },
        drop_call_if_machine_detected: true,
      });

      const response = await fetch("https://api.retellai.com/create-phone-call", {
        method: "POST",
        headers: {
          Authorization: `Bearer key_0e0343c10063157f5b7a6ae01b40`,
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Call initiated successfully!");
        console.log("Call Response:", data);
      } else {
        alert(`Error initiating call: ${data.message}`);
        console.error("Call Error:", data);
      }
    } catch (err) {
      console.error("Error making call:", err);
      alert("An error occurred while initiating the call.");
    }
  };

  const handleNameChange = async (newName: string) => {
    try {
      await fetch(`/update-agent/${agentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          llm_id: llmId,
          agent_name: newName,
        }),
      });

      console.log("Agent updated");
    } catch (error) {
      console.error("Error updating agent name:", error);
    }
  };

  return (
    <SidebarProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
        {/* Top Navigation Bar */}
        <div
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "#6c63ff",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                handleNameChange(agentName); // Send request when editing stops
              }}
              style={{
                padding: "8px",
                fontSize: "20px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "300px",
                textAlign: "center",
                backgroundColor: "#fff",
                color: "#000", 
              }}
            />
          ) : (
            <h1
              onClick={() => setIsEditing(true)}
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {agentName}
            </h1>
          )}
        </div>

        <div style={{ display: "flex", flexGrow: 1 }}>
          {/* Left Sidebar */}
          <div style={{ width: "20%" }}>
            <AppSidebar onMenuSelect={setSelectedMenu} />
            <DynamicSidebar selectedMenu={selectedMenu} />
          </div>

          {/* Middle Section */}
          <div style={{ width: "60%", padding: "20px", backgroundColor: "#f9f9f9", marginLeft: "60px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label htmlFor="agentName" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                  Name
                </label>
                <input
                  id="agentName"
                  type="text"
                  placeholder="Enter agent name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
              </div>
              <div>
                <label htmlFor="agentPrompt" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                  Prompt
                </label>
                <textarea
                  id="agentPrompt"
                  placeholder="Enter a prompt"
                  rows={10}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div style={{ width: "30%", padding: "20px", backgroundColor: "#f1f1f1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <button
                onClick={() => setToggleTestMode("Test Chat")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  backgroundColor: toggleTestMode === "Test Chat" ? "#6c63ff" : "#e0e0e0",
                  color: toggleTestMode === "Test Chat" ? "#fff" : "#000",
                  borderRadius: "4px 0 0 4px",
                  cursor: "pointer",
                }}
              >
                Test Chat
              </button>
              <button
                onClick={() => setToggleTestMode("Test Call")}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  backgroundColor: toggleTestMode === "Test Call" ? "#6c63ff" : "#e0e0e0",
                  color: toggleTestMode === "Test Call" ? "#fff" : "#000",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                }}
              >
                Test Call
              </button>
            </div>
            {toggleTestMode === "Test Chat" ? (
              <div>
                <h3>Test Chat</h3>
                <div
                  style={{
                    height: "60vh",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {chatMessages.length === 0 ? (
                    <p>No messages yet.</p>
                  ) : (
                    chatMessages.map((message, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "5px 10px",
                          margin: "5px 0",
                          backgroundColor: "#f4f4f4",
                          borderRadius: "4px",
                        }}
                      >
                        {message}
                      </div>
                    ))
                  )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message"
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#6c63ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3>Test Call</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCallButtonClick();
                  }}
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <input
                    type="text"
                    placeholder="Select Phone Number"
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "10px",
                      backgroundColor: "#6c63ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Call Me
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AgentPage;
