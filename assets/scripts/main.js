const template = (data) => `
LAPORAN SALES
${data['kode_toko']} ${data['date']}
  
Net.      : *${data['net']}*
Struk     : *${data['struk']}*
 
SPD SKRG  : *${formatNumber(data['spd_sk'])}*
SPD BLN L : *${data['spd_bl']}*
GROWTH    : *${data['spd_gr']}*

STD SKRG  : *${formatNumber(data['std_sk'])}*
STD BLN L : *${data['std_bl']}*
GROWTH    : *${data['std_gr']}*

‌APC SKRG  : *${formatNumber(data['apc_sk'])}*
APC BLN L : *${data['apc_bl']}*
GROWTH    : *${data['apc_gr']}*

Target --
SPD : **
STD : **
APC : **

ACV SPD : %
ACV STD :  **
ACV APC : **
`;

let oldValue = "";

const toFixed = (sv) => sv.replace(/(?<=\.).+/, (x) => Number.parseFloat(x.replace(',', '.')).toFixed(1).replace('.', ','))

const allnumeric = (value) => {
    if (value == '') return;

    var numbers = /^[0-9]+$/;
    if (value.match(numbers)) {
        return true;
    }
    else {
        alert('Dilarang memasukan karakter selain anka 0-9');
        return false;
    }
}

const generateBarcode = value => {
    JsBarcode("#barcode", value ?? 'empty', {
        background: 'var(--body)',
        lineColor: 'var(--text-primary-color)',
        width: 1.5,
        height: 130,
        fontOptions: "bold",
        textMargin: 7,
        valid: (valid) => {
            if (!valid) alert('Barcode tidak valid!!, harap generate ulang')
        }
    });
};

const onlyNumber = element => {
    let value = parseInt(element.value.replace(/\D/g, ''));

    value = formatNumber(value);

    element.value = value.toString().replace(',', '.');

    if (value == 'NaN') {
        element.value = '';
    }
};

const calculate = _ => {
    let kode_toko = document.getElementById('kd-toko').value;
    let net_sales = document.getElementById('net-sales').value.toString().replace(',', '');
    let _akm_sales = document.getElementById('akm-sales').value.toString().replace(',', '');
    let struk = document.getElementById('struk').value.toString().replace(',', '');
    let _akm_struk = document.getElementById('akm-struk').value.toString().replace(',', '');
    let spd_bl = document.getElementById('spd-bl').value.toString().replace(',', '');
    let std_bl = document.getElementById('std-bl').value.toString().replace(',', '');
    let apc_bl = document.getElementById('apc-bl').value.toString().replace(',', '');

    let spd = document.getElementById('spd');
    let spd_gr = document.getElementById('spd-gr');
    let std = document.getElementById('std');
    let std_gr = document.getElementById('std-gr');
    let apc = document.getElementById('apc');
    let apc_gr = document.getElementById('apc-gr');
    
    let akm_sales_el = document.getElementById('new-akm-sales');
    let akm_struk_el = document.getElementById('new-akm-struk');

    let data = {};
    
    let arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    let date = new Date();
    
    let tgl = parseInt(document.getElementById('tgl').value);

    let akm_sales = parseNum(net_sales) + parseNum(_akm_sales);
    let akm_struk = parseNum(struk) + parseNum(_akm_struk);

    akm_sales_el.value = formatNumber(akm_sales);
    akm_struk_el.value = formatNumber(akm_struk);

    data['kode_toko'] = kode_toko;
    data['date'] = `${date.getDate()} ${arrbulan[date.getMonth()]} ${date.getFullYear()}`;
    data['net'] = formatNumber(net_sales);
    data['struk'] = formatNumber(struk);

    data['spd_sk'] = parseInt(akm_sales / tgl);
    data['spd_bl'] = spd_bl;
    data['spd_gr'] = data['spd_sk'] / parseNum(spd_bl) * 100 - 100;
    
    data['spd_gr'] = data['spd_gr'] < 0
        ? parseInt(data['spd_gr']).toString()
        : '+' + parseInt(data['spd_gr']).toString()

    data['std_sk'] = parseInt(akm_struk / tgl);
    data['std_bl'] = std_bl;
    data['std_gr'] = data['std_sk'] / parseNum(std_bl) * 100 - 100

    data['std_gr'] = data['std_gr'] < 0
        ? parseInt(data['std_gr']).toString()
        : '+' + parseInt(data['std_gr']).toString()

    data['apc_sk'] = parseInt(data['spd_sk'] / data['std_sk']);
    data['apc_bl'] = apc_bl;
    data['apc_gr'] = data['apc_sk'] / parseNum(apc_bl) * 100 - 100;
    
    data['apc_gr'] = data['apc_gr'] < 0
        ? parseInt(data['apc_gr']).toString()
        : '+' + parseInt(data['apc_gr']).toString()

    const report = template(data);

    akm_sales_el.parentElement.removeAttribute('hidden');
    akm_struk_el.parentElement.removeAttribute('hidden');

    navigator.clipboard.writeText(report)
    
};


function formatNumber(number) {
    return number.toLocaleString('id-ID');
}

function parseNum(str) {
    return parseInt(str.replaceAll('.', ''));
}


async function getAddress(lat, lon) {
    // https://nominatim.openstreetmap.org/reverse?format=xml&lat=0.6426663&lon=122.8621346
    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
     console.log(url);
    let data = await fetch(url);
    console.log(await data.text());
}