const BOLD_OFFSET_UPPER = 0x1D5D4 - 65
const BOLD_OFFSET_LOWER = 0x1D5EE - 97
const BOLD_OFFSET_NUM   = 0x1D7EC - 48

const ITALIC_MAP = {
  a:'𝘢',b:'𝘣',c:'𝘤',d:'𝘥',e:'𝘦',f:'𝘧',g:'𝘨',h:'𝘩',i:'𝘪',j:'𝘫',k:'𝘬',
  l:'𝘭',m:'𝘮',n:'𝘯',o:'𝘰',p:'𝘱',q:'𝘲',r:'𝘳',s:'𝘴',t:'𝘵',u:'𝘶',v:'𝘷',
  w:'𝘸',x:'𝘹',y:'𝘺',z:'𝘻',A:'𝘈',B:'𝘉',C:'𝘊',D:'𝘋',E:'𝘌',F:'𝘍',G:'𝘎',
  H:'𝘏',I:'𝘐',J:'𝘑',K:'𝘒',L:'𝘓',M:'𝘔',N:'𝘕',O:'𝘖',P:'𝘗',Q:'𝘘',R:'𝘙',
  S:'𝘚',T:'𝘛',U:'𝘜',V:'𝘝',W:'𝘞',X:'𝘟',Y:'𝘠',Z:'𝘡',
}

export function toBold(text) {
  return [...text].map(c => {
    const n = c.charCodeAt(0)
    if (n >= 65 && n <= 90)  return String.fromCodePoint(n + BOLD_OFFSET_UPPER)
    if (n >= 97 && n <= 122) return String.fromCodePoint(n + BOLD_OFFSET_LOWER)
    if (n >= 48 && n <= 57)  return String.fromCodePoint(n + BOLD_OFFSET_NUM)
    return c
  }).join('')
}

export function toItalic(text) {
  return [...text].map(c => ITALIC_MAP[c] ?? c).join('')
}

export function applyFormatting(text) {
  return text
    .replace(/\*\*(.+?)\*\*/gs, (_, t) => toBold(t))
    .replace(/\*([^*\n]+?)\*/g,  (_, t) => toItalic(t))
    .replace(/^[-–]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Strips invisible characters that break LinkedIn rendering:
 * zero-width spaces, non-breaking spaces, soft hyphens,
 * Word/Notion copy-paste artifacts, BOM characters.
 */
export function cleanText(text) {
  return text
    .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, '')   // zero-width, BOM, soft-hyphen
    .replace(/\u00A0/g, ' ')                              // non-breaking space → regular space
    .replace(/[\u2018\u2019]/g, "'")                      // curly single quotes
    .replace(/[\u201C\u201D]/g, '"')                      // curly double quotes
    .replace(/\u2026/g, '...')                            // ellipsis character
    .replace(/\r\n/g, '\n')                               // Windows line endings
    .replace(/\r/g, '\n')                                 // old Mac line endings
    .replace(/[ \t]+$/gm, '')                             // trailing whitespace per line
}

/**
 * Returns the approximate line at which LinkedIn shows "see more".
 * LinkedIn collapses at roughly 210 characters or 3 line breaks.
 */
export function getSeeMoreLine(text) {
  if (text.length <= 210) return -1
  const lines = text.split('\n')
  let charCount = 0
  for (let i = 0; i < lines.length; i++) {
    charCount += lines[i].length
    if (i >= 2 || charCount > 210) return i
  }
  return -1
}
