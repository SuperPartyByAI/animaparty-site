import puppeteer from 'puppeteer-core';
import http from 'http';

http.get("http://127.0.0.1:52151/json/version", (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", async () => {
    try {
      const { webSocketDebuggerUrl } = JSON.parse(data);
      const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null
      });
      const pages = await browser.pages();
      
      const page = pages.find((p) => p.url().includes("hosterion.ro"));
      if (!page) {
        console.log("Nu am gasit tab-ul Hosterion.");
        process.exit(1);
      }
      
      await page.bringToFront();
      
      console.log("Mergem la serviciul principal...");
      await page.goto("https://hosterion.ro/client/clientarea.php?action=productdetails&id=11505", { waitUntil: 'networkidle2' });
      
      console.log("Dam click pe Autentificare in cPanel...");
      await page.evaluate(() => {
          const form = document.querySelector('form[action*="dologin"]');
          if(form) form.submit();
      });
      
      await new Promise(r => setTimeout(r, 8000)); // wait for cPanel SSO
      
      const cpanelUrl = page.url();
      console.log("URL CPanel:", cpanelUrl);
      
      const match = cpanelUrl.match(/(https:\/\/[^/]+:[0-9]+\/cpsess[0-9]+)/);
      if (match) {
          const baseUrl = match[1];
          console.log("Base UAPI URL:", baseUrl);
          
          console.log("Cream domeniul animaparty.ro in cPanel...");
          const addDomainRes = await page.evaluate(async (baseUrl) => {
              const res = await fetch(baseUrl + '/execute/DomainInfo/single_domain_data?domain=animaparty.ro');
              const json = await res.json();
              if (json.errors && json.errors.length > 0) {
                  const createRes = await fetch(baseUrl + '/execute/AddonDomain/add_addon_domain?newdomain=animaparty.ro&dir=animaparty.ro&subdomain=animaparty');
                  return await createRes.json();
              } else {
                  return { status: "already_exists", data: json.data };
              }
          }, baseUrl);
          
          console.log("Rezultat Add Domain:", addDomainRes);
          
          console.log("Preluam inregistrarile DNS pentru animaparty.ro...");
          const fetchDns = await page.evaluate(async (baseUrl) => {
              const res = await fetch(baseUrl + '/execute/ZoneEdit/fetch_zone_records?domain=animaparty.ro');
              return await res.json();
          }, baseUrl);
          
          if (fetchDns.data) {
              const aRecords = fetchDns.data.filter(r => r.type === 'A' && (r.name === 'animaparty.ro.' || r.name === 'www.animaparty.ro.'));
              console.log("A Records curente:", aRecords);
              
              for (const record of aRecords) {
                  console.log(`Updatam ${record.name} -> 89.167.115.150`);
                  const updateRes = await page.evaluate(async (baseUrl, line) => {
                      const res = await fetch(baseUrl + `/execute/ZoneEdit/edit_zone_record?domain=animaparty.ro&line=${line}&address=89.167.115.150`);
                      return await res.json();
                  }, baseUrl, record.line);
                  console.log("Update result:", updateRes);
              }
          }
          
      } else {
          console.log("Nu am reusit sa intram in cPanel SSO.");
      }

      browser.disconnect();
    } catch(err) {
      console.log("Error:", err);
    }
  });
});
