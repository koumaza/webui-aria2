/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-0daf47d3'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "app.js",
    "revision": "82cc003d40e08c3ab6581d1f76392aee"
  }, {
    "url": "flags/br.svg",
    "revision": "ef701aba4f5dc68beb3166d7a19c8787"
  }, {
    "url": "flags/cn.svg",
    "revision": "a94c93941a4d8907fc2be5a61841c2b9"
  }, {
    "url": "flags/cz.svg",
    "revision": "80879b0e86919c6859d875da48efd0e0"
  }, {
    "url": "flags/de.svg",
    "revision": "4d7bac3b0b9ab578b009c54fecd5d06f"
  }, {
    "url": "flags/es.svg",
    "revision": "afff247381e7ebe7d31b609f33eca644"
  }, {
    "url": "flags/fr.svg",
    "revision": "f8952213641bba462c7314007909d394"
  }, {
    "url": "flags/id.svg",
    "revision": "9f708fe5bf604f5bf38ad5ca2c00c14b"
  }, {
    "url": "flags/ir.svg",
    "revision": "7bf140ab46a7630cb7c40d6ef87cc4ba"
  }, {
    "url": "flags/it.svg",
    "revision": "22b99ae704f3de63285bc9b9411c5031"
  }, {
    "url": "flags/jp.svg",
    "revision": "16a568ca9eb15a225e3a90aee0f68909"
  }, {
    "url": "flags/nl.svg",
    "revision": "390aa40fd896fda40718cf28e5b20ba5"
  }, {
    "url": "flags/pl.svg",
    "revision": "3fe3bd51a504e4239ca5adaeb17a1651"
  }, {
    "url": "flags/ru.svg",
    "revision": "e3ee3b099783ef393f2f4dabdc75d5bc"
  }, {
    "url": "flags/th.svg",
    "revision": "904dd7853b623153a82acf5c4abd297b"
  }, {
    "url": "flags/tr.svg",
    "revision": "ce2e2e8e0650cfed7548dd59c2c184c5"
  }, {
    "url": "flags/tw.svg",
    "revision": "26cc9d596b2dc8b90f177afc9c390242"
  }, {
    "url": "flags/us.svg",
    "revision": "8ec583188aba7e9426580350312d97a5"
  }, {
    "url": "index.html",
    "revision": "5caa96b5cfd869714d52933a19b37970"
  }], {});

});
