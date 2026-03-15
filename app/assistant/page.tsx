"use client"

import { useState, useRef, useEffect } from "react"
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

const suggestedQuestions = [
  "What risks should I discuss with Carina?",
  "What investment recommendations might fit her profile?",
  "Are there inconsistencies between her RTQ and IPS?",
  "What topics should I bring up in the next meeting?",
  "How should I address the concentrated stock position?",
  "What estate planning items need immediate attention?",
]

// Mock AI responses based on keywords
const generateAIResponse = (question: string): string => {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes("risk") && lowerQuestion.includes("discuss")) {
    return `Based on Carina Voss's documents, here are the key risks to discuss:

**1. Risk Profile Mismatch**
The IPS indicates a **Moderately Aggressive** profile (75% equity), but the RTQ assessment suggests a **Moderately Conservative** profile (40% equity). This is the most significant discrepancy that needs immediate attention.

**2. Concentrated Stock Position**
Carina holds approximately **$85,000 in Acme Technologies** employer stock, representing ~7% of her portfolio. This concentration risk should be addressed with a diversification strategy.

**3. Time Horizon Discrepancy**
- IPS assumes a **20+ year** investment horizon
- RTQ indicates she may retire in **7-8 years**

This affects asset allocation and withdrawal planning significantly.

**4. Return Expectations Gap**
- IPS targets **7-9%** annual returns
- RTQ shows client expects only **3-5%**

This expectation mismatch should be reconciled.

**Recommended Discussion Points:**
- Clarify her true risk tolerance and comfort level with market volatility
- Discuss her reaction to the hypothetical 20% loss scenario
- Review retirement timeline and income needs`
  }

  if (lowerQuestion.includes("inconsistencies") || lowerQuestion.includes("mismatch") || (lowerQuestion.includes("rtq") && lowerQuestion.includes("ips"))) {
    return `I've analyzed the discrepancies between Carina's RTQ and IPS documents:

**Critical Mismatches Detected:**

| Category | IPS | RTQ | Status |
|----------|-----|-----|--------|
| Risk Tolerance | Moderately Aggressive | Moderately Conservative | ⚠️ Mismatch |
| Time Horizon | 20+ Years | 5-10 Years | ⚠️ Mismatch |
| Return Target | 7-9% | 3-5% | ⚠️ Mismatch |
| Equity Allocation | 75% | 40% | ⚠️ Mismatch |
| Fixed Income | 15% | 50% | ⚠️ Mismatch |

**Aligned Items:**
- ESG Preference: Both documents confirm preference for ESG investments
- Concentrated Stock: Both note the $85K Acme Technologies position

**Recommended Actions:**
1. Schedule a dedicated meeting to reconcile these differences
2. Re-administer the RTQ if the IPS was created first
3. Document the client's verbal confirmation of preferred approach
4. Consider a middle-ground allocation (e.g., Moderate profile) as a compromise`
  }

  if (lowerQuestion.includes("meeting") || lowerQuestion.includes("topics")) {
    return `Here are the recommended topics for your next meeting with Carina Voss:

**Priority 1: Risk Profile Reconciliation**
- Review the RTQ vs IPS discrepancy
- Discuss her true comfort level with market volatility
- Clarify investment philosophy and goals

**Priority 2: Retirement Planning**
- Clarify retirement timeline (7-8 years vs 20+ years)
- Discuss income needs in retirement
- Review withdrawal strategy options

**Priority 3: Estate Planning**
- Update beneficiary designations (all 3 accounts pending)
- Discuss establishing a Revocable Living Trust
- Name POA and healthcare agents

**Priority 4: Portfolio Management**
- Review concentrated Acme Technologies position
- Discuss tax-efficient diversification strategy
- Confirm ESG investment preferences

**Priority 5: Expectations Alignment**
- Address return expectations (7-9% vs 3-5%)
- Review market outlook and historical returns
- Set realistic performance benchmarks

**Meeting Preparation Checklist:**
□ Print comparison report (IPS vs RTQ)
□ Prepare beneficiary designation forms
□ Draft diversification proposals for employer stock
□ Review current portfolio performance`
  }

  if (lowerQuestion.includes("investment") && lowerQuestion.includes("recommendation")) {
    return `Based on Carina's profile and the discrepancies identified, here are investment recommendations:

**If Following RTQ (Moderately Conservative):**
- 40% Equity (diversified, ESG-focused)
- 50% Fixed Income (investment-grade bonds)
- 7% Alternatives (REITs, commodities)
- 3% Cash

**If Following IPS (Moderately Aggressive):**
- 75% Equity (growth-oriented, ESG)
- 15% Fixed Income
- 8% Alternatives
- 2% Cash

**Recommended Compromise (Moderate Profile):**
- 55-60% Equity
- 30-35% Fixed Income
- 5-8% Alternatives
- 2-3% Cash

**Specific Recommendations:**
1. **Address Concentrated Stock**: Implement a systematic diversification plan for Acme Technologies over 12-24 months to manage tax impact
2. **ESG Focus**: Prioritize ESG-aligned funds like ESGU, SUSA, or VSGX
3. **Fixed Income**: Given potential early retirement, consider building a bond ladder for income stability
4. **Tax Efficiency**: Keep growth assets in Roth IRA, income-generating assets in Traditional IRA

**Key Consideration:** Before implementing any changes, reconcile the risk profile with the client to ensure alignment.`
  }

  if (lowerQuestion.includes("concentrated") || lowerQuestion.includes("stock") || lowerQuestion.includes("acme")) {
    return `Regarding Carina's concentrated position in Acme Technologies:

**Current Situation:**
- Position Value: ~$85,000
- Portfolio Percentage: ~7.1%
- Location: Taxable brokerage account
- Treatment: Domestic Large Cap equivalent per IPS

**Risks:**
1. Single-stock concentration risk
2. Correlation with employment income
3. Potential for significant capital gains tax on sale

**Recommended Strategies:**

**Option 1: Systematic Sale (Conservative)**
- Sell 10-15% of position quarterly
- Spread capital gains over multiple tax years
- Estimated timeline: 2-3 years

**Option 2: Exchange Fund (Tax-Efficient)**
- Pool concentrated shares with other investors
- Defer capital gains
- Achieve immediate diversification

**Option 3: Charitable Giving**
- Donate appreciated shares to qualified charity
- Avoid capital gains tax
- Receive charitable deduction (aligns with Legacy Goals)

**Option 4: Covered Calls**
- Generate income while holding
- Establish sale price targets
- Gradually reduce position

**Tax Considerations:**
- Current unrealized gains likely significant
- Coordinate with tax-loss harvesting elsewhere
- Consider timing around year-end

**Recommendation:** Implement a combination of systematic sales and charitable giving, aligned with Carina's Legacy Goals investment objective.`
  }

  if (lowerQuestion.includes("estate") || lowerQuestion.includes("beneficiary")) {
    return `Here's the estate planning status for Carina Voss:

**Immediate Actions Required:**

**1. Beneficiary Designations (Critical)**
All three accounts lack beneficiaries:
- Fidelity Traditional IRA ($480,000) - ⚠️ Needs designation
- Fidelity Roth IRA ($220,000) - ⚠️ Needs designation
- Individual Brokerage ($500,000) - ⚠️ Needs TOD designation

**2. Power of Attorney**
- Financial POA: Not designated
- Healthcare Agent: Not designated
- As a single individual, this is especially critical

**3. Documents Needed (High Priority)**
- Last Will and Testament
- Revocable Living Trust (recommended given $1.2M estate)
- Advance Medical Directive
- Durable General POA

**Tax Considerations:**
- Estate is well below federal exemption ($15M for 2026)
- No federal estate tax concern
- Roth IRA provides tax-free inheritance option

**Recommended Next Steps:**
1. Complete beneficiary forms for all accounts (client can do directly with Fidelity)
2. Schedule meeting with estate attorney
3. Name executor, POA agent, and healthcare agent
4. Discuss Revocable Living Trust benefits

**Key Benefit of Trust:**
Given Carina's $1.2M portfolio and single status, a Revocable Living Trust would:
- Avoid probate
- Provide privacy
- Enable management during potential incapacity
- Facilitate smooth asset transfer`
  }

  // Default response
  return `Based on my analysis of Carina Voss's documents, here's what I found:

**Client Overview:**
- Total AUM: $1.2 million across 3 accounts
- Risk Profile: Discrepancy between IPS (Moderately Aggressive) and RTQ (Moderately Conservative)
- Key Concern: Profile mismatch requires reconciliation

**Key Insights:**
1. ${aiSuggestedActions[0].action}
2. ${aiSuggestedActions[1].action}
3. ${aiSuggestedActions[2].action}

**Documents Analyzed:**
- Investment Policy Statement (IPS)
- Risk Tolerance Questionnaire (RTQ)
- Estate Planning Worksheet

Would you like me to elaborate on any specific aspect of Carina's financial profile?`
}

export default function AIAssistantPage() {
  const { currentClient, ipsData, rtqData, estateData, profileComparison, aiSuggestions, meetingTopics } = useClient()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! I'm your AI Advisor Assistant. I have access to Carina Voss's financial documents including her IPS, RTQ, and Estate Planning Worksheet.

I've identified several key insights:
- **Risk Profile Mismatch**: IPS suggests Moderately Aggressive, but RTQ indicates Moderately Conservative
- **Beneficiary Designations Incomplete**: All 3 accounts need beneficiary updates
- **Concentrated Stock Position**: $85K in employer stock requires attention

How can I help you prepare for your next client meeting?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

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
                    <CardDescription>Ask questions about Carina Voss&apos;s financial profile</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])}>
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
                      <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <p className={`text-xs mt-2 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
                  placeholder="Ask about Carina's documents, risks, or recommendations..."
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
                <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="px-6">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Suggested Questions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2 px-3 text-sm font-normal"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <MessageSquare className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="line-clamp-2">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
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
                        ? "#ef4444"
                        : action.priority === "medium"
                          ? "#f59e0b"
                          : "#6b7280",
                  }}
                >
                  <p className="text-xs font-medium text-foreground line-clamp-2">{action.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{action.category}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Document Context */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Document Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">IPS</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Loaded</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">RTQ</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Loaded</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estate Plan</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Loaded</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Key Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Key Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 rounded bg-red-50 border border-red-200">
                <p className="text-xs text-red-700">Risk profile mismatch detected</p>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-700">Beneficiary designations incomplete</p>
              </div>
              <div className="p-2 rounded bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-700">Time horizon discrepancy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdvisorLayout>
  )
}
