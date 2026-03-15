// Mock data for TIAA Wealth Advisor CRM Dashboard
// Based on Carina Voss client documents

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  advisor: string
  status: "active" | "pending" | "inactive"
  totalAssets: number
  lastMeeting: string
  nextMeeting: string
  documents: Document[]
  alerts: Alert[]
}

export interface Document {
  id: string
  name: string
  type: "IPS" | "RTQ" | "Estate" | "Tax" | "Other"
  uploadedAt: string
  status: "processed" | "processing" | "pending"
  extractedData?: Record<string, unknown>
}

export interface Alert {
  id: string
  type: "mismatch" | "action_required" | "info" | "warning"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  createdAt: string
}

export interface Account {
  accountName: string
  accountType: "Tax-Deferred" | "Tax-Free" | "Taxable"
  approximateValue: number
  institution: string
  beneficiaryStatus: "complete" | "incomplete" | "pending"
}

export interface AssetAllocation {
  assetClass: string
  targetAllocation: number
  currentAllocation?: number
  allowableMin: number
  allowableMax: number
}

export interface RiskProfile {
  source: string
  riskTolerance: string
  score?: number
  scoreRange?: string
  timeHorizon: string
  returnExpectation: string
  primaryObjective: string
}

export interface EstateItem {
  asset: string
  value: number
  recipient: string
  status: "complete" | "pending" | "action_required"
}

// Carina Voss IPS Data
export const carinaIPSData = {
  clientProfile: {
    clientName: "Carina Voss",
    accounts: [
      {
        accountName: "Carina – Fidelity Traditional IRA",
        accountType: "Tax-Deferred" as const,
        approximateValue: 480000,
        institution: "Fidelity",
        beneficiaryStatus: "incomplete" as const,
      },
      {
        accountName: "Carina – Fidelity ROTH IRA",
        accountType: "Tax-Free" as const,
        approximateValue: 220000,
        institution: "Fidelity",
        beneficiaryStatus: "incomplete" as const,
      },
      {
        accountName: "Carina – Individual Brokerage",
        accountType: "Taxable" as const,
        approximateValue: 500000,
        institution: "Fidelity",
        beneficiaryStatus: "incomplete" as const,
      },
    ],
    totalPortfolioValue: 1200000,
  },
  investmentObjectives: [
    "Capital Preservation",
    "Income",
    "Growth and Income",
    "Growth",
    "Gifting / Legacy Goals",
  ],
  riskTolerance: "Moderately Aggressive",
  timeHorizon: "20+ Years",
  liquidityNeeds:
    "Carina does not anticipate near-term distributions from this portfolio. A minimal cash reserve will be maintained. No regular withdrawal schedule is anticipated at this time.",
  returnGoal:
    "Given the client's risk tolerance, the Advisor will seek the best possible returns at an appropriate level of risk, targeting an annualized net return of 7–9% over a full market cycle.",
  targetAssetAllocation: {
    portfolioProfile: "Moderately Aggressive",
    allocations: [
      { assetClass: "Equity", targetAllocation: 75, allowableMin: 65, allowableMax: 85 },
      { assetClass: "Fixed Income", targetAllocation: 15, allowableMin: 10, allowableMax: 25 },
      { assetClass: "Alternatives", targetAllocation: 8, allowableMin: 0, allowableMax: 15 },
      { assetClass: "Cash & Equivalents", targetAllocation: 2, allowableMin: 0, allowableMax: 5 },
    ],
  },
  advisorNotes: [
    {
      title: "Concentrated Stock Position",
      content:
        "Carina holds approximately $85,000 in employer stock (Acme Technologies). This position will be treated as a Domestic Large Cap equivalent in the allocation model. Diversification will be pursued opportunistically in light of her tax situation.",
    },
    {
      title: "ESG Preference",
      content:
        "Carina has expressed a preference for ESG-conscious fund selection where available at competitive expense ratios and performance characteristics.",
    },
    {
      title: "Upcoming Liquidity Events",
      content:
        "No significant near-term liquidity needs identified. Portfolio is structured for long-term growth consistent with a 20+ year horizon and Moderately Aggressive risk profile.",
    },
  ],
  benchmarks: [
    { assetClass: "Fixed Income", benchmark: "Bloomberg U.S. Aggregate Bond Index" },
    { assetClass: "Equities", benchmark: "MSCI ACWI Index" },
    { assetClass: "Alternatives", benchmark: "50% MSCI World REITs / 50% Bloomberg Commodity Index" },
  ],
}

// Carina Voss RTQ Data
export const carinaRTQData = {
  client: {
    name: "Carina Voss",
    document: "Raymond James Institutional Risk Tolerance Assessment",
  },
  financialProfile: {
    assetsUnderConsideration: 1200000,
    employerStock: {
      company: "Acme Technologies",
      approxValue: 85000,
      note: "Concentrated employer stock position to be considered in equity allocation",
    },
  },
  investmentPreferences: {
    timeHorizon: {
      selected: "5–10 Years",
      points: 6,
      note: "Client may retire early and anticipates needing portfolio income within 7–8 years",
    },
    primaryInvestmentObjective: {
      selected: "Income",
      points: 3,
    },
    annualSpendingPolicy: {
      selected: "Moderate (2–5%)",
      points: 6,
    },
    returnExpectation: {
      selected: "3–5%",
      points: 6,
    },
    investmentApproach: {
      selected:
        "Prefers to slightly increase investment value while minimizing the potential for loss of principal",
      points: 6,
    },
    reactionToLoss: {
      scenario: "Portfolio loses 20% in first year",
      selected: "Concerned and consider liquidating the investment",
      points: 6,
    },
    mostFearedEvent: {
      selected: "Loss of 10% of principal within six months",
      points: 3,
    },
    investmentKnowledge: {
      selected: "Moderate — Some investment experience",
      points: 9,
    },
  },
  riskAssessment: {
    totalScore: 45,
    riskProfile: "Moderate Conservative",
    scoreRange: "38–51",
    description:
      "Portfolio designed to balance growth and income with moderate sensitivity to market fluctuations.",
  },
  suggestedAssetAllocation: {
    equity: 40,
    fixedIncome: 50,
    alternatives: 7,
    cash: 3,
  },
  investmentConstraints: {
    esgPreference: true,
    notes: [
      "Client prefers ESG-aligned investments when possible.",
      "Employer stock concentration should be considered when evaluating domestic equity exposure.",
    ],
  },
}

// Carina Voss Estate Data
export const carinaEstateData = {
  personalInformation: {
    name: "Carina Voss",
    maritalStatus: "Single",
    children: [],
    stateOfResidence: "Maine",
  },
  powerOfAttorney: {
    primary: "To Be Named by Client",
    alternate: "To Be Named by Client",
  },
  beneficiaries: {
    qualified: "To be determined — no beneficiaries identified",
    primary: [],
    secondary: [],
  },
  taxExemption:
    "Federal estate tax exemption (2026): $15,000,000. Carina's estate (~$1.2M) is well below this threshold; no federal estate tax concern currently.",
  assetsAndRecipients: [
    {
      asset: "Fidelity Traditional IRA",
      value: 480000,
      recipient: "To be determined (beneficiary designation required)",
      status: "action_required" as const,
    },
    {
      asset: "Fidelity ROTH IRA",
      value: 220000,
      recipient: "To be determined (beneficiary designation required)",
      status: "action_required" as const,
    },
    {
      asset: "Individual Brokerage Account",
      value: 500000,
      recipient: "To be determined (TOD beneficiary or via will)",
      status: "action_required" as const,
    },
    {
      asset: "Acme Technologies Employer Stock",
      value: 85000,
      recipient: "To be determined",
      status: "pending" as const,
    },
  ],
  trusteeDuties: [
    "Manage and safeguard trust assets on behalf of beneficiaries.",
    "Follow instructions outlined in the trust document.",
    "Make distributions to beneficiaries according to trust terms.",
    "Maintain records and provide financial reporting for trust activities.",
    "Act in the best fiduciary interest of the beneficiaries.",
    "Coordinate with advisors and professionals (legal, tax, investment) when managing trust assets.",
  ],
  documentsNeeded: [
    { document: "Last Will and Testament", priority: "High", status: "pending" },
    { document: "Revocable Living Trust", priority: "High", status: "pending" },
    { document: "Advance Medical Directive (Living Will)", priority: "High", status: "pending" },
    { document: "Durable General POA (Financial)", priority: "High", status: "pending" },
    { document: "IRA Beneficiary Designations", priority: "High", status: "pending" },
    { document: "TOD Designation (Brokerage)", priority: "Medium", status: "pending" },
    { document: "HIPAA Authorization", priority: "Medium", status: "pending" },
    { document: "Concentrated Stock Exit Strategy", priority: "Medium", status: "pending" },
  ],
  actionItems: [
    {
      id: 1,
      action: "Reconcile IPS (Moderately Aggressive) vs. RTQ (Moderately Conservative) risk profile",
      responsible: "Carina + PFA Advisor",
      status: "Pending",
    },
    {
      id: 2,
      action: "Identify and confirm executor, POA agent, and health care agent",
      responsible: "Carina",
      status: "Pending",
    },
    {
      id: 3,
      action: "Update IRA beneficiary designations with Fidelity",
      responsible: "Carina",
      status: "Pending",
    },
    {
      id: 4,
      action: "Add TOD designation to individual brokerage account",
      responsible: "Carina + Fidelity",
      status: "Pending",
    },
    {
      id: 5,
      action: "Clarify charitable/legacy gifting goals and identify specific organizations",
      responsible: "Carina",
      status: "Pending",
    },
    {
      id: 6,
      action: "Discuss Revocable Living Trust structure with estate attorney",
      responsible: "Carina + Attorney",
      status: "Pending",
    },
    {
      id: 7,
      action: "Review Acme Technologies stock exit / diversification plan with PFA",
      responsible: "Carina + PFA",
      status: "Pending",
    },
    {
      id: 8,
      action: "Sign Will, AMD, POA, and Living Trust documents",
      responsible: "Carina + Witnesses + Notary",
      status: "Scheduled",
    },
  ],
}

// Profile Comparison Data (IPS vs RTQ discrepancies)
export const profileComparisonData = [
  {
    category: "Risk Tolerance",
    ipsValue: "Moderately Aggressive",
    rtqValue: "Moderately Conservative (Score: 45)",
    status: "mismatch" as const,
    note: "Significant discrepancy — warrants advisor review",
  },
  {
    category: "Time Horizon",
    ipsValue: "20+ Years",
    rtqValue: "5–10 Years (early retirement)",
    status: "mismatch" as const,
    note: "Discrepancy — Carina may retire in 7–8 yrs",
  },
  {
    category: "Return Target",
    ipsValue: "7–9% annualized (net)",
    rtqValue: "3–5% expected by client",
    status: "mismatch" as const,
    note: "Discrepancy — expectation gap to address",
  },
  {
    category: "Primary Objective",
    ipsValue: "Growth + Income + Legacy",
    rtqValue: "Income",
    status: "warning" as const,
    note: "Partially aligned",
  },
  {
    category: "Equity Allocation",
    ipsValue: "75%",
    rtqValue: "40%",
    status: "mismatch" as const,
    note: "Significant divergence — review needed",
  },
  {
    category: "Fixed Income Allocation",
    ipsValue: "15%",
    rtqValue: "50%",
    status: "mismatch" as const,
    note: "Significant divergence — review needed",
  },
  {
    category: "ESG Preference",
    ipsValue: "Yes (where available)",
    rtqValue: "Yes (noted as constraint)",
    status: "aligned" as const,
    note: "Aligned",
  },
  {
    category: "Concentrated Stock",
    ipsValue: "~$85K Acme Technologies",
    rtqValue: "~$85K (noted as constraint)",
    status: "aligned" as const,
    note: "Aligned — diversify opportunistically",
  },
]

// Client List with multiple example clients
export const clients: Client[] = [
  {
    id: "carina-voss",
    name: "Carina Voss",
    email: "carina.voss@email.com",
    phone: "(207) 555-0123",
    advisor: "Penobscot Financial Advisors",
    status: "active",
    totalAssets: 1200000,
    lastMeeting: "2025-02-15",
    nextMeeting: "2025-04-20",
    documents: [
      {
        id: "ips-001",
        name: "Investment Policy Statement",
        type: "IPS",
        uploadedAt: "2024-03-15",
        status: "processed",
      },
      {
        id: "rtq-001",
        name: "Risk Tolerance Questionnaire",
        type: "RTQ",
        uploadedAt: "2024-03-10",
        status: "processed",
      },
      {
        id: "estate-001",
        name: "Estate Planning Worksheet",
        type: "Estate",
        uploadedAt: "2024-03-20",
        status: "processed",
      },
    ],
    alerts: [
      {
        id: "alert-001",
        type: "mismatch",
        title: "Risk Profile Mismatch",
        description: "IPS (Moderately Aggressive) differs from RTQ (Moderately Conservative)",
        priority: "high",
        createdAt: "2025-03-01",
      },
      {
        id: "alert-002",
        type: "action_required",
        title: "Beneficiary Designations Incomplete",
        description: "IRA and brokerage accounts require beneficiary designations",
        priority: "high",
        createdAt: "2025-03-01",
      },
      {
        id: "alert-003",
        type: "warning",
        title: "Concentrated Stock Position",
        description: "$85K in Acme Technologies employer stock requires diversification plan",
        priority: "medium",
        createdAt: "2025-03-01",
      },
    ],
  },
  {
    id: "john-smith",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(207) 555-0456",
    advisor: "Penobscot Financial Advisors",
    status: "active",
    totalAssets: 2500000,
    lastMeeting: "2025-03-01",
    nextMeeting: "2025-05-15",
    documents: [
      {
        id: "ips-002",
        name: "Investment Policy Statement",
        type: "IPS",
        uploadedAt: "2024-01-20",
        status: "processed",
      },
    ],
    alerts: [],
  },
  {
    id: "maria-garcia",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "(207) 555-0789",
    advisor: "Penobscot Financial Advisors",
    status: "pending",
    totalAssets: 850000,
    lastMeeting: "2025-01-10",
    nextMeeting: "2025-04-05",
    documents: [
      {
        id: "rtq-003",
        name: "Risk Tolerance Questionnaire",
        type: "RTQ",
        uploadedAt: "2025-01-10",
        status: "processing",
      },
    ],
    alerts: [
      {
        id: "alert-004",
        type: "info",
        title: "Documents Processing",
        description: "RTQ document is being analyzed",
        priority: "low",
        createdAt: "2025-03-10",
      },
    ],
  },
]

// AI Suggested Actions for Carina
export const aiSuggestedActions = [
  {
    id: 1,
    priority: "high",
    action: "Discuss the mismatch between IPS (Moderately Aggressive) and RTQ (Moderately Conservative)",
    rationale:
      "The documents show a significant divergence in risk tolerance assessment. The IPS targets 75% equity while the RTQ suggests 40% equity would be more appropriate.",
    category: "Risk Assessment",
  },
  {
    id: 2,
    priority: "high",
    action: "Review diversification strategy for concentrated employer stock ($85k in Acme Technologies)",
    rationale:
      "Concentrated position represents ~7% of portfolio. Tax-efficient diversification strategies should be discussed.",
    category: "Portfolio Management",
  },
  {
    id: 3,
    priority: "high",
    action: "Clarify retirement timeline (7–8 years) vs IPS 20+ year horizon",
    rationale:
      "RTQ indicates early retirement plans within 7-8 years, but IPS assumes 20+ year horizon. This needs reconciliation.",
    category: "Financial Planning",
  },
  {
    id: 4,
    priority: "medium",
    action: "Update beneficiary designations on all accounts",
    rationale:
      "All three accounts (Traditional IRA, ROTH IRA, Brokerage) lack beneficiary designations. This is critical for estate planning.",
    category: "Estate Planning",
  },
  {
    id: 5,
    priority: "medium",
    action: "Discuss establishing a Revocable Living Trust",
    rationale:
      "Given the $1.2M portfolio size, a living trust would help avoid probate and facilitate smooth asset transfer.",
    category: "Estate Planning",
  },
  {
    id: 6,
    priority: "medium",
    action: "Review ESG investment options aligned with client preferences",
    rationale:
      "Both documents note ESG preference. Ensure current holdings align with ESG criteria where performance is competitive.",
    category: "Investment Selection",
  },
  {
    id: 7,
    priority: "low",
    action: "Schedule follow-up meeting to finalize estate planning documents",
    rationale: "Multiple estate documents (Will, Living Trust, POA, AMD) are pending execution.",
    category: "Administrative",
  },
]

// Meeting Topics for Carina
export const meetingTopics = [
  "Risk profile reconciliation (IPS vs RTQ)",
  "Retirement timeline clarification",
  "Acme Technologies stock diversification plan",
  "Beneficiary designation updates",
  "Estate planning document execution",
  "ESG investment review",
  "Return expectations alignment",
]
