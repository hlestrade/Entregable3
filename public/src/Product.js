export default class Product{
    constructor(name,price, id){
        this.name = name;
        this.price = price;
        this.id = id;
    }

    get name(){
        return this._name;
    }

    set name(n){
        this._name = n;
    }

    get price(){
        return this._price;
    }

    set price(p){
        this._price = p;
    }

    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }
}
