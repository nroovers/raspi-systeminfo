# Deployment instructions

## Nginx

Hosting for frontend

App will be hosted by Nginx. Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

Create Nginx configuration file `raspi-sysinfo.conf` to configure the server for the app and store the configuration file in `/etc/nginx/sites-enabled` or `/etc/nginx/conf.d`

Check if your configuration is ok
```
sudo nginx -t
```
Restart nginx
```
sudo systemctl restart nginx
```
To see the status of Nginx service
```
$ sudo systemctl status nginx.service
```


## Systemd

Hosting for backend (node for Raspberry Pi)

Systemd is a system and service manager. To configure the service for the node backend, save the Systemd service configuration file `raspi-sysinfo.service` in `/etc/systemd/system` (other locations for storing systemd services are also possible).

When service file added or change, run following command so that systemd picks up the new info:

```
$ sudo systemctl daemon-reload
```

To launch the service:

```
$ sudo systemctl start raspi-sysinfo
```

To see the status of the service and all console output:

```
$ sudo systemctl status raspi-sysinfo
```

To enable the service to start at system start-up or after reboot:

```
$ sudo systemtl enable raspi-sysinfo
```