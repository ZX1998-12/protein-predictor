# 生物信息学预测平台

这个平台提供了多种生物分子特性的预测功能，包括：

## 蛋白质预测
- Kcat预测
- Km预测
- Tm预测
- 溶解度预测

## 基因预测
- 启动子强度预测
- RBS翻译起始率预测

## 功能特点

- 支持单序列预测和批量文件上传
- 提供API接口，方便其他系统集成
- 支持多种生物分子特性的分析
- 直观的用户界面，便于操作使用

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

## 关于GitHub Pages托管

本项目已部署到GitHub Pages：https://zx1998-12.github.io/protein-predictor/

### 托管特性

- **永久可用**: 部署到GitHub Pages后，网站将全天候24/7可用
- **独立于本地电脑**: 本地电脑关机不会影响网站的可访问性
- **自动HTTPS**: GitHub Pages提供免费的HTTPS支持
- **免费托管**: GitHub Pages提供免费的静态网站托管服务

### 注意事项

- **API后端需独立部署**: GitHub Pages只能托管静态内容，API后端需部署到支持后端服务的平台
- **更新方式**: 要更新网站内容，需在本地修改代码后运行`npm run deploy`命令
- **域名设置**: 可在GitHub仓库设置中配置自定义域名

## 技术栈

- React
- TypeScript
- React Bootstrap
- Axios 