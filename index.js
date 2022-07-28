class Product {
    constructor(name, price, taxRate) {
      this.name = name;
      this.price = price;
      this.taxRate = taxRate;
    }
  
    get costPrice() {
      return Math.round(this.price / (1 + this.taxRate / 100), 2);
    }
  
    get taxes() {
      return this.price - this.costPrice;
    }
  }
  
  class Customer {
    constructor(name, mobileNumber) {
      this.name = name;
      this.mobileNumber = mobileNumber;
    }
  }
  
  class OrderItem {
    constructor(product, quantity, discountRate = 0) {
      this.product = product;
      this.quantity = quantity;
      this.discountRate = discountRate;
    }
  
    get discount() {
      return (this.priceBeforeDiscount * this.discountRate) / 100;
    }
  
    get finalPrice() {
      return this.priceBeforeDiscount - this.discount;
    }
  
    get priceBeforeDiscount() {
      return this.product.price * this.quantity;
    }
  
    get totalTaxes() {
      const taxes =
        (this.product.taxes * this.quantity * this.finalPrice) /
        this.priceBeforeDiscount;
  
      return Math.round(taxes, 2);
    }
  
    printDetails() {
      return `${this.product.name} [MRP ₹${this.product.price}] [Tax ${this.product.taxRate}%] * ${this.quantity} Qty = ₹${this.finalPrice} [Gross price: ₹${this.priceBeforeDiscount}] [Discount ₹${this.discount}] [Taxes: ₹${this.totalTaxes}]`;
    }
  }
  
  class Order {
    constructor(customer) {
      this.customer = customer;
      this.items = [];
    }
  
    get totalBillValue() {
      return this.items.reduce((sum, item) => sum + item.finalPrice, 0);
    }
  
    get totalDiscount() {
      return this.items.reduce((sum, item) => sum + item.discount, 0);
    }
  
    get totalTaxes() {
      return this.items.reduce((sum, item) => sum + item.totalTaxes, 0);
    }
  
    addItem(product, quantity, discountRate = 0) {
      this.items.push(new OrderItem(product, quantity, discountRate));
    }
  
    printDetails() {
      console.log(
        `Customer: ${this.customer.name} (${this.customer.mobileNumber})`
      );
      for (const orderItem of this.items) {
        console.log(orderItem.printDetails());
      }
  
      console.log(`Total Bill Value = ₹${this.totalBillValue}`);
      if (this.totalDiscount) {
        console.log(`Total Discount = ₹${this.totalDiscount}`);
      }
      console.log(`Total Taxes = ₹${this.totalTaxes}`);
    }
  }
  
  const gehunAatta = new Product("Gehun Aatta (1Kg)", 26, 0);
  const hairOil = new Product("Hair Oil 200ml", 100, 30);
  const premiumGhee = new Product("Premium Ghee (1L)", 12, 10);
  
  const customer1 = new Customer("Murphy Alex", "+911234567890");
  
  const order1 = new Order(customer1);
  
  order1.addItem(gehunAatta, 3);
  order1.addItem(hairOil, 1);
  order1.addItem(premiumGhee, 30,30);
  
  order1.printDetails();