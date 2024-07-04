import { makeAutoObservable } from 'mobx';

class BasketStore {
    _products = []
    deliveryCost = 0

    constructor() {
        makeAutoObservable(this)
    }

    get products() {
        return this._products
    }

    get count() { // всего позиций в корзине
        return this._products.reduce((count, item) => count + item.quantity, 0)
    }

    get total() { // стоимость всех товаров корзины
        return this._products.reduce((sum, item) => sum + item.current_price * item.quantity, 0)
    }

    get sum() { // стоимость всех товаров корзины
        return this._products.reduce((sum, item) => sum + item.current_price * item.quantity, 0) + this.deliveryCost
    }

    get freeDelivery() { // проверка на бесплатную доставку
        return this.total > 100
    }

    set products(products) {
        this._products = products
    }

    setDeliveryCost(cost) {
        this.deliveryCost = cost
    }
}

export default BasketStore