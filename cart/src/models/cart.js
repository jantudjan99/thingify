module.exports = function Cart(oldCart) {
    this.productItems = oldCart.productItems || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0.00;
  
    this.addProduct = function(item) {
      let storedItem = this.productItems;
      if (!storedItem.hasOwnProperty("item")) {
        
        storedItem = this.productItems = {item: item, qty: 1, price: item.price};
        this.totalQty = 1;
        this.totalPrice = item.price;
  
      } else {
  
        storedItem = {item: item, qty: storedItem.qty, price: storedItem.price};
        console.log("STORED ITEM: ", storedItem);
        this.productItems = storedItem;
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
  
      }
    }
  }


  