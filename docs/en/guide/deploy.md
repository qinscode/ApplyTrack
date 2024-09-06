# Deploy

## Deploy with Vercel


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTinsFox%2Fshadcnui-boilerplate&env=VITE_APP_NAME,VITE_API_URL,VITE_ENABLE_DEVTOOLS,VITE_EDITOR,VITE_ENABLE_MOCK)

## Deploy with Docker

The project includes [dockerfile](https://github.com/TinsFox/shadcnui-boilerplate/blob/main/Dockerfile) and [Nginx Conf](https://github.com/TinsFox/shadcnui-boilerplate/blob/main/docker/nginx.conf)

1. Build image

```bash
docker build -t shadcnui-boilerplate .
```

2. Run container

```bash
docker run -d -p 80:80 --name shadcnui-boilerplate shadcnui-boilerplate
```

::: details Why have your own Nginx Conf?

If you have multiple applications that need to be connected to different clients, each of them may need to handle cross-domain issues, which can be very slow and may not be updated in time.

If you have such needs, you can refer to the following configuration file and modify it. After verification, this configuration file is available.

```nginx.conf{12-20}
server {
    listen       80;
    server_name  localhost;

    client_max_body_size 1G; // Here, a larger value is set to allow file uploads, avoiding upload failures

    location /   {
        root   /app/dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:3000; // Modify according to actual conditions
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

