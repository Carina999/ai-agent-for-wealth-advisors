"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  Home,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronDown,
  ArrowRight,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { clients } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AdvisorLayoutProps {
  children: React.ReactNode
  selectedClientId?: string
  onClientChange?: (clientId: string) => void
}

const navigation = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Assistant", href: "/assistant", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AdvisorLayout({ children, selectedClientId = "carina-voss", onClientChange }: AdvisorLayoutProps) {
  const pathname = usePathname()
  const [currentClientId, setCurrentClientId] = useState(selectedClientId)
  
  const currentClient = clients.find((c) => c.id === currentClientId) || clients[0]
  const alertCount = currentClient.alerts.filter((a) => a.priority === "high").length

  const handleClientChange = (clientId: string) => {
    setCurrentClientId(clientId)
    onClientChange?.(clientId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">WA</span>
            </div>
            <span className="font-semibold text-foreground">Wealth Advisor</span>
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          
          {/* Client Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 min-w-[200px] justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {currentClient.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{currentClient.name}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[240px]">
              <DropdownMenuLabel>Select Client</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {clients.map((client) => (
                <DropdownMenuItem
                  key={client.id}
                  onClick={() => handleClientChange(client.id)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {client.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${(client.totalAssets / 1000000).toFixed(1)}M AUM
                    </p>
                  </div>
                  {client.id === currentClientId && (
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search clients, documents..."
              className="pl-10 w-80 bg-muted/50 border-border focus:bg-background"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>James Davidson</DropdownMenuLabel>
              <p className="px-2 pb-2 text-xs text-muted-foreground">Senior Wealth Advisor</p>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 border-r border-border bg-background h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
          <div className="p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search..." className="pl-10 bg-muted/50 border-border text-sm" />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6"
              >
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center w-full justify-start px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Client Quick Links */}
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Client Documents
              </h3>
              <nav className="space-y-1">
                <Link
                  href="/client/ips"
                  className={cn(
                    "flex items-center w-full justify-start px-3 py-2 rounded-md text-sm transition-colors",
                    pathname === "/client/ips"
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  IPS Dashboard
                </Link>
                <Link
                  href="/client/rtq"
                  className={cn(
                    "flex items-center w-full justify-start px-3 py-2 rounded-md text-sm transition-colors",
                    pathname === "/client/rtq"
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  RTQ Dashboard
                </Link>
                <Link
                  href="/client/estate"
                  className={cn(
                    "flex items-center w-full justify-start px-3 py-2 rounded-md text-sm transition-colors",
                    pathname === "/client/estate"
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Estate Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-muted/30 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}
