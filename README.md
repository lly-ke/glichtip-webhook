glichtip 钉钉异常通知

glichtip webhook 转发钉钉机器人


# 运行
## Docker

```shell
 docker run -d --rm -p 3123:3123 \
      -e GW_BASEURL=https://oapi.dingtalk.com/robot/send \
      -e GW_ACCESSTOKEN=6e124b6de6155c2c6f1d87c9225cd498608618fa4c173a9749a5xxxx \
      -e GW_SECRET=SEC7f81884eaf568a6bd3b3b671f1ea85760f027c3d6b3c11903ff87fxxxxxxxxxx \
  2720851545/glichtip-webhook:2024-04-20
```

##  Docker Compose

[下载 compose 文件](https://github.com/lly-ke/glichtip-webhook/raw/main/docker-compose.yml)
```
docker compose up -d
```
