# A Typescript SDK for working with the eBay API (WIP)


# Finding
```javascript
ebay.finding.findItemsIneBayStores({
    storeName: 'HENDT'
}, {raw: true}).then(a => {
    // Return raw XML
    console.log(a);
});

```