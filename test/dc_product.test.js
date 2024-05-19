const assert = require('chai').assert;
const { get_DC_ProductIdByProductId, product_insertUpdate, product_delete } = require('../sql/product/product.js');

let productId=1;
let current_dc_ProductId;

describe("Product Tests", function () {

  before(async function () {
    // Create a new product and store its productId
    const result = await product_insertUpdate(
      productId,
      "001",
      "product 001",
      1,
      1,
      1,
      "000001",
      10,
      "U",
      1,
      "+5:30",
      "p",
      true
    );

    // Store the productId
   // productId = 1;
  });

  describe("Is a new product created", function () {
  it("should retrieve the dc_ProductId_0 for the new product", async function () {
    const dc_ProductId = await get_DC_ProductIdByProductId(productId);
    current_dc_ProductId = dc_ProductId;
    assert.isNotNull(dc_ProductId);
    assert.isNumber(dc_ProductId);
    assert.isAbove(dc_ProductId, 0);
  });
});


  describe("Is Product not updated", function () {
  it("Should retrieve the same dc_ProductId as productId_0, which was previously created.", async function () {
    const _dc_ProductId = await get_DC_ProductIdByProductId(productId);
    assert.equal(current_dc_ProductId, _dc_ProductId);
    assert.isNotNull(_dc_ProductId);
    assert.isNumber(_dc_ProductId);
    assert.isAbove(_dc_ProductId, 0);
  });
});




// describe("Is Product updated",async function () {

//   this.beforeEach(async function () {
//   await product_insertUpdate(
//     productId,
//     "001",
//     "product 001",
//     1,
//     1,
//     1,
//     "000001",
//     10,
//     "I",
//     1,
//     "+5:30",
//     "p",
//     true
//   );

//   const _dc_ProductId = await get_DC_ProductIdByProductId(productId);
//   });

//   it("Should retrieve new dc_ProductId and can not be equal to productId_0, which was previously created.", async function () {

//     assert.notEqual(current_dc_ProductId, _dc_ProductId);
//     assert.isAbove(_dc_ProductId, current_dc_ProductId);
//     assert.isNotNull(_dc_ProductId);
//     assert.isNumber(_dc_ProductId);
//     assert.isAbove(_dc_ProductId, 0);
//   });

// });


  after(async function () {
    // Delete the product after all tests are complete
    const result = await product_delete(productId, 1, '+5:30', 'p', true);
    console.log('product_delete', result);
  });
});
