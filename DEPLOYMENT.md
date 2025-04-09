# 部署指南

## 部署到GitHub Pages

### 1. 创建GitHub仓库

1. 登录您的GitHub账户 (https://github.com/ZX1998-12)
2. 创建一个新的仓库，命名为 "protein-predictor"
3. 记下仓库地址，例如 `https://github.com/ZX1998-12/protein-predictor.git`

### 2. 初始化Git仓库并推送代码

```bash
# 进入项目目录
cd website

# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交"

# 添加远程仓库
git remote add origin https://github.com/ZX1998-12/protein-predictor.git

# 推送代码
git push -u origin master
```

### 3. 部署到GitHub Pages

确保已安装gh-pages包后，运行部署命令：

```bash
npm run deploy
```

### 4. 配置GitHub Pages

1. 进入GitHub仓库页面
2. 点击"Settings"
3. 滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中选择"gh-pages"分支
5. 点击"Save"

### 5. 访问您的网站

部署完成后，您可以通过以下URL访问您的网站：

```
https://zx1998-12.github.io/protein-predictor
```

## 更新网站

如果您对网站进行了更改，只需重新运行部署命令即可更新GitHub Pages上的网站：

```bash
npm run deploy
```

## API后端部署

为了使您的应用完全可用，您需要将API后端部署到公共服务器上，并更新`.env`文件中的`REACT_APP_API_URL`指向您的API服务器地址。 