tell application "Google Chrome"
    execute front window's active tab javascript "const url = window.location.href; const cpsess = url.match(/cpsess\\d+/)[0]; fetch('/' + cpsess + '/execute/DNS/parse_zone?zone=animaparty.ro').then(r => r.text()).then(data => document.body.setAttribute('data-dns', data));"
end tell
