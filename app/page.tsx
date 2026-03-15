"use client"

import { useState } from "react"
import {
  AlertTriangle,
  TrendingUp,
  Calendar,
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  PieChart,
  Target,
  User,
  Building,
  Briefcase,
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdvisorLayout } from "@/components/advisor-layout"
import {
  clients,
  carinaIPSData,
  carinaRTQData,
  carinaEstateData,
  profileComparisonData,
  aiSuggestedActions,
  meetingTopics,
} from "@/lib/mock-data"
import Link from "next/link"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6b7280"]

export default function ClientOverviewDashboard() {
  const [selectedClientId] = useState("carina-voss")
  const client = clients.find((c) => c.id === selectedClientId) || clients[0]

  // Prepare allocation comparison data for chart
  const allocationComparisonData = [
    {
      name: "Equity",
      IPS: carinaIPSData.targetAssetAllocation.allocations[0].targetAllocation,
      RTQ: carinaRTQData.suggestedAssetAllocation.equity,
    },
    {
      name: "Fixed Income",
      IPS: carinaIPSData.targetAssetAllocation.allocations[1].targetAllocation,
      RTQ: carinaRTQData.suggestedAssetAllocation.fixedIncome,
    },
    {
      name: "Alternatives",
      IPS: carinaIPSData.targetAssetAllocation.allocations[2].targetAllocation,
      RTQ: carinaRTQData.suggestedAssetAllocation.alternatives,
    },
    {
      name: "Cash",
      IPS: carinaIPSData.targetAssetAllocation.allocations[3].targetAllocation,
      RTQ: carinaRTQData.suggestedAssetAllocation.cash,
    },
  ]

  // Prepare pie chart data for IPS allocation
  const pieChartData = carinaIPSData.targetAssetAllocation.allocations.map((a) => ({
    name: a.assetClass,
    value: a.targetAllocation,
  }))

  const highPriorityAlerts = client.alerts.filter((a) => a.priority === "high")
  const mismatchCount = profileComparisonData.filter((p) => p.status === "mismatch").length

  return (
    <AdvisorLayout selectedClientId={selectedClientId}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Client Overview</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive view of {client.name}&apos;s financial profile and documents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Meeting
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <FileText className="w-4 h-4" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {highPriorityAlerts.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {highPriorityAlerts.length} High Priority Alert{highPriorityAlerts.length > 1 ? "s" : ""} Detected
                  </h3>
                  <div className="mt-2 space-y-1">
                    {highPriorityAlerts.map((alert) => (
                      <p key={alert.id} className="text-sm text-muted-foreground flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-destructive" />
                        {alert.description}
                      </p>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-destructive/50 text-destructive hover:bg-destructive/10">
                  Review All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="text-2xl font-semibold text-foreground mb-1">
                ${(client.totalAssets / 1000000).toFixed(2)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Assets Under Management</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {mismatchCount} Issues
                </Badge>
              </div>
              <div className="text-2xl font-semibold text-foreground mb-1">Profile Mismatch</div>
              <div className="text-sm text-muted-foreground">IPS vs RTQ discrepancies found</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-foreground mb-1">{client.documents.length}</div>
              <div className="text-sm text-muted-foreground">Documents Processed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-foreground mb-1">Apr 20</div>
              <div className="text-sm text-muted-foreground">Next Scheduled Meeting</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Profile Comparison */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Profile Comparison</CardTitle>
                    <CardDescription>IPS vs Risk Tolerance Questionnaire Analysis</CardDescription>
                  </div>
                  <Link href="/client/rtq">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileComparisonData.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {item.status === "mismatch" ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : item.status === "warning" ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{item.category}</span>
                          <Badge
                            variant={item.status === "aligned" ? "secondary" : "destructive"}
                            className={
                              item.status === "aligned"
                                ? "bg-green-100 text-green-700"
                                : item.status === "warning"
                                  ? "bg-amber-100 text-amber-700"
                                  : ""
                            }
                          >
                            {item.status === "aligned" ? "Aligned" : item.status === "warning" ? "Review" : "Mismatch"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            IPS: <span className="text-foreground">{item.ipsValue}</span>
                          </span>
                          <span className="text-muted-foreground">
                            RTQ: <span className="text-foreground">{item.rtqValue}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allocation Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Asset Allocation Comparison</CardTitle>
                <CardDescription>IPS Target vs RTQ Recommended Allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full min-h-0">
                  <ResponsiveContainer width="100%" height={320} minWidth={0}>
                    <BarChart data={allocationComparisonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 80]} stroke="#6b7280" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                      <Legend />
                      <Bar dataKey="IPS" fill="#3b82f6" name="IPS Target" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="RTQ" fill="#10b981" name="RTQ Suggested" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Account Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Account Summary</CardTitle>
                    <CardDescription>Portfolio accounts and beneficiary status</CardDescription>
                  </div>
                  <Link href="/client/ips">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View IPS <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {carinaIPSData.clientProfile.accounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{account.accountName}</p>
                          <p className="text-sm text-muted-foreground">{account.accountType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ${account.approximateValue.toLocaleString()}
                        </p>
                        <Badge
                          variant="secondary"
                          className={
                            account.beneficiaryStatus === "complete"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }
                        >
                          {account.beneficiaryStatus === "complete" ? "Beneficiary Set" : "Beneficiary Needed"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Client Profile Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Client Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Profile (IPS)</span>
                    <Badge className="bg-primary/10 text-primary">{carinaIPSData.riskTolerance}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Profile (RTQ)</span>
                    <Badge variant="secondary">{carinaRTQData.riskAssessment.riskProfile}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time Horizon (IPS)</span>
                    <span className="text-sm font-medium">{carinaIPSData.timeHorizon}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">ESG Preference</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Yes</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IPS Allocation Pie Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Target Allocation (IPS)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full min-h-0">
                  <ResponsiveContainer width="100%" height={192} minWidth={0}>
                    <RechartsPieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, ""]}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {pieChartData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggested Actions */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AI Suggestions</CardTitle>
                  <Link href="/assistant">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Ask AI <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestedActions.slice(0, 4).map((action) => (
                  <div
                    key={action.id}
                    className="p-3 rounded-lg bg-muted/50 border-l-4"
                    style={{
                      borderLeftColor:
                        action.priority === "high"
                          ? "#ef4444"
                          : action.priority === "medium"
                            ? "#f59e0b"
                            : "#6b7280",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{action.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{action.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Meeting Preparation */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Meeting Prep Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meetingTopics.slice(0, 5).map((topic, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Status */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Document Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {client.documents.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/client/${doc.type.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        doc.status === "processed"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdvisorLayout>
  )
}
