import fs from 'fs';
import * as cheerio from 'cheerio';
import { chromium } from 'playwright';

const BASE='https://animaparty.ro';
const ROUTES=['/','/animatori-petreceri-copii-bucuresti/','/animatori-petreceri-copii-ilfov/','/animatori-petreceri-copii/','/servicii/','/mascote-petreceri-copii/','/animatori-pe-picioroange/','/decoratiuni-baloane-bucuresti/','/magician-petreceri-copii/','/vata-de-zahar-popcorn-evenimente/','/contact/'];
const UA_NORMAL='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36';
const UA_GOOGLE='Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
function csv(v){return `"${String(v??'').replaceAll('"','""')}"`;}
function norm(v){return String(v??'').replace(/\s+/g,' ').trim();}
function bust(path,token){const u=new URL(path,BASE);u.searchParams.set('parity_livecheck',token);return u.toString();}
async function raw(path,ua,token){const res=await fetch(bust(path,token),{headers:{'User-Agent':ua,'Cache-Control':'no-cache, no-store'},redirect:'follow'});return {status:res.status,url:res.url,html:await res.text()};}
function signature(x){const $=cheerio.load(x.html); $('script,style,noscript').remove(); const links=[...new Set($('a[href]').map((_,e)=>$(e).attr('href')).get().filter(Boolean))].sort(); return {status:x.status,title:norm($('title').text()),h1:norm($('h1').first().text()),canonical:$('link[rel="canonical"]').attr('href')||'',robots:$('meta[name="robots"]').attr('content')||'',links,text:norm($('body').text())};}
function jaccard(a,b){const A=new Set(a),B=new Set(b);const union=new Set([...A,...B]);if(!union.size)return 1;let inter=0;for(const v of A)if(B.has(v))inter++;return inter/union.size;}
async function rendered(browser,path,ua,token){const ctx=await browser.newContext({userAgent:ua});try{const page=await ctx.newPage();await page.goto(bust(path,token),{waitUntil:'networkidle',timeout:45000});return norm(await page.evaluate(()=>document.body?.innerText||''));}finally{await ctx.close();}}
async function main(){
 const token=Date.now().toString(); const browser=await chromium.launch({headless:true}); const rows=[]; let fail=0;
 try{for(const route of ROUTES){const [nRaw,gRaw]=await Promise.all([raw(route,UA_NORMAL,token),raw(route,UA_GOOGLE,token)]);const n=signature(nRaw),g=signature(gRaw);const [nRender,gRender]=await Promise.all([rendered(browser,route,UA_NORMAL,token),rendered(browser,route,UA_GOOGLE,token)]);const linkSim=jaccard(n.links,g.links);const keyPass=n.status===g.status&&n.title===g.title&&n.h1===g.h1&&n.canonical===g.canonical&&n.robots===g.robots&&linkSim>=0.98&&n.text===g.text&&nRender===gRender; if(!keyPass)fail++;rows.push([route,n.status,g.status,n.title===g.title,n.h1===g.h1,n.canonical===g.canonical,n.robots===g.robots,linkSim.toFixed(3),n.text===g.text,nRender===gRender,keyPass?'PASS':'FAIL']);}}
 finally{await browser.close();}
 const header=['URL','NORMAL_STATUS','GOOGLEBOT_STATUS','TITLE_PARITY','H1_PARITY','CANONICAL_PARITY','ROBOTS_PARITY','LINK_JACCARD','RAW_TEXT_PARITY','RENDERED_TEXT_PARITY','STATUS'];
 fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/BATCH1_GOOGLEBOT_PARITY.csv',[header,...rows].map(r=>r.map(csv).join(',')).join('\n')+'\n');const result={routes:ROUTES.length,failures:fail,gate:fail===0?'PASS':'FAIL'};fs.writeFileSync('docs/BATCH1_GOOGLEBOT_PARITY.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));if(fail)process.exit(2);
}
main().catch(err=>{console.error(err);process.exit(1)});
