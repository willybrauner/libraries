# @wbe/deferred-promise

Create a deferred promise who can be resolved or rejected from anywhere.

![](https://img.shields.io/npm/v/@wbe/deferred-promise/latest.svg)
![](https://img.shields.io/bundlephobia/minzip/@wbe/deferred-promise.svg)
![](https://img.shields.io/npm/dt/@wbe/deferred-promise.svg)
![](https://img.shields.io/npm/l/@wbe/deferred-promise.svg)

## Installation

```shell script
$ npm install -s @wbe/deferred-promise
```

## How to use

```js
import { deferredPromise } from "@wbe/deferred-promise";

// create deferred promise
const deferred = deferredPromise();

deferred.promise.then(() => {
  // deferredPromise is resolved!
});

// when needed, resolve this promise
deferred.resolve();

// or reject it
deferred.reject();
```
