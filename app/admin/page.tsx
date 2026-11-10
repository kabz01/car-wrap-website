"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Database, 
  Download, 
  RefreshCw, 
  Search, 
  Phone, 
  Mail, 
  Car, 
  Shield, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { fetchQuotes, fetchContacts, syncOfflineData } from "@/lib/supabase"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ppf" | "ceramic" | "contacts" | "setup">("all")
  const [quotes, setQuotes] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [copiedSql, setCopiedSql] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const quotesRes = await fetchQuotes()
      const contactsRes = await fetchContacts()

      setQuotes(quotesRes.allQuotes || [])
      setContacts(contactsRes.allContacts || [])
      setIsConnected(quotesRes.isSupabaseConnected)
    } catch (err) {
      console.error("Error loading data:", err)
      toast({
        title: "Error loading records",
        description: "Failed to fetch quotes from database or local storage.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await syncOfflineData()
      if (res.success) {
        toast({
          title: "Sync Completed! 🎉",
          description: `Synced ${res.results?.quotes.synced || 0} quotes and ${res.results?.contacts.synced || 0} contact messages to Supabase.`,
        })
        await loadData()
      } else {
        toast({
          title: "Sync Notice",
          description: res.reason || "Supabase cloud credentials not set in .env.local.",
        })
      }
    } catch (e: any) {
      toast({
        title: "Sync Failed",
        description: e.message || "Failed to sync offline records.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  // Filter quotes based on search and active tab
  const filteredQuotes = quotes.filter((q) => {
    const isPPF = q.car_type?.toLowerCase().includes("paint protection") || 
                  q.color_name?.toLowerCase().includes("ppf") || 
                  q.color_name?.toLowerCase().includes("tpu") ||
                  q.message?.toLowerCase().includes("ppf")
    const isCeramic = q.car_type?.toLowerCase().includes("ceramic") || 
                      q.color_name?.toLowerCase().includes("ceramic") || 
                      q.color_name?.toLowerCase().includes("10h") ||
                      q.color_name?.toLowerCase().includes("12h") ||
                      q.color_name?.toLowerCase().includes("20h") ||
                      q.color_name?.toLowerCase().includes("crystal") ||
                      q.message?.toLowerCase().includes("ceramic")

    if (activeTab === "ppf" && !isPPF) return false
    if (activeTab === "ceramic" && !isCeramic) return false

    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase()
    return (
      q.name?.toLowerCase().includes(query) ||
      q.phone?.toLowerCase().includes(query) ||
      q.email?.toLowerCase().includes(query) ||
      q.car_model?.toLowerCase().includes(query) ||
      q.color_name?.toLowerCase().includes(query) ||
      q.message?.toLowerCase().includes(query)
    )
  })

  // Filter contacts based on search
  const filteredContacts = contacts.filter((c) => {
    if (!searchQuery.trim()) return true
    const query = searchQuery.toLowerCase()
    return (
      c.name?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.message?.toLowerCase().includes(query)
    )
  })

  // Calculate statistics
  const ppfCount = quotes.filter((q) => 
    q.car_type?.toLowerCase().includes("paint protection") || 
    q.color_name?.toLowerCase().includes("ppf") || 
    q.color_name?.toLowerCase().includes("tpu")
  ).length

  const ceramicCount = quotes.filter((q) => 
    q.car_type?.toLowerCase().includes("ceramic") || 
    q.color_name?.toLowerCase().includes("ceramic") || 
    q.color_name?.toLowerCase().includes("10h") ||
    q.color_name?.toLowerCase().includes("12h") ||
    q.color_name?.toLowerCase().includes("20h") ||
    q.color_name?.toLowerCase().includes("crystal")
  ).length

  const totalQuotesValue = quotes.reduce((acc, q) => acc + (Number(q.total_price) || 0), 0)

  // Export to CSV
  const exportToCSV = () => {
    if (activeTab === "contacts") {
      if (filteredContacts.length === 0) {
        toast({ title: "No contact records to export" })
        return
      }
      const headers = ["Date", "Name", "Email", "Message", "Source"]
      const rows = filteredContacts.map((c) => [
        `"${c.created_at || ""}"`,
        `"${(c.name || "").replace(/"/g, '""')}"`,
        `"${(c.email || "").replace(/"/g, '""')}"`,
        `"${(c.message || "").replace(/"/g, '""')}"`,
        `"${c._source || "offline"}"`,
      ])
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `millan_customz_contacts_${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast({ title: "Contacts CSV Exported!" })
      return
    }

    if (filteredQuotes.length === 0) {
      toast({ title: "No quote records to export" })
      return
    }

    const headers = ["Date", "Customer Name", "Phone", "Email", "Service / Color", "Vehicle Type", "Vehicle Model", "Total Price (Kshs)", "Message", "Storage Source"]
    const rows = filteredQuotes.map((q) => [
      `"${q.created_at || ""}"`,
      `"${(q.name || "").replace(/"/g, '""')}"`,
      `"${(q.phone || "").replace(/"/g, '""')}"`,
      `"${(q.email || "").replace(/"/g, '""')}"`,
      `"${(q.color_name || "").replace(/"/g, '""')}"`,
      `"${(q.car_type || "").replace(/"/g, '""')}"`,
      `"${(q.car_model || "").replace(/"/g, '""')}"`,
      `"${q.total_price || 0}"`,
      `"${(q.message || "").replace(/"/g, '""')}"`,
      `"${q._source || "offline"}"`,
    ])

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `millan_customz_${activeTab}_quotes_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({ title: "Quotes CSV Exported!" })
  }

  const sqlSchema = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- 1. Create table for Quote Submissions (PPF & Ceramic Coating)
CREATE TABLE IF NOT EXISTS public.quote_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    color_name TEXT,
    car_type TEXT,
    car_model TEXT,
    total_price NUMERIC,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create table for Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create table for Button Tracking
CREATE TABLE IF NOT EXISTS public.button_clicks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    button_name TEXT NOT NULL,
    page_url TEXT,
    user_session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.quote_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.button_clicks ENABLE ROW LEVEL SECURITY;

-- 5. Allow anonymous public submissions (Insert)
CREATE POLICY "Allow public insert on quote_submissions" 
    ON public.quote_submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_submissions" 
    ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert on button_clicks" 
    ON public.button_clicks FOR INSERT TO anon WITH CHECK (true);

-- 6. Allow reading records
CREATE POLICY "Allow anon select on quote_submissions" 
    ON public.quote_submissions FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon select on contact_submissions" 
    ON public.contact_submissions FOR SELECT TO anon USING (true);
`

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema)
    setCopiedSql(true)
    toast({ title: "SQL Schema Copied to Clipboard!" })
    setTimeout(() => setCopiedSql(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 md:px-6 pt-44 pb-16 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Database & Quote Records</h1>
            {isConnected ? (
              <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Supabase Connected
              </Badge>
            ) : (
              <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Local Storage Active (Offline)
              </Badge>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Exact records of all Paint Protection Film (PPF) and Ceramic Coating quote requests and inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadData} 
            disabled={isLoading}
            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSync} 
            disabled={isSyncing}
            className="border-blue-700/50 bg-blue-950/40 hover:bg-blue-900/60 text-blue-300"
          >
            <Database className={`w-4 h-4 mr-1.5 ${isSyncing ? "animate-pulse" : ""}`} />
            Sync to Supabase
          </Button>

          <Button 
            size="sm" 
            onClick={exportToCSV}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Total Quotes</span>
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1">{quotes.length}</div>
            <div className="text-xs text-gray-400 mt-1">
              Est. Value: Ksh {totalQuotesValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>PPF Quotes</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400 mt-1">{ppfCount}</div>
            <div className="text-xs text-gray-400 mt-1">Clear, Matte & Colored TPU</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Ceramic Coating</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{ceramicCount}</div>
            <div className="text-xs text-gray-400 mt-1">10H, 12H, 20H & Interior</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/80 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Contact Inquiries</span>
              <Mail className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 mt-1">{contacts.length}</div>
            <div className="text-xs text-gray-400 mt-1">Direct website messages</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Search Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-2 md:pb-0 md:border-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "all"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            All Quotes ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab("ppf")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "ppf"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            PPF Quotes ({ppfCount})
          </button>
          <button
            onClick={() => setActiveTab("ceramic")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "ceramic"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            Ceramic Coating ({ceramicCount})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "contacts"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("setup")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "setup"
                ? "bg-gray-700 text-white border border-gray-500"
                : "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            ⚙️ Supabase Setup & SQL
          </button>
        </div>

        {activeTab !== "setup" && (
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search name, phone, car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500 text-sm"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === "setup" ? (
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                How to Access Your Supabase Database in the Cloud
              </CardTitle>
              <CardDescription className="text-gray-400">
                Follow these simple steps to view, search, and manage all your quote submissions directly in the official Supabase Cloud console.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300 text-sm leading-relaxed">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-gray-900/60 border border-gray-700 space-y-2">
                  <div className="text-purple-400 font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">1</span>
                    Open Supabase Dashboard
                  </div>
                  <p className="text-xs text-gray-400">
                    Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-purple-400 underline inline-flex items-center gap-1">supabase.com/dashboard <ExternalLink className="w-3 h-3" /></a> and sign in to your account. Select your Millan Customz project.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-900/60 border border-gray-700 space-y-2">
                  <div className="text-purple-400 font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">2</span>
                    Open Table Editor
                  </div>
                  <p className="text-xs text-gray-400">
                    On the left navigation menu, click on <strong>Table Editor</strong> (the table grid icon). Click on <strong>quote_submissions</strong> to see all PPF and Ceramic Coating records in real-time.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-900/60 border border-gray-700 space-y-2">
                  <div className="text-purple-400 font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">3</span>
                    Export or Filter
                  </div>
                  <p className="text-xs text-gray-400">
                    Supabase allows you to filter rows, sort by date, view exact WhatsApp message details, or download the full spreadsheet as CSV with one click.
                  </p>
                </div>
              </div>

              {/* Environment Variables Info */}
              <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div className="font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Connecting Your Project via .env.local
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  To connect your website to your Supabase project, get your Project URL and Anon API key from <strong>Project Settings → API</strong> in Supabase, and add them to your <code>.env.local</code> file:
                </p>
                <div className="p-3 bg-black rounded font-mono text-xs text-emerald-400 overflow-x-auto">
                  NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co<br />
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Even without this configured, the website automatically saves 100% of submissions safely in the browser's local storage and forwards every quote directly to WhatsApp (0795557083).
                </p>
              </div>

              {/* SQL Schema */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-white">Database SQL Schema (Run in Supabase SQL Editor):</div>
                  <Button size="sm" variant="outline" onClick={handleCopySql} className="border-gray-600 bg-gray-700 text-xs">
                    {copiedSql ? <Check className="w-3.5 h-3.5 mr-1 text-green-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copiedSql ? "Copied" : "Copy SQL"}
                  </Button>
                </div>
                <pre className="p-4 bg-gray-950 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto max-h-80 border border-gray-800">
                  {sqlSchema}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : activeTab === "contacts" ? (
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="py-4 border-b border-gray-700">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span>Contact Inquiries ({filteredContacts.length})</span>
              <span className="text-xs text-gray-400 font-normal">Messages submitted through /contact</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="py-16 text-center text-gray-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-400" />
                Loading contact submissions...
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                No contact form inquiries found {searchQuery ? `matching "${searchQuery}"` : "yet"}.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs uppercase text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredContacts.map((contact, idx) => (
                      <tr key={contact.id || idx} className="hover:bg-gray-700/50 transition-colors">
                        <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">
                          {contact.created_at ? new Date(contact.created_at).toLocaleString() : "Recently"}
                        </td>
                        <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                          {contact.name || "Customer"}
                        </td>
                        <td className="py-3 px-4 text-xs whitespace-nowrap">
                          {contact.email ? (
                            <a href={`mailto:${contact.email}`} className="text-purple-400 hover:underline flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {contact.email}
                            </a>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 max-w-md text-xs text-gray-300">
                          {contact.message}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {contact._source === "supabase" ? (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">Cloud</Badge>
                          ) : (
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Offline</Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          {contact.email && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 text-xs text-purple-400 hover:text-white hover:bg-purple-900/40"
                              onClick={() => window.open(`mailto:${contact.email}?subject=Millan Customz Inquiry`, "_blank")}
                            >
                              Reply
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-800 border-gray-700 overflow-hidden">
          <CardHeader className="py-4 border-b border-gray-700">
            <CardTitle className="text-lg text-white flex items-center justify-between">
              <span>
                {activeTab === "all" && "All Quotes"}
                {activeTab === "ppf" && "Paint Protection Film (PPF) Quotes"}
                {activeTab === "ceramic" && "Ceramic Coating Quotes"} ({filteredQuotes.length})
              </span>
              <span className="text-xs text-gray-400 font-normal">
                Saved records with customer contact, selected service, car model, and price
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="py-16 text-center text-gray-400">
                <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-400" />
                Loading quote records...
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="py-16 text-center text-gray-500">
                No quote submissions found {searchQuery ? `matching "${searchQuery}"` : "yet"}.
                <div className="mt-2 text-xs text-gray-600">
                  Try submitting a quote from the <Link href="/paint-protection" className="text-purple-400 underline">PPF page</Link> or <Link href="/ceramic-coating" className="text-purple-400 underline">Ceramic Coating page</Link>.
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-gray-900/80 text-xs uppercase text-gray-400 border-b border-gray-700">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Service / Finish</th>
                      <th className="py-3 px-4">Vehicle Model</th>
                      <th className="py-3 px-4">Est. Price</th>
                      <th className="py-3 px-4">Storage</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredQuotes.map((quote, idx) => {
                      const isPPF = quote.car_type?.toLowerCase().includes("paint protection") || 
                                    quote.color_name?.toLowerCase().includes("ppf") || 
                                    quote.color_name?.toLowerCase().includes("tpu")
                      const formattedPhone = quote.phone?.replace(/[^0-9]/g, "") || ""
                      const whatsappPhone = formattedPhone.startsWith("0") 
                        ? `254${formattedPhone.slice(1)}` 
                        : (formattedPhone.startsWith("254") ? formattedPhone : `254${formattedPhone}`)

                      return (
                        <tr key={quote.id || idx} className="hover:bg-gray-700/50 transition-colors">
                          <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">
                            {quote.created_at ? new Date(quote.created_at).toLocaleDateString() : "Recent"}
                            <div className="text-[10px] text-gray-500">
                              {quote.created_at ? new Date(quote.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                            </div>
                          </td>

                          <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                            {quote.name || "Customer"}
                          </td>

                          <td className="py-3 px-4 text-xs whitespace-nowrap space-y-1">
                            {quote.phone ? (
                              <div className="flex items-center gap-1.5 text-gray-300">
                                <Phone className="w-3 h-3 text-purple-400" />
                                <a href={`tel:${quote.phone}`} className="hover:underline">{quote.phone}</a>
                              </div>
                            ) : null}
                            {quote.email ? (
                              <div className="flex items-center gap-1.5 text-gray-400">
                                <Mail className="w-3 h-3 text-blue-400" />
                                <a href={`mailto:${quote.email}`} className="hover:underline">{quote.email}</a>
                              </div>
                            ) : null}
                            {!quote.phone && !quote.email && <span className="text-gray-500">No contact left</span>}
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              {isPPF ? (
                                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px]">PPF</Badge>
                              ) : (
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">Ceramic</Badge>
                              )}
                              <span className="font-medium text-xs text-white max-w-xs truncate">
                                {quote.color_name || quote.car_type || "Standard"}
                              </span>
                            </div>
                            {quote.message && (
                              <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 max-w-xs">
                                {quote.message}
                              </p>
                            )}
                          </td>

                          <td className="py-3 px-4 text-xs text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Car className="w-3.5 h-3.5 text-gray-400" />
                              <span>{quote.car_model || "Not specified"}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-xs font-semibold text-purple-300 whitespace-nowrap">
                            {quote.total_price ? `${Number(quote.total_price).toLocaleString()} Kshs` : "Contact for price"}
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {quote._source === "supabase" ? (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px]">Cloud</Badge>
                            ) : (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">Offline</Badge>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            {quote.phone ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-green-600/50 bg-green-950/40 text-green-300 hover:bg-green-900/60 text-xs"
                                onClick={() => {
                                  const text = encodeURIComponent(`Hello ${quote.name || ""}! Thank you for requesting a quote for ${quote.color_name || "our services"} at Millan Auto Customs.`)
                                  window.open(`https://wa.me/${whatsappPhone}?text=${text}`, "_blank")
                                }}
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                WhatsApp
                              </Button>
                            ) : (
                              <span className="text-gray-500 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Navigation Footer */}
      <div className="mt-12 p-6 rounded-xl bg-gray-800/40 border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <div>
          <span>Location: <strong>Mokoyeti Road West, Karen, Nairobi, Kenya</strong></span>
          <span className="mx-2">•</span>
          <span>WhatsApp: <strong>0795557083</strong></span>
        </div>
        <div className="flex gap-4">
          <Link href="/paint-protection" className="hover:text-purple-400 transition-colors">PPF Page</Link>
          <Link href="/ceramic-coating" className="hover:text-purple-400 transition-colors">Ceramic Coating Page</Link>
          <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Page</Link>
        </div>
      </div>
    </div>
  )
}
