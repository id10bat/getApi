function searchData() {
    var input, table, tr, th, a, i;
    input = document.getElementById("myInputSearchData");
    table = input.value.toUpperCase();
    tr = document.getElementById("item");
    th = tr.getElementsByTagName("tr");
    for (i = 0; i < th.length; i++) {
        a = th[i].getElementsByTagName("th")[1];
        if (a.innerHTML.toUpperCase().indexOf(table) > -1) {
            th[i].style.display = "";
        } else {
            th[i].style.display = "none";

        }


    }
}




    const getApi = new XMLHttpRequest();
    getApi.open("GET", "http://150.95.26.138:3000/apis/products", true);
    getApi.send(null);

    const data = JSON.stringify(getApi.response)
    // getApi.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    getApi.onload = function () {

        let getData = JSON.parse(getApi.response);
        if (getApi.readyState == 4 && getApi.status == "200") {
            console.log(getData);
            let table = []
            let item;
            let productId, productBarcode, productName, productBrand, productManufacturer;
            for (let i = 0; i <= getData.products.length; i++) {
                for (const prop in getData.products[i]) {
                    switch (prop) {
                        case "productId":
                            productId = getData.products[i][prop];
                            break;
                        case "productBarcode":
                            productBarcode = getData.products[i][prop];
                            break;
                        case "productName":
                            productName = getData.products[i][prop];
                            break;
                        case "productBrand":
                            productBrand = getData.products[i][prop];
                            break;
                    }

                }
                table.push({ html: item })
                item = `<tr><th>${productId}</th><th>${productBarcode}</th><th>${productName}</th><th>${productBrand}</th><th><button onclick="checkData(${productId})">check</button></th></tr>`;

                // console.log(getData.products);
                // console.log(table);



            }

            let tableDataHead = ""
            let tableData = ""
            for (let i = 0; i < table.length; i++) {
                // console.log(table[i].html);

                if (table[i].html == undefined) {
                    tableDataHead = "<htr><hth>ลำดับ</hth><hth>รหัส</hth><hth>ชื่อ</hth><hth>แบรนด์/ ยื่ห้อ</hth><hth>รายละเอียด</hth></htr>";

                } else {
                    tableDataHead = "<htr><hth>ลำดับ</hth><hth>รหัส</hth><hth>ชื่อ</hth><hth>แบรนด์/ ยื่ห้อ</hth><hth>รายละเอียด</hth></htr>";
                    tableData += table[i].html
                }

            }

            document.getElementById("item").innerHTML = tableDataHead + tableData;


        } else {
            console.error(getData);
        }


    }

let detailProduct = ""
function checkData(funcProduct) {


    let funcProductContro = funcProduct - 1;
    console.log(funcProductContro);

    const getApiToDetailProduct = new XMLHttpRequest();
    getApiToDetailProduct.open("GET", "http://150.95.26.138:3000/apis/products", true);
    getApiToDetailProduct.send(null);
    getApiToDetailProduct.onload = function () {

        let getData2 = JSON.parse(getApiToDetailProduct.response);
        if (getApiToDetailProduct.readyState == 4 && getApiToDetailProduct.status == "200") {
            let detailProductId, detailProductBarcode, detailProductName, detailProductBrand, detailProductManufacturer,
                detailProductSize, detailProductStatus;
            if (funcProductContro == funcProductContro) {

                for (const prop in getData2.products[funcProductContro]) {
                    switch (prop) {
                        case "productId":
                            detailProductId = getData2.products[funcProductContro][prop];
                            break;
                        case "productBarcode":
                            detailProductBarcode = getData2.products[funcProductContro][prop];
                            break;
                        case "productName":
                            detailProductName = getData2.products[funcProductContro][prop];
                            break;
                        case "productBrand":
                            detailProductBrand = getData2.products[funcProductContro][prop];
                            break;
                        case "productManufacturer":
                            detailProductManufacturer = getData2.products[funcProductContro][prop];
                            break;
                        case "productSize":
                            detailProductSize = getData2.products[funcProductContro][prop];
                            break;
                        case "productStatus":
                            detailProductStatus = getData2.products[funcProductContro][prop];
                            break;
                    }

                }

                detailProduct = `Product Bar Code:
        <input type="text" placeholder="add" name="editData" id="pBarCode"  class="t0-input" value="${detailProductBarcode}" disabled >
        <br> Product Name:
        <input type="text" placeholder="add" name="editData" id="pName"  class="t0-input" value="${detailProductName}" disabled >
        <br> Product Brand:
        <input type="text" placeholder="add" name="editData" id="pBrand"  class="t0-input" value="${detailProductBrand}" disabled >
        <br> Product Manufacturer:
        <input type="text" placeholder="add" name="editData" id="pManufacturer"  class="t0-input" value="${detailProductManufacturer}" disabled >
        <br> Product Size:
        <input type="text" placeholder="add" name="editData" id="pSize"  class="t0-input" value="${detailProductSize}" disabled >
        <br>Product Status:
        <input type="text" placeholder="add" name="editData" id="pStatus"  class="t0-input" value="${detailProductStatus}" disabled >
        <br>
        <button id="addProduct" onclick="addProduct(${detailProductId})">เพิ่มสินค้า</button>
        <button id="editData" onclick="editData(${detailProductId})">แก้ไขสินค้า</button>
        <button id="deleteProduct" onclick="deleteProduct(${detailProductId})">ลบสินค้า</button>`;
                console.log(getData2.products[funcProductContro]);
            }
            document.getElementById("detailProduct").innerHTML = detailProduct;

        }
    }
}

function editData(funcContro) {
    $("input[name='editData']").removeAttr("disabled");
    $("#editData").text('เสร็จสิ้น').removeAttr('onclick')
    $("#editData").attr('onclick', `finishEditData(${funcContro})`)
    console.log(funcContro);

}

function finishEditData(funcContros) {
    $("input[name='editData']").attr('disabled', true)
    $("#editData").text('แก้ไขสินค้า').removeAttr('onclick')
    $("#editData").attr('onclick', `editData(${funcContros})`)

    const pBarCode = document.getElementById("pBarCode").value;
    const pName = document.getElementById("pName").value;
    const pBrand = document.getElementById("pBrand").value;
    const pManufacturer = document.getElementById("pManufacturer").value;
    const pSize = document.getElementById("pSize").value;
    const pStatus = document.getElementById("pStatus").value;




    let updateData = {};
    updateData.products = [{
        "productId": funcContros, "productBarcode": pBarCode
        , "productName": pName, "productBrand": pBrand, "productManufacturer": pManufacturer
        , "productSize": pSize, "productStatus": pStatus
    }]

    let json = JSON.stringify(updateData);

    let putApi = new XMLHttpRequest();
    putApi.open("PUT", "http://150.95.26.138:3000/apis/products", true);
    putApi.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    putApi.onload = function () {
        // let users = JSON.parse(putApi.responseText);
        if (putApi.readyState == 4 && putApi.status == "200") {
            // users.push(updateData)
            console.log(users);
        } else {
            console.error(users);
        }
    }
    putApi.send()
    console.log("b:" + json);
    console.log(putApi);


}
// console.log(data.products);
// console.log(data.products[0]);

// console.log(data);

function addProduct(funcControsAdd) {
    // $("#addProduct").text('เสร็จสิ้น').removeAttr('onclick')
    // $("#addProduct").attr('onclick', `finishAddProduct(${funcControsAdd})`)
    console.log(funcControsAdd);

    let addProduct = ` Product Bar Code:
    <input type="text" placeholder="add" class="t0-input">
    <br> Product Name:
    <input type="text" placeholder="add" class="t0-input">
    <br> Product Brand:
    <input type="text" placeholder="add" class="t0-input">
    <br> Product Manufacturer:
    <input type="text" placeholder="add" class="t0-input">
    <br> Product Size:
    <input type="text" placeholder="add" class="t0-input">
    <br>Product Status:
    <input type="text" placeholder="add" class="t0-input">
    <br>
    <button id="addProduct" finishAddProduct()>เสร็จสิ้น</button>`;
    document.getElementById("detailProduct").innerHTML = addProduct;
}

function finishAddProduct() {
    const pBarCode = document.getElementById("pBarCode").value;
    const pName = document.getElementById("pName").value;
    const pBrand = document.getElementById("pBrand").value;
    const pManufacturer = document.getElementById("pManufacturer").value;
    const pSize = document.getElementById("pSize").value;
    const pStatus = document.getElementById("pStatus").value;

    let addData = {};
    addData.products = [{
        "productId": null, "productBarcode": pBarCode
        , "productName": pName, "productBrand": pBrand, "productManufacturer": pManufacturer
        , "productSize": pSize, "productStatus": pStatus
    }]

    let json = JSON.stringify(addData);

    let postApi = new XMLHttpRequest();
    postApi.open("POST", "http://150.95.26.138:3000/apis/products", true);
    postApi.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    postApi.onload = function () {
        let users = JSON.parse(postApi.responseText);
        if (postApi.readyState == 4 && postApi.status == "200") {
            // users.push(addData)
            console.log(users);
        } else {
            console.error(users);
        }
    }
    postApi.send(json)
    console.log("b:" + json);
    console.log(postApi);
    console.log(addData);

}

function deleteProduct(funcControDelete) {
    
    let deleteApi = new XMLHttpRequest();
    deleteApi.open("DELETE", "http://150.95.26.138:3000/apis/products", true);
    deleteApi.onload = function () {
        let deleteUsers = JSON.parse(deleteApi.responseText);
        if (deleteApi.readyState == 4 && deleteApi.status == "200") {
            console.log(deleteUsers);
        } else {
            console.error(deleteUsers);
        }
        
    }
    
console.log(deleteApi);

    // deleteApi.send(null);
}