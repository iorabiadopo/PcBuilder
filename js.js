//COMPONENTI PC 
//DIMENSION 1) ATX 2) Micro-ATX 3) Mini-ITX
//SOCKET 1) LGA 1151 2) sTRX4 3) LGA 2066 4) TR4 5) AM4 6) AM1
function motherboard(name, image, price, dimension, socket, power) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.dimension = dimension;
    this.socket = socket;
    this.power = power;
}

function gpu(name, image, price, power) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.power = power;
}

function ram(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
}

function cpu(name, image, price, power, socket) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.power = power;
    this.socket = socket;
}

function caseP(name, image, price, dimension) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.dimension = dimension;
}

function ssd(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
}

function hdd(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
}

function psu(name, image, price, power) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.power = power;
}

function components() {
    this.motherboard = new motherboard("", "", 0, 0, 0, 0);
    this.gpu = new gpu("", "", 0, 0);
    this.ram = new ram("", "", 0);
    this.cpu = new cpu("", "", 0, 0, 0);
    this.caseP = new caseP("", "", 0, 0);
    this.ssd = new ssd("", "", 0);
    this.hdd = new hdd("", "", 0);
    this.psu = new psu("", "", 0, 0);
    this.total = 0;
}
//CODICE

function updateTotal() {
    computer.total = (Math.ceil((computer.motherboard.price + computer.cpu.price + computer.gpu.price + computer.ram.price + computer.caseP.price + computer.hdd.price + computer.ssd.price + computer.psu.price) * 100)) / 100;
    return computer.total;
}

//PRIMO PARAM OUT VETTORE[] DEI DUE SOCKET INCOMPATIBILI, SECONDO PARAM OUT 0,1,2 SE L'ALIMENTATORE NON VA BENE, TERZO VETTORE[] MOSTRA SE DIM INCOMPATIBILE
function checkIncompat() {
    let output = [0, 0, 0, 0, 0, 0];
    if (computer.psu.price != 0) {
        if ((computer.motherboard.power + computer.cpu.power + computer.gpu.power) > ((computer.psu.power / 3) * 2) && (computer.motherboard.power + computer.cpu.power + computer.gpu.power) < (computer.psu.power / 5) * 4) {
            output[2] = 1;
        } else if ((computer.motherboard.power + computer.cpu.power + computer.gpu.power) >= ((computer.psu.power / 5) * 4)) {
            output[2] = 2;
        }
    }
    console.log("Wattaggio pc: " + (computer.motherboard.power + computer.cpu.power + computer.gpu.power) + " Wattaggio da non superare: " + (computer.psu.power / 3) * 2 + " Wattaggio per prox livello: " + (computer.psu.power / 5) * 4);
    if (computer.motherboard.price != 0 && computer.cpu.price != 0) {
        if (computer.motherboard.socket != computer.cpu.socket) {
            output[0] = computer.motherboard.socket;
            output[1] = computer.cpu.socket;
            console.log(computer.motherboard.socket + "|" + computer.cpu.socket)
        }
    }
    if (computer.motherboard.price != 0 && computer.caseP.price != 0) {
        if (computer.motherboard.dimension != computer.caseP.dimension) {
            output[3] = computer.motherboard.dimension;
            output[4] = computer.caseP.dimension;
        }
    }
    return output;
}

//DIMENSION 1) EATX 2) ATX 3) Micro-ATX 4) Mini-ITX
//SOCKET 1) LGA 1151 2) sTRX4 3) LGA 2066 4) TR4 5) AM4 6) AM1
function getSocketName(x) {
    let y = "";
    switch (x) {
        case 1: y = "LGA 1151"; break;
        case 2: y = "sTRX4"; break;
        case 3: y = "LGA 2066"; break;
        case 4: y = "TR4"; break;
        case 5: y = "AM4"; break;
        case 6: y = "AM1"; break;
    }
    return y;
}

function getSizeName(x) {
    let y = "";
    console.log("Size:" + x)
    switch (x) {
        case 1: y = "E-ATX"; break;
        case 2: y = "ATX"; break;
        case 3: y = "Micro-ATX"; break;
        case 4: y = "Mini-ITX"; break;
    }
    return y;
}

function outPutInc() {
    let x = checkIncompat();
    let output = ["", ""]
    if (x[0] != 0) {
        output[0] = output[0] + " Il socket CPU " + getSocketName(x[1]) + " e MOBO " + getSocketName(x[0]) + " sono incompatibili. ";
    }
    switch (x[2]) {
        case 1: output[1] = output[1] + " Attento! Sei al limite con i watt, migliora l'alimentatore!"; break;
        case 2: output[0] = output[0] + " Hai superato il limite di sicurezza per il wattaggio psu!"; break;
    }
    if (x[3] != 0) {
        if (x[3] > x[4]) {
            output[1] = output[1] + " La scheda madre (" + getSizeName(x[3]) + ") e il case (" + getSizeName(x[4]) + ") sono compatibili, ma la scheda madre è più piccola.";
        } else {
            if (x[3] == 1 && x[4] == 2) {
                output[1] = output[1] + " Non è certo che la scheda madre (" + getSizeName(x[3]) + ") e il case (" + getSizeName(x[4]) + ") sian compatibili, controlla le misure.";
            } else {
                output[0] = output[0] + " La scheda madre (" + getSizeName(x[3]) + ") e il case (" + getSizeName(x[4]) + ") NON sono compatibili!"
            }
        }
    }
    return output;
}

//GETTER E SETTER
function getListMotherboard() {
    return listMotherboard;
}

function getMotherboard(x) {
    return listMotherboard[x];
}

function getListCpu() {
    return listCpu;
}

function getCpu(x) {
    return listCpu[x];
}

function getListRam() {
    return listRam;
}

function getRam(x) {
    return listRam[x];
}

function getListGpu() {
    return listGpu;
}

function getGpu(x) {
    return listGpu[x];
}

function getListSsd() {
    return listSsd;
}

function getSsd(x) {
    return listSsd[x];
}

function getListHdd() {
    return listHdd;
}

function getHdd(x) {
    return listHdd[x];
}

function getListCaseP() {
    return listCaseP;
}

function getCaseP(x) {
    return listCaseP[x];
}

function getListPsu() {
    return listPsu;
}

function getPsu(x) {
    return listPsu[x];
}

function setComponentMotherboard(mb) {
    computer.motherboard = mb;
}

function getComponentMotherboard() {
    return computer.motherboard;
}

function setComponentCpu(mb) {
    computer.cpu = mb;
}

function getComponentCpu() {
    return computer.cpu;
}

function getComponentRam() {
    return computer.ram;
}

function setComponentRam(mb) {
    computer.ram = mb;
}

function getComponentSsd() {
    return computer.ssd;
}

function setComponentSsd(mb) {
    computer.ssd = mb;
}

function getComponentHdd() {
    return computer.hdd;
}

function setComponentHdd(mb) {
    computer.hdd = mb;
}

function getComponentGpu() {
    return computer.gpu;
}

function setComponentGpu(mb) {
    computer.gpu = mb;
}

function getComponentCaseP() {
    return computer.caseP;
}

function setComponentCaseP(mb) {
    computer.caseP = mb;
}

function getComponentPsu() {
    return computer.psu;
}

function setComponentPsu(mb) {
    computer.psu = mb;
}

function getComponent() {
    return computer;
}
//CREAZIONE DB INTERNO
//DIMENSION 1) EATX 2) ATX 3) Micro-ATX 4) Mini-ITX
//SOCKET 1) LGA 1151 2) NULLA 3) LGA 2066 4) TR4 5) AM4 6) AM1
let computer = new components();

let listMotherboard = [new motherboard("Z390-A PRO msi", "https://asset.msi.com/resize/image/global/product/product_6_20181008102018_5bbabee2dfad1.png62405b38c58fe0f07fcef2367d8a9ba1/600.png", 104.26, 2, 1, 60),
new motherboard('ASUS ROG X570 Crosshair VIII Hero', 'https://www.gigaparts.com/media/catalog/product/cache/dfaec006bd6782dbad92b9435baa8bcf/x/5/x570_rog_crosshair_viii_hero_front.jpeg.png', 749.99, 2, 5, 65),
new motherboard('ASUS ROG Rampage VI Extreme Encore X299', 'https://images-na.ssl-images-amazon.com/images/I/81zLLg%2BNBEL._SL1500_.jpg', 749.99, 1, 3, 75),
new motherboard('Msi B450I Gaming Plus AC', 'https://images-na.ssl-images-amazon.com/images/I/91PNEhOKPYL._SL1500_.jpg', 124.54, 4, 5, 60)];

let listCpu = [new cpu('i7-7700K Intel 4.5GHZ', 'https://images-na.ssl-images-amazon.com/images/I/41SfDaZ3u2L.jpg', 281.34, 60, 1),
new cpu('AMD Ryzen™ 7 3700X', 'https://images-na.ssl-images-amazon.com/images/I/71TxPH4j0vL._SX466_.jpg', 349.99, 65, 5),
new cpu('Intel Core i9-10900X 4.7 GHz', 'https://images-na.ssl-images-amazon.com/images/I/61mBrF1jNuL._SL1500_.jpg', 644.89, 165, 3),
new cpu('AMD Ryzen Threadripper 2950X', 'https://images-na.ssl-images-amazon.com/images/I/61DQNLHa6BL._SL1442_.jpg', 699.99, 160, 4),
new cpu('AMD Sempron 2650 APU 1.45Ghz', 'https://images-na.ssl-images-amazon.com/images/I/41zx6N7xczL.jpg', 24.99, 25, 6)];

let listRam = [new ram('Corsair CMK16GX4M2B3000C15 Vengeance LPX', 'https://www.corsair.com/medias/sys_master/images/images/hc1/h8d/8845728743454/-CMK16GX4M2B3000C15-Gallery-VENG-LPX-BLK-00.png', 87.71),
new ram('Corsair Vengeance RGB PRO (2x8GB) DDR4 3000MHz', 'https://images-na.ssl-images-amazon.com/images/I/91B-Tqxo%2BPL._SL1500_.jpg', 89.99),
new ram('Viper Steel Series DDR4 16GB (2 x 8GB) 4400MHz', 'https://images-na.ssl-images-amazon.com/images/I/81xjdMmLnZL._SL1500_.jpg', 179.99)];

let listSsd = [new ssd('Kingston SSD A400, 240 GB', 'https://images-na.ssl-images-amazon.com/images/I/91RL%2BMhTWbL._SX355_.jpg', 34.56),
new ssd('Samsung 970 EVO SSD 1TB', 'https://images-na.ssl-images-amazon.com/images/I/81wXcfYl6-L._SL1500_.jpg', 168.99),
new ssd('Silicon Power 512GB SSD', 'https://images-na.ssl-images-amazon.com/images/I/81vlzEDCkmL._SL1500_.jpg', 59.99)];

let listGpu = [new gpu('Gigabyte GeForce RTX 2080 Super WINDFORCE', 'https://images-na.ssl-images-amazon.com/images/I/61NQDiQTIzL._AC_SY355_.jpg', 760.98, 260),
new gpu('GeForce GTX 1050 Graphics Cards', 'https://images.nvidia.com/pascal/img/gtx1050/gallery/GeForce_GTX_1050_Ti_Partner-Thumb-ASUS.png', 92.43, 73)];

let listCaseP = [new caseP('NZXT H510 ATX', 'https://images-na.ssl-images-amazon.com/images/I/71PAskE-HJL._SL1500_.jpg', 87.98, 2),
new caseP('NZXT H210 - CA-H210B-W1 - Mini-ITX', 'https://images-na.ssl-images-amazon.com/images/I/715OWy-A5LL._SL1500_.jpg', 79.99, 4),
new caseP('Thermaltake Level 20 GT RGB Plus E-ATX Full Tower', 'https://images-na.ssl-images-amazon.com/images/I/71sID%2Bwgs1L._SL1380_.jpg', 289.99, 1)];

let listHdd = [new hdd('Seagate ST1000DM010 HDD da 1 TB, 64 MB Sata III da 3.5"', 'https://images-na.ssl-images-amazon.com/images/I/71x2h55zNpL._SL1500_.jpg', 39.10)];

let listPsu = [new psu('Corsair RM750x 750W 80 Plus Gold', 'https://images-na.ssl-images-amazon.com/images/I/71EhU7vB1oL._SL1500_.jpg', 111.09, 750),
new psu('Compaq Replace Power® 420W', 'https://images-na.ssl-images-amazon.com/images/I/61YNJHIZInL._SL1000_.jpg', 29.99, 420)];

