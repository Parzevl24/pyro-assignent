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
  import { Search } from "lucide-react";
  
  // Sub-menu items for each main menu item
  const subItems = {
    voice: [
      { title: "English Voices", url: "#english", icon: Search },
      { title: "Spanish Voices", url: "#spanish", icon: Search },
      { title: "French Voices", url: "#french", icon: Search },
    ],
    settings: [
      { title: "Profile", url: "#profile", icon: Search },
      { title: "Privacy", url: "#privacy", icon: Search },
    ],
    work: [
      { title: "Projects", url: "#projects", icon: Search },
      { title: "Tasks", url: "#tasks", icon: Search },
    ],
    others: [
      { title: "Events", url: "#events", icon: Search },
      { title: "Reminders", url: "#reminders", icon: Search },
    ],
  };
  
  export function DynamicSidebar({ selectedMenu }: { selectedMenu: string | null }) {
    if (!selectedMenu || !subItems[selectedMenu]) {
      return null; // Hide the sidebar if no menu is selected
    }
  
    return (
      <Sidebar style={{ width: "200px", borderRight: "1px solid #ddd", marginLeft: "200px" }}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{selectedMenu.toUpperCase()}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {subItems[selectedMenu].map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={subItem.url}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <subItem.icon />
                        <span>{subItem.title}</span>
                      </a>
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
  