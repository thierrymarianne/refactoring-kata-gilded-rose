class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateQuality() {
        // TODO
    }
    static sulfuraQuality() {
      return 80;
    }
}

module.exports = Item;
