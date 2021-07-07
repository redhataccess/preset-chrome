# preset-chrome

[![npm version](https://img.shields.io/npm/v/@redhat-customer-portal/preset-chrome)](https://www.npmjs.com/package/@redhat-customer-portal/preset-chrome)

This preset is helping the people who want to integrate [Red Hat Customer Portal](https://access.redhat.com) Header/Footer in their app.

It will make your local development has an easy life

## Installation

```shell
npm install -D @redhat-customer-portal/preset-chrome
```

## Usage

### Setup environment variables

**`~/.bashrc`** or **`~/.zshrc`**
```shell
export http_proxy=http://squid.example.com:8080
export https_proxy=$http_proxy
export HTTP_PROXY=$http_proxy
export HTTPS_PROXY=$http_proxy
```

### Setup `/etc/hosts`, you won't need to do this if you already are the [spandx](https://github.com/redhataccess/spandx) user

**`/etc/hosts`**
```
127.0.0.1 dev.foo.redhat.com qa.foo.redhat.com stage.foo.redhat.com prod.foo.redhat.com
```


**`index.html`**
```html
<!DOCTYPE html>
<html class="no-js nimbus pf-m-redhat-font">
  <head>
    <!--#include virtual="/_include_/init.html" -->
    <!--#include virtual="/services/chrome/head/$locale?legacy=false" -->
  </head>
  <body>
    <!--#include virtual="/services/chrome/header/$locale?legacy=false" -->
    <div class="container">
      <div id="chrometwo">
        <div id="root">
          Your content
        </div>
      </div>
    </div>
    <!--#include virtual="/services/chrome/footer/$locale?legacy=false" -->
  </body>
</html>
```

### Local Development

#### **Create React App**

**`src/setupProxy.js`**
```javascript
const setupChrome = require("@redhat-customer-portal/preset-chrome");

module.exports = (app) => {
  setupChrome(app);
} 

```

#### **Webpack**

**`webpack.config.js`**
```javascript
const setupChrome = require("@redhat-customer-portal/preset-chrome");

module.export = {
  devServer: {
    before: (app) => {
      setupChrome(app);
    },
  },
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

### Enjoy

You can using following host to view your app
Each of them will mapping the specific environment of [Customer Portal](https://access.redhat.com)

* dev.foo.redhat.com
* qa.foo.redhat.com
* stage.foo.redhat.com
* prod.foo.redhat.com


### Server Configuration

Here is the configuration on remote server

#### Apache HTTPD server

Enable [Server Side Includes (SSI)](https://httpd.apache.org/docs/2.4/mod/mod_include.html)
**`include.conf`**
```apache
<IfModule mod_include.c>
    <Directory "/var/www/html">
        AddOutputFilter INCLUDES .html
        Options +Includes
    </Directory>
</IfModule>
```

Setup reverse proxy for chrome path
**`proxy.conf`**
```apache
SSLProxyEngine On
SSLProxyCheckPeerName off
SSLProxyCheckPeerCN off
SSLProxyCheckPeerExpire off
CacheRoot /tmp
CacheQuickHandler off
CacheIgnoreCacheControl on

<Location "/services/chrome">
    ProxyPass ${PORTAL_ORIGIN}/services/chrome
    ProxyPassReverse ${PORTAL_ORIGIN}/services/chrome
    CacheEnable disk
    CacheDefaultExpire 3600
    CacheMaxExpire 3600
    CacheHeader on
    CacheDetailHeader on
    CacheMinFileSize 1000
</Location>
```


## Known Issues

We not have fully SSI command support
The following commands are works

* echo
* include
* set
