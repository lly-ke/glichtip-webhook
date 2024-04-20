# 使用官方Node.js作为基础镜像
FROM node:16-bullseye-slim

# 设置工作目录为/app
WORKDIR /app

# 将项目代码复制到工作目录
COPY . .

# 安装项目依赖
# RUN npm install

# 应用运行的端口号
EXPOSE 3123

# 启动应用
CMD ["node", "app.js"]
