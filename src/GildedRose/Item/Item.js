class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

Item.SULFURA_QUALITY = 80;

module.exports = Item;
