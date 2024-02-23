# 🔄 Excel2JSON Online Converter

<img src="https://img.shields.io/badge/status-online-green">

This online tool helps to convert Excel XLSX files **GDPR-friendly** to JSON with the following features:

-   📊 Convert Excel XLSX and CSV files to JSON
-   💻 Direct conversion in-memory on browser without server
-   🗄️ Can handle large Excel files (>100MB)
-   ⌛️ Fast and easy-to-use frontend
-   🔐 GDPR friendly for company data sheets

**No required setup or installation**, just open the 🔄 [**Excel2JSON**](https://bitnulleins.github.io/excel2json/) GitHub Page in browser.

> [!WARNING]
> Please be patient if you upload a large Excel / CSV file for processding.

## Compatibility

| Tested Browser | Running? |
| -------------- | -------- |
| Safari         | ✅       |
| Chrome         | ✅       |
| Edge           | ✅       |
| Brave          | ✅       |

## FAQ

### How I can be sure, that it is data privacy friendly?

1. _Serverless_: This tool is directly hosted on Github with [Github pages](https://pages.github.com) with pure JS and HTML. Theres no server where file could uploaded to.
2. _Transparency_: The hosted code is open source published on this Repository. Feel free to check [HTML](./index.html) and [JS](./static/script.js) code lines.

### Get unexpected result

Then maybe your source Excel file did not have structured data (table). Or your select the wrong excel sheet name.

## Credits

Thanks to creator _SheetJSDev_ for the great [JS excel](https://github.com/SheetJS/sheetjs) package.
