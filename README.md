# preset-chrome

## Usage

### Setup environment variables

**`~/.bashrc`** or **`~/.zshrc`**
```shell
export http_proxy=http://squid.example.com:8080
export https_proxy=$http_proxy
export HTTP_PROXY=$http_proxy
export HTTPS_PROXY=$http_proxy
```

### Intergration

**`index.html`**
```html
<!DOCTYPE html>
<html class="no-js nimbus pf-m-redhat-font">
  <head>
    <!-- SPA_HEAD -->
    <!--#include virtual="/_include_/init.html" -->
    <!--#include virtual="/services/chrome/head/$locale?legacy=false" -->
  </head>
  <body>
    <!-- SPA_HEADER -->
    <!--#include virtual="/services/chrome/header/$locale?legacy=false" -->
    <div class="container">
      <div id="chrometwo">
        <div id="root">
          Hello world
        </div>
      </div>
    </div>
    <!-- SPA_FOOTER -->
    <!--#include virtual="/services/chrome/footer/$locale?legacy=false" -->
  </body>
</html>
```

#### **Create React App**

**`src/setupProxy.js`**
```javascript
const setupChrome = require("@redhat-customer-portal/preset-chrome");

module.exports = (app) => {
  setupChrome(app);
} 

```


#### **Express**

**`app.js`**
```javascript
const express = require("express");
const setupChrome = require("@redhat-customer-portal/preset-chrome");

const app = express();
setupChrome(app);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log(`server is running`);
});
```
