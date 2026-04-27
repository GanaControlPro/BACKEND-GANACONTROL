import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const verde = [22, 163, 74];
const verdeOscuro = [20, 83, 45];
const gris = [100, 116, 139];

const formatCOP = (valor) => {
  const n = Number(valor || 0);
  return n.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
};

const hoy = () =>
  new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

export function exportarHistorialSaludPDF(eventos = [], usuario = {}) {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(...verdeOscuro);
  doc.rect(0, 0, pageWidth, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("GanaControl", 14, 16);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Reporte de Historial Clinico Sanitario", 14, 25);

  doc.setFontSize(9);
  doc.text(`Generado: ${hoy()}`, 14, 32);

  doc.setFillColor(...verde);
  doc.roundedRect(pageWidth - 55, 10, 40, 16, 4, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("SALUD", pageWidth - 43, 20);

  // Datos generales
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen del reporte", 14, 50);

  const totalEventos = eventos.length;
  const completados = eventos.filter((e) => e.estadoKey === "completado").length;
  const pendientes = eventos.filter((e) => e.estadoKey === "pendiente").length;
  const enCurso = eventos.filter((e) => e.estadoKey === "en_curso").length;
  const costoTotal = eventos.reduce((acc, e) => acc + Number(e.costo || 0), 0);

  autoTable(doc, {
    startY: 56,
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 3,
    },
    body: [
      ["Finca / Usuario", usuario?.finca || usuario?.nombres || "GanaControl"],
      ["Total eventos", String(totalEventos)],
      ["Completados", String(completados)],
      ["En curso", String(enCurso)],
      ["Pendientes", String(pendientes)],
      ["Costo total", formatCOP(costoTotal)],
    ],
    columnStyles: {
      0: { fontStyle: "bold", textColor: verdeOscuro },
      1: { textColor: gris },
    },
  });

  const yTabla = doc.lastAutoTable.finalY + 10;

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Historial clinico", 14, yTabla);

  const rows = eventos.map((ev) => [
    ev.id || ev.backendId || "",
    ev.animalCod || "",
    ev.animalNombre || "",
    ev.tipo || ev.categoria || "",
    ev.tratamiento || ev.descripcion || ev.notas || "",
    ev.vet || "Sin asignar",
    ev.fecha || ev.fechaISO || "",
    ev.estado || "",
    ev.cantidad_usada ? `${ev.cantidad_usada}` : "-",
    ev.costo ? formatCOP(ev.costo) : "-",
  ]);

  autoTable(doc, {
    startY: yTabla + 6,
    head: [[
      "ID",
      "Codigo",
      "Animal",
      "Tipo",
      "Tratamiento",
      "Veterinario",
      "Fecha",
      "Estado",
      "Cant.",
      "Costo",
    ]],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: verdeOscuro,
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 2.5,
      overflow: "linebreak",
      valign: "middle",
    },
    alternateRowStyles: {
      fillColor: [240, 253, 244],
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: 18 },
      2: { cellWidth: 22 },
      3: { cellWidth: 23 },
      4: { cellWidth: 32 },
      5: { cellWidth: 28 },
      6: { cellWidth: 22 },
      7: { cellWidth: 20 },
      8: { halign: "center", cellWidth: 14 },
      9: { halign: "right", cellWidth: 22 },
    },
    didDrawPage: () => {
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `GanaControl - Gestion ganadera | Pagina ${doc.internal.getNumberOfPages()}`,
        14,
        pageHeight - 10
      );
    },
  });

  doc.save(`historial-salud-${new Date().toISOString().split("T")[0]}.pdf`);
}