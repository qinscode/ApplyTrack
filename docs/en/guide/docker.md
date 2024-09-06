# Deploy with Docker

## Docker

1. Build Docker image, dockerfile is in the root of the project

```bash
docker build -t shadcnui-boilerplate .
```

2. Run Docker container

```bash
docker run -p 3000:80 shadcnui-boilerplate
```
