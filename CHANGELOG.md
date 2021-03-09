# eBay API Changelog
## [2.0.0](https://github.com/hendt/ebay-api/compare/v1.5.1...v2.0.0) (2021-03-09)


### ⚠ BREAKING CHANGES

* refactoring
* parse attributes on eBay xml response

### Features

* apply default parse options to xml request ([dd95255](https://github.com/hendt/ebay-api/commit/dd952555d636b227ab24a8f31a66aebca1e7a36c))
* enable arrayMode in XML response ([bc91c79](https://github.com/hendt/ebay-api/commit/bc91c79371bbaa78023a401322d27d11c71d01d6))
* parseTrueNumberOnly in xml ([c5cb5ed](https://github.com/hendt/ebay-api/commit/c5cb5ed4cfd05d9f4516273cf4680494543cb951))
* remove AxiosRateLimited and Expose Axios instance ([fe37918](https://github.com/hendt/ebay-api/commit/fe379185f36514b1d8c38d29d5bc89b1084c6ddd))
* support additional header in XML request ([bd52f33](https://github.com/hendt/ebay-api/commit/bd52f338c9c5c1aaa211d7fc12fd30ba204844c8))


### Bug Fixes

* change back to git dependency ([d4017be](https://github.com/hendt/ebay-api/commit/d4017bef336f4f23d91cd0abf2552b3ecb217c38))
* change to https for travis ([2c59820](https://github.com/hendt/ebay-api/commit/2c59820b15063d165df230baef1997f6eea79ec5))
* improve arrayMode ([4099dfb](https://github.com/hendt/ebay-api/commit/4099dfb47fa240493bebd0a29e8786ee26b33051))
* parse attributes on eBay xml response ([6970ae6](https://github.com/hendt/ebay-api/commit/6970ae6099099fed534f4b92327308a67375ef5d))
* remove List from arrayMode ([691c194](https://github.com/hendt/ebay-api/commit/691c19465f4df27040b1041f14ed97101068a81c))


* refactoring ([bcb3a5e](https://github.com/hendt/ebay-api/commit/bcb3a5e46b89f5fc50020297d4b41d7f2d57f4b3))

### [1.5.1](https://github.com/hendt/ebay-api/compare/v1.5.0...v1.5.1) (2021-02-21)


### Bug Fixes

* udpate comment and return type to more accuratly decribe what is returned from eBay ([6ea2458](https://github.com/hendt/ebay-api/commit/6ea2458457a4f63109275687af235656da5fd73a))
* update call to include correct response type ([763df8a](https://github.com/hendt/ebay-api/commit/763df8a01f7783135d607218d390557909d1177c))

## [1.5.0](https://github.com/hendt/ebay-api/compare/v1.4.2...v1.5.0) (2021-02-21)


### Features

* add fetchItemAspects method ([457cb42](https://github.com/hendt/ebay-api/commit/457cb4223bb4bd7603cd1ff1c22ed08495a6511f))
* updated taxonomy url to GA version per eBay release notes ([1c44ad1](https://github.com/hendt/ebay-api/commit/1c44ad15a4959323285f6914db313ebaec0e1ed1))


### Bug Fixes

* updated testing oas3 file per eBay docs ([b758222](https://github.com/hendt/ebay-api/commit/b758222eb966461fded0cb72e845f6c041368adb))

### [1.4.2](https://github.com/hendt/ebay-api/compare/v1.4.1...v1.4.2) (2021-01-07)


### Bug Fixes

* Make Region.regionType optional ([9486ec6](https://github.com/hendt/ebay-api/commit/9486ec6c50b24c74ce33bd281314bbc9476c99a0))
* Remove sku from Compatibility ([506d988](https://github.com/hendt/ebay-api/commit/506d98875c5355d4f6e33f01ce6e04c5fec99260))

### [1.4.1](https://github.com/hendt/ebay-api/compare/v1.4.0...v1.4.1) (2020-10-22)


### Bug Fixes

* Create type EbayOfferDetailsWithId and use that for updateOffer ([0445e05](https://github.com/hendt/ebay-api/commit/0445e056b80ae4ab022f72fba2532311bb880f62))
* Merge pull request [#19](https://github.com/hendt/ebay-api/issues/19) from olliechick/fix-types ([a999b12](https://github.com/hendt/ebay-api/commit/a999b121037eeb9b6455a17091ef8ab09b488d9d))
* wrap glob pattern in single quotes ([ac2eb5f](https://github.com/hendt/ebay-api/commit/ac2eb5fc99c4cb11251fd46b952863c772851e38))

## [1.4.0](https://github.com/hendt/ebay-api/compare/v1.3.0...v1.4.0) (2020-10-02)


### Features

* Return refreshed token from refreshAuthToken ([b7075c3](https://github.com/hendt/ebay-api/commit/b7075c3698da56a0e6442bbe906ddbf5ace430b8))


### Bug Fixes

* fix siteId check ([3c8c1cb](https://github.com/hendt/ebay-api/commit/3c8c1cbf40805f8a344d039a3cfe3c3ae97bb5ec))
* fix type of PaymentPolicyRequest.paymentMethods ([e8a97a7](https://github.com/hendt/ebay-api/commit/e8a97a7001ec6142518e570243fc3be39898a627))
* Mark non-required types in PaymentPolicyRequest and children as optional ([efaad9d](https://github.com/hendt/ebay-api/commit/efaad9d45adf0deab1bf3dbfa4ae812a6273346c))
* Mark non-required types in ReturnPolicyRequest as optional ([2323344](https://github.com/hendt/ebay-api/commit/2323344d4ddfe197701aac6d3a46e0c235f0e415))
* remove requirement for siteId in eBayConfig; instead, throw errors when it is needed but not provided ([2df33f8](https://github.com/hendt/ebay-api/commit/2df33f8553ad6f01366201931b13d692ea2a16d8))

## [1.3.0](https://github.com/hendt/ebay-api/compare/v1.2.1...v1.3.0) (2020-09-25)


### Features

* **Sell:** add missed api calls ([4749eba](https://github.com/hendt/ebay-api/commit/4749eba505f3c2dfd8543650437ca8902f42779a))
* **Sell:** add missed API calls ([5aa03c3](https://github.com/hendt/ebay-api/commit/5aa03c3871c26a46545cd9fb29a628ba95789c09))

### [1.2.1](https://github.com/hendt/ebay-api/compare/v1.2.0...v1.2.1) (2020-06-16)


### Bug Fixes

* **PostOrder:** create return endpoint ([957c739](https://github.com/hendt/ebay-api/commit/957c739f06f6d6661ebe03fe60c45e22af05749b))

## [1.2.0](https://github.com/hendt/ebay-api/compare/v1.1.2...v1.2.0) (2020-06-09)


### Features

* add new enum and fix RefundDetail type ([3c15ffc](https://github.com/hendt/ebay-api/commit/3c15ffc0633987bf330d5508d9752c1fa82470bc))

### [1.1.2](https://github.com/hendt/ebay-api/compare/v1.1.1...v1.1.2) (2020-06-01)


### Bug Fixes

* fix wrong class name ([cf93a47](https://github.com/hendt/ebay-api/commit/cf93a476ecf74445e76893287ee2e31e9926faf0))

### [1.1.1](https://github.com/hendt/ebay-api/compare/v1.1.0...v1.1.1) (2020-05-31)


### Bug Fixes

* wrong name for restful cache ([dce891b](https://github.com/hendt/ebay-api/commit/dce891be1da1ec046e3be1f09fb8371fb1999a9c))

## [1.1.0](https://github.com/hendt/ebay-api/compare/v1.0.1...v1.1.0) (2020-05-31)


### Features

* add "prompt" login ([f876451](https://github.com/hendt/ebay-api/commit/f876451c42bdb44d0a8a3f696cc16e1cf6c8668b))
* cache restful api objects ([45220b9](https://github.com/hendt/ebay-api/commit/45220b904794a14d7c3d82f0f2b29bcf2211deb6))


### Bug Fixes

* post order issue_refund missed payload param ([2e735e6](https://github.com/hendt/ebay-api/commit/2e735e697925492241faf42e66ab2a4afa849fc3))

### [1.0.1](https://github.com/hendt/ebay-api/compare/v1.0.0...v1.0.1) (2020-03-19)


### Bug Fixes

* bump ([d7faf4d](https://github.com/hendt/ebay-api/commit/d7faf4def17099ff2c259a1bc070352f71d5f959))

## [1.0.0](https://github.com/hendt/ebay-api/compare/v0.9.1...v1.0.0) (2020-03-19)


### Bug Fixes

* update readme ([9c487c9](https://github.com/hendt/ebay-api/commit/9c487c9ea94f9ea15498e5799ad05a4c83ac09ee))
