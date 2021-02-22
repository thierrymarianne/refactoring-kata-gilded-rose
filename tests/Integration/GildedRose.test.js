const { Item, Shop } = require("../../src/GildedRose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const dexterityVest  = "+5 Dexterity Vest";

    const items = [
      new Item(dexterityVest, 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];

    const gildedRose = new Shop(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].name).toBe(dexterityVest);
  });
});
