var loader = document.getElementById("loader");
var file = document.getElementById("data");
var dropContainer = document.getElementById("drop");

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
    loader.style.display = "block";
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

        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        // Open XLSX as JSON and save to file
        saveJsonToFile(
            XLSX.utils.sheet_to_json(worksheet, {
                raw: true,
            }),
            file.files[0].name.replace(".xlsx", "")
        );

        loader.style.display = "none";
    };
    reader.readAsArrayBuffer(file.files[0]);
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
