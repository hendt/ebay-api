# eBay API Changelog
### [9.1.1](https://github.com/hendt/ebay-api/compare/v9.1.0...v9.1.1) (2024-08-23)


### Bug Fixes

* [#179](https://github.com/hendt/ebay-api/issues/179) refresh the token on 931 error ([e47b93e](https://github.com/hendt/ebay-api/commit/e47b93ea23a1df0c747a294c7c448afb83ce39b8))

## [9.1.0](https://github.com/hendt/ebay-api/compare/v9.0.3...v9.1.0) (2024-07-02)


### Features

* add "firstError" in EBayApiError ([c2bff1e](https://github.com/hendt/ebay-api/commit/c2bff1ee5271d959282e0d86d6683dd541640fce))
* make xmlBuilderOptions configurable ([ce7f787](https://github.com/hendt/ebay-api/commit/ce7f787136b6756350c82aa9b40aff08b90739b4))

### [9.0.3](https://github.com/hendt/ebay-api/compare/v9.0.2...v9.0.3) (2024-06-27)


### Bug Fixes

* change type of response status to number ([f062fc9](https://github.com/hendt/ebay-api/commit/f062fc937895c96709f3f8ff2fe2ef730f5f1264))
* version in README.md ([0991cc3](https://github.com/hendt/ebay-api/commit/0991cc3832ee040df01d59d11d120245822dfd22))

### [9.0.2](https://github.com/hendt/ebay-api/compare/v9.0.1...v9.0.2) (2024-06-21)


### Bug Fixes

* revert back to postForm because axios does not encode correctly ([c369044](https://github.com/hendt/ebay-api/commit/c369044d850f21b3b6bc4bf8f90e01e841311332))

### [9.0.1](https://github.com/hendt/ebay-api/compare/v9.0.0...v9.0.1) (2024-06-20)


### Bug Fixes

* update deps ([14c41ab](https://github.com/hendt/ebay-api/commit/14c41abaf7910d8383e43c901088d080d8453e08))

## [9.0.0](https://github.com/hendt/ebay-api/compare/v9.0.0-RC.0...v9.0.0) (2024-06-20)


### Features

* update sell metadata to v1.7.1 ([124ed0b](https://github.com/hendt/ebay-api/commit/124ed0bae347267d2f31234fa52068e2e9a5829a))

## [9.0.0-RC.0](https://github.com/hendt/ebay-api/compare/v8.7.2-RC.0...v9.0.0-RC.0) (2024-04-25)


### ⚠ BREAKING CHANGES

* refactor error handling

### Bug Fixes

* improve Type in oAuth2 ([28a9088](https://github.com/hendt/ebay-api/commit/28a9088cac3f9c5c6064855cac336ad83d212f07))


* refactor error handling ([05d40a9](https://github.com/hendt/ebay-api/commit/05d40a9389ca0b3496bee95dfa6d0623f54562f0))

### [8.7.2-RC.0](https://github.com/hendt/ebay-api/compare/v8.7.1...v8.7.2-RC.0) (2024-03-29)


### Bug Fixes

* [#165](https://github.com/hendt/ebay-api/issues/165) allow string as Metric value ([f20f688](https://github.com/hendt/ebay-api/commit/f20f688701a8835c6aeb1fd7c570ae25053d1f83))
* refresh Auth token if it's hard expired ([1d8410f](https://github.com/hendt/ebay-api/commit/1d8410fc375d53b0305bd4ea63a64547a1e93cff))
* use same timestamp in digital signature ([20bc69a](https://github.com/hendt/ebay-api/commit/20bc69a2d65d8addde80a3996cd5bdf895f81760))

### [8.7.1](https://github.com/hendt/ebay-api/compare/v8.7.0...v8.7.1) (2024-02-09)


### Bug Fixes

* export commerce media ([bd20570](https://github.com/hendt/ebay-api/commit/bd205704a33f4c9804f897c277e4da81d69afe87))

## [8.7.0](https://github.com/hendt/ebay-api/compare/v8.6.1...v8.7.0) (2024-02-05)


### Features

* add commerce media api ([ab7dedd](https://github.com/hendt/ebay-api/commit/ab7dedd8744b5aad5789f79444ea4e46e800994b))

### [8.6.1](https://github.com/hendt/ebay-api/compare/v8.6.0...v8.6.1) (2024-01-18)


### Bug Fixes

* :bug: fixes search cancellations request with query parameters ([60133ab](https://github.com/hendt/ebay-api/commit/60133abd43bc8d2464e8c30b47d39e35a42a11dc))

## [8.6.0](https://github.com/hendt/ebay-api/compare/v8.5.1...v8.6.0) (2023-10-08)


### Features

* removeComments is true to reduce module size ([91725b4](https://github.com/hendt/ebay-api/commit/91725b42e3f333e90e9ef276aa247adcbd4e783c))
* update sell Marketing API v1.17.0 ([c3acbfb](https://github.com/hendt/ebay-api/commit/c3acbfb6b7666f44f88c8865ec4e2a72e2e6c4c2))

### [8.5.1](https://github.com/hendt/ebay-api/compare/v8.5.0...v8.5.1) (2023-09-28)


### Bug Fixes

* handle invalid token in Shopping API ([98b0aeb](https://github.com/hendt/ebay-api/commit/98b0aebbad99d29bf37205aba3561810eb2cbd27))
* Locale that is used for 'accept-language' and 'content-language' was mixed with LocaleEnum that should be used in Inventory API ([dd4b71d](https://github.com/hendt/ebay-api/commit/dd4b71d5c1683a552e7c4ba9f7101fc8905cf96c)), closes [/community.ebay.com/t5/Post-Order-APIs-Return/error-when-posting-to-issue-refund-with-returnid/m-p/34000648#M14](https://github.com/hendt//community.ebay.com/t5/Post-Order-APIs-Return/error-when-posting-to-issue-refund-with-returnid/m-p/34000648/issues/M14)

## [8.5.0](https://github.com/hendt/ebay-api/compare/v8.4.1...v8.5.0) (2023-08-29)


### Features

* export request and param types ([adc6cce](https://github.com/hendt/ebay-api/commit/adc6ccec7240713cdc3f0290b7cac246a97a37fc))
* generate types with openai-typescript ([62d6178](https://github.com/hendt/ebay-api/commit/62d6178b1d41e4dd39467610377dac7acd941591))
* implement openai spec operations ([035e8c8](https://github.com/hendt/ebay-api/commit/035e8c86200cc512024c71e7e6eacced9859f765))
* improve more types ([fb170ae](https://github.com/hendt/ebay-api/commit/fb170ae96ff5e884d30c99da26328f54e6f7cb2b))
* use openai typedef in query too ([afdd9c6](https://github.com/hendt/ebay-api/commit/afdd9c6d099f61bfe053b75ee5ec2c0f71e3e5d2))


### Bug Fixes

* ignore openapi generated folder in tslint.json ([2d3e748](https://github.com/hendt/ebay-api/commit/2d3e748ad0ebe3214fd5b4aa617bae55133d24c4))
* traditional api types ([ac9cd61](https://github.com/hendt/ebay-api/commit/ac9cd6189faeb760e0d36a5f29827b1b0a8ffef0))

### [8.4.1](https://github.com/hendt/ebay-api/compare/v8.4.0...v8.4.1) (2023-05-25)

## [8.4.0](https://github.com/hendt/ebay-api/compare/v8.3.0...v8.4.0) (2023-01-27)


### Features

* add setSignature method ([de1b466](https://github.com/hendt/ebay-api/commit/de1b4669d37fd5a1c9bae0259a4d5bac18ac7e7f))


### Bug Fixes

* remove unused globals crypto ([a3ceaab](https://github.com/hendt/ebay-api/commit/a3ceaab2c9d9cae5cf1fe8deb49fc1ccd0313362))
* show error message in browser since digital signature is not supported here ([314211b](https://github.com/hendt/ebay-api/commit/314211bdb6f90a6c2cb6efd66845d85096a39d48))

## [8.2.0-RC.0](https://github.com/hendt/ebay-api/compare/v8.1.0...v8.2.0-RC.0) (2022-12-27)


### Features

* digital signature [#132](https://github.com/hendt/ebay-api/issues/132) ([9aedbb5](https://github.com/hendt/ebay-api/commit/9aedbb50e0f035c2922818674b29fa6be037e3e4))

## [8.3.0](https://github.com/hendt/ebay-api/compare/v8.2.0...v8.3.0) (2023-01-18)


### Features

* update restful sell marketing api to v1.14.0 ([d76a6f1](https://github.com/hendt/ebay-api/commit/d76a6f1f151d9d0f81a490681b0e694881d751a8))

## [8.2.0](https://github.com/hendt/ebay-api/compare/v8.1.0...v8.2.0) (2023-01-09)


### Features

* update sell.account api to v1.9.0 ([183d0ef](https://github.com/hendt/ebay-api/commit/183d0ef578d5495838032a7b8dbb3f20dd7028ed))

## [8.1.0](https://github.com/hendt/ebay-api/compare/v8.0.1...v8.1.0) (2022-12-27)


### Features

* update sell.feed API ([a17d9e3](https://github.com/hendt/ebay-api/commit/a17d9e3ced00bafa1ef5446308b2c56012658f53))


### Bug Fixes

* reverts types in package.json ([aac52a3](https://github.com/hendt/ebay-api/commit/aac52a386cebd1c66cd6b925d2f6e0a0736f290b))

### [8.0.1](https://github.com/hendt/ebay-api/compare/v8.0.0...v8.0.1) (2022-12-21)

## [8.0.0](https://github.com/hendt/ebay-api/compare/v8.0.0-RC.0...v8.0.0) (2022-12-21)

## [8.0.0-RC.0](https://github.com/hendt/ebay-api/compare/v7.1.3...v8.0.0-RC.0) (2022-12-08)


### ⚠ BREAKING CHANGES

* output esm and cjs

### Features

* output esm and cjs ([b37d96e](https://github.com/hendt/ebay-api/commit/b37d96e8120a28be5e5cde4844a683909eaa9081))


### Bug Fixes

* standard-version ext ([df6b7e3](https://github.com/hendt/ebay-api/commit/df6b7e3ac600c8409117832762d416b1fe0500a2))

### [7.1.3](https://github.com/hendt/ebay-api/compare/v7.1.2...v7.1.3) (2022-12-03)


### Bug Fixes

* get access token before calling traditional API ([a4a3123](https://github.com/hendt/ebay-api/commit/a4a312319ba42d479e98628a7a5b611a3ef8c237))

### [7.1.2](https://github.com/hendt/ebay-api/compare/v7.1.1...v7.1.2) (2022-11-22)

### [7.1.1](https://github.com/hendt/ebay-api/compare/v7.1.0...v7.1.1) (2022-11-03)

## [7.1.0](https://github.com/hendt/ebay-api/compare/v7.0.2...v7.1.0) (2022-11-03)


### Features

* added developer key management API ([75ccb60](https://github.com/hendt/ebay-api/commit/75ccb6081fd03e7e06934152e8165186b9c8cc04))


### Bug Fixes

* add missed oas3 file ([cce7c9d](https://github.com/hendt/ebay-api/commit/cce7c9d4c8b0b88b1e501bc14929b4987b15b576))

### [7.0.2](https://github.com/hendt/ebay-api/compare/v7.0.1...v7.0.2) (2022-06-29)

### [7.0.1](https://github.com/hendt/ebay-api/compare/v7.0.0...v7.0.1) (2022-06-28)


### Bug Fixes

* add missed sort parameter ([f4cf095](https://github.com/hendt/ebay-api/commit/f4cf095d9fffb645f01b36c7e024d3def9c8ebca))
* fix enum used for refundMethod ([99203d2](https://github.com/hendt/ebay-api/commit/99203d278fc98022bbe622fe082ef3be46dae0f9))

## [7.0.0](https://github.com/hendt/ebay-api/compare/v6.2.0...v7.0.0) (2022-03-18)


### ⚠ BREAKING CHANGES

* add "returnResponse" config for API. If set to true, return the response instead of data.

### Features

* add "returnResponse" config for API. If set to true, return the response instead of data. ([41a8abb](https://github.com/hendt/ebay-api/commit/41a8abb8cba4723df143f840fc7d9d40f6e16577))


### Bug Fixes

* fromEnv() make EBAY_DEV_ID optional ([9c90bfa](https://github.com/hendt/ebay-api/commit/9c90bfa9d6a19fe09a397d8c847a6831809d8899))

## [6.2.0](https://github.com/hendt/ebay-api/compare/v6.1.0...v6.2.0) (2022-03-06)


### Features

* add "default" export for esm ([d2454d9](https://github.com/hendt/ebay-api/commit/d2454d9a9b896647cc9c5ab5086be7fea82ec7a4))


### Bug Fixes

* add types and enums for package dimensions and addresses ([97404b9](https://github.com/hendt/ebay-api/commit/97404b95ab9b57fd993005e8d34002300780c783))

## [6.1.0](https://github.com/hendt/ebay-api/compare/v6.0.0...v6.1.0) (2022-02-08)


### Features

* Update issue templates ([5c4f17f](https://github.com/hendt/ebay-api/commit/5c4f17f43683859c3501888b0dbff2a855df1dd6))

## [6.0.0](https://github.com/hendt/ebay-api/compare/v5.3.1...v6.0.0) (2022-02-08)


### ⚠ BREAKING CHANGES

* rename package name from '@hendt/ebay-api' to 'ebay-api'

* rename package name from '@hendt/ebay-api' to 'ebay-api' ([fa61e14](https://github.com/hendt/ebay-api/commit/fa61e149f509dd8b33d07627c0325838c82568a6))

### [5.3.1](https://github.com/hendt/ebay-api/compare/v5.3.0...v5.3.1) (2022-02-08)

## [5.3.0](https://github.com/hendt/ebay-api/compare/v5.2.1...v5.3.0) (2022-01-21)


### Features

* add Merchandising API [#103](https://github.com/hendt/ebay-api/issues/103) ([f82f295](https://github.com/hendt/ebay-api/commit/f82f295935ef062cf75be411f6fc526bc3fd4ff0))


### Bug Fixes

* correct example file name ([507b298](https://github.com/hendt/ebay-api/commit/507b298e08d27ae4645c8188cfe1a47907eb0fb5))

### [5.2.1](https://github.com/hendt/ebay-api/compare/v5.2.0...v5.2.1) (2022-01-05)


### Bug Fixes

* allow fieldGroups in fulfillment.getOrders call ([6da3fd0](https://github.com/hendt/ebay-api/commit/6da3fd0f8496bac45994914f4f7d9a16fcc18997))
* commerce.translations oas test ([c80f1af](https://github.com/hendt/ebay-api/commit/c80f1afd59d2f3cd534ff6976f779f7574676da3))

## [5.2.0](https://github.com/hendt/ebay-api/compare/v5.1.1...v5.2.0) (2021-12-17)


### Features

* add fieldGroups param in fulfillment.getOrder() ([23562be](https://github.com/hendt/ebay-api/commit/23562bee43d88d7bf737ba2d1da995d7fe5aab88))

### [5.1.1](https://github.com/hendt/ebay-api/compare/v5.1.0...v5.1.1) (2021-12-03)


### Bug Fixes

* use "http" in xmlns for finding API [#14](https://github.com/hendt/ebay-api/issues/14) ([f8ea062](https://github.com/hendt/ebay-api/commit/f8ea0628e22d224c5f13fdb9b9d443394eddcafe))

## [5.1.0](https://github.com/hendt/ebay-api/compare/v5.0.3...v5.1.0) (2021-11-23)


### Features

* update buy browse API ([6ca0334](https://github.com/hendt/ebay-api/commit/6ca0334d314db86896453b004b7c0bf0eadf7d9e))
* update restful notification api to v1.2.0 ([91e5de3](https://github.com/hendt/ebay-api/commit/91e5de3740641cbd09f89b0cd07969dbfcd87644))
* update sell analytics, metadata and recommendation API and oas ([214c0b0](https://github.com/hendt/ebay-api/commit/214c0b0df827ad95846f0345501214ed09e8b34b))
* update sell compliance API ([aed292c](https://github.com/hendt/ebay-api/commit/aed292c77b6b1a7db222a085260bc3c286a824c0))
* update sell fulfillment API ([274f2f4](https://github.com/hendt/ebay-api/commit/274f2f466c40a6ea050a76aacfe58efe0435e374))

### [5.0.3](https://github.com/hendt/ebay-api/compare/v5.0.2...v5.0.3) (2021-11-11)


### Bug Fixes

* remove stripCode instead check if window is defined ([65eb840](https://github.com/hendt/ebay-api/commit/65eb84046462c2d3964e52964b34975232560a39))

### [5.0.2](https://github.com/hendt/ebay-api/compare/v5.0.1...v5.0.2) (2021-11-11)


### Bug Fixes

* declare property 'id' for every Restful API since constructor.name is not reliable ([71ce1ad](https://github.com/hendt/ebay-api/commit/71ce1ad81e9479a6faee1b62f20971dbb587a32f))

### [5.0.1](https://github.com/hendt/ebay-api/compare/v5.0.0...v5.0.1) (2021-11-11)


### Bug Fixes

* remove restful 'Accept-Encoding' header in browser environment. ([dd9db62](https://github.com/hendt/ebay-api/commit/dd9db62caf162cced67c71415e573df71ba85419))

## [5.0.0](https://github.com/hendt/ebay-api/compare/v4.0.4...v5.0.0) (2021-10-28)


### ⚠ BREAKING CHANGES

* target ES2020 and Node >= 14

* target ES2020 and Node >= 14 ([81c1973](https://github.com/hendt/ebay-api/commit/81c197398b1a47a1c39e60a393d7e1a9fc165a99))

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
