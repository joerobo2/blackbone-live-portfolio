# Deployment Notes

## Target

Host: Netlify  
Domain: portfolio.blackbone.live  
Registrar/DNS: Namecheap

## DNS Plan

Create a CNAME record in Namecheap:

Type: CNAME  
Host: portfolio  
Value: <netlify-site-name>.netlify.app  
TTL: Automatic

## Portability Rule

Netlify is only the first deployment surface.

The durable assets are:

1. Domain ownership
2. GitHub repository
3. Static site source
4. Exportable build output
5. DNS control
