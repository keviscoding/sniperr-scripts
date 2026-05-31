/* ============================================================
   SNIPERR — shared interactions (all game pages)
   ============================================================ */

// ---- FAQ accordion ----
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ---- Feature tabs ----
document.querySelectorAll('.feature-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.feature-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.feature-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const el = document.getElementById(`tab-${tab.dataset.tab}`);
        if (el) el.classList.add('active');
    });
});

// ---- Platform tabs ----
document.querySelectorAll('.platform-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ---- Sticky nav ----
const navWrap = document.getElementById('navWrap');
if (navWrap) {
    const onScroll = () => navWrap.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll); onScroll();
}

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Animated counters ----
function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1300, start = performance.now();
    function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countObserver.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ---- Profile / capability grid (per-page via window.SNIPERR_GRID) ----
(function grid() {
    const wg = document.getElementById('weaponGrid');
    if (!wg) return;
    const items = window.SNIPERR_GRID || [];
    wg.innerHTML = items.map(([n, p, unit]) => `
        <div class="weapon-card">
            <div class="wname">${n}</div>
            <div class="wbar"><span style="width:${p}%"></span></div>
            <div class="wpct">${unit || 'recoil'} <b>${unit ? p + '%' : '-' + p + '%'}</b></div>
        </div>`).join('');
})();

// ---- Mods grid (per-page via window.SNIPERR_MODS = [[name, blurb], ...]) ----
(function mods() {
    const host = document.getElementById('modsGrid');
    if (!host) return;
    const items = window.SNIPERR_MODS || [];
    host.innerHTML = items.map(([n, b]) => `
        <div class="mod-card">
            <div class="mod-check">+</div>
            <div><div class="mod-name">${n}</div><div class="mod-blurb">${b}</div></div>
        </div>`).join('');
})();

// ---- Interactive demo: recoil (default) or auto-green (data-mode="green") ----
(function demo() {
    const canvas = document.getElementById('recoilCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const mode = canvas.dataset.mode || 'recoil';
    let t = 0, target = 0, raf = null;
    const lerp = (a, b, k) => a + (b - a) * k;
    let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

    function grid() {
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
        for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
        for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    }

    // ---------- RECOIL ----------
    const aim = { x: W / 2, y: H * 0.34 };
    const shots = [];
    for (let i = 0; i < 30; i++) {
        const climb = i / 30;
        shots.push({
            offX: aim.x + (rnd() - 0.5) * 150 * (0.4 + climb), offY: aim.y - climb * H * 0.5 - rnd() * 18,
            onX: aim.x + (rnd() - 0.5) * 24, onY: aim.y - climb * 46 - rnd() * 6,
        });
    }
    function drawRecoil() {
        ctx.clearRect(0, 0, W, H); grid();
        ctx.strokeStyle = 'rgba(61,240,224,0.5)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(aim.x, aim.y, 30, 0, 6.29); ctx.stroke();
        ctx.beginPath(); ctx.arc(aim.x, aim.y, 8, 0, 6.29); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(aim.x - 42, aim.y); ctx.lineTo(aim.x + 42, aim.y); ctx.moveTo(aim.x, aim.y - 42); ctx.lineTo(aim.x, aim.y + 42); ctx.stroke();
        ctx.beginPath();
        shots.forEach((s, i) => { const x = lerp(s.offX, s.onX, t), y = lerp(s.offY, s.onY, t); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
        ctx.strokeStyle = `rgba(${lerp(248,124,t)},${lerp(113,92,t)},${lerp(113,252,t)},0.35)`; ctx.lineWidth = 2; ctx.stroke();
        shots.forEach((s) => {
            const x = lerp(s.offX, s.onX, t), y = lerp(s.offY, s.onY, t);
            const hit = Math.hypot(x - aim.x, y - aim.y) < 30;
            ctx.beginPath(); ctx.arc(x, y, 4.5, 0, 6.29);
            ctx.fillStyle = hit ? `rgba(61,240,224,${0.55 + 0.45 * t})` : `rgba(248,113,113,${0.7 - 0.3 * t})`; ctx.fill();
        });
        setReadouts([
            Math.round(lerp(100, 35, t)) + '%',
            Math.round(lerp(42, 6, t)) + ' px',
            Math.round(lerp(11, 30, t)) + ' / 30',
            t > 0.5 ? '0.0s lock' : '—',
        ]);
    }

    // ---------- AUTO-GREEN ----------
    const barX0 = 70, barX1 = W - 70, barY = H * 0.5, gx0 = W * 0.46, gx1 = W * 0.54;
    const releases = [];
    for (let i = 0; i < 12; i++) {
        releases.push({
            offX: barX0 + 30 + rnd() * (barX1 - barX0 - 60),
            onX: gx0 + rnd() * (gx1 - gx0),
            y: barY - 70 + (i / 12) * 140,
        });
    }
    function drawGreen() {
        ctx.clearRect(0, 0, W, H); grid();
        // bar track
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        roundRect(barX0, barY - 16, barX1 - barX0, 32, 8); ctx.fill();
        // green window
        const ggrad = ctx.createLinearGradient(gx0, 0, gx1, 0);
        ggrad.addColorStop(0, 'rgba(52,211,153,0.5)'); ggrad.addColorStop(1, 'rgba(61,240,224,0.6)');
        ctx.fillStyle = ggrad; roundRect(gx0, barY - 16, gx1 - gx0, 32, 6); ctx.fill();
        ctx.fillStyle = 'rgba(61,240,224,0.9)'; ctx.font = '11px JetBrains Mono, monospace'; ctx.textAlign = 'center';
        ctx.fillText('PERFECT', (gx0 + gx1) / 2, barY - 26);
        // release markers
        releases.forEach((r) => {
            const x = lerp(r.offX, r.onX, t);
            const inGreen = x >= gx0 - 4 && x <= gx1 + 4;
            ctx.strokeStyle = inGreen ? `rgba(61,240,224,0.95)` : `rgba(248,113,113,0.8)`;
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x, r.y); ctx.lineTo(x, r.y + 18); ctx.stroke();
            ctx.beginPath(); ctx.arc(x, r.y, 3.5, 0, 6.29);
            ctx.fillStyle = inGreen ? 'rgba(61,240,224,1)' : 'rgba(248,113,113,0.9)'; ctx.fill();
        });
        ctx.textAlign = 'left';
        setReadouts([
            Math.round(lerp(41, 97, t)) + '%',
            '±' + Math.round(lerp(38, 3, t)) + ' ms',
            Math.round(lerp(4, 10, t)) + ' / 10',
            t > 0.5 ? 'GREEN' : '—',
        ]);
    }
    function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

    const draw = mode === 'green' ? drawGreen : drawRecoil;

    function setReadouts(vals) {
        document.querySelectorAll('.demo-readouts .v').forEach((el, i) => { if (vals[i] !== undefined) el.textContent = vals[i]; });
    }
    function animateTo(val) {
        target = val; if (raf) return;
        const tick = () => {
            t += (target - t) * 0.12;
            if (Math.abs(target - t) < 0.002) { t = target; draw(); raf = null; return; }
            draw(); raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
    }

    const badge = document.getElementById('recoilBadge');
    const btnOn = document.getElementById('btnOn');
    const btnOff = document.getElementById('btnOff');
    function setState(on) {
        if (btnOn) btnOn.classList.toggle('active', on);
        if (btnOff) btnOff.classList.toggle('active', !on);
        if (badge) { badge.textContent = 'SNIPERR: ' + (on ? 'ON' : 'OFF'); badge.classList.toggle('on', on); badge.classList.toggle('off', !on); }
        animateTo(on ? 1 : 0);
    }
    if (btnOn) btnOn.addEventListener('click', () => setState(true));
    if (btnOff) btnOff.addEventListener('click', () => setState(false));

    draw();
    let demoed = false;
    new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting && !demoed) { demoed = true; setTimeout(() => setState(true), 700); } });
    }, { threshold: 0.5 }).observe(canvas);
})();

// ---- Polar tracking diagram (only if present) ----
(function trackVis() {
    const host = document.getElementById('trackVis');
    if (!host) return;
    const c = document.createElement('canvas');
    c.width = 520; c.height = 300; c.style.width = '100%'; c.style.height = '100%';
    host.appendChild(c);
    const ctx = c.getContext('2d'); const W = c.width, H = c.height; let f = 0;
    (function loop() {
        f++; ctx.clearRect(0, 0, W, H);
        const tx = W / 2 + Math.sin(f * 0.02) * 150, ty = H / 2 + Math.sin(f * 0.045) * 40;
        const rx = W / 2 + Math.sin(f * 0.02 - 0.18) * 150, ry = H / 2 + Math.sin(f * 0.045 - 0.18) * 40;
        ctx.fillStyle = 'rgba(124,92,252,0.25)'; ctx.beginPath(); ctx.arc(tx, ty, 22, 0, 6.29); ctx.fill();
        ctx.fillStyle = 'rgba(124,92,252,0.9)'; ctx.beginPath(); ctx.arc(tx, ty, 7, 0, 6.29); ctx.fill();
        ctx.strokeStyle = 'rgba(61,240,224,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(rx, ry, 26, 0, 6.29); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(rx - 34, ry); ctx.lineTo(rx - 14, ry); ctx.moveTo(rx + 14, ry); ctx.lineTo(rx + 34, ry);
        ctx.moveTo(rx, ry - 34); ctx.lineTo(rx, ry - 14); ctx.moveTo(rx, ry + 14); ctx.lineTo(rx, ry + 34); ctx.stroke();
        ctx.fillStyle = 'rgba(61,240,224,0.85)'; ctx.font = '11px JetBrains Mono, monospace'; ctx.fillText('TRACKING LOCK', rx + 34, ry - 30);
        requestAnimationFrame(loop);
    })();
})();

// ---- Exit-intent coupon ($10 off, SNIPERR04) ----
(function coupon() {
    const CODE = (window.SNIPERR_COUPON || 'SNIPERR04');
    const checkout = window.SNIPERR_CHECKOUT ||
        (document.querySelector('a[href*="whop.com/checkout"]') || {}).href || '#';
    const KEY = 'sniperr_coupon_seen';
    let armed = false, shown = false, intent = false;

    // Don't bug buyers: if they click any checkout link, never show.
    document.querySelectorAll('a[href*="whop.com/checkout"]').forEach(a =>
        a.addEventListener('click', () => { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} }));

    // Build modal
    const overlay = document.createElement('div');
    overlay.className = 'coupon-overlay';
    overlay.innerHTML = `
        <div class="coupon-card">
            <button class="coupon-close" aria-label="Close">&times;</button>
            <div class="coupon-eyebrow">BEFORE YOU GO</div>
            <h3>Don't leave empty-handed.<br><span class="grad">$10 off your first script.</span></h3>
            <p>You read this far for a reason. Lock in the price, join the players already beaming in ranked, and take $10 off — on us.</p>
            <div class="coupon-code-box">
                <span class="coupon-code">${CODE}</span>
                <button class="coupon-copy">Copy</button>
            </div>
            <a class="btn btn-primary btn-arrow" id="couponCta" href="${checkout}">Claim $10 Off &amp; Get Sniperr</a>
            <button class="coupon-decline">No thanks, I'll pay full price</button>
            <p class="coupon-fine">Apply code <b>${CODE}</b> at checkout. First script only.</p>
        </div>`;
    document.body.appendChild(overlay);

    const close = () => overlay.classList.remove('show');
    const open = () => {
        if (shown) return;
        try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}
        // Don't show the coupon if they came back from the checkout/upgrade page
        // (they were about to pay full price — don't undercut them).
        try { if (document.referrer && document.referrer.includes('upgrade.html')) return; } catch (e) {}
        try { if (document.referrer && document.referrer.includes('whop.com')) return; } catch (e) {}
        shown = true; overlay.classList.add('show');
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    };
    overlay.querySelector('.coupon-close').addEventListener('click', close);
    overlay.querySelector('.coupon-decline').addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.coupon-copy').addEventListener('click', (e) => {
        try {
            if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(CODE); }
            else { const t=document.createElement('textarea'); t.value=CODE; t.style.position='fixed'; t.style.opacity='0'; document.body.appendChild(t); t.focus(); t.select(); document.execCommand('copy'); document.body.removeChild(t); }
        } catch(_){}
        e.target.textContent = 'Copied'; e.target.classList.add('copied');
    });
    overlay.querySelector('#couponCta').addEventListener('click', () => { try { sessionStorage.setItem(KEY, '1'); } catch (e) {} });

    // Arm only once they've genuinely read the page (deep scroll).
    const checkArm = () => {
        const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrolled >= 0.6) { armed = true; window.removeEventListener('scroll', checkArm); }
    };
    window.addEventListener('scroll', checkArm); checkArm();

    // Desktop: cursor leaves toward the top (closing tab / address bar).
    document.addEventListener('mouseout', (e) => {
        if (armed && !e.relatedTarget && e.clientY <= 0) open();
    });

    // Mobile: reached the bottom, then flicks back up to leave.
    let lastY = window.scrollY, reachedBottom = false;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if ((y + window.innerHeight) / document.body.scrollHeight >= 0.85) reachedBottom = true;
        if (armed && reachedBottom && lastY - y > 60 && y < document.body.scrollHeight * 0.5) open();
        lastY = y;
    }, { passive: true });
})();

// ---- Microsoft Clarity (set window.SNIPERR_CLARITY_ID to enable) ----
(function clarity() {
    const id = window.SNIPERR_CLARITY_ID;
    if (!id) return;
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", id);
})();

// ---- Clip audio (click to unmute/mute) ----
(function clipAudio() {
    document.querySelectorAll('.clip-tile').forEach(tile => {
        const vid = tile.querySelector('video');
        if (!vid) return;
        const btn = document.createElement('span');
        btn.className = 'clip-audio';
        btn.textContent = '\uD83D\uDD07';  // muted icon
        btn.title = 'Tap to unmute';
        tile.appendChild(btn);
        btn.addEventListener('click', e => {
            e.stopPropagation();
            vid.muted = !vid.muted;
            btn.textContent = vid.muted ? '\uD83D\uDD07' : '\uD83D\uDD0A';
            btn.classList.toggle('on', !vid.muted);
            btn.title = vid.muted ? 'Tap to unmute' : 'Tap to mute';
        });
        tile.addEventListener('click', () => {
            vid.muted = !vid.muted;
            btn.textContent = vid.muted ? '\uD83D\uDD07' : '\uD83D\uDD0A';
            btn.classList.toggle('on', !vid.muted);
        });
    });
})();

// ---- Checkout routing (via upgrade page) ----
(function checkoutRoute() {
    const cfg = window.SNIPERR_CHECKOUT;
    if (!cfg || !cfg.game) return;
    const upgradeUrl = "upgrade.html?game=" + encodeURIComponent(cfg.game);
    document.querySelectorAll('a[href*="whop.com/checkout"]').forEach(a => {
        a.href = upgradeUrl;
    });
    // Also update the sticky-price CTA if present.
    const spCta = document.querySelector('.sticky-price .sp-cta');
    if (spCta) spCta.href = upgradeUrl;
})();

// ---- Sticky price reminder (shows when hero scrolls out of view) ----
(function stickyPrice() {
    const hero = document.querySelector('.section.hero');
    if (!hero) return;
    const bar = document.createElement('div');
    bar.className = 'sticky-price';
    const cfg = window.SNIPERR_CHECKOUT || {};
    const upgradeUrl = cfg.game ? ("upgrade.html?game=" + cfg.game) : "#";
    bar.innerHTML = '<span class="sp-old">$80</span><span class="sp-new">$50</span><span class="sp-label">one-time</span><a class="sp-cta" href="' + upgradeUrl + '">Get Sniperr &rarr;</a>';
    document.body.appendChild(bar);
    const obs = new IntersectionObserver(entries => {
        bar.classList.toggle('show', !entries[0].isIntersecting);
    }, { threshold: 0 });
    obs.observe(hero);
})();
