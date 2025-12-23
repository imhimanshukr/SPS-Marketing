import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vendor from "@/models/vendor.model";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { createCanvas, loadImage } from "canvas";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { vendorId, orderId } = await req.json();

    const vendor: any = await Vendor.findById(vendorId).lean();
    if (!vendor) {
      return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
    }

    const order = vendor.orderList.find((o: any) => o.orderId === orderId);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    /* ================= DATA PREPARATION ================= */
    const rows = order.accordian
      .filter(
        (r: any) =>
          String(r.orderedProductName || "").trim() ||
          String(r.orderQty || "").trim()
      )
      .map((r: any, index: number) => [
        index + 1,
        String(r.orderedProductName || ""),
        String(r.orderQty || ""),
      ]);

    /* ================= DYNAMIC HEIGHT CALCULATION ================= */
    const estimatedHeight = 25 + (rows.length * 7) + 25;
    const pageWidth = 72; 

    /* ================= PDF GENERATION ================= */
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pageWidth, estimatedHeight],
      hotfixes: ["px_scaling"],
    });

    const actualWidth = pdf.internal.pageSize.getWidth();

    /* ================= LOGO ================= */
    try {
      const logoPath = path.join(process.cwd(), "public/logo.png");
      const logoImg = await loadImage(logoPath);
      const canvas = createCanvas(logoImg.width, logoImg.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(logoImg, 0, 0);
      const logoBase64 = canvas.toDataURL("image/png");
      // Logo centered or left
      pdf.addImage(logoBase64, "PNG", 5, 2, 12, 12);
    } catch (e) {
      console.log("Logo not found or failed to load, skipping...");
    }

    /* ================= HEADER ================= */
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(vendor.vendorName.toUpperCase(), actualWidth / 2, 8, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text("7979769612, 8863811908", actualWidth / 2, 13, { align: "center" });
    pdf.text("Thathopur, Baheri", actualWidth / 2, 17, { align: "center" });

    pdf.setLineWidth(0.1);
    pdf.line(2, 20, actualWidth - 2, 20);

    /* ================= TABLE ================= */
    autoTable(pdf, {
      startY: 22,
      head: [["S.N", "Product", "Qty"]],
      body: rows,
      theme: "plain", 
      margin: { left: 2, right: 2 },
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 1,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 8, halign: "center" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 12, halign: "center" },
      },
    });

    /* ================= FOOTER ================= */
    const finalY = (pdf as any).lastAutoTable.finalY + 8;
    
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.text("SPS - Aapke Zaruraton Ka Saathi", actualWidth / 2, finalY, {
      align: "center",
    });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);

    /* ================= RESPONSE ================= */
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="bill.pdf"`,
      },
    });

  } catch (err) {
    console.error("PRINT ERROR:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
