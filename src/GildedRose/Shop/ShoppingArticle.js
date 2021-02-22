
const {Item, ItemName} = require('../Item');
const {QualityAssurance} = require('../../GildedRose');

class ShoppingArticle {
    constructor(item) {
        if (!(item instanceof Item)) {
            throw 'An instance of Item is required.'
        }

        if (!QualityAssurance.isOfAcceptableQuality(item)) {
            throw 'Item\'s quality is not good enough.'
        }

        this.item = new Item(item.name, item.sellIn, item.quality);
    }

    name() {
        return this.item.name;
    }

    isReferencedUnderTheName(name) {
        return this.name() === name;
    }

    isNotReferencedUnderTheName(name) {
        return ! this.isReferencedUnderTheName(name);
    }

    sellIn() {
        return this.item.sellIn;
    }

    hasExpirationDatePassed() {
        return this.sellIn() < 0;
    }

    deriveQualityFromSellIn() {
        if (!this.hasExpirationDatePassed()) {
            return ShoppingArticle.from(
                new Item(
                    this.name(),
                    this.sellIn(),
                    this.quality()
                )
            );
        }

        let shoppingArticle = ShoppingArticle.from(
            new Item(
                this.name(),
                this.sellIn(),
                this.quality()
            )
        );

        if (this.isReferencedUnderTheName(ItemName.agedBrie)) {
            shoppingArticle = shoppingArticle.chainQualityAmendments(q => {
                if (QualityAssurance.isShoppingArticleBelowTheQualityStandard(shoppingArticle)) {
                    return q + 1;
                }

                return q
            });

            return ShoppingArticle.from(
                new Item(
                    this.name(),
                    this.sellIn(),
                    shoppingArticle.quality()
                )
            );
        }

        if (
            this.isNotReferencedUnderTheName(ItemName.backstagePasses)
        ) {
            if (this.hasSomeQualityLeft()) {
                if (this.isNotReferencedUnderTheName(ItemName.sulfurasHandOfRagnaros)) {
                    shoppingArticle = shoppingArticle.chainQualityAmendments(q => q - 1);

                    return ShoppingArticle.from(
                        new Item(
                            this.name(),
                            this.sellIn(),
                            shoppingArticle.quality()
                        )
                    );
                }
            }
        } else {
            shoppingArticle = shoppingArticle.chainQualityAmendments(_ => 0);

            return ShoppingArticle.from(
                new Item(
                    this.name(),
                    this.sellIn(),
                    shoppingArticle.quality()
                )
            );
        }

        shoppingArticle = shoppingArticle.chainQualityAmendments(q => q);

        return ShoppingArticle.from(
            new Item(
                this.name(),
                this.sellIn(),
                shoppingArticle.quality()
            )
        );
    }

    quality() {
        return this.item.quality;
    }

    hasSomeQualityLeft() {
        return this.quality() > 0;
    }

    isSulfurasItem() {
        return this.name() === ItemName.sulfurasHandOfRagnaros;
    }

    unwrapItem() {
        return this.item;
    }

    chainQualityAmendments(...qualityAmendmentFns) {
        return qualityAmendmentFns.reduce((shoppingArticle, amendQuality) => {
            const quality = amendQuality(shoppingArticle.quality());

            return shoppingArticle.amendQuality(quality);
        }, this);
    }

    amendQuality(quality) {
        if (quality < 0) {
            throw 'Quality can not be negative.'
        }

        if (
            quality > QualityAssurance.MAX_QUALITY &&
            !this.isSulfurasItem()
        ) {
            throw `Quality can not be greater than ${QualityAssurance.MAX_QUALITY}.`
        }

        QualityAssurance.guardAgainstArticleHavingNonCompliantQuality(
            this,
            quality
        );

        this.item = new Item(
            this.name(),
            this.sellIn(),
            quality
        );

        return new ShoppingArticle(this.item);
    }

    amendSellIn(sellIn) {
        if (this.sellIn() < sellIn) {
            throw 'Can not amend sellIn (inconsistent order).'
        }

        if (this.isSulfurasItem()) {
            throw 'Can not amend sellIn of "Sulfuras" items.'
        }

        this.item = new Item(
            this.name(),
            sellIn,
            this.quality()
        );

        return new ShoppingArticle(this.item);
    }

    isNotInShopCatalogue() {
        return ! Object.values(ItemName).includes(this.name());
    }

    static from(item) {
        const shoppingArticle = new ShoppingArticle(item);

        if (shoppingArticle.isNotInShopCatalogue()) {
            throw `Can not find item in shop by name: "${shoppingArticle.name()}"`
        }

        if (QualityAssurance.isNotOfStandardQuality(shoppingArticle)) {
            return shoppingArticle;
        }

        QualityAssurance.guardAgainstArticleHavingNonCompliantQuality(
            shoppingArticle,
            shoppingArticle.quality()
        );

        return shoppingArticle;
    }
}

module.exports = ShoppingArticle;