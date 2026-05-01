"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@lib/supabase";

export default function ExpensesPage() {
  const router = useRouter();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [preview, setPreview] = useState(null);

  /* 🔒 PROTECT PAGE (OWNER ONLY) */
  useEffect(() => {
  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const role = profile?.role?.trim().toLowerCase();

    if (role !== "owner") {
      router.push("/media");
    }
  }

  checkUser();
}, []);

  async function fetchExpenses() {
    try {
      const res = await fetch("/api/expenses/list");
      const data = await res.json();
      setExpenses(data.expenses || []);
      setFiltered(data.expenses || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleOCR(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/expenses/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.data) {
        setPerson(data.data.person || "");
        setAmount(data.data.amount || "");
        setDate(data.data.date || "");
        setCategory(data.data.category || "");
        setReference(data.data.reference || "");
      }
    } catch (err) {
      console.error("OCR error:", err);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function handleSave() {
    if (!person || !amount) {
      alert("Missing person or amount");
      return;
    }

    const formData = new FormData();
    formData.append("person", person);
    formData.append("amount", amount);
    formData.append("date", date);
    formData.append("note", note);
    formData.append("category", category);
    formData.append("reference", reference);

    if (file) formData.append("file", file);

    try {
      await fetch("/api/expenses/create", {
        method: "POST",
        body: formData,
      });

      setPerson("");
      setAmount("");
      setDate("");
      setNote("");
      setCategory("");
      setReference("");
      setFile(null);

      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  }

  function applyFilter() {
    let result = [...expenses];
    if (fromDate) result = result.filter((e) => e.date >= fromDate);
    if (toDate) result = result.filter((e) => e.date <= toDate);
    setFiltered(result);
  }

  const total = filtered.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  const monthly = {};
  const categories = {};

  filtered.forEach((e) => {
    const month = e.date?.slice(0, 7) || "unknown";
    monthly[month] = (monthly[month] || 0) + Number(e.amount || 0);

    const cat = e.category || "other";
    categories[cat] = (categories[cat] || 0) + Number(e.amount || 0);
  });

  function exportExcel() {
    let csv = "Date,Person,Category,Reference,Amount\n";
    filtered.forEach((e) => {
      csv += `${e.date},${e.person},${e.category},${e.reference},${e.amount}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  }

  function exportPDF() {
    const win = window.open("", "_blank");

    const rows = filtered
      .map(
        (e) => `
      <tr>
        <td>${e.date}</td>
        <td>${e.person}</td>
        <td>${e.category}</td>
        <td>${e.reference}</td>
        <td style="text-align:right">${Number(e.amount).toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    win.document.write(`
      <html>
      <head>
        <title>Expense Report</title>
        <style>
          body { font-family: Arial; padding:20px }
          table { width:100%; border-collapse:collapse }
          td,th { border:1px solid #ccc; padding:6px }
        </style>
      </head>
      <body>
        <h2>Expense Report</h2>
        <p>${fromDate || "Start"} → ${toDate || "Now"}</p>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Person</th>
              <th>Category</th>
              <th>Reference</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <h3>Total: ${total.toFixed(2)} THB</h3>

        <script>window.onload = () => window.print()</script>
      </body>
      </html>
    `);
  }

  if (loading) {
    return <div className="bg-black text-white p-10">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen p-10 space-y-6">
      <h1 className="text-2xl">Expenses</h1>

      <div className="space-y-3 bg-[#111] p-5 rounded">
        <input className="w-full p-2 bg-gray-800" placeholder="Paid To" value={person} onChange={(e) => setPerson(e.target.value)} />
        <input className="w-full p-2 bg-gray-800" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="date" className="w-full p-2 bg-gray-800" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="w-full p-2 bg-gray-800" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="w-full p-2 bg-gray-800" placeholder="Reference" value={reference} onChange={(e) => setReference(e.target.value)} />
        <input className="w-full p-2 bg-gray-800" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />

        <input type="file" onChange={(e) => {
          const f = e.target.files?.[0];
          setFile(f || null);
          if (f) handleOCR(f);
        }} />

        <button onClick={handleSave} className="bg-white text-black px-4 py-2">
          Save Expense
        </button>
      </div>

      <div className="flex gap-4 bg-[#111] p-4 rounded">
        <input type="date" className="bg-gray-800 p-2" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" className="bg-gray-800 p-2" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={applyFilter} className="bg-white text-black px-4">Apply</button>
      </div>

      <div className="space-y-3">
        {filtered.map((exp) => (
          <div key={exp.id} className="p-4 bg-[#111] rounded">
            <div className="flex justify-between">
              <span>{exp.person}</span>
              <span>{Number(exp.amount).toFixed(2)} THB</span>
            </div>
            <div className="text-white/50 text-sm">{exp.date}</div>
            <div className="text-yellow-400 text-xs">{exp.category}</div>

            {exp.file_url && (
              <img
                src={exp.file_url}
                className="h-24 mt-2 cursor-pointer"
                onClick={() => setPreview(exp.file_url)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#111] p-6 rounded space-y-4">
        <h2 className="text-xl">Report</h2>

        <div>Total: {total.toFixed(2)} THB</div>

        <div>
          <h3>Category Totals</h3>
          {Object.entries(categories).map(([k, v]) => (
            <div key={k}>{k}: {v.toFixed(2)} THB</div>
          ))}
        </div>

        <div>
          <h3>Monthly Totals</h3>
          {Object.entries(monthly).map(([k, v]) => (
            <div key={k}>{k}: {v.toFixed(2)} THB</div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={exportPDF} className="bg-yellow-500 text-black px-3 py-1">
            Export PDF
          </button>

          <button onClick={exportExcel} className="bg-green-500 text-black px-3 py-1">
            Export Excel
          </button>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-h-[90vh]" />
        </div>
      )}
    </div>
  );
}