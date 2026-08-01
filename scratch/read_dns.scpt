tell application "Google Chrome"
    execute front window's active tab javascript "document.body.getAttribute('data-dns');"
end tell
