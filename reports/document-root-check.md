# Document Root Check

Checked via SSH:
```
server { server_name animaparty.ro; root /var/www/anima-party/dist; index index.html; }
```
Rsync target matches exactly: `root@89.167.115.150:/var/www/anima-party/dist/`
