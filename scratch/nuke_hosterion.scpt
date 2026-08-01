tell application "Google Chrome"
    execute tab 1 of window 1 javascript "
        (async function() {
            try {
                const url = window.location.href;
                const cpsessMatch = url.match(/cpsess\\d+/);
                if (!cpsessMatch) return 'No cpsess found';
                const cpsess = cpsessMatch[0];
                
                let log = 'Starting...\\n';

                // 1. Rename old files to kill the site
                const paths = ['animaparty.ro', 'public_html/animaparty.ro', 'public_html'];
                for (let p of paths) {
                    const r1 = await fetch('/' + cpsess + '/execute/Fileman/rename_files?dir=' + encodeURIComponent(p) + '&from=index.html&to=index_old.html');
                    const j1 = await r1.json();
                    if (j1.status === 1) log += 'Renamed index.html in ' + p + '\\n';
                    
                    const r2 = await fetch('/' + cpsess + '/execute/Fileman/rename_files?dir=' + encodeURIComponent(p) + '&from=index.php&to=index_old.php');
                    await r2.json();
                }

                // 2. Create .htaccess to force 301
                const htaccessContent = 'RewriteEngine On\\nRewriteCond %{HTTP_HOST} ^www\\\\.animaparty\\\\.ro$ [NC]\\nRewriteRule ^(.*)$ https://animaparty.ro/$1 [L,R=301]\\nRewriteCond %{HTTP_HOST} ^animaparty\\\\.ro$ [NC]\\nRewriteRule ^(.*)$ https://animaparty.ro/$1 [L,R=301]\\n';
                
                for (let p of paths) {
                    const r3 = await fetch('/' + cpsess + '/execute/Fileman/save_file_content', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: 'dir=' + encodeURIComponent(p) + '&file=.htaccess&content=' + encodeURIComponent(htaccessContent)
                    });
                    const j3 = await r3.json();
                    if (j3.status === 1) log += 'Saved .htaccess in ' + p + '\\n';
                }

                // 3. Fix DNS for www just in case
                const dnsListR = await fetch('/' + cpsess + '/execute/DNS/parse_zone?zone=animaparty.ro');
                const dnsListJ = await dnsListR.json();
                if (dnsListJ.status === 1 && dnsListJ.data) {
                    for (let record of dnsListJ.data) {
                        if (record.dname_raw === 'www' && record.record_type === 'A') {
                            const editR = await fetch('/' + cpsess + '/execute/DNS/edit_zone_record?domain=animaparty.ro&line=' + record.line_index + '&address=89.167.115.150');
                            await editR.json();
                            log += 'Fixed A record for www\\n';
                        }
                    }
                }

                document.body.setAttribute('data-nuke-log', log);
                return log;
            } catch (e) {
                document.body.setAttribute('data-nuke-log', 'Error: ' + e.message);
                return e.message;
            }
        })();
    "
end tell
