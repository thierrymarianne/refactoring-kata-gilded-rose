
const {ItemName} = require('../Item');
const {QualityAssurance} = require('../../GildedRose');

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (
                this.items[i].name !== ItemName.agedBrie &&
                this.items[i].name !== ItemName.backstagePasses
            ) {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name !== ItemName.sulfurasHandOfRagnaros) {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }
            } else {
                if (this.items[i].quality < QualityAssurance.MAX_QUALITY) {
                    this.items[i].quality = this.items[i].quality + 1;
                    if (
                        this.items[i].name === ItemName.backstagePasses
                    ) {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < QualityAssurance.MAX_QUALITY) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < QualityAssurance.MAX_QUALITY) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }
                    }
                }
            }

            if (this.items[i].name !== ItemName.sulfurasHandOfRagnaros) {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name !== ItemName.agedBrie) {
                    if (
                        this.items[i].name !== ItemName.backstagePasses
                    ) {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name !== ItemName.sulfurasHandOfRagnaros) {
                                this.items[i].quality = this.items[i].quality - 1;
                            }
                        }
                    } else {
                        this.items[i].quality = 0;
                    }
                } else {
                    if (this.items[i].quality < QualityAssurance.MAX_QUALITY) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
        }

        return this.items;
    }
}

module.exports = Shop;
