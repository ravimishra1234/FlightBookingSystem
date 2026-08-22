import { useState } from 'react';
import { motion } from 'framer-motion';

// Generates a 6-across economy + 4-across business layout
const generateSeats = () => {
  const rows = [];
  // Business class — rows 1-3, 4 across (A B | C D)
  for (let r = 1; r <= 3; r++) {
    rows.push({
      row: r,
      type: 'business',
      seats: ['A', 'B', 'C', 'D'].map(letter => ({
        id: `${r}${letter}`,
        letter,
        taken: Math.random() < 0.2,
        price: 0, // included
      })),
    });
  }
  // Economy — rows 4-20, 6 across (A B C | D E F)
  for (let r = 4; r <= 20; r++) {
    const isExtraLegroom = r === 4 || r === 5;
    rows.push({
      row: r,
      type: isExtraLegroom ? 'extra' : 'economy',
      seats: ['A', 'B', 'C', 'D', 'E', 'F'].map(letter => ({
        id: `${r}${letter}`,
        letter,
        taken: Math.random() < 0.35,
        price: isExtraLegroom ? 400 : letter === 'A' || letter === 'F' ? 150 : 0,
      })),
    });
  }
  return rows;
};

const SEAT_ROWS = generateSeats();

const SeatMap = ({ onSelect, selectedSeat }) => {
  const [hoveredSeat, setHoveredSeat] = useState(null);

  const getSeatColor = (seat) => {
    if (seat.taken) return { bg: '#e5e7eb', border: '#d1d5db', cursor: 'not-allowed' };
    if (selectedSeat === seat.id) return { bg: '#1D6B43', border: '#1D6B43', cursor: 'pointer' };
    if (seat.price > 0) return { bg: '#fef3c7', border: '#fbbf24', cursor: 'pointer' };
    return { bg: '#f0fdf4', border: '#86efac', cursor: 'pointer' };
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-bold text-primary">Select your seat</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: '#f0fdf4', border: '1px solid #86efac' }} /> Free</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: '#fef3c7', border: '1px solid #fbbf24' }} /> Extra ₹</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: '#e5e7eb', border: '1px solid #d1d5db' }} /> Taken</span>
        </div>
      </div>

      {/* Plane nose */}
      <div className="flex justify-center mb-4">
        <div className="text-3xl">✈</div>
      </div>

      <div className="max-h-96 overflow-y-auto px-2">
        {SEAT_ROWS.map((rowData, idx) => (
          <div key={rowData.row}>
            {idx === 0 && (
              <p className="text-center text-xs font-semibold text-accent uppercase tracking-wide mb-2">Business Class</p>
            )}
            {rowData.row === 4 && (
              <>
                <div className="border-t border-dashed border-gray-200 my-3" />
                <p className="text-center text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">Extra Legroom</p>
              </>
            )}
            {rowData.row === 6 && (
              <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 mt-1">Economy Class</p>
            )}
            <div className="flex items-center justify-center gap-1.5 mb-1.5">
              <span className="text-xs text-gray-400 w-5 text-right mr-1">{rowData.row}</span>
              {rowData.seats.map((seat, i) => {
                const colors = getSeatColor(seat);
                const isAisleGap = rowData.type === 'business' ? i === 2 : i === 3;
                return (
                  <div key={seat.id} className="flex items-center">
                    {isAisleGap && <div className="w-4" />}
                    <motion.button
                      whileHover={!seat.taken ? { scale: 1.15 } : {}}
                      whileTap={!seat.taken ? { scale: 0.95 } : {}}
                      disabled={seat.taken}
                      onClick={() => onSelect(seat)}
                      onMouseEnter={() => setHoveredSeat(seat.id)}
                      onMouseLeave={() => setHoveredSeat(null)}
                      className="w-7 h-7 rounded-t-md flex items-center justify-center text-[10px] font-bold transition-colors"
                      style={{
                        background: colors.bg,
                        border: `1.5px solid ${colors.border}`,
                        color: selectedSeat === seat.id ? '#fff' : '#374151',
                        cursor: colors.cursor,
                      }}
                      title={seat.taken ? 'Taken' : seat.price > 0 ? `+₹${seat.price}` : 'Free'}
                    >
                      {selectedSeat === seat.id ? '✓' : seat.letter}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {hoveredSeat && (
        <p className="text-center text-xs text-gray-400 mt-3">Seat {hoveredSeat}</p>
      )}
    </div>
  );
};

export default SeatMap;
