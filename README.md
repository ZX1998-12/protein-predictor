# 蛋白质特性预测系统

这个系统提供了多种蛋白质特性的预测功能，包括：

- Kcat预测
- Km预测
- Tm预测
- 蛋白质溶解度预测

## 功能特点

- 支持单序列预测和批量文件上传
- 提供API接口，方便其他系统集成
- 支持多种蛋白质特性的同时分析

## 使用方法

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm start
```

### 生产环境构建

```bash
npm run build
```

### 部署到GitHub Pages

1. 确保已安装gh-pages包
```bash
npm install --save-dev gh-pages
```

2. 部署到GitHub Pages
```bash
npm run deploy
```

### API配置

如需修改API服务器地址，请在`.env`文件中设置：
- 开发环境: `REACT_APP_LOCAL_API_URL`变量
- 生产环境: `REACT_APP_API_URL`变量

## 技术栈

- React
- TypeScript
- React Bootstrap
- Axios 