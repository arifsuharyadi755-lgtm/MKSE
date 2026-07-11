import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Online Consultation
  app.post("/api/consultation", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Format pesan tidak valid." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          reply: "⚠️ **Catatan:** Layanan konsultasi AI belum aktif karena `GEMINI_API_KEY` belum dikonfigurasi di server. Silakan tambahkan API key Anda melalui menu **Settings > Secrets** di AI Studio dengan nama kunci `GEMINI_API_KEY` agar konsultasi AI dapat bekerja secara penuh.\n\nNamun, Anda tetap dapat menggunakan simulasi estimasi biaya perbaikan dan fitur rakit PC secara manual di halaman ini!",
        });
      }

      // Initialize GoogleGenAI SDK as per instructions
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Format messages into structure for Gemini API
      const contents = messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const systemInstruction = `Anda adalah "TechBot", pakar IT, teknisi servis laptop, dan perakit PC Gaming profesional dari MKS COMPUTER CEMPAKA MAS yang ramah. 
Tugas Anda adalah melayani konsultasi online pelanggan secara interaktif, sopan, dan solutif dalam Bahasa Indonesia.

Kemampuan Utama Anda:
1. Mendiagnosis kerusakan laptop/notebook (mati total, layar pecah, lambat, bluescreen, keyboard rusak, overheat, dll) serta memberikan estimasi penyebab dan saran perbaikan di MKS COMPUTER CEMPAKA MAS.
2. Merekomendasikan spesifikasi rakit PC Gaming maupun PC Kerja sesuai dengan budget pelanggan (misal: Rp 5 Juta, Rp 10 Juta, Rp 20 Juta).
3. Memberikan rekomendasi pembelian laptop baru/bekas sesuai kebutuhan (kantor, kuliah, editing video, gaming berat).
4. Menjelaskan perkiraan pengerjaan servis laptop/PC di toko kami yang berlokasi di ITC CEMPAKA MAS MEGA GROSIR, Jl. Letjen Suprapto LT.6, Cemp. Baru, Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10640.

Berikan jawaban yang ramah, ringkas namun padat, gunakan format bullet-point (markdown) bila merekomendasikan spesifikasi agar mudah dibaca, serta berikan sentuhan profesional. Selalu dorong pelanggan untuk membawa perangkat mereka ke toko kami MKS COMPUTER di ITC Cempaka Mas jika memerlukan perbaikan fisik lebih lanjut. Gunakan gaya bahasa Indonesia yang profesional namun hangat.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Maaf, saya tidak dapat memproses jawaban saat ini.";
      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "Terjadi kesalahan saat memproses konsultasi Anda.",
        details: error.message,
      });
    }
  });

  // API Route for server status
  app.get("/api/status", (req, res) => {
    res.json({
      status: "active",
      version: "1.0.0",
      hasApiKey: !!process.env.GEMINI_API_KEY
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
