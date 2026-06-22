export function HeroVisual() {
  return <div className="hero-visual" aria-hidden="true">
    <svg viewBox="0 0 620 620" role="presentation">
      <defs><linearGradient id="line" x1="0" y1="0" x2="1" y2="1"><stop stopColor="currentColor" stopOpacity=".08"/><stop offset=".5" stopColor="currentColor" stopOpacity=".7"/><stop offset="1" stopColor="#2457ff"/></linearGradient></defs>
      <circle cx="310" cy="310" r="205" fill="none" stroke="currentColor" strokeOpacity=".15"/>
      <circle className="orbit" cx="310" cy="310" r="146" fill="none" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="4 9"/>
      <path d="M75 380C178 164 426 110 545 282C449 419 315 502 75 380Z" fill="none" stroke="url(#line)"/>
      <path d="M130 235L487 391M156 451L443 159" stroke="currentColor" strokeOpacity=".12"/>
      <rect x="265" y="265" width="90" height="90" rx="2" fill="currentColor" fillOpacity=".04" stroke="currentColor" strokeOpacity=".35" transform="rotate(45 310 310)"/>
      <circle cx="487" cy="391" r="7" fill="#2457ff"/><circle cx="130" cy="235" r="3" fill="currentColor"/>
    </svg>
    <span className="annotation annotation-a">SYSTEM / 01</span><span className="annotation annotation-b">FORM × FUNCTION</span>
  </div>;
}
