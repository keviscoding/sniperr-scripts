const HEIGHTS = ["5'7","5'9","5'11","6'0","6'1","6'3","6'5","6'6","6'8","6'10","7'0","7'2","7'4"];
const TIMING_MAP = [720,740,760,775,790,800,815,830,850,870,900,930,950];

const heightSlider = document.getElementById('build-height');
const heightDisplay = document.getElementById('height-display');
const timingValue = document.getElementById('timing-value');
const agTimingSlider = document.getElementById('ag-timing');
const agTimeDisplay = document.getElementById('agtime-display');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

function updateHeight() {
    const idx = parseInt(heightSlider.value);
    heightDisplay.textContent = HEIGHTS[idx];
    const t = TIMING_MAP[idx];
    agTimingSlider.value = t;
    agTimeDisplay.textContent = t;
    timingValue.textContent = t;
    updateSliderProgress(heightSlider);
    updateSliderProgress(agTimingSlider);
}
function updateAgTiming() {
    agTimeDisplay.textContent = agTimingSlider.value;
    timingValue.textContent = agTimingSlider.value;
    updateSliderProgress(agTimingSlider);
}
function updateSliderProgress(s) {
    s.style.setProperty('--progress', ((s.value - s.min) / (s.max - s.min)) * 100 + '%');
}

heightSlider.addEventListener('input', updateHeight);
agTimingSlider.addEventListener('input', updateAgTiming);
resetBtn.addEventListener('click', () => {
    heightSlider.value = 8; agTimingSlider.value = 850;
    document.getElementById('btn-tempo').checked = true;
    document.getElementById('auto-green').checked = true;
    document.getElementById('rs-shooting').checked = false;
    document.getElementById('inf-stamina').checked = true;
    document.getElementById('dribbles').checked = true;
    document.getElementById('ai-defense').checked = true;
    document.getElementById('spot-take').checked = false;
    document.getElementById('turbo-mode').value = '1';
    document.getElementById('quick-stop').value = '1';
    document.getElementById('meter-dunk').value = '0';
    document.getElementById('sq-remap').value = '0';
    updateHeight();
});
downloadBtn.addEventListener('click', generateScript);
updateHeight();

function generateScript() {
    const s = {
        sm: parseInt(agTimingSlider.value),
        f1: document.getElementById('btn-tempo').checked ? 1 : 0,
        ia: document.getElementById('auto-green').checked ? 1 : 0,
        rs: document.getElementById('rs-shooting').checked ? 1 : 0,
        is: document.getElementById('inf-stamina').checked ? 1 : 0,
        da: document.getElementById('ai-defense').checked ? 1 : 0,
        sp: document.getElementById('spot-take').checked ? 1 : 0,
        tm: parseInt(document.getElementById('turbo-mode').value),
        aq: parseInt(document.getElementById('quick-stop').value),
        md: parseInt(document.getElementById('meter-dunk').value),
        rm: parseInt(document.getElementById('sq-remap').value),
    };
    let du=2,dd=3,dl=5,dr=5;
    if(!document.getElementById('dribbles').checked){du=0;dd=0;dl=0;dr=0;}
    const hash = Math.floor(Math.random()*60000)+10000;
    const gpc = buildGPC(s, du, dd, dl, dr, hash);
    const blob = new Blob([gpc], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sniperr_2K26_' + HEIGHTS[heightSlider.value].replace("'","") + '.gpc';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function buildGPC(s, du, dd, dl, dr, hash) {
    return `/*
   Sniperr \u2014 NBA 2K26 Cronus Zen Script
   sniperr.store | All rights reserved.
*/
int _f1 = ${s.f1};
int _d1 = 2;
int _rm = ${s.rm};
int _rs = ${s.rs};
int _rht = 300;
int _np = 19;
int _aq = ${s.aq};
int _l2r = 0;
int _de = 1;
int _du = ${du};
int _dd = ${dd};
int _dl = ${dl};
int _dr = ${dr};
int _is = ${s.is};
int _gcn = 70;
int _gcx = 100;
int _gcc = 100;
int _gsa = 1;
int _mt = 0;
int _rdl = 800;
int _rdr = 1000;
int _ia = ${s.ia};
int _sm = ${s.sm};
int _tsa = 1;
int _tsd = 500;
int _md = ${s.md};
int _sp = ${s.sp};
int _it = 1;
int _tc1 = 10000;
int _tc2 = 10000;
int _tc3 = 10000;
int _me, _ix, _sb, _ja, _ra, _ta, _ca, _rda, _ft, _cb, _ih, _ht, _riu, _r1o, _tf, _pg, _r5, _r18, _ms, _tt, _qt;
int _ct = 0;
int _mdo = 0;
const string onOff[] = {"OFF", "ON", ""};
const string _rmm[] = {"L3", "R3", "L1", "R1"};
const string _rmx[] = {"L3", "R3", "LB", "RB"};
const string _aqm[] = {"OFF", "Auto", "L2"};
const string _aqx[] = {"OFF", "Auto", "LT"};
const string _ml[] = {"ms"};
const string _mdp[] = {"OFF", "L1", "Circle"};
const string _mdx[] = {"OFF", "LB", "B"};
const string _spl[] = {"OFF", "ON"};
const string _splx[] = {"OFF", "ON"};
const string dribble_names[] = {"Off", "BTB Spam", "Curry", "DBook", "B Break", "Escape", "Momentum"};
const string _tsn[] = {"Fast", "Normal", "Slow"};
int _tmn[3];
int _tmx[3];
const string menu_header[] = {"AI Button Tempo", "Tempo", "Auto-Green", "Auto-Green Timing", "Auto-Green Tempo", "Turbo Shots", "Auto-Green Fades", "Auto-Green No-Dip", "SQ/X Remap", "RS Shooting", "AI Defense", "Quick-Stop", "Infinite Stamina", "Dribble Up", "Dribble Down", "Dribble Left", "Dribble Right", "Meter Dunk", "Spot-Take", "Sniperr Pro"};
const string menu_headerX[] = {"AI Button Tempo", "Tempo", "Auto-Green", "Auto-Green Timing", "Auto-Green Tempo", "Turbo Shots", "Auto-Green Fades", "Auto-Green No-Dip", "SQ/X Remap", "RS Shooting", "AI Defense", "Quick-Stop", "Infinite Stamina", "Dribble Up", "Dribble Down", "Dribble Left", "Dribble Right", "Meter Dunk", "Spot-Take", "Sniperr Pro"};
const string _lkd[] = {"Pro Only"};
const string _upd[] = {"Upgrade at:"};
const string _upl[] = {"sniperr.store"};
const string _aqo[] = {"OFF", "Auto", "L2"};
const string _tmo[] = {"Hop Jumper", "Turbo Fade", "OFF"};
const string _HL[] = {"Sniperr"};
const string _UL[] = {"Sniperr"};
int _tm = ${s.tm};
int _da = ${s.da};
int _fua = 1;
int _rvn = -3; int _rvx = 3; int _rhn = -2; int _rhx = 2;
int _sdv = 100; int _suv = -100; int _rn = -3; int _rx = 3; int _hrn = -2; int _hrx = 2;
int _mhu = 0; int _mhd = 0; int _mht = 0; int _mhdl = 200; int _mhr = 25;
int _tw, _ow; int _th = 12; int _oh = 12; int _wme = 0;
const string SNIPERR_BRAND[] = {"Sniperr"};
const string _BN[] = {"Sniperr"};
int _hx, _hy, _px, _py, _bob;
int _ict = 0; int _ics = 0; int _ici = 4000; int _ssp = 0; int _rsp = 0;
int _gw, _xs, _mx, _bp; int _fl = 0; int _fld = 0;
int _dti, _dtx, _tdt, _cdt; int _nbi, _ndi, _nci;
int _anim_timer = 0;
int s1x=127, s2x=100, s3x=75, s4x=50, s5x=25;
int s1y=10, s2y=25, s3y=40, s4y=55, s5y=5;
const string _cpy[] = {"sniperr.store"};
const string _GT[] = {"NBA 2K26"};
const string _VT[] = {"Version 1"};
` + SCRIPT_BODY + `
define GEN_HASH = ${hash};
function InitializeGeneratorSettings() {
    if (get_pvar(SPVAR_40, 0, 32767, 0) != GEN_HASH) {
    set_pvar(SPVAR_1, ${s.f1}); set_pvar(SPVAR_11, ${s.ia}); set_pvar(SPVAR_12, ${s.sm});
    set_pvar(SPVAR_3, ${s.rs}); set_pvar(SPVAR_9, ${s.tm}); set_pvar(SPVAR_5, ${s.aq});
    set_pvar(SPVAR_27, ${s.is}); set_pvar(SPVAR_2, ${s.rm}); set_pvar(SPVAR_8, ${s.da});
    set_pvar(SPVAR_13, ${s.md}); set_pvar(SPVAR_14, ${s.sp}); set_pvar(SPVAR_4, 2);
    set_pvar(SPVAR_40, GEN_HASH);
    }
}
` + SCRIPT_MAIN + SCRIPT_COMBOS + SCRIPT_SAVE_LOAD;
}

const SCRIPT_BODY = `function _ude() { if (_du > 0 || _dd > 0 || _dl > 0 || _dr > 0) { _de = 1; } else { _de = 0; } }
function _dpd(c, t) { _tdt = t; _cdt = c; _dtx = (128 - (_tdt * 7 - 3)) / 2; for (_dti = 0; _dti < _tdt; _dti++) { if (_dti == _cdt) { rect_oled(_dtx + (_dti * 7), 56, 4, 4, 1, OLED_WHITE); } else { rect_oled(_dtx + (_dti * 7), 56, 4, 4, 1, OLED_WHITE); rect_oled(_dtx + (_dti * 7) + 1, 57, 2, 2, 1, OLED_BLACK); } } }
function _dtp(x, y, o) { rect_oled(x, y, 24, 12, 1, OLED_WHITE); rect_oled(x + 1, y + 1, 22, 10, 1, OLED_BLACK); if (o) { rect_oled(x + 13, y + 2, 8, 8, 1, OLED_WHITE); } else { rect_oled(x + 3, y + 2, 8, 8, 1, OLED_WHITE); rect_oled(x + 4, y + 3, 6, 6, 1, OLED_BLACK); } }
function _dch(x, y) { line_oled(x, y, x + 4, y + 4, 1, OLED_WHITE); line_oled(x + 4, y + 4, x, y + 8, 1, OLED_WHITE); }
function _ntsa(fv, fd, px, py) { _nbi = 1; _ndi = 10000; if (fv < 0) { putc_oled(_nbi, 45); _nbi += 1; fv = abs(fv); } for (_nci = 5; _nci >= 1; _nci--) { if (fd >= _nci) { putc_oled(_nbi, (fv / _ndi) + 48); fv %= _ndi; _nbi++; } _ndi /= 10; } puts_oled(px, py, OLED_FONT_MEDIUM, _nbi - 1, OLED_WHITE); }
function _dxg(v, mn, mx, yp) { _gw = 100; _xs = (128 - _gw) / 2; _mx = _xs + _gw / 2; _bp = _map(v, mn, mx, 0, _gw); if (_bp < 0) _bp = 0; if (_bp > 100) _bp = 100; line_oled(_xs, yp, _xs + _gw, yp, 1, OLED_WHITE); line_oled(_mx, yp - 3, _mx, yp + 3, 1, OLED_WHITE); line_oled(_xs, yp - 2, _xs, yp + 2, 1, OLED_WHITE); line_oled(_xs + _gw, yp - 2, _xs + _gw, yp + 2, 1, OLED_WHITE); rect_oled(_xs, yp - 2, _bp, 4, 1, OLED_WHITE); }
function _map(v, imn, imx, omn, omx) { return (v - imn) * (omx - omn) / (imx - imn) + omn; }
combo _mc { if (_is && _gsa && !_mdo && !_ssp && !_rsp && !get_val(PS4_SQUARE) && !combo_running(_furs) && !combo_running(_furr) && !combo_running(_tss) && !combo_running(_tsr) && !combo_running(_ruc) && !combo_running(_rdc)) { if (abs(get_val(PS4_LX)) > 20 || abs(get_val(PS4_LY)) > 20) { _mt = _mt + get_rtime() + (_tc1 / _tc1) - 1; if (_mt <= _rdl) { _gcc = _gcx; } else if (_mt <= _rdl + _rdr) { _gcc = _gcx - ((_gcx - _gcn) * (_mt - _rdl) / _rdr); } else { _gcc = _gcn; } set_val(PS4_LX, (get_val(PS4_LX) * _gcc) / 100); set_val(PS4_LY, (get_val(PS4_LY) * _gcc) / 100); } else { _mt = 0; _gcc = _gcx; } if (abs(get_val(PS4_LX)) < 20 && abs(get_val(PS4_LY)) < 20) { set_val(PS4_LX, 0); set_val(PS4_LY, 0); } } }
function _aoc() { set_rgb(0, 200, 50); }
function _ulm(o) { if (o) { _aoc(); } else { set_rgb(0, 0, 0); } }
function _dis() { cls_oled(0); _anim_timer = _anim_timer + get_rtime(); if (_anim_timer >= 30) { _anim_timer = 0; s1x -= 2; if (s1x < 0) { s1x = 127; s1y = random(2, 45); } s2x -= 1; if (s2x < 0) { s2x = 127; s2y = random(2, 45); } s3x -= 3; if (s3x < 0) { s3x = 127; s3y = random(2, 45); } s4x -= 2; if (s4x < 0) { s4x = 127; s4y = random(2, 45); } s5x -= 1; if (s5x < 0) { s5x = 127; s5y = random(2, 45); } } rect_oled(s1x, s1y, 1, 1, 1, OLED_WHITE); rect_oled(s2x, s2y, 2, 2, 1, OLED_WHITE); rect_oled(s3x, s3y, 1, 1, 1, OLED_WHITE); rect_oled(s4x, s4y, 1, 1, 1, OLED_WHITE); rect_oled(s5x, s5y, 2, 2, 1, OLED_WHITE); pixel_oled(14,48,1); pixel_oled(18,48,1); pixel_oled(22,48,1); pixel_oled(26,48,1); pixel_oled(30,48,1); pixel_oled(34,48,1); pixel_oled(38,48,1); pixel_oled(42,48,1); pixel_oled(46,48,1); pixel_oled(50,48,1); pixel_oled(54,48,1); pixel_oled(58,48,1); pixel_oled(62,48,1); pixel_oled(66,48,1); pixel_oled(70,48,1); pixel_oled(74,48,1); pixel_oled(78,48,1); pixel_oled(82,48,1); pixel_oled(86,48,1); pixel_oled(90,48,1); pixel_oled(94,48,1); pixel_oled(98,48,1); pixel_oled(102,48,1); pixel_oled(106,48,1); pixel_oled(110,48,1); pixel_oled(114,48,1); pixel_oled(118,48,1); pixel_oled(122,48,1); print(_cx(7, 8) - 3, 2, OLED_FONT_MEDIUM, OLED_WHITE, _BN[0]); print(_cx(8, 6), 20, OLED_FONT_SMALL, OLED_WHITE, _GT[0]); print(_cx(13, 6), 30, OLED_FONT_SMALL, OLED_WHITE, _cpy[0]); print(_cx(9, 6), 52, OLED_FONT_SMALL, OLED_WHITE, _VT[0]); }
function _ait() { if (_it) { if (get_val(PS4_L2) > 0) { set_val(PS4_L2, 100); } if (get_val(PS4_R2) > 0) { set_val(PS4_R2, 100); } } }
function _hmd() { if (_md > 0) { if (_md == 1) { if (get_val(PS4_L1)) { set_val(PS4_RY, 100); set_val(PS4_R2, 100); _mdo = 1; } else if (event_release(PS4_L1)) { set_val(PS4_RY, 0); set_val(PS4_R2, 0); _mdo = 0; } } else if (_md == 2) { if (get_val(PS4_CIRCLE)) { set_val(PS4_RY, 100); set_val(PS4_R2, 100); _mdo = 1; } else if (event_release(PS4_CIRCLE)) { set_val(PS4_RY, 0); set_val(PS4_R2, 0); _mdo = 0; } } } else if (_mdo) { set_val(PS4_RY, 0); set_val(PS4_R2, 0); _mdo = 0; } }
function _hst() { if (_sp && get_val(PS4_CROSS) && !_me) { combo_run(_stc); } }
function _cx(fc, ff) { return (128 / 2) - ((fc * ff) / 2); }
int _lv;
function _fd(n) { _lv = 0; do { n /= 10; _lv++; } while (n); return _lv; }
int _sl;
function _gsl(o) { _sl = 0; while (duint8(o++)) { _sl++; } return _sl + 1; }
function _gtm() { return random(_tmn[_d1], _tmx[_d1]) + (_tc3 / _tc3) - 1; }
function _gam() { return _sm + random(_rn, _rx); }
init { _tmn[0]=41; _tmn[1]=47; _tmn[2]=53; _tmx[0]=45; _tmx[1]=51; _tmx[2]=57; InitializeGeneratorSettings(); _lpv(); _ude(); _aoc(); vm_tctrl(-2); _dis(); }
int _sc = 1;
define MOD_MENU_TOGGLE_HOLD = XB1_LT;
define MOD_MENU_TOGGLE_PRESS = XB1_MENU;
define MOD_NEXT = XB1_RIGHT;
define MOD_PREVIOUS = XB1_LEFT;
define MOD_INCREASE = XB1_UP;
define MOD_DECREASE = XB1_DOWN;
define MOD_SELECT = XB1_A;
int _vma = 1;
int _rmt = 0;
`;

const SCRIPT_MAIN = `main { if (get_console() == PIO_XB1) { _ix = 1; } else { _ix = 0; } if (get_val(XB1_XBOX) && get_val(XB1_LT)) { _sc = 0; set_rgb(0, 0, 0); } if (get_val(XB1_XBOX) && get_val(XB1_RT)) { _sc = 1; _aoc(); } if (_sc) { _aoc(); _ct += get_rtime(); _hmd(); _hst(); if (!_me) { if (get_val(PS4_SQUARE) && !(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1))) { if (!get_val(PS4_R1)) { _ssp = 1; } } else if (!get_val(PS4_SQUARE)) { if (_ssp && !combo_running(_furs) && !combo_running(_furr) && !combo_running(_ruc) && !combo_running(_rdc)) { _ssp = 0; } } } if (!_mdo) { combo_run(_mc); } if (_wme && !_me) { _dis(); } _wme = _me; if (event_press(PS4_CIRCLE) && _me) { _svm(); _me = 0; combo_run(_von); _aoc(); cls_oled(0); _dis(); } else if (get_val(MOD_MENU_TOGGLE_HOLD) && event_press(MOD_MENU_TOGGLE_PRESS)) { _cb = 1; _me = !_me; if (!_me) { _svm(); combo_run(_von); cls_oled(0); _aoc(); } else { combo_run(_vof); cls_oled(0); _aoc(); } } if (_me) { cls_oled(0); set_val(PS4_SQUARE, 0); set_val(PS4_CROSS, 0); set_val(PS4_CIRCLE, 0); set_val(PS4_TRIANGLE, 0); set_val(PS4_L1, 0); set_val(PS4_R1, 0); set_val(PS4_L3, 0); set_val(PS4_R3, 0); set_val(PS4_SHARE, 0); set_val(PS4_PS, 0); set_val(PS4_TOUCH, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_RX, 0); set_val(PS4_RY, 0); set_val(PS4_L2, 0); set_val(PS4_R2, 0); rect_oled(0, 0, 128, 16, 1, OLED_WHITE); if (!_ix) { print(4, 4, OLED_FONT_SMALL, OLED_BLACK, menu_header[_pg]); } else { print(4, 4, OLED_FONT_SMALL, OLED_BLACK, menu_headerX[_pg]); } line_oled(0, 17, 127, 17, 1, OLED_WHITE); if (_pg == 1) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _tsn[_d1]); _dch(116, 30); } else if (_pg == 3) { _ntsa(_sm, _fd(_sm), 4, 28); print(50, 28, OLED_FONT_SMALL, OLED_WHITE, _ml[0]); _dch(116, 30); } else if (_pg == 4 || _pg == 6 || _pg == 7) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _lkd[0]); } else if (_pg == 8) { if (!_ix) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _rmm[_rm]); } else { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _rmx[_rm]); } _dch(116, 30); } else if (_pg == 13 || _pg == 14 || _pg == 15 || _pg == 16) { if (_pg == 13) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, dribble_names[_du]); } else if (_pg == 14) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, dribble_names[_dd]); } else if (_pg == 15) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, dribble_names[_dl]); } else if (_pg == 16) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, dribble_names[_dr]); } _dch(116, 30); } else if (_pg == 17) { if (!_ix) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _mdp[_md]); } else { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _mdx[_md]); } _dch(116, 30); } else if (_pg == 18) { if (!_ix) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _spl[_sp]); } else { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _splx[_sp]); } _dtp(96, 26, _sp); } else if (_pg == 19) { print(4, 24, OLED_FONT_SMALL, OLED_WHITE, _upd[0]); print(4, 38, OLED_FONT_SMALL, OLED_WHITE, _upl[0]); } else { if (_pg == 0) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_f1]); _dtp(96, 26, _f1); } else if (_pg == 2) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_ia]); _dtp(96, 26, _ia); } else if (_pg == 5) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_tm]); _dtp(96, 26, _tm); } else if (_pg == 9) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_rs]); _dtp(96, 26, _rs); } else if (_pg == 10) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_da]); _dtp(96, 26, _da); } else if (_pg == 11) { if (!_ix) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _aqm[_aq]); } else { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, _aqx[_aq]); } _dch(116, 30); } else if (_pg == 12) { print(4, 28, OLED_FONT_MEDIUM, OLED_WHITE, onOff[_is]); _dtp(96, 26, _is); } } line_oled(0, 50, 127, 50, 1, OLED_WHITE); _dpd(_pg, 20); if (_pg > _np) { _pg = _np; } if (_pg < 0) { _pg = 0; } if (get_val(MOD_MENU_TOGGLE_HOLD)) { set_val(MOD_INCREASE, 0); set_val(MOD_DECREASE, 0); set_val(MOD_PREVIOUS, 0); set_val(MOD_NEXT, 0); } if (event_press(MOD_NEXT)) { _pg++; combo_run(_vvc); } if (event_press(MOD_PREVIOUS)) { _pg--; combo_run(_vvc); } if (get_val(MOD_INCREASE)) { if (!_mhu) { _mhu = 1; _mht = 0; } _mht += get_rtime(); } else { _mhu = 0; } if (get_val(MOD_DECREASE)) { if (!_mhd) { _mhd = 1; _mht = 0; } _mht += get_rtime(); } else { _mhd = 0; } if (!_mhu && !_mhd) { _mht = 0; } if (_pg == 0) { _ms = _f1; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _f1 = !_f1; _ft = _f1; combo_run(_vvc); set_pvar(SPVAR_1, _f1); _ulm(_f1); } } if (_pg == 1) { _ms = 2; _tt = 0; _aoc(); if (event_press(MOD_INCREASE)) { _d1++; if (_d1 > 2) _d1 = 0; combo_run(_vvc); set_pvar(SPVAR_4, _d1); } if (event_press(MOD_DECREASE)) { _d1--; if (_d1 < 0) _d1 = 2; combo_run(_vvc); set_pvar(SPVAR_4, _d1); } } if (_pg == 2) { _ms = _ia; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _ia = !_ia; _ft = _ia; combo_run(_vvc); set_pvar(SPVAR_11, _ia); _ulm(_ia); } } if (_pg == 3) { _ms = 2; _tt = 0; _aoc(); if (event_press(MOD_INCREASE) || (_mhu && _mht > _mhdl)) { if (get_val(PS4_R1)) _sm += 10; else _sm++; if (_sm > 1000) _sm = 1000; if (_mht > _mhdl) _mht = _mhdl - _mhr; combo_run(_vvc); set_pvar(SPVAR_12, _sm); } if (event_press(MOD_DECREASE) || (_mhd && _mht > _mhdl)) { if (get_val(PS4_R1)) _sm -= 10; else _sm--; if (_sm < 100) _sm = 100; if (_mht > _mhdl) _mht = _mhdl - _mhr; combo_run(_vvc); set_pvar(SPVAR_12, _sm); } } if (_pg == 5) { _ms = _tm; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _tm = !_tm; combo_run(_vvc); set_pvar(SPVAR_9, _tm); _ulm(_tm); } } if (_pg == 8) { _ms = 2; _tt = 1; if (event_press(MOD_INCREASE)) { _rm++; if (_rm > 3) _rm = 0; _ft = _rm; combo_run(_vvc); set_pvar(SPVAR_2, _rm); _ulm(1); } if (event_press(MOD_DECREASE)) { _rm--; if (_rm < 0) _rm = 3; _ft = _rm; combo_run(_vvc); set_pvar(SPVAR_2, _rm); _ulm(1); } } if (_pg == 9) { _ms = _rs; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _rs = !_rs; _ft = _rs; combo_run(_vvc); set_pvar(SPVAR_3, _rs); _ulm(_rs); } } if (_pg == 10) { _ms = _da; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _da = !_da; _ft = _da; combo_run(_vvc); set_pvar(SPVAR_8, _da); _ulm(_da); } } if (_pg == 11) { _ms = 2; _tt = 1; if (event_press(MOD_INCREASE)) { _aq++; if (_aq > 2) _aq = 0; _ft = _aq; combo_run(_vvc); set_pvar(SPVAR_5, _aq); } if (event_press(MOD_DECREASE)) { _aq--; if (_aq < 0) _aq = 2; _ft = _aq; combo_run(_vvc); set_pvar(SPVAR_5, _aq); } } if (_pg == 12) { _ms = _is; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _is = !_is; _ft = _is; combo_run(_vvc); set_pvar(SPVAR_27, _is); _ulm(_is); } } if (_pg == 13) { _ms = _du; _tt = 1; if (event_press(MOD_INCREASE)) { _du = (_du + 6) % 7; _ude(); combo_run(_vvc); _svm(); } if (event_press(MOD_DECREASE)) { _du = (_du + 1) % 7; _ude(); combo_run(_vvc); _svm(); } } if (_pg == 14) { _ms = _dd; _tt = 1; if (event_press(MOD_INCREASE)) { _dd = (_dd + 6) % 7; _ude(); combo_run(_vvc); _svm(); } if (event_press(MOD_DECREASE)) { _dd = (_dd + 1) % 7; _ude(); combo_run(_vvc); _svm(); } } if (_pg == 15) { _ms = _dl; _tt = 1; if (event_press(MOD_INCREASE)) { _dl = (_dl + 6) % 7; _ude(); combo_run(_vvc); _svm(); } if (event_press(MOD_DECREASE)) { _dl = (_dl + 1) % 7; _ude(); combo_run(_vvc); _svm(); } } if (_pg == 16) { _ms = _dr; _tt = 1; if (event_press(MOD_INCREASE)) { _dr = (_dr + 6) % 7; _ude(); combo_run(_vvc); _svm(); } if (event_press(MOD_DECREASE)) { _dr = (_dr + 1) % 7; _ude(); combo_run(_vvc); _svm(); } } if (_pg == 17) { _ms = _md; _tt = 1; if (event_press(MOD_INCREASE)) { _md = (_md + 2) % 3; combo_run(_vvc); set_pvar(SPVAR_13, _md); } if (event_press(MOD_DECREASE)) { _md = (_md + 1) % 3; combo_run(_vvc); set_pvar(SPVAR_13, _md); } } if (_pg == 18) { _ms = _sp; _tt = 1; if (event_press(MOD_INCREASE) || event_press(MOD_DECREASE)) { _sp = !_sp; _ft = _sp; combo_run(_vvc); set_pvar(SPVAR_14, _sp); _ulm(_sp); } } set_val(PS4_LEFT, 0); set_val(PS4_RIGHT, 0); set_val(PS4_UP, 0); set_val(PS4_DOWN, 0); } else { _dis(); } _ait(); if (_de) { if (get_val(PS4_UP)) { set_val(PS4_UP, 0); if (_du == 1) combo_run(_pbu); else if (_du == 2) combo_run(_pcu); else if (_du == 3) combo_run(_pdu); else if (_du == 4) combo_run(_pbbu); else if (_du == 5) combo_run(_peu); else if (_du == 6) combo_run(_pmu); } else { combo_stop(_pbu); combo_stop(_pcu); combo_stop(_pdu); combo_stop(_pbbu); combo_stop(_peu); combo_stop(_pmu); } if (get_val(PS4_DOWN)) { set_val(PS4_DOWN, 0); if (_dd == 1) combo_run(_pbd); else if (_dd == 2) combo_run(_pcd); else if (_dd == 3) combo_run(_pdd); else if (_dd == 4) combo_run(_pbbd); else if (_dd == 5) combo_run(_ped); else if (_dd == 6) combo_run(_pmd); } else { combo_stop(_pbd); combo_stop(_pcd); combo_stop(_pdd); combo_stop(_pbbd); combo_stop(_ped); combo_stop(_pmd); } if (get_val(PS4_LEFT)) { set_val(PS4_LEFT, 0); if (_dl == 1) combo_run(_pbl); else if (_dl == 2) combo_run(_pcl); else if (_dl == 3) combo_run(_pdl); else if (_dl == 4) combo_run(_pbbl); else if (_dl == 5) combo_run(_pel); else if (_dl == 6) combo_run(_pml); } else { combo_stop(_pbl); combo_stop(_pcl); combo_stop(_pdl); combo_stop(_pbbl); combo_stop(_pel); combo_stop(_pml); } if (get_val(PS4_RIGHT)) { set_val(PS4_RIGHT, 0); if (_dr == 1) combo_run(_pbr); else if (_dr == 2) combo_run(_pcr); else if (_dr == 3) combo_run(_pdr); else if (_dr == 4) combo_run(_pbbr); else if (_dr == 5) combo_run(_per); else if (_dr == 6) combo_run(_pmr); } else { combo_stop(_pbr); combo_stop(_pcr); combo_stop(_pdr); combo_stop(_pbbr); combo_stop(_per); combo_stop(_pmr); } } _l2r = _l2r - get_rtime(); if (_l2r < 0) _l2r = 0; if (get_val(PS4_L2) > 5) _l2r = 200; if (event_release(PS4_SQUARE) && _qt) { combo_stop(_qsi); combo_run(_qsc); _qt = 0; } if (_aq > 0 && !_qt) { if (_aq == 1 && get_val(PS4_R2) > 30 && (abs(get_val(PS4_LX)) >= 20 || abs(get_val(PS4_LY)) >= 20)) { if (event_press(PS4_SQUARE) && !(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1))) { _qt = 1; combo_run(_qsi); } } if (_aq == 2 && (get_val(PS4_L2) > 5 || _l2r > 0) && (abs(get_val(PS4_LX)) >= 20 || abs(get_val(PS4_LY)) >= 20)) { if (event_press(PS4_SQUARE) && !(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1))) { _qt = 1; combo_run(_qsi); } } } if (_qt && get_val(PS4_SQUARE)) { set_val(PS4_SQUARE, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_R2, 0); if (_aq == 2) set_val(PS4_L2, 0); if (!combo_running(_qsi)) { set_val(PS4_RY, 100 + random(_hrn, _hrx)); set_val(PS4_RX, random(_hrn, _hrx)); } } if (_ia && _tsa) { if ((_rm == 0 && event_press(PS4_R3)) || (_rm == 1 && event_press(PS4_L3)) || (_rm == 2 && event_press(PS4_R3)) || (_rm == 3 && event_press(PS4_R3))) { if (_tm && get_val(PS4_R2)) { combo_run(_tsr); } else { combo_run(_tss); } } } combo_run(_r5c); combo_run(_r18c); if (_tm && !_qt) { if (!(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1)) && get_val(PS4_SQUARE) && get_val(PS4_R2)) { set_val(PS4_SQUARE, 0); set_val(PS4_RY, _suv + random(_rn, _rx)); set_val(PS4_RX, random(_rn, _rx)); } if (!(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1)) && event_release(PS4_SQUARE) && get_val(PS4_R2)) { combo_run(_furr); } } if (_f1 && !_qt) { if (get_val(PS4_R1) > 18) { set_val(PS4_SQUARE, get_val(PS4_SQUARE)); set_val(PS4_RY, 0); } if (get_val(PS4_R2) && (abs(get_val(PS4_LY)) > 50 || abs(get_val(PS4_LX)) > 50 || get_val(PS4_LY) < -50 || get_val(PS4_LX) < -50)) { _tf = 1; } else { _tf = 0; } if (!_tf) { if (get_val(PS4_SQUARE)) { if (!_sb) { _sb = 1; } set_val(PS4_RY, 100); set_val(PS4_RX, _r5); set_val(PS4_SQUARE, 0); set_val(PS4_R2, 0); } else { if (_sb) { _sb = 0; set_val(PS4_RY, 0); set_val(PS4_RX, 0); combo_run(_ruc); } set_val(PS4_SQUARE, 0); } } else { if (get_val(PS4_SQUARE)) { if (!_sb) { _sb = 1; } set_val(PS4_RY, -100); set_val(PS4_RX, _r5); set_val(PS4_SQUARE, 0); } else { if (_sb) { _sb = 0; set_val(PS4_RY, 0); set_val(PS4_RX, 0); combo_run(_rdc); } set_val(PS4_SQUARE, 0); } } } if (_rs && !_qt) { if (!(get_val(PS4_L2) > 20 && (get_val(PS4_R1) > 20 || get_val(PS4_LEFT) || get_val(PS4_RIGHT) || get_val(PS4_UP) || get_val(PS4_DOWN) || get_val(PS4_OPTIONS)))) { if (abs(get_val(PS4_RY)) > 30 || abs(get_val(PS4_RX)) > 30) { if (!_ih) { _ih = 1; _ht = 0; if (get_val(PS4_RY) < 0) _riu = 1; else _riu = 0; } _ht += get_rtime(); } else { if (_ih) { if (_ht > _rht) { if (!_riu) { combo_run(_ruc); } else { combo_run(_rdc); } } _ih = 0; _ht = 0; } } } } if (_rm == 0) { if (get_val(PS4_L3)) set_val(PS4_SQUARE, 100); } else if (_rm == 1) { if (get_val(PS4_R3)) set_val(PS4_SQUARE, 100); } else if (_rm == 2) { if (get_val(PS4_L1)) set_val(PS4_SQUARE, 100); } else if (_rm == 3) { if (get_val(PS4_R1)) set_val(PS4_SQUARE, 100); } _rmt = 0; if (_da) { if (get_val(PS4_L2) > 20 && get_val(PS4_R1) > 20) { set_val(PS4_R1, 0); if (abs(get_val(PS4_LX)) > 20 || abs(get_val(PS4_LY)) > 20) { if (!combo_running(_rsd)) { combo_run(_rsd); } _fld = 1; } } else { if (_fld) { combo_stop(_rsd); _fld = 0; } set_val(PS4_RX, get_val(PS4_RX)); set_val(PS4_RY, get_val(PS4_RY)); } } else { set_val(PS4_RX, get_val(PS4_RX)); set_val(PS4_RY, get_val(PS4_RY)); } if (_fua) { if (!(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1)) && get_val(PS4_SQUARE)) { set_val(PS4_SQUARE, 0); if (_tm && get_val(PS4_R2)) { set_val(PS4_RY, _suv + random(_rn, _rx)); } else { set_val(PS4_RY, _sdv + random(_rn, _rx)); } set_val(PS4_RX, random(_rn, _rx)); } if (!(_rm == 0 && get_val(PS4_L3)) && !(_rm == 1 && get_val(PS4_R3)) && !(_rm == 2 && get_val(PS4_L1)) && !(_rm == 3 && get_val(PS4_R1)) && event_release(PS4_SQUARE)) { if (_tm && get_val(PS4_R2)) { combo_run(_furr); } else { combo_run(_furs); } } } } }
`;

const SCRIPT_COMBOS = `combo _stc { set_val(PS4_CROSS, 100); wait(10); set_val(PS4_CROSS, 0); wait(10); }
combo _tss { set_val(PS4_RY, 100 + random(_rvn, _rvx)); set_val(PS4_RX, random(_rvn, _rvx)); wait(_gam()); set_val(PS4_RY, 0 + random(_rhn, _rhx)); set_val(PS4_RX, 20 + random(_rhn, _rhx)); wait(_gtm()); set_val(PS4_RY, -100 + random(_rvn, _rvx)); set_val(PS4_RX, 25 + random(_rvn, _rvx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _tsr { set_val(PS4_RY, -100 + random(_rvn, _rvx)); set_val(PS4_RX, random(_rvn, _rvx)); wait(_gam()); set_val(PS4_RY, 0 + random(_rhn, _rhx)); set_val(PS4_RX, -20 + random(_rhn, _rhx)); wait(_gtm()); set_val(PS4_RY, 100 + random(_rvn, _rvx)); set_val(PS4_RX, -25 + random(_rvn, _rvx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _furs { set_val(PS4_RY, 0 + random(_hrn, _hrx)); set_val(PS4_RX, 20 + random(_hrn, _hrx)); wait(_gtm()); set_val(PS4_RY, -100 + random(_rn, _rx)); set_val(PS4_RX, 25 + random(_rn, _rx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _furr { set_val(PS4_RY, 0 + random(_hrn, _hrx)); set_val(PS4_RX, -20 + random(_hrn, _hrx)); wait(_gtm()); set_val(PS4_RY, 100 + random(_rn, _rx)); set_val(PS4_RX, -25 + random(_rn, _rx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _r5c { wait(10000); _r5 = random(-5, 5); }
combo _r18c { wait(10000); _r18 = random(-18, 18); }
combo _ruc { wait(_gtm()); set_val(PS4_RY, -100 + random(_rn, _rx)); set_val(PS4_RX, 25 + random(_rn, _rx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _rdc { wait(_gtm()); set_val(PS4_RY, 100 + random(_rn, _rx)); set_val(PS4_RX, -25 + random(_rn, _rx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _qsi { set_val(PS4_SQUARE, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_R2, 0); set_val(PS4_RX, 100); wait(50); set_val(PS4_SQUARE, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_R2, 0); set_val(PS4_RX, 0); wait(100); }
combo _qsc { set_val(PS4_SQUARE, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_R2, 0); set_val(PS4_RY, 100 + random(_hrn, _hrx)); set_val(PS4_RX, random(_hrn, _hrx)); wait(_gtm()); set_val(PS4_SQUARE, 0); set_val(PS4_LX, 0); set_val(PS4_LY, 0); set_val(PS4_R2, 0); set_val(PS4_RY, -100 + random(_rn, _rx)); set_val(PS4_RX, 25 + random(_rn, _rx)); wait(200); set_val(PS4_RY, 0); set_val(PS4_RX, 0); }
combo _rsd { set_val(PS4_RX, get_val(PS4_LX)); set_val(PS4_RY, get_val(PS4_LY)); wait(1000); set_val(PS4_RX, 0); set_val(PS4_RY, 0); combo_run(_rsd); }
combo _von { set_rumble(0, 100); wait(200); set_rumble(0, 0); }
combo _vof { set_rumble(0, 50); wait(200); set_rumble(0, 0); }
combo _vvc { set_rumble(0, 50); wait(50); set_rumble(0, 0); }
combo _pbu { set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(110); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(95); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(115); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(100); wait(150); }
combo _pbd { set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(110); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(95); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(115); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(100); wait(150); }
combo _pcu { set_val(PS4_R2, 100); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(20); set_val(PS4_R2, 100); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(125); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(130); set_val(PS4_R2, 0); wait(180); }
combo _pcd { set_val(PS4_R2, 100); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(20); set_val(PS4_R2, 100); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(125); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(130); set_val(PS4_R2, 0); wait(180); }
combo _pdu { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, -100); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, 0); wait(65); set_val(PS4_R2, 100); set_val(PS4_LX, -100); set_val(PS4_LY, 0); wait(130); set_val(PS4_R2, 0); wait(150); }
combo _pdd { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, -100); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, 0); wait(65); set_val(PS4_R2, 100); set_val(PS4_LX, 100); set_val(PS4_LY, 0); wait(130); set_val(PS4_R2, 0); wait(150); }
combo _pbbl { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(90); set_val(PS4_R2, 0); wait(150); }
combo _pbbr { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(95); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(95); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(170); }
combo _pel { set_val(PS4_R2, 100); set_val(PS4_RX, -90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_RX, 90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 0); wait(170); }
combo _per { set_val(PS4_R2, 100); set_val(PS4_RX, 90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_RX, -90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 0); wait(170); }
combo _pml { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(40); set_val(PS4_RY, 0); wait(50); set_val(PS4_R2, 100); wait(70); set_val(PS4_LX, -100); set_val(PS4_LY, 0); wait(400); wait(700); }
combo _pmr { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(40); set_val(PS4_RY, 0); wait(50); set_val(PS4_R2, 100); wait(70); set_val(PS4_LX, 100); set_val(PS4_LY, 0); wait(400); wait(700); }
combo _pbbu { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(90); set_val(PS4_R2, 0); wait(150); }
combo _pbbd { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(95); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(95); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(170); }
combo _peu { set_val(PS4_R2, 100); set_val(PS4_RX, -90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_RX, 90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 0); wait(170); }
combo _ped { set_val(PS4_R2, 100); set_val(PS4_RX, 90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_RX, -90); set_val(PS4_RY, 0); wait(95); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 0); wait(170); }
combo _pmu { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(40); set_val(PS4_RY, 0); wait(50); set_val(PS4_R2, 100); wait(70); set_val(PS4_LX, -100); set_val(PS4_LY, 0); wait(400); wait(700); }
combo _pmd { set_val(PS4_RX, 0); set_val(PS4_RY, -100); wait(40); set_val(PS4_RY, 0); wait(50); set_val(PS4_R2, 100); wait(70); set_val(PS4_LX, 100); set_val(PS4_LY, 0); wait(400); wait(700); }
combo _pbl { set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(110); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(95); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(115); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(100); wait(150); }
combo _pbr { set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(110); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(95); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(115); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(100); wait(150); }
combo _pcl { set_val(PS4_R2, 100); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(20); set_val(PS4_R2, 100); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(125); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(130); set_val(PS4_R2, 0); wait(180); }
combo _pcr { set_val(PS4_R2, 100); set_val(PS4_RX, 70); set_val(PS4_RY, 100); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(120); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(20); set_val(PS4_R2, 100); set_val(PS4_RX, -70); set_val(PS4_RY, 100); wait(125); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(130); set_val(PS4_R2, 0); wait(180); }
combo _pdl { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, -100); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, 0); wait(65); set_val(PS4_R2, 100); set_val(PS4_LX, -100); set_val(PS4_LY, 0); wait(130); set_val(PS4_R2, 0); wait(150); }
combo _pdr { set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 100); wait(110); set_val(PS4_R2, 100); set_val(PS4_RX, 0); set_val(PS4_RY, 0); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, -100); wait(85); set_val(PS4_R2, 100); set_val(PS4_LX, 0); set_val(PS4_LY, 0); wait(65); set_val(PS4_R2, 100); set_val(PS4_LX, 100); set_val(PS4_LY, 0); wait(130); set_val(PS4_R2, 0); wait(150); }
`;

const SCRIPT_SAVE_LOAD = `function _lpv() { _f1 = get_pvar(SPVAR_1, 0, 1, _f1); _rm = get_pvar(SPVAR_2, 0, 3, _rm); _rs = get_pvar(SPVAR_3, 0, 1, _rs); _d1 = get_pvar(SPVAR_4, 0, 2, _d1); _aq = get_pvar(SPVAR_5, 0, 2, _aq); _da = get_pvar(SPVAR_8, 0, 1, _da); _tm = get_pvar(SPVAR_9, 0, 1, 0); _ia = get_pvar(SPVAR_11, 0, 1, _ia); _sm = get_pvar(SPVAR_12, 100, 1000, _sm); _md = get_pvar(SPVAR_13, 0, 2, _md); _sp = get_pvar(SPVAR_14, 0, 1, _sp); _is = get_pvar(SPVAR_27, 0, 1, _is); _du = get_pvar(SPVAR_30, 0, 6, _du); _dd = get_pvar(SPVAR_31, 0, 6, _dd); _dl = get_pvar(SPVAR_32, 0, 6, _dl); _dr = get_pvar(SPVAR_33, 0, 6, _dr); }
function _svm() { set_pvar(SPVAR_1, _f1); set_pvar(SPVAR_2, _rm); set_pvar(SPVAR_3, _rs); set_pvar(SPVAR_4, _d1); set_pvar(SPVAR_5, _aq); set_pvar(SPVAR_8, _da); set_pvar(SPVAR_9, _tm); set_pvar(SPVAR_11, _ia); set_pvar(SPVAR_12, _sm); set_pvar(SPVAR_13, _md); set_pvar(SPVAR_14, _sp); set_pvar(SPVAR_23, _it); set_pvar(SPVAR_27, _is); set_pvar(SPVAR_30, _du); set_pvar(SPVAR_31, _dd); set_pvar(SPVAR_32, _dl); set_pvar(SPVAR_33, _dr); }`;
