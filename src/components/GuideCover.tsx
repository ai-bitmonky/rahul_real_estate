const SERIF = { fontFamily: "var(--serif)" } as const;
const SANS = { fontFamily: "var(--sans)" } as const;

/** Line-art cover illustrations for the three guides. */
export default function GuideCover({ slug }: { slug: string }) {
  if (slug === "why-chinhat-is-growing") {
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="200" fill="#EDE5DA" />
        <circle cx="214" cy="70" r="26" fill="#E3CFB2" />
        <g fill="none" stroke="#A8651F" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M20 150V112h22V98h16v52M58 150V82h26v68M84 150v-44h18v44M102 150V70l16-10 16 10v80M134 150v-56h22v56M156 150v-36h14v-14h18v50M188 150V90h26v60M214 150v-40h22v40M236 150V104h16v-14h14v60" />
          <path d="M110 82h16M110 94h16M110 106h16M64 94h14M64 106h14M194 102h14M194 114h14" />
        </g>
        <path d="M0 150h300" stroke="#1F1A18" strokeWidth="1.4" />
        <path d="M150 200 138 150h24z" fill="#E2D8CB" />
        <path d="M150 152v8M150 168v10M150 186v12" stroke="#A8651F" strokeWidth="1.6" />
      </svg>
    );
  }
  if (slug === "plot-vs-apartment-2026") {
    return (
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="300" height="200" fill="#EDE5DA" />
        <rect x="150" width="150" height="200" fill="#E6DCCF" />
        <g fill="none" stroke="#A8651F" strokeWidth="1.5" strokeDasharray="4 4">
          <path d="M28 70 76 58l44 12-48 16z" />
          <path d="M28 104l44-16 48 14-48 18z" />
          <path d="M28 138l44-16 48 14-48 18z" />
        </g>
        <path d="M72 58v-26" stroke="#1F1A18" strokeWidth="1.5" />
        <path d="M72 32h18l-4 6 4 6H72" fill="#6E1A24" />
        <g fill="none" stroke="#A8651F" strokeWidth="1.6">
          <path d="M186 166V54l40-16 40 16v112" />
          <path d="M226 38v128" />
          <path d="M196 70h20M196 88h20M196 106h20M196 124h20M236 70h20M236 88h20M236 106h20M236 124h20M216 166v-22h20v22" />
        </g>
        <path d="M150 0v200" stroke="#1F1A18" strokeWidth="1" />
        <circle cx="150" cy="100" r="17" fill="#FCFAF6" stroke="#1F1A18" />
        <text x="150" y="105" textAnchor="middle" style={SERIF} fontStyle="italic" fontSize="15" fill="#1F1A18">
          vs
        </text>
        <path d="M0 166h300" stroke="#1F1A18" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="200" fill="#EDE5DA" />
      <rect x="104" y="40" width="112" height="146" rx="6" fill="#FCFAF6" stroke="#E4DBCF" transform="rotate(-6 160 113)" />
      <g transform="rotate(4 150 110)">
        <rect x="92" y="30" width="116" height="150" rx="6" fill="#FCFAF6" stroke="#A8651F" strokeWidth="1.4" />
        <path d="M110 56h60M110 70h80M110 84h72M110 98h80M110 112h50" stroke="#C9BBA8" strokeWidth="3" strokeLinecap="round" />
        <text x="110" y="48" style={SANS} fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#8A5216">
          UP RERA
        </text>
        <circle cx="176" cy="148" r="20" fill="#E8F0EA" stroke="#2F6B4F" strokeWidth="1.5" />
        <path d="M167 148l6 6 12-12" fill="none" stroke="#2F6B4F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
