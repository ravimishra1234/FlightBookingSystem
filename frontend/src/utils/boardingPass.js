import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

/**
 * Generates a premium boarding-pass style PDF and triggers download.
 * All data is what we already have client-side from the booking flow —
 * no backend changes required.
 */
export async function generateBoardingPass({
  passengerName,
  flight,
  seatId,
  bookingRef,
}) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [620, 280] });

  const primary = '#0D1F1A';
  const accent = '#1D6B43';
  const gray = '#9ca3af';
  const pageW = 620;

  // Background
  doc.setFillColor('#ffffff');
  doc.rect(0, 0, pageW, 280, 'F');

  // Header bar
  doc.setFillColor(primary);
  doc.rect(0, 0, pageW, 54, 'F');
  doc.setTextColor('#ffffff');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SkyJourney', 24, 34);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('BOARDING PASS', pageW - 24, 34, { align: 'right' });

  const dep = new Date(flight.departureTime);
  const arr = new Date(flight.arrivalTime);
  const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const fmtDate = (d) => d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const sourceCode = (flight.source || '').slice(0, 3).toUpperCase();
  const destCode = (flight.destination || '').slice(0, 3).toUpperCase();

  // Route — big codes, left aligned at fixed columns (no overlap risk)
  doc.setTextColor(primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.text(sourceCode, 24, 105);
  doc.text(destCode, 260, 105);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(gray);
  doc.text(flight.source || '', 24, 122);
  doc.text(flight.destination || '', 260, 122);

  // Arrow between codes — positioned in the gap, doesn't depend on text width
  doc.setDrawColor(accent);
  doc.setLineWidth(1.2);
  doc.line(160, 95, 230, 95);
  doc.setTextColor(accent);
  doc.setFontSize(13);
  doc.text('>>', 188, 99);

  // Details row
  const labelY = 152;
  const valueY = 170;
  const cols = [
    ['PASSENGER', (passengerName || 'GUEST').toUpperCase()],
    ['FLIGHT', flight.flightNumber || '-'],
    ['DATE', fmtDate(dep)],
    ['BOARDING', fmtTime(dep)],
    ['SEAT', seatId || 'TBA'],
  ];
  const colX = [24, 200, 300, 400, 500];

  cols.forEach(([label, value], i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(gray);
    doc.text(label, colX[i], labelY);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primary);
    doc.text(String(value), colX[i], valueY, { maxWidth: 95 });
  });

  // Perforated divider
  doc.setLineDashPattern([3, 2], 0);
  doc.setDrawColor('#d1d5db');
  doc.line(0, 200, pageW, 200);
  doc.setLineDashPattern([], 0);

  // Bottom stub — gate/class/ref
  const bottomLabelY = 224;
  const bottomValueY = 242;
  const bottomCols = [
    ['GATE', 'B12'],
    ['CLASS', 'Economy'],
    ['BOOKING REF', (bookingRef || 'SJ000000').toUpperCase()],
  ];
  const bottomX = [24, 120, 230];

  bottomCols.forEach(([label, value], i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(gray);
    doc.text(label, bottomX[i], bottomLabelY);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primary);
    doc.text(String(value), bottomX[i], bottomValueY);
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(gray);
  doc.text(`Arrival ${fmtTime(arr)} · ${flight.airline || ''}`, 24, 264);

  // QR Code — generated and embedded
  try {
    const qrData = JSON.stringify({
      ref: bookingRef,
      flight: flight.flightNumber,
      passenger: passengerName,
      seat: seatId,
    });
    const qrDataUrl = await QRCode.toDataURL(qrData, {
      margin: 0,
      width: 200,
      color: { dark: '#0D1F1A', light: '#ffffff' },
    });
    const qrSize = 70;
    doc.addImage(qrDataUrl, 'PNG', pageW - qrSize - 24, 196, qrSize, qrSize);
  } catch (err) {
    console.error('QR generation failed:', err);
  }

  doc.save(`SkyJourney_BoardingPass_${bookingRef || 'ticket'}.pdf`);
}
