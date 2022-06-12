let msgElement = document.querySelector('#p_order_mesg');
let valid = true;

function priceCounting() {
    let ticketPrice = parseFloat(document.querySelector("#slct_ticket").value);
    ticketPrice *= parseFloat(document.querySelector("#slct_cnt_ticket").value);
    ticketPrice *= document.querySelector("#return_ticket").checked ? parseFloat(document.querySelector("#return_ticket").value) : 1;
    let transportClass = document.querySelectorAll('input[name="rbt_class"]:checked');
    transportClass.forEach(rbt => {
        ticketPrice *= parseFloat(rbt.value);
    });
    if (ticketPrice > 0) {
        document.querySelector("#txt_total_price").value = `${ticketPrice.toLocaleString()},-`;
    }
}
function comparePriceBudget() {
    let price = document.querySelector('#txt_total_price').value;
    price = price.replace(/\s/g, "");
    price = price.substring(0, price.length - 2); 
    let budget = document.querySelector('#txt_budget').value
    budget = budget.replace(" ", "");
    budget = budget.replace(",", ".");
    let mesg = "";
    let lab = document.querySelector('#lbl_compare_mesg');
    if (!isNaN(budget) && price!="") {
        budget = parseFloat(budget); 
        price = parseFloat(price);        
        let differ = budget - price;
        if (differ >= 0) {
            mesg = "Máte dostatečné množství prostředků na nákup letenky.";
            lab.style.color = "green"
        } else {
            mesg = "Nemáte dostatečné množství prostředků.";
            lab.style.color = "red"
        }
    } else {
        mesg = "Špatně zadaná hodnota.";
        lab.style.color = "red"
    }
    lab.style.fontSize = "15px";
    lab.innerHTML = mesg;
}
function validateText() {
    let text = document.querySelector('#txta_comment').value;
    let regex = /^[a-zA-Zá-žÁ-Ž0-9.,\?!\(\) ]+$/;
    valid = regex.test(text);
    if (!valid && text != "") {
        document.querySelector('#tooltip_comment').style.visibility = "visible";
    } else {
        document.querySelector('#tooltip_comment').style.visibility = "hidden";
    }
}
function submitOrder() {
    let msg = "";
    if (valid) {
        if (document.querySelector("#slct_ticket").value != "0") {
            msg = "Děkujeme Vám za zaslání objednávky.";
            msgElement.style.color = "green";
        } else {
            msg = "Nemáte zvolenou letenku.";
            msgElement.style.color = "red";
        }        
        let txtInputs = document.getElementsByClassName('txt_in');
        for (const el of txtInputs) {
            el.value = "";
        }
        let selectEls = document.getElementsByTagName('select');
        for (const elm of selectEls) {
            elm.selectedIndex = 0;
        }
        document.querySelector('#lbl_compare_mesg').innerHTML = '';
        document.querySelector("#return_ticket").checked=false;
        document.querySelector("#rbt_economy").checked=true;
    } else {
        msgElement.style.color = "red";
        msg="Poznámka obsahuje neplatné znaky";
    }
    msgElement.innerHTML = msg;
    msgElement.style.visibility = "visible";
    window.scrollTo(300, 0);
}
function hideMesg() {
    msgElement.style.visibility = "hidden";
}