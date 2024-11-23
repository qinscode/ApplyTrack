"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import { useEffect, useState } from "react";

type NavItem = {
  title: string;
  url: string;
  icon: React.ReactElement;
  isActive?: boolean;
  rightElement?: React.ReactNode;
  items?: {
    title: string;
    url: string;
    icon?: React.ReactElement;
  }[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    items.forEach((item) => {
      initialState[item.title] = item.isActive || false;
    });
    setOpenItems(initialState);
    setMounted(true);
  }, [items]);

  const handleItemClick = (item: NavItem) => {
    if (!item.items?.length) {
      window.location.href = item.url;
      return;
    }
    setOpenItems(prev => ({
      ...prev,
      [item.title]: !prev[item.title],
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[0.93rem] font-medium">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            open={openItems[item.title]}
            onOpenChange={(isOpen) => {
              if (item.items?.length) {
                setOpenItems(prev => ({
                  ...prev,
                  [item.title]: isOpen,
                }));
              }
            }}
          >
            <SidebarMenuItem className="py-0.5">
              <SidebarMenuButton
                className="text-[0.93rem] font-medium"
                tooltip={item.title}
                onClick={() => handleItemClick(item)}
              >
                {React.cloneElement(item.icon, { size: 18, stroke: 1.5 })}
                <span>{item.title}</span>
                {item.rightElement}
              </SidebarMenuButton>

              {item.items?.length && (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <IconChevronRight size={18} stroke={1.5} />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="space-y-1">
                      {item.items?.map(subItem => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className="px-1 py-0.5"
                        >
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="text-[0.93rem] font-medium">
                              {subItem.icon && React.cloneElement(subItem.icon, { size: 18, stroke: 1.5 })}
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
