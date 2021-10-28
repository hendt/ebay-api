# eBay API Changelog
### [4.0.4](https://github.com/hendt/ebay-api/compare/v4.0.3...v4.0.4) (2021-10-28)


### Bug Fixes

* **traditional:** use https in shopping API and finding API ([c1fecc0](https://github.com/hendt/ebay-api/commit/c1fecc0817f6c3e1abc14355599cd328648c3e34))

### [4.0.3](https://github.com/hendt/ebay-api/compare/v4.0.2...v4.0.3) (2021-10-19)


### Bug Fixes

* **shopping:** use iaf token in shopping API ([f24f24d](https://github.com/hendt/ebay-api/commit/f24f24dec9bb349425bb096ef0420d9c50dd7104))

### [4.0.2](https://github.com/hendt/ebay-api/compare/v4.0.1...v4.0.2) (2021-10-12)


### Bug Fixes

* **traditional:** only return api error if Ack is Failure [#93](https://github.com/hendt/ebay-api/issues/93) ([8f30eed](https://github.com/hendt/ebay-api/commit/8f30eed8f9c77d9516f382b4eb67d77ac3b95afc))
* **types:** make legacyReference in RefundItem optional ([5aa2e9e](https://github.com/hendt/ebay-api/commit/5aa2e9ed8e8315230205833441cf92d1aed2c244))

### [4.0.1](https://github.com/hendt/ebay-api/compare/v4.0.0...v4.0.1) (2021-09-09)


### Bug Fixes

* version in README.md ([46263e6](https://github.com/hendt/ebay-api/commit/46263e6e12007d0efbe873a8019238ccaff1b34f))

## [4.0.0](https://github.com/hendt/ebay-api/compare/v4.0.0-RC.1...v4.0.0) (2021-08-27)

## [4.0.0-RC.1](https://github.com/hendt/ebay-api/compare/v4.0.0-RC.0...v4.0.0-RC.1) (2021-08-27)


### Bug Fixes

* keep function name in minified version ([e4e58cc](https://github.com/hendt/ebay-api/commit/e4e58cc94eaccb37150a1cdc3fe6e7289aacd65b))
* remove custom User-Agent ([86cde05](https://github.com/hendt/ebay-api/commit/86cde051b180acd1ef947b9cac9d7374af1ce280))
* revert back to plain xml body since form-data with axios has weird issues ([45870d5](https://github.com/hendt/ebay-api/commit/45870d596ede9ec5a80d17da431a789bf675b447))

## [4.0.0-RC.0](https://github.com/hendt/ebay-api/compare/v3.3.3...v4.0.0-RC.0) (2021-08-26)


### ⚠ BREAKING CHANGES

* set per default to EBAY_US

### Features

* allow string in setCredentials() ([b17e300](https://github.com/hendt/ebay-api/commit/b17e300fd0710a45883890907152a77f5fefefd2))
* eps (WIP) ([6e7db5f](https://github.com/hendt/ebay-api/commit/6e7db5fa4431a9ce893d1622ccfd5c247153a901))
* upload picture to eps with working example ([2d6d46c](https://github.com/hendt/ebay-api/commit/2d6d46c8d653fe2488402d0f89c1181b082f8d5a))


### Bug Fixes

* eslint ([2e8727a](https://github.com/hendt/ebay-api/commit/2e8727aaa17622ccec187a2c4bd0199deb01e8ab))


* set per default to EBAY_US ([33b23de](https://github.com/hendt/ebay-api/commit/33b23de5d6af6dbacd2a5639480fa59c8a2215f9))

### [3.3.3](https://github.com/hendt/ebay-api/compare/v3.3.2...v3.3.3) (2021-08-26)


### Bug Fixes

* **types:** set ShippingFulfillmentDetails.shippedDate as optional ([2894739](https://github.com/hendt/ebay-api/commit/2894739e2deee00b0e75533598b1745ff85bb0b0))

### [3.3.2](https://github.com/hendt/ebay-api/compare/v3.3.1...v3.3.2) (2021-08-15)


### Bug Fixes

* IssueRefundRequest type ([8a75516](https://github.com/hendt/ebay-api/commit/8a75516a4b83e7c6497890abe7476c3bb9b286c6))

### [3.3.1](https://github.com/hendt/ebay-api/compare/v3.3.0...v3.3.1) (2021-08-12)

## [3.3.0](https://github.com/hendt/ebay-api/compare/v3.2.0...v3.3.0) (2021-07-25)


### Features

* add and use ReturnMethod, ReturnShippingCostPayer, and RegionType enums ([5a63eee](https://github.com/hendt/ebay-api/commit/5a63eee79e45d43d4bd7515a3dfd84390dfdb3fd))
* add response data to error meta ([021e84f](https://github.com/hendt/ebay-api/commit/021e84f24d4a712417685954b45af7eb8b107c5d))


### Bug Fixes

* add EBAY_BE marketplace ([c9330be](https://github.com/hendt/ebay-api/commit/c9330be44b919f98a6cb628148b56ed061fb05bf))
* make changelog headings consistent ([63dc373](https://github.com/hendt/ebay-api/commit/63dc3733953d44f92b78ec3be3a8f02b44f45fa5))

## [3.2.0](https://github.com/hendt/ebay-api/compare/v3.1.0...v3.2.0) (2021-04-25)


### Features

* add Marketplace enum and change types of marketplaceId params to use enums ([6b5eb93](https://github.com/hendt/ebay-api/commit/6b5eb93aed778b9830232a01c0ba98a1e391f3aa))


### Bug Fixes

* autoRefreshToken in traditional api call ([faadf94](https://github.com/hendt/ebay-api/commit/faadf945ffa3a1f21b5b732692318c6747e0ff91))
* use travis env for codecov ([6cb528c](https://github.com/hendt/ebay-api/commit/6cb528c82d1934b112c2b7fa702da6be16fa26b8))

## [3.1.0](https://github.com/hendt/ebay-api/compare/v3.0.0...v3.1.0) (2021-04-07)


### Features

* add charity API ([103e116](https://github.com/hendt/ebay-api/commit/103e116e4e9bf9a275bca17050de7dcf2faa7662))
* add commerce notification api ([b7d1f3b](https://github.com/hendt/ebay-api/commit/b7d1f3b8deb3df1bfffb9e83f320f2006f6be70f))
* add deal api ([8bb2479](https://github.com/hendt/ebay-api/commit/8bb24797470b6d0cb1ce9f6d01015c8623e2ebcd))
* add marketplace insights API ([3788ade](https://github.com/hendt/ebay-api/commit/3788ade9a464f5eb111d49c8e08a40237ae8a6cc))
* add sell feed api ([4d85a68](https://github.com/hendt/ebay-api/commit/4d85a6899b0f5a673e76ac03d9ce8502541f8904)), closes [#45](https://github.com/hendt/ebay-api/issues/45)
* add sell listing API ([fef65ac](https://github.com/hendt/ebay-api/commit/fef65acaa12ae6e089818d85c47ab3718c03648a))
* add sell logistics api ([2a289b8](https://github.com/hendt/ebay-api/commit/2a289b88bc8bec12eb827b4db48482afb42abdb7)), closes [#43](https://github.com/hendt/ebay-api/issues/43)
* add sell Negotiation api ([0dd0599](https://github.com/hendt/ebay-api/commit/0dd05991b6b2127d9d84809e5f061f8ffc83e270)), closes [#41](https://github.com/hendt/ebay-api/issues/41)

## [3.0.0](https://github.com/hendt/ebay-api/compare/v2.2.1...v3.0.0) (2021-04-07)


### ⚠ BREAKING CHANGES

* rename oAuth2 to OAuth2

### Features

* add apix/apiz and make restful api configurable ([081dab0](https://github.com/hendt/ebay-api/commit/081dab0d26d5b62205bf555a093f57a923905e84))
* add ContentLanguage enum ([a0a3d11](https://github.com/hendt/ebay-api/commit/a0a3d1131f5b8508e8ac5a966e247b042970cfd0))
* improve error handling ([c1fbdbb](https://github.com/hendt/ebay-api/commit/c1fbdbb582e7cf23d2135dd6159338d5aebbe08f))
* use Locale enum ([edcb921](https://github.com/hendt/ebay-api/commit/edcb9218be8e1e08f5b1b0bd27e687c7bf01b9f4))


### Bug Fixes

* eslint error ([2479c23](https://github.com/hendt/ebay-api/commit/2479c2365d0169a8142dc24ce0187c9bd6f3bebf))
* one more eslint error ([7bcfdbc](https://github.com/hendt/ebay-api/commit/7bcfdbcf15845f13a595c03c19a3dccb3c95487d))
* use RecipientAccountReferenceType ([42bab48](https://github.com/hendt/ebay-api/commit/42bab48d373a1431c261bb65e39b146c49a46321))


* rename oAuth2 to OAuth2 ([755a840](https://github.com/hendt/ebay-api/commit/755a8402da0cb47e511209c81e7da13a130033ba))

## [2.2.1](https://github.com/hendt/ebay-api/compare/v2.2.0...v2.2.1) (2021-03-11)


### Bug Fixes

* remove lib before build ([8cc6cbb](https://github.com/hendt/ebay-api/commit/8cc6cbbb225c8b66ae80cb787c1a0d5d779e315d))

## [2.2.0](https://github.com/hendt/ebay-api/compare/v2.1.1...v2.2.0) (2021-03-11)


### Features

* add some missing enums ([6d923d1](https://github.com/hendt/ebay-api/commit/6d923d17c06d08275fc03d8f68c2458263adebd0))


### Bug Fixes

* add package-lock.json to bumbFiles ([b82a901](https://github.com/hendt/ebay-api/commit/b82a90170566a2dac42e2f33bea3a2d7179e1afd))

## [2.1.1](https://github.com/hendt/ebay-api/compare/v2.1.0...v2.1.1) (2021-03-09)


### Bug Fixes

* minor fix for update readme script ([eaad8f9](https://github.com/hendt/ebay-api/commit/eaad8f99608faaefda6ae233cf4bbc3318d13f7f))

## [2.1.0](https://github.com/hendt/ebay-api/compare/v2.0.0...v2.1.0) (2021-03-09)


### Features

* finance api added ([25f0f94](https://github.com/hendt/ebay-api/commit/25f0f9463d1f844ed140277ebddb2720afe71e6b))


### Bug Fixes

* update readme script ([cbfea68](https://github.com/hendt/ebay-api/commit/cbfea681a6f9a6ed269f124f5191b2eaee8aceac))

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

## [1.5.1](https://github.com/hendt/ebay-api/compare/v1.5.0...v1.5.1) (2021-02-21)


### Bug Fixes

* udpate comment and return type to more accuratly decribe what is returned from eBay ([6ea2458](https://github.com/hendt/ebay-api/commit/6ea2458457a4f63109275687af235656da5fd73a))
* update call to include correct response type ([763df8a](https://github.com/hendt/ebay-api/commit/763df8a01f7783135d607218d390557909d1177c))

## [1.5.0](https://github.com/hendt/ebay-api/compare/v1.4.2...v1.5.0) (2021-02-21)


### Features

* add fetchItemAspects method ([457cb42](https://github.com/hendt/ebay-api/commit/457cb4223bb4bd7603cd1ff1c22ed08495a6511f))
* updated taxonomy url to GA version per eBay release notes ([1c44ad1](https://github.com/hendt/ebay-api/commit/1c44ad15a4959323285f6914db313ebaec0e1ed1))


### Bug Fixes

* updated testing oas3 file per eBay docs ([b758222](https://github.com/hendt/ebay-api/commit/b758222eb966461fded0cb72e845f6c041368adb))

## [1.4.2](https://github.com/hendt/ebay-api/compare/v1.4.1...v1.4.2) (2021-01-07)


### Bug Fixes

* Make Region.regionType optional ([9486ec6](https://github.com/hendt/ebay-api/commit/9486ec6c50b24c74ce33bd281314bbc9476c99a0))
* Remove sku from Compatibility ([506d988](https://github.com/hendt/ebay-api/commit/506d98875c5355d4f6e33f01ce6e04c5fec99260))

## [1.4.1](https://github.com/hendt/ebay-api/compare/v1.4.0...v1.4.1) (2020-10-22)


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

## [1.2.1](https://github.com/hendt/ebay-api/compare/v1.2.0...v1.2.1) (2020-06-16)


### Bug Fixes

* **PostOrder:** create return endpoint ([957c739](https://github.com/hendt/ebay-api/commit/957c739f06f6d6661ebe03fe60c45e22af05749b))

## [1.2.0](https://github.com/hendt/ebay-api/compare/v1.1.2...v1.2.0) (2020-06-09)


### Features

* add new enum and fix RefundDetail type ([3c15ffc](https://github.com/hendt/ebay-api/commit/3c15ffc0633987bf330d5508d9752c1fa82470bc))

## [1.1.2](https://github.com/hendt/ebay-api/compare/v1.1.1...v1.1.2) (2020-06-01)


### Bug Fixes

* fix wrong class name ([cf93a47](https://github.com/hendt/ebay-api/commit/cf93a476ecf74445e76893287ee2e31e9926faf0))

## [1.1.1](https://github.com/hendt/ebay-api/compare/v1.1.0...v1.1.1) (2020-05-31)


### Bug Fixes

* wrong name for restful cache ([dce891b](https://github.com/hendt/ebay-api/commit/dce891be1da1ec046e3be1f09fb8371fb1999a9c))

## [1.1.0](https://github.com/hendt/ebay-api/compare/v1.0.1...v1.1.0) (2020-05-31)


### Features

* add "prompt" login ([f876451](https://github.com/hendt/ebay-api/commit/f876451c42bdb44d0a8a3f696cc16e1cf6c8668b))
* cache restful api objects ([45220b9](https://github.com/hendt/ebay-api/commit/45220b904794a14d7c3d82f0f2b29bcf2211deb6))


### Bug Fixes

* post order issue_refund missed payload param ([2e735e6](https://github.com/hendt/ebay-api/commit/2e735e697925492241faf42e66ab2a4afa849fc3))

## [1.0.1](https://github.com/hendt/ebay-api/compare/v1.0.0...v1.0.1) (2020-03-19)


### Bug Fixes

* bump ([d7faf4d](https://github.com/hendt/ebay-api/commit/d7faf4def17099ff2c259a1bc070352f71d5f959))

## [1.0.0](https://github.com/hendt/ebay-api/compare/v0.9.1...v1.0.0) (2020-03-19)


### Bug Fixes

* update readme ([9c487c9](https://github.com/hendt/ebay-api/commit/9c487c9ea94f9ea15498e5799ad05a4c83ac09ee))
