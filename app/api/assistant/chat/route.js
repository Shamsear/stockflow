import { NextResponse } from 'next/server';
import { saveDemoChatMessage } from '@/lib/telemetry';

// Knowledge base of common warehouse questions in plain business English (zero emojis, zero jargon)
const KNOWLEDGE_BASE = [
  {
    keywords: ['fefo', 'expiry', 'expire', 'shelf life', 'batch', 'date'],
    reply: "FEFO stands for First-Expired, First-Out. It automatically prioritizes stock with the closest expiration date so older batches are dispatched first. In Qatar and the UAE, retail hypermarkets like Carrefour and Lulu reject items with under six months remaining. StockFlow flags these products with risk levels and prevents pickers from issuing them.",
    suggestions: ["How do delivery notes work?", "Can we use mobile phones to scan?"]
  },
  {
    keywords: ['delivery note', 'driver', 'pod', 'receipt', 'proof of delivery', 'dispatch slip', 'pdf'],
    reply: "When goods leave your warehouse, StockFlow automatically generates an official PDF Delivery Note. It includes your company header, store location, driver details, item quantities, lot numbers, and dual signature lines for proof of delivery.",
    suggestions: ["Can we customize the logo on delivery notes?", "How does inbound receiving work?"]
  },
  {
    keywords: ['barcode', 'scanner', 'phone', 'camera', 'zebra', 'honeywell'],
    reply: "You can scan barcodes in two ways. Standard warehouse handheld terminals (like Zebra or Honeywell) work instantly with zero configuration. Alternatively, warehouse staff can use any smartphone camera by scanning a quick QR code on screen to pair their phone as a live wireless barcode scanner.",
    suggestions: ["How does FEFO work?", "How long does setup take?"]
  },
  {
    keywords: ['inbound', 'receive', 'supplier', 'container', 'dock', 'grn', 'purchase order'],
    reply: "Inbound receiving is the process of recording incoming shipments from sea freight containers or local suppliers. Clerks select the supplier, scan barcodes, record batch expiry dates, and assign goods to racks or cold bays before generating an official Goods Received Note.",
    suggestions: ["How do we handle store returns?", "Can we export stock to Excel?"]
  },
  {
    keywords: ['return', 'damage', 'loss', 'gate pass', 'broken', 'expired'],
    reply: "When retail outlets return unsold or damaged items, you log them under Client Returns. Good items return to active stock, while damaged or expired products move to Damage Quarantine with photographic records. The system generates an official Return Gate Pass for the driver.",
    suggestions: ["How do delivery notes work?", "How does FEFO work?"]
  },
  {
    keywords: ['cost', 'price', 'pricing', 'setup', 'timeline', 'custom', 'qatar', 'uae', 'dubai', 'doha'],
    reply: "StockFlow is customized to your exact warehouse layout, rack numbering, and local trade requirements. Typical deployment in Qatar (Industrial Area) or the UAE (Dubai, Sharjah, Abu Dhabi) takes three to five business days. Our logistics team is reachable directly on WhatsApp at +974 7236 0418 to discuss your floor plan and share a tailored estimate.",
    suggestions: ["Talk on WhatsApp", "How do delivery notes work?"]
  },
  {
    keywords: ['excel', 'csv', 'report', 'reconciliation', 'accounting', 'audit'],
    reply: "StockFlow tracks real-time inventory across five statuses: In Warehouse, Issued to Outlets, In Use, Damage Quarantine, and With Clients. You can filter by brand or category and export clean, formatted Excel (.xlsx) and CSV files with one click.",
    suggestions: ["How does FEFO work?", "How long does setup take?"]
  }
];

function findFallbackAnswer(question = '') {
  const q = question.toLowerCase();

  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return {
        reply: item.reply,
        suggestions: item.suggestions
      };
    }
  }

  return {
    reply: "StockFlow WMS helps warehouse operations across Qatar and the UAE track inventory from dock receiving to retail dispatch, with automated FEFO shelf-life control and official PDF delivery notes. Would you like to know more about receiving, barcode scanning, delivery notes, or custom warehouse setup?",
    suggestions: ["How does FEFO work?", "How do delivery notes work?", "Talk on WhatsApp"]
  };
}

async function queryGemini(userQuestion) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const systemInstruction = `You are StockFlow AI Guide, a professional warehouse assistant for StockFlow WMS.
StockFlow is used by FMCG, electronics, food & beverage, and wholesale distributors in Qatar (Doha, Industrial Area) and the UAE (Dubai, Sharjah, Abu Dhabi).
Key features:
1. Dock Receiving: PO verification, carton/item barcode scanning, lot expiry capture, cold bay allocation.
2. FEFO Expiry: First-Expired First-Out picking, prevents dispatching stock near expiry, protects from retail municipality fines.
3. Outbound Dispatch & Store Picking: Multi-carton picking, barcode confirmation, delivery driver allocation.
4. PDF Delivery Notes (POD): Official proof-of-delivery slips with company letterhead, CR/Tax ID, driver sign-off.
5. Multi-Status Stock Ledger: Real-time balances for In Warehouse, Issued, In Use, Damage Quarantine, and With Clients. Excel/CSV export.
6. Phone Barcode Scanning: Any iPhone/Android camera pairs as a live handheld scanner via screen QR code.
7. Regional Support: Qatar and UAE implementation available on WhatsApp at +974 7236 0418.

Rules:
- Speak in plain business English. Never use technical developer jargon.
- STRICT RULE: DO NOT USE ANY EMOJIS. ZERO EMOJIS UNDER ALL CIRCUMSTANCES.
- Keep answers clear, concise (2 to 4 sentences maximum), and directly addressing the user's question.
- If the user asks about pricing, customized setup, or contacting the team, mention WhatsApp (+974 7236 0418).`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userQuestion }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 250,
        }
      })
    });

    if (!response.ok) {
      console.warn('[Gemini API] Returned status:', response.status);
      return null;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    // Strip any unexpected emojis to guarantee clean minimal text
    const cleanText = rawText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

    return cleanText;
  } catch (err) {
    console.error('[Gemini API Call Failed]:', err.message);
    return null;
  }
}

export async function POST(request) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const trimmedMsg = message.trim();

    // 1. Try Gemini Cloud LLM first
    let reply = await queryGemini(trimmedMsg);
    let suggestions = [];

    // 2. Fallback to curated instant knowledge base if Gemini unavailable
    if (!reply) {
      const fallback = findFallbackAnswer(trimmedMsg);
      reply = fallback.reply;
      suggestions = fallback.suggestions;
    } else {
      suggestions = [
        "How does FEFO expiry work?",
        "Can I customize the PDF delivery note?",
        "Talk with Qatar/UAE team on WhatsApp"
      ];
    }

    // 3. Persist conversation history to database
    if (sessionId) {
      await saveDemoChatMessage(sessionId, 'user', trimmedMsg);
      await saveDemoChatMessage(sessionId, 'assistant', reply);
    }

    return NextResponse.json({
      reply,
      suggestions
    });
  } catch (error) {
    console.error('[Chat API Error]:', error);
    return NextResponse.json({ 
      reply: "StockFlow WMS helps you manage warehouse receiving, FEFO shelf life, and driver delivery slips. You can also contact our logistics team directly on WhatsApp at +974 7236 0418.",
      suggestions: ["How does FEFO expiry work?", "How do delivery notes work?"]
    });
  }
}
