import fs from 'fs';
import * as cheerio from 'cheerio';
const BASE='https://animaparty.ro';
const ROUTES=['/','/animatori-petreceri-copii-bucuresti/','/animatori-petreceri-copii-ilfov/','/animatori-petreceri-copii/','/servicii/','/mascote-petreceri-copii/','/animatori-pe-picioroange/','/decoratiuni-baloane-bucuresti/','/magician-petreceri-copii/','/vata-de-zahar-popcorn-evenimente/','/contact/'];
const set=new Set(ROUTES);
function normalizePath(href){try{const u=new URL(href,BASE);if(u.origin!==BASE)return null;let p=u.pathname;if(!p.endsWith('/')&&p!=='/')p+='/';return set.has(p)?p:null;}catch{return null;}}
function csv(v){return `"${String(v??'').replaceAll('"','""')}"`;}
async function main(){const token=Date.now();const graph={};for(const route of ROUTES){const u=new URL(route,BASE);u.searchParams.set('crawl_livecheck',String(token));const res=await fetch(u,{headers:{'User-Agent':'Mozilla/5.0','Cache-Control':'no-cache, no-store'}});if(res.status!==200)throw new Error(`${route} HTTP ${res.status}`);const html=await res.text();const $=cheerio.load(html);const out=new Set();$('a[href]').each((_,e)=>{const p=normalizePath($(e).attr('href'));if(p)out.add(p)});graph[route]=[...out];}
 const inlinks=Object.fromEntries(ROUTES.map(r=>[r,0]));for(const outs of Object.values(graph))for(const o of outs)inlinks[o]++;
 const depth={'/':0};const q=['/'];while(q.length){const x=q.shift();for(const y of graph[x])if(depth[y]===undefined){depth[y]=depth[x]+1;q.push(y)}}
 const rows=ROUTES.map(r=>[r,inlinks[r],graph[r].length,depth[r]??'UNREACHABLE',(inlinks[r]===0&&r!=='/')?'YES':'NO']);const orphan=rows.filter(r=>r[4]==='YES').length;const maxDepth=Math.max(...rows.filter(r=>Number.isFinite(Number(r[3]))).map(r=>Number(r[3])));const pass=orphan===0&&maxDepth<=2;
 fs.mkdirSync('docs',{recursive:true});fs.writeFileSync('docs/BATCH1_LIVE_INTERNAL_LINK_GRAPH.csv',[['URL','INLINKS','OUTLINKS','DEPTH_FROM_HOME','ORPHAN'],...rows].map(r=>r.map(csv).join(',')).join('\n')+'\n');fs.writeFileSync('docs/BATCH1_LIVE_INTERNAL_LINK_GRAPH.json',JSON.stringify({orphan_count:orphan,max_depth:maxDepth,gate:pass?'PASS':'FAIL',graph},null,2)+'\n');console.log(JSON.stringify({orphan_count:orphan,max_depth:maxDepth,gate:pass?'PASS':'FAIL'},null,2));if(!pass)process.exit(2);}
main().catch(err=>{console.error(err);process.exit(1)});
