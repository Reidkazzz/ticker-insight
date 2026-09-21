/* Shared helpers used by overview.html and analyzer.html. Keep this file tiny and dependency-free. */
"use strict";

function loadK(k){ try{ return localStorage.getItem(k)||''; }catch(e){ return ''; } }
function saveK(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }

function num(v){ const n = parseFloat(v); return (v===undefined||v===null||v==='None'||isNaN(n)) ? null : n; }
function pct(v){ return v===null ? '—' : (v*100).toFixed(1)+'%'; }
function money(v){
  if(v===null) return '—';
  const a = Math.abs(v);
  if(a>=1e12) return (v/1e12).toFixed(2)+'T';
  if(a>=1e9) return (v/1e9).toFixed(2)+'B';
  if(a>=1e6) return (v/1e6).toFixed(2)+'M';
  return v.toFixed(2);
}

function sentClass(label){
  if(!label) return 'neutral';
  const l = label.toLowerCase();
  if(l.includes('bullish')) return 'bullish';
  if(l.includes('bearish')) return 'bearish';
  return 'neutral';
}

/* ---------------- Alpha Vantage ---------------- */
const AV = 'https://www.alphavantage.co/query';
async function avFetch(params, key){
  const url = AV + '?' + new URLSearchParams(Object.assign({}, params, {apikey:key})).toString();
  const res = await fetch(url);
  if(!res.ok) throw new Error('Network error ('+res.status+')');
  const json = await res.json();
  if(json.Note) throw new Error('Alpha Vantage rate limit hit: '+json.Note);
  if(json.Information) throw new Error(json.Information);
  if(json['Error Message']) throw new Error(json['Error Message']);
  return json;
}

function delay(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }
