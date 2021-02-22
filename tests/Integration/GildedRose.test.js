const {Item, Shop} = require('../../src/GildedRose');

const dexterityVest = '+5 Dexterity Vest';
const agedBrie = 'Aged Brie';
const elixirOfTheMongose = 'Elixir of the Mongoose';
const sulfurasHandOfRagnaros = 'Sulfuras, Hand of Ragnaros';
const backstagePasses = 'Backstage passes to a TAFKAL80ETC concert';
const conjuredManaCake = 'Conjured Mana Cake';

describe('Gilded Rose', () => {
    it(
        'preserves the names of items in a shop when assessing their quality.',
        () => {
            const items = [
                new Item(dexterityVest, 10, 20),
                new Item(agedBrie, 2, 0),
                new Item(elixirOfTheMongose, 5, 7),
                new Item(sulfurasHandOfRagnaros, 0, 80),
                new Item(sulfurasHandOfRagnaros, -1, 80),
                new Item(backstagePasses, 15, 20),
                new Item(backstagePasses, 10, 49),
                new Item(backstagePasses, 5, 49),
                // this conjured item does not work properly yet
                new Item(conjuredManaCake, 3, 6)
            ];

            const gildedRose = new Shop(items);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].name).toBe(dexterityVest);
            expect(updatedItems[1].name).toBe(agedBrie);
            expect(updatedItems[2].name).toBe(elixirOfTheMongose);
            expect(updatedItems[3].name).toBe(sulfurasHandOfRagnaros);
            expect(updatedItems[4].name).toBe(sulfurasHandOfRagnaros);
            expect(updatedItems[5].name).toBe(backstagePasses);
            expect(updatedItems[6].name).toBe(backstagePasses);
            expect(updatedItems[7].name).toBe(backstagePasses);
            expect(updatedItems[8].name).toBe(conjuredManaCake);
        }
    );

    it(
        'decreases the sellIns of items in a shop except for sulfuras when assessing their quality.',
        () => {
            const sellIns = [
                10,
                2,
                5,
                15,
                10,
                5,
                3
            ];

            const items = [
                new Item(dexterityVest, 10, 20),
                new Item(agedBrie, 2, 0),
                new Item(elixirOfTheMongose, 5, 7),
                new Item(backstagePasses, 15, 20),
                new Item(backstagePasses, 10, 49),
                new Item(backstagePasses, 5, 49),
                new Item(conjuredManaCake, 3, 6)
            ];

            const gildedRose = new Shop(items);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].sellIn).toBe(sellIns[0] - 1);
            expect(updatedItems[1].sellIn).toBe(sellIns[1] - 1);
            expect(updatedItems[2].sellIn).toBe(sellIns[2] - 1);
            expect(updatedItems[3].sellIn).toBe(sellIns[3] - 1);
            expect(updatedItems[4].sellIn).toBe(sellIns[4] - 1);
            expect(updatedItems[5].sellIn).toBe(sellIns[5] - 1);
            expect(updatedItems[6].sellIn).toBe(sellIns[6] - 1);
        }
    );

    it(
        'does not decrease the sellIns of sulfuras items when assessing their quality.',
        () => {
            const sellIns = [
                0,
                -1,
            ];

            const items = [
                new Item(sulfurasHandOfRagnaros, 0, 80),
                new Item(sulfurasHandOfRagnaros, -1, 80),
            ];

            const gildedRose = new Shop(items);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].sellIn).toBe(sellIns[0]);
            expect(updatedItems[1].sellIn).toBe(sellIns[1]);
        }
    );
            const items = [
                new Item(dexterityVest, 10, 20),
                new Item(agedBrie, 2, 0),
                new Item(elixirOfTheMongose, 5, 7),
                new Item(backstagePasses, 15, 20),
                new Item(backstagePasses, 10, 49),
                new Item(backstagePasses, 5, 49),
                new Item(conjuredManaCake, 3, 6)
            ];

            const gildedRose = new Shop(items);
            const updatedItems = gildedRose.updateQuality();

            expect(updatedItems[0].sellIn).toBe(sellIns[0] - 1);
            expect(updatedItems[1].sellIn).toBe(sellIns[1] - 1);
            expect(updatedItems[2].sellIn).toBe(sellIns[2] - 1);
            expect(updatedItems[3].sellIn).toBe(sellIns[3] - 1);
            expect(updatedItems[4].sellIn).toBe(sellIns[4] - 1);
            expect(updatedItems[5].sellIn).toBe(sellIns[5] - 1);
            expect(updatedItems[6].sellIn).toBe(sellIns[6] - 1);
        }
    );
});
