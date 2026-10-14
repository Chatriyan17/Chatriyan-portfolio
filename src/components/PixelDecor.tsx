import React from 'react';

/**
 * Cozy pixel-art room decor for the canvas: wall, windows, bookshelves,
 * plants, lamps and rugs. Everything is purely decorative (aria-hidden,
 * pointer-events: none) and drawn as crisp SVG rects from character grids,
 * so it stays sharp at any zoom — no upscaled bitmaps.
 */

// One pixel = 4 screen px, matching the 4px pixel-outline used across the UI.
const PX = 4;

const PALETTE: Record<string, string> = {
  o: '#493529', // outline ink
  g: '#536B4B', // forest green
  G: '#3F5238', // forest shade
  s: '#9AA889', // sage
  t: '#C96F4A', // terracotta
  T: '#A5583A', // terracotta shade
  w: '#B98250', // wood
  W: '#8A5E38', // dark wood
  l: '#E8C69A', // light oak
  c: '#FFF1D6', // cream
  y: '#F7DFA0', // lamp glow
  b: '#CFE0D2', // window sky
  B: '#B4CDBE', // window sky shade
  p: '#976873', // dusty plum
  d: '#687F83', // dusty denim
};

function PixelSprite({ grid, scale = PX, className, style }: { grid: string[]; scale?: number; className?: string; style?: React.CSSProperties }) {
  const cols = grid[0].length;
  const rects: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      if (ch !== '.' && PALETTE[ch]) {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={PALETTE[ch]} />);
      }
      x += run;
    }
  });
  return (
    <svg
      width={cols * scale}
      height={grid.length * scale}
      viewBox={`0 0 ${cols} ${grid.length}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

// Leafy potted plant: overlapping leaf clusters rasterised onto the grid,
// lit from the top-left, then outlined wherever a leaf pixel meets air.
function buildPlant(): string[] {
  const W = 18;
  const LEAF_ROWS = 15;
  const leaves: [cx: number, cy: number, r: number][] = [
    [9, 6, 4.2], [5, 8.5, 3.6], [13, 8.5, 3.6], [6.5, 3.5, 2.8], [11.5, 3.5, 2.8],
    [9, 10.5, 3.2], [3, 12, 2.3], [15, 12, 2.3],
  ];
  const g = Array.from({ length: LEAF_ROWS }, () => Array(W).fill('.'));
  for (let y = 0; y < LEAF_ROWS; y++) {
    for (let x = 0; x < W; x++) {
      for (const [cx, cy, r] of leaves) {
        const dx = x + 0.5 - cx;
        const dy = y + 0.5 - cy;
        if (dx * dx + dy * dy <= r * r) {
          const lit = dx + dy;
          g[y][x] = lit < -r * 0.55 ? 's' : lit > r * 0.65 ? 'G' : 'g';
        }
      }
    }
  }
  g[LEAF_ROWS - 1][8] = g[LEAF_ROWS - 1][9] = 'G'; // stem
  const isLeaf = (x: number, y: number) => y >= 0 && y < LEAF_ROWS && x >= 0 && x < W && g[y][x] !== '.' && g[y][x] !== 'o';
  for (let y = 0; y < LEAF_ROWS; y++)
    for (let x = 0; x < W; x++)
      if (g[y][x] === '.' && (isLeaf(x - 1, y) || isLeaf(x + 1, y) || isLeaf(x, y - 1) || isLeaf(x, y + 1))) g[y][x] = 'o';
  const pot = [
    '...ooooooooooooo..',
    '...ottttttttttto..',
    '...oTTTTTTTTTTTo..',
    '....otttttttttto..',
    '....otttttttttto..',
    '....otttttttttto..',
    '....oTTTTTTTTTTo..',
    '....oooooooooooo..',
  ].map((row) => row.slice(0, W).padEnd(W, '.'));
  return [...g.map((row) => row.join('')), ...pot];
}

const PLANT = buildPlant();

const LAMP = [
  '...oooooo...',
  '..oyyyyyyo..',
  '.oyyyyyyyyo.',
  '.oyyyyyyyyo.',
  'ollllllllllo',
  'oooooooooooo',
  ...Array(20).fill('.....oo.....'),
  '...oooooo...',
  '..owwwwwwo..',
  '..oooooooo..',
];

type Book = [color: string, width: number, height: number];

// Shelves are generated from a book list so every row stays exactly in sync.
function buildBookshelf(shelves: Book[][]): string[] {
  const inner = 20;
  const bookRows = 6;
  const rows: string[] = ['o'.repeat(inner + 4), 'o' + 'w'.repeat(inner + 2) + 'o'];
  shelves.forEach((books) => {
    for (let r = 0; r < bookRows; r++) {
      let line = '';
      books.forEach(([c, w, h]) => {
        const filled = bookRows - r <= h;
        line += (filled ? c : 'W').repeat(w);
      });
      rows.push('ow' + line.padEnd(inner, 'W').slice(0, inner) + 'wo');
    }
    rows.push('ow' + 'l'.repeat(inner) + 'wo');
  });
  rows.push('o' + 'W'.repeat(inner + 2) + 'o', 'o'.repeat(inner + 4));
  return rows;
}

const BOOKSHELF = buildBookshelf([
  [['t', 2, 6], ['T', 1, 5], ['s', 2, 6], ['W', 1, 0], ['c', 2, 5], ['d', 2, 6], ['l', 1, 4], ['g', 2, 6], ['p', 2, 5], ['W', 1, 0], ['t', 2, 6], ['s', 2, 4]],
  [['g', 2, 5], ['l', 2, 6], ['p', 1, 6], ['t', 2, 5], ['W', 2, 0], ['s', 2, 6], ['d', 1, 5], ['c', 2, 6], ['T', 2, 4], ['W', 1, 0], ['g', 1, 6], ['l', 2, 5]],
  [['d', 2, 6], ['d', 1, 6], ['t', 2, 5], ['W', 1, 0], ['l', 4, 2], ['W', 1, 0], ['s', 2, 6], ['p', 2, 5], ['g', 2, 6], ['W', 1, 0], ['T', 2, 5]],
]);

function buildWindow(): string[] {
  const pane = (i: number) => {
    if (i === 7) return 'oooooooo';
    let row = '';
    for (let x = 0; x < 8; x++) {
      let ch = i < 7 ? 'b' : 'B';
      if (i < 6 && x === 5 - i) ch = 'c'; // glass glint
      if (i >= 11 && (x + i) % 3 !== 0) ch = i >= 13 ? 'g' : 's'; // tree tops
      row += ch;
    }
    return row;
  };
  const rows = ['o'.repeat(24), 'o' + 'w'.repeat(22) + 'o', 'ow' + 'o'.repeat(20) + 'wo'];
  for (let i = 0; i < 16; i++) rows.push('ow' + 'o' + pane(i) + 'oo' + pane(i) + 'o' + 'wo');
  rows.push('ow' + 'o'.repeat(20) + 'wo', 'l'.repeat(24), 'w'.repeat(24), 'o'.repeat(24));
  return rows;
}

const WINDOW = buildWindow();

// Terracotta sofa: drawn as overlapping outlined blocks (back, seat, arms).
function buildSofa(): string[] {
  const W = 30;
  const H = 14;
  const g = Array.from({ length: H }, () => Array(W).fill('.'));
  const block = (x0: number, y0: number, x1: number, y1: number, fill: string) => {
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++)
        g[y][x] = y === y0 || y === y1 || x === x0 || x === x1 ? 'o' : fill;
  };
  block(3, 0, 26, 8, 't'); // back
  for (let x = 4; x <= 25; x++) g[1][x] = 'l'; // back highlight
  block(7, 3, 11, 7, 'c'); // cushion
  block(18, 3, 22, 7, 's'); // cushion
  block(4, 7, 25, 12, 't'); // seat
  for (let y = 8; y <= 11; y++) g[y][14] = 'T'; // seam
  for (let x = 5; x <= 24; x++) g[11][x] = 'T';
  block(0, 4, 5, 12, 't'); // left arm
  block(24, 4, 29, 12, 't'); // right arm
  g[5][1] = g[5][2] = g[5][3] = g[5][4] = 'l';
  g[5][25] = g[5][26] = g[5][27] = g[5][28] = 'l';
  for (const x of [2, 3, 26, 27]) g[13][x] = 'W'; // legs
  return g.map((row) => row.join(''));
}

const SOFA = buildSofa();

const Placed: React.FC<{ x: number; y: number; children: React.ReactNode }> = ({ x, y, children }) => {
  return (
    <div className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
      {children}
    </div>
  );
};

function Rug({ x, y, w, h, variant }: { x: number; y: number; w: number; h: number; variant: 'sage' | 'cream' | 'terracotta' }) {
  const border = variant === 'sage' ? '#536B4B' : variant === 'cream' ? '#B98250' : '#C96F4A';
  const fill = variant === 'sage' ? 'pixel-checker-sage' : 'pixel-checker-cream';
  return (
    <div
      className="absolute pixel-outline"
      style={{ left: x - w / 2, top: y - h / 2, width: w, height: h, backgroundColor: border, padding: 12 }}
    >
      <div className={`w-full h-full ${fill}`} style={{ boxShadow: `inset 0 0 0 4px ${variant === 'sage' ? '#7A8D6B' : '#E8C69A'}` }} />
    </div>
  );
}

// Back wall at the top of the room: wallpaper, wainscot, baseboard + windows.
function BackWall() {
  const WALL_BOTTOM = -640;
  const WALL_HEIGHT = 800;
  return (
    <div
      className="absolute"
      style={{
        left: -2000,
        width: 4000,
        top: WALL_BOTTOM - WALL_HEIGHT,
        height: WALL_HEIGHT,
        backgroundColor: '#F3E2BF',
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent 0 28px, rgba(185,130,80,0.18) 28px 32px)',
      }}
    >
      {/* crown trim */}
      <div className="absolute left-0 right-0 top-0 h-6" style={{ background: '#B98250', boxShadow: '0 4px 0 0 #493529' }} />
      {/* wainscot panels */}
      <div
        className="absolute left-0 right-0 bottom-4 h-[120px]"
        style={{
          backgroundColor: '#C9935F',
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 88px, #8A5E38 88px 92px, transparent 92px 96px)',
          boxShadow: '0 -4px 0 0 #493529, inset 0 4px 0 0 #E8C69A, inset 0 12px 0 0 #B98250',
        }}
      />
      {/* baseboard */}
      <div className="absolute left-0 right-0 bottom-0 h-4" style={{ background: '#8A5E38', boxShadow: '0 4px 0 0 #493529, 0 12px 0 0 rgba(73,53,41,0.25)' }} />
    </div>
  );
}

export default function RoomDecor() {
  return (
    <div className="absolute top-0 left-0 pointer-events-none select-none z-0" aria-hidden="true">
      <BackWall />

      {[-1300, -900, -500, 500, 900, 1300].map((wx) => (
        <Placed key={wx} x={wx} y={-850}><PixelSprite grid={WINDOW} scale={5} /></Placed>
      ))}

      {/* Rugs (zones) */}
      <Rug x={0} y={10} w={760} h={330} variant="sage" />
      <Rug x={-680} y={55} w={500} h={290} variant="cream" />
      <Rug x={700} y={-300} w={460} h={250} variant="terracotta" />

      {/* Furniture against the wall */}
      <Placed x={-270} y={-640}><PixelSprite grid={BOOKSHELF} scale={6} /></Placed>
      <Placed x={-1150} y={-640}><PixelSprite grid={BOOKSHELF} scale={6} /></Placed>
      <Placed x={1150} y={-640}><PixelSprite grid={BOOKSHELF} scale={6} /></Placed>

      {/* Lounge */}
      <Placed x={-1160} y={-320}><PixelSprite grid={SOFA} scale={6} /></Placed>

      {/* Plants */}
      <Placed x={-760} y={-600}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={330} y={-600}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={-960} y={-150}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={-340} y={-150}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={390} y={190}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={40} y={340}><PixelSprite grid={PLANT} scale={5} /></Placed>
      <Placed x={1200} y={-100}><PixelSprite grid={PLANT} scale={5} /></Placed>

      {/* Floor lamps */}
      <Placed x={-1000} y={40}><PixelSprite grid={LAMP} scale={5} /></Placed>
      <Placed x={-300} y={250}><PixelSprite grid={LAMP} scale={5} /></Placed>
      <Placed x={1200} y={180}><PixelSprite grid={LAMP} scale={5} /></Placed>
    </div>
  );
}

export { PixelSprite };
