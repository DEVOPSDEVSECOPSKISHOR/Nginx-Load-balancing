
# **Docker Load Balancing with Node.js and NGINX**

This project demonstrates how to set up **Docker** containers running a **Node.js** application, with **NGINX** used as a load balancer to distribute incoming requests across multiple Node.js containers. This setup is ideal for scalable, fault-tolerant, and highly available applications.

## **Table of Contents**
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Step 1: Build Node.js App](#step-1-build-nodejs-app)
  - [Step 2: Build NGINX Load Balancer](#step-2-build-nginx-load-balancer)
  - [Step 3: Deploy Containers](#step-3-deploy-containers)
  - [Step 4: Testing the Load Balancer](#step-4-testing-the-load-balancer)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## **Prerequisites**

To run this project, make sure you have the following installed:

- **Docker** (including Docker Compose for easier management)
- **Docker CLI**
- **Node.js** (optional, for running the app outside of Docker)

---

## **Project Structure**

```bash
.
├── app.js               # Node.js application code
├── Dockerfile.nodeapp   # Dockerfile for Node.js app container
├── Dockerfile.nginx     # Dockerfile for NGINX load balancer container
├── nginx.conf           # NGINX configuration file   # Docker Compose configuration
└── README.md            # This README file
```

- **app.js**: The Node.js application code.
- **Dockerfile.nodeapp**: Dockerfile to build the Node.js app container.
- **Dockerfile.nginx**: Dockerfile to build the NGINX load balancer container.
- **nginx.conf**: NGINX configuration for load balancing the Node.js containers.

---

## **Setup and Installation**

### **Step 1: Build Node.js App**

1. Clone the repository to your local machine.
2. Navigate to the Node.js app directory and create the `app.js` file with the following content:

```javascript
const express = require("express");
const app = express();

const appid = process.env.APPID || "defaultAppId"; 

app.get("/", (req, res) => 
    res.send(`appid: ${appid} home page: says hello!`)
);

app.get("/app1", (req, res) => 
    res.send(`appid: ${appid} app1 page: says hello!`)
);

app.get("/app2", (req, res) => 
    res.send(`appid: ${appid} app2 page: says hello!`)
);

app.get("/admin", (req, res) => 
    res.send(`appid: ${appid} ADMIN page: very few people should see this`)
);

const port = 9999;
app.listen(port, () => 
    console.log(`AppID: ${appid} is listening on port ${port}`)
);

```

3. Create the **Dockerfile.nodeapp** to build the Node.js app container:

```dockerfile
FROM node:16
WORKDIR /home/node/app
COPY app /home/node/app
RUN apt update && apt install -y iputils-ping
RUN npm install
EXPOSE 9999
CMD [ "node", "index.js"]
```

4. Build the Docker image for the Node.js app:

```bash
docker build -t nodeapp -f Dockerfile.nodeapp .
```

### **Step 2: Build NGINX Load Balancer**

1. Create the **nginx.conf** file with the following configuration:

```nginx

http {
    upstream allbackend {
        server nodecontainer1:9999;
        server nodecontainer2:9999;
        server nodecontainer3:9999;
        server nodecontainer4:9999;
    }
     upstream app2backend{
        server nodecontainer1:9999 max_fails=3 fail_timeout=30s;
        server nodecontainer2:9999 max_fails=3 fail_timeout=30s;
    }
    upstream app1backend{
        server nodecontainer3:9999 max_fails=3 fail_timeout=30s;
        server nodecontainer4:9999 max_fails=3 fail_timeout=30s;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://allbackend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /app1 {
            proxy_pass http://app1backend/;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_read_timeout 90;
            proxy_connect_timeout 90;
            proxy_send_timeout 90;

        }
        location /app2 {
            proxy_pass http://app2backend/;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_read_timeout 90;
            proxy_connect_timeout 90;
            proxy_send_timeout 90;
        }

        location /admin {
            return 403;
        }
    }
}

events { }


```

2. Create the **Dockerfile.nginx** for building the NGINX load balancer container:

```dockerfile
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

```

3. Build the Docker image for NGINX:

```bash
docker build -t nginx-loadbalancer -f Dockerfile.nginx .
```

### **Step 3: Deploy Containers**

1. Create a Docker network to allow containers to communicate:

```bash
docker network create networkapp
```

2. Run four **Node.js containers** with different `APPID` values:

```bash
docker run -d --name nodecontainer1 --network networkapp -e APPID=2222 nodeapp
docker run -d --name nodecontainer2 --network networkapp -e APPID=3333 nodeapp
docker run -d --name nodecontainer3 --network networkapp -e APPID=4444 nodeapp
docker run -d --name nodecontainer4 --network networkapp -e APPID=5555 nodeapp
```

3. Run the **NGINX container** to load balance the requests:

```bash
docker run -d --name nginxcontainer --network networkapp -p 8080:80 nginx-loadbalancer
```

### **Step 4: Testing the Load Balancer**

1. Open your browser and visit `http://localhost:8080`.
2. You should see the response from one of the Node.js containers, depending on which one NGINX forwards the request to (load balancing).
3. Test the routes:
   - `http://localhost:8080/`
   - `http://localhost:8080/app1`
   - `http://localhost:8080/app2`
4. The `/admin` route will return a `403 Forbidden` response as per the configuration.

---

## **Configuration**

- **Node.js Application**: The Node.js app uses the `APPID` environment variable to distinguish between different containers. Each container will display its unique `APPID` in the response.
- **NGINX Configuration**: NGINX load balances traffic between the Node.js containers using the `allbackend` upstream definition. The load balancing method is **round-robin** by default.

---

## **Troubleshooting**

- **Cannot connect to Node.js containers from NGINX**:
  - Ensure all containers are on the same Docker network (`networkapp`).
  - Double-check container names and IPs.

- **NGINX not balancing traffic**:
  - Check the NGINX logs:
    ```bash
    docker logs nginxcontainer
    ```

- **Node.js containers not responding**:
  - Check individual container logs to ensure the app is running correctly:
    ```bash
    docker logs nodecontainer1
    ```

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This **README.md** provides all the necessary steps and configurations to set up your Docker-based Node.js application with NGINX load balancing. Let me know if you need further help!