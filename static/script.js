var loader = document.getElementById("loader");
var file = document.getElementById("data");
var dropContainer = document.getElementById("drop");
var sheet = document.getElementById("sheet");

dropContainer.ondragover = dropContainer.ondragenter = function (evt) {
    evt.preventDefault();
};

dropContainer.ondrop = function (evt) {
    // pretty simple -- but not for IE :(
    file.files = evt.dataTransfer.files;
    convertXLSXFile();
    evt.preventDefault();
};

document.querySelector("input").addEventListener("change", convertXLSXFile);

function convertXLSXFile() {
    var reader = new FileReader();
    toggleLoader();

    reader.onload = function () {
        var binary = "";
        var bytes = new Uint8Array(reader.result);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        /* Call XLSX */
        var workbook = XLSX.read(binary, {
            type: "binary",
        });

        toggleLoader();

        if (workbook.SheetNames.length > 1) {
            sheet.style.display = "block";
            sheet.innerHTML = null;

            /* Default item */
            var opt = document.createElement("option");
            opt.selected = true;
            opt.disabled = true;
            opt.innerHTML = "Select sheet...";
            sheet.appendChild(opt);

            for (var i = 0; i < workbook.SheetNames.length; i++) {
                var opt = document.createElement("option");
                opt.value = i;
                opt.innerHTML = workbook.SheetNames[i];
                sheet.appendChild(opt);
            }
            sheet.addEventListener("change", function (event) {
                sheetNr = parseInt(sheet.options[sheet.selectedIndex].value);
                convertToJson(workbook, sheetNr);
                sheet.style.display = "none";
            });
        } else {
            convertToJson(workbook, 0);
            sheet.style.display = "none";
        }
    };
    reader.readAsArrayBuffer(file.files[0]);
}

function toggleLoader() {
    if (loader.style.display == "none") {
        loader.style.display = "block";
    } else {
        loader.style.display = "none";
    }
}

function convertToJson(workbook, sheetNr) {
    var sheetname = workbook.SheetNames[sheetNr];
    var worksheet = workbook.Sheets[sheetname];

    toggleLoader();
    // Open XLSX as JSON and save to file
    saveJsonToFile(
        XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
        }),
        file.files[0].name.replace(".xlsx", "")
    );
    toggleLoader();
}

function saveJsonToFile(jsonObj, filename) {
    const saveObj = jsonObj;

    // file setting
    const text = JSON.stringify(saveObj);
    const name = filename + ".json";
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
