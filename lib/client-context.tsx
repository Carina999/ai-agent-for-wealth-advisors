"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import {
  clients,
  carinaIPSData,
  carinaRTQData,
  carinaEstateData,
  profileComparisonData,
  aiSuggestedActions,
  meetingTopics,
  johnSmithIPSData,
  johnSmithRTQData,
  johnSmithEstateData,
  johnSmithProfileComparison,
  johnSmithAISuggestedActions,
  johnSmithMeetingTopics,
} from "./mock-data"

interface ClientContextType {
  selectedClientId: string
  setSelectedClientId: (id: string) => void
  currentClient: typeof clients[0]
  ipsData: typeof carinaIPSData
  rtqData: typeof carinaRTQData
  estateData: typeof carinaEstateData
  profileComparison: typeof profileComparisonData
  aiSuggestions: typeof aiSuggestedActions
  meetingTopics: typeof meetingTopics
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: ReactNode }) {
  const [selectedClientId, setSelectedClientId] = useState("carina-voss")

  const currentClient = clients.find((c) => c.id === selectedClientId) || clients[0]

  // Get data based on selected client
  const getClientData = () => {
    if (selectedClientId === "john-smith") {
      return {
        ipsData: johnSmithIPSData,
        rtqData: johnSmithRTQData,
        estateData: johnSmithEstateData,
        profileComparison: johnSmithProfileComparison,
        aiSuggestions: johnSmithAISuggestedActions,
        meetingTopics: johnSmithMeetingTopics,
      }
    }
    // Default to Carina's data
    return {
      ipsData: carinaIPSData,
      rtqData: carinaRTQData,
      estateData: carinaEstateData,
      profileComparison: profileComparisonData,
      aiSuggestions: aiSuggestedActions,
      meetingTopics: meetingTopics,
    }
  }

  const clientData = getClientData()

  return (
    <ClientContext.Provider
      value={{
        selectedClientId,
        setSelectedClientId,
        currentClient,
        ...clientData,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export function useClient() {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}
