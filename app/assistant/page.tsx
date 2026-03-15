"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import {
  Send,
  User,
  Bot,
  Sparkles,
  FileText,
  AlertTriangle,
  Target,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AdvisorLayout } from "@/components/advisor-layout"
import { useClient } from "@/lib/client-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const { currentClient, ipsData, rtqData, estateData, profileComparison, aiSuggestions, meetingTopics } = useClient()
  
  // Dynamic suggested questions based on client
  const suggestedQuestions = useMemo(() => [
    `What risks should I discuss with ${currentClient.name}?`,
    `What investment recommendations might fit ${currentClient.name.split(' ')[0]}'s profile?`,
    `Are there inconsistencies between ${currentClient.name.split(' ')[0]}'s RTQ and IPS?`,
    "What topics should I bring up in the next meeting?",
    "How should I address the concentrated stock position?",
    "What estate planning items need immediate attention?",
  ], [currentClient.name])

  // Get mismatches from profile comparison
  const mismatches = profileComparison.filter((p) => p.status === "mismatch")
  const highPriorityAlerts = currentClient.alerts.filter((a) => a.priority === "high")

  // Dynamic AI response generator
  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    const firstName = currentClient.name.split(' ')[0]

    if (lowerQuestion.includes("risk") && lowerQuestion.includes("discuss")) {
      const riskMismatch = profileComparison.find(p => p.category === "Risk Tolerance")
      const timeMismatch = profileComparison.find(p => p.category === "Time Horizon")
      const returnMismatch = profileComparison.find(p => p.category === "Return Target")
      
      return `Based on ${currentClient.name}'s documents, here are the key risks to discuss:

**1. Risk Profile ${riskMismatch?.status === "mismatch" ? "Mismatch" : "Alignment"}**
The IPS indicates a **${ipsData.riskTolerance}** profile, ${riskMismatch?.status === "mismatch" 
  ? `but the RTQ assessment suggests a different profile. This discrepancy needs attention.` 
  : `which aligns with the RTQ assessment.`}

**2. Time Horizon ${timeMismatch?.status === "mismatch" ? "Discrepancy" : "Alignment"}**
- IPS assumes: **${ipsData.timeHorizon}** investment horizon
- RTQ indicates: **${rtqData.investmentPreferences?.timeHorizon?.selected || "Similar"} timeframe**

**3. Return Expectations ${returnMismatch?.status === "mismatch" ? "Gap" : "Alignment"}**
- IPS targets: **${ipsData.returnGoal?.split(" ")[0] || "Target"} returns**
- RTQ shows client expects: **${rtqData.investmentPreferences?.returnExpectation?.selected || "Similar"} returns**

**Recommended Discussion Points:**
- Clarify ${firstName}'s true risk tolerance and comfort level with market volatility
- Review retirement timeline and income needs
- Discuss investment expectations and market realities`
    }

    if (lowerQuestion.includes("inconsistencies") || lowerQuestion.includes("mismatch") || (lowerQuestion.includes("rtq") && lowerQuestion.includes("ips"))) {
      const mismatchRows = profileComparison.map(item => 
        `| ${item.category} | ${item.ipsValue} | ${item.rtqValue} | ${item.status === "mismatch" ? "⚠️ Mismatch" : "✓ Aligned"} |`
      ).join('\n')

      return `I've analyzed the discrepancies between ${currentClient.name}'s RTQ and IPS documents:

**Profile Comparison:**

| Category | IPS | RTQ | Status |
|----------|-----|-----|--------|
${mismatchRows}

${mismatches.length > 0 ? `**${mismatches.length} Mismatch(es) Detected**

**Recommended Actions:**
1. Schedule a dedicated meeting to reconcile these differences
2. Re-administer the RTQ if the IPS was created first
3. Document the client's verbal confirmation of preferred approach
4. Consider a middle-ground allocation as a compromise` : `**All profiles are aligned!**

No significant discrepancies found between ${firstName}'s IPS and RTQ documents.`}`
    }

    if (lowerQuestion.includes("meeting") || lowerQuestion.includes("topics")) {
      const topicsList = meetingTopics.map((topic, i) => `${i + 1}. ${topic}`).join('\n')
      
      return `Here are the recommended topics for your next meeting with ${currentClient.name}:

**Meeting Agenda:**

${topicsList}

**Priority Items:**
${highPriorityAlerts.length > 0 
  ? highPriorityAlerts.map(a => `- ⚠️ ${a.title}: ${a.description}`).join('\n')
  : '- No high-priority items requiring immediate attention'}

**Suggested Meeting Flow:**
1. Review any urgent alerts first
2. Discuss profile alignment questions
3. Review investment performance
4. Address estate planning items
5. Set action items and next steps`
    }

    if (lowerQuestion.includes("investment") && lowerQuestion.includes("recommendation")) {
      const allocations = ipsData.targetAssetAllocation?.allocations || []
      const allocationStr = allocations.map(a => 
        `- **${a.assetClass}**: ${a.targetAllocation}% (Range: ${a.allowableMin}-${a.allowableMax}%)`
      ).join('\n')

      return `Based on ${currentClient.name}'s profile, here are investment recommendations:

**Current Target Allocation (from IPS):**
${allocationStr}

**Key Investment Considerations:**
${ipsData.advisorNotes?.slice(0, 3).map(note => `- **${note.title}**: ${note.content.substring(0, 150)}...`).join('\n') || '- Review IPS for detailed notes'}

**Next Steps:**
1. Review current holdings against target allocation
2. Identify rebalancing opportunities
3. Consider tax implications of any changes
4. Document rationale for any deviations`
    }

    if (lowerQuestion.includes("estate") || lowerQuestion.includes("beneficiary")) {
      const incompleteItems = estateData.documentsNeeded?.filter(d => d.status === "pending" || d.status === "incomplete") || []
      const actionItems = estateData.actionItems?.slice(0, 3) || []

      return `Here's the estate planning status for ${currentClient.name}:

**Personal Information:**
- Marital Status: ${estateData.personalInformation?.maritalStatus || "N/A"}
- State of Residence: ${estateData.personalInformation?.stateOfResidence || "N/A"}

**Power of Attorney:**
- Primary: ${estateData.powerOfAttorney?.primary || "Not designated"}
- Alternate: ${estateData.powerOfAttorney?.alternate || "Not designated"}

**Documents Needing Attention:**
${incompleteItems.length > 0 
  ? incompleteItems.map(d => `- ⚠️ ${d.document} (${d.priority} priority)`).join('\n')
  : '- All estate documents are complete'}

**Pending Action Items:**
${actionItems.map(a => `- ${a.action} (${a.status})`).join('\n')}

**Tax Exemption Note:**
${estateData.taxExemption?.substring(0, 200) || "Review estate documents for details"}...`
    }

    // Default response
    return `Based on my analysis of ${currentClient.name}'s documents, here's what I found:

**Client Overview:**
- Total Assets: $${(currentClient.totalAssets / 1000000).toFixed(2)}M
- Risk Profile (IPS): ${ipsData.riskTolerance}
- Time Horizon: ${ipsData.timeHorizon}
- Next Meeting: ${currentClient.nextMeeting}

**Key Alerts:**
${currentClient.alerts.slice(0, 3).map(a => `- ${a.priority === "high" ? "⚠️" : "ℹ️"} ${a.title}`).join('\n') || '- No current alerts'}

**Documents on File:**
- Investment Policy Statement (IPS)
- Risk Tolerance Questionnaire (RTQ)
- Estate Planning Worksheet

Would you like me to elaborate on any specific aspect of ${firstName}'s financial profile?`
  }

  // Initial message based on current client
  const getInitialMessage = (): Message => ({
    id: "1",
    role: "assistant",
    content: `Hello! I'm your AI Advisor Assistant. I have access to ${currentClient.name}'s financial documents including their IPS, RTQ, and Estate Planning Worksheet.

I've identified several key insights:
${mismatches.length > 0 ? `- **Profile Discrepancies**: ${mismatches.length} mismatch(es) found between IPS and RTQ` : '- **Profiles Aligned**: IPS and RTQ are consistent'}
${highPriorityAlerts.length > 0 ? `- **${highPriorityAlerts.length} High Priority Alert(s)**: ${highPriorityAlerts[0]?.title}` : '- **No urgent alerts**'}
- **Total AUM**: $${(currentClient.totalAssets / 1000000).toFixed(2)}M

How can I help you prepare for your next client meeting?`,
    timestamp: new Date(),
  })

  const [messages, setMessages] = useState<Message[]>([getInitialMessage()])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset messages when client changes
  useEffect(() => {
    setMessages([getInitialMessage()])
  }, [currentClient.id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateAIResponse(input),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <AdvisorLayout>
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Advisor Assistant</CardTitle>
                    <CardDescription>Ask questions about {currentClient.name}&apos;s financial profile</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setMessages([getInitialMessage()])}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Chat
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder={`Ask about ${currentClient.name.split(' ')[0]}'s documents, risks, or recommendations...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {question.length > 40 ? question.substring(0, 40) + "..." : question}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4 hidden xl:block">
          {/* Document Context */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Document Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentClient.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <span className="text-sm">{doc.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {doc.status === "processed" ? "Ready" : doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Key Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentClient.alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-2 rounded-lg text-sm ${
                    alert.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {alert.title}
                </div>
              ))}
              {currentClient.alerts.length === 0 && (
                <div className="p-2 rounded-lg text-sm bg-muted/50 text-muted-foreground">
                  No current alerts
                </div>
              )}
            </CardContent>
          </Card>

          {/* Priority Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Priority Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.slice(0, 3).map((action) => (
                <div
                  key={action.id}
                  className="p-3 rounded-lg bg-muted/50 border-l-4"
                  style={{
                    borderLeftColor:
                      action.priority === "high"
                        ? "hsl(var(--destructive))"
                        : action.priority === "medium"
                        ? "hsl(45 93% 47%)"
                        : "hsl(var(--muted-foreground))",
                  }}
                >
                  <div className="text-sm font-medium">{action.action}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {action.category}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <ChevronRight className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdvisorLayout>
  )
}
