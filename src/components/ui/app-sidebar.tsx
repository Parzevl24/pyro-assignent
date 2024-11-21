"use client";
import { useState } from "react";
import { Calendar, Home, Inbox, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Voice", id: "voice", icon: Home },
  { title: "Settings", id: "settings", icon: Settings },
  { title: "Work", id: "work", icon: Inbox },
  { title: "Others", id: "others", icon: Calendar },
];

export function AppSidebar({ onMenuSelect }: { onMenuSelect: (id: string) => void }) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
    onMenuSelect(menuId); // Notify parent component of the selected menu
  };

  return (
    <Sidebar style={{ width: "200px", borderRight: "1px solid #ddd" }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: selectedMenu === item.id ? "#f0f0f0" : "transparent",
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
