let carIcon = document.querySelector("#shopicon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//ouvrir le panier
carIcon.onclick =() =>{
    cart.classList.add("active");
};
//fermer le panierr
closeCart.onclick =() =>{
    cart.classList.remove("active");
};

//pannier fonctionalite
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}
//fonction  le pannier
function ready(){
    //suprimer des elements sur le panier
    var reamoveCartButtons = document.getElementsByClassName("cart-supprime");
    console.log(reamoveCartButtons);
    for (var i = 0; i < reamoveCartButtons.length; i++){
        var button = reamoveCartButtons[i];
        button.addEventListener("click", reamoveCartItem);
    }
    // quantiter du pannier
    var quantityEntrer = document.getElementsByClassName("cart-quantity");
    for(var i = 0; i < quantityEntrer.length; i++){
        var input = quantityEntrer[i]
        input.addEventListener("change", quantiteChange)
    }
    //ajouter a la panier
    var addcart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addcart.length; i++){
        var button = addcart[i];
        button.addEventListener("click", addcartCliked);
    }
}
//supprimer les elements
function  reamoveCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
  
}
//function change de quantiter
function quantiteChange(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updatetotal();
}
//fonction qui ajoute  un article a la panier en un clique 
function addcartCliked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("produc-titel")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var prodimag = shopProduct.getElementsByClassName("prod-img")[0].src;
   addproducPanier(title, price, prodimag);
   updatetotal();
}

function addproducPanier(title, price, prodimag){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItem = document.getElementsByClassName("cart-content")[0];
    var cartItemsName = cartItem.getElementsByClassName("cart-prodct-title");
    for(var i = 0; i < cartItemsName.length; i++){
        if(cartItemsName[i].innerText == title){
        alert("voules vous ajouter cett articele dans votre panier ?");
        return;
        }
    } 
   //contenu du pannier
var contnanCart =
          `
        <img src="${prodimag}" alt="" class="cart-img">
        <div class="detail-box">
         <div class="cart-prodct-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
        </div>
        <!--supprime-->
            <i class='bx bxs-trash-alt cart-supprime'></i>`;
            cartShopBox.innerHTML= contnanCart;
            cartItem.append(cartShopBox);
            cartShopBox.getElementsByClassName("cart-supprime")[0].addEventListener('click',reamoveCartItem);
            cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change',quantiteChange);
}
//aprix total d'achat 
function updatetotal(){
    var carConten = document.getElementsByClassName("cart-content")[0];
    var carBoxes = carConten.getElementsByClassName("cart-box");
    var total =0;
    for(let i =0; i<carBoxes.length; i++){
        var cartBox = carBoxes[i];
        var PrixElement = document.getElementsByClassName("cart-price")[0];
        var quantityElement = document.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(PrixElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total +(price*quantity);

        document.getElementsByClassName("total-price")[0].innerText = '$' + total;
    }
}