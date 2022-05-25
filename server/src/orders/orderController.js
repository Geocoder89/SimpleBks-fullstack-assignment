const { ObjectId } = require("mongodb");
const db = require("./../db/db");
const dbo = require("./../db/db");

exports.getOrders = async (req, res, next) => {
  
  const dbConnect = dbo.getDb();
  const { offset = 1, limit = 20 } = req.query;

  await dbConnect
    .collection("orders")
    .aggregate(
      [
        {
          $match: {
            seller_id: req.user.seller_id,
          },
        },

        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "product_id",
            as: "productCollection",
          },
        },

        {
          $sort: {
            shipping_limit_date: -1,
            price: -1,
            _id: 1,
          },
        },

        { $unwind: "$productCollection" },

        {
          $addFields: {
            product_category: "$productCollection.product_category_name",
          },
        },

        { $merge: "newOrders" },
      ],

      {
        collation: {
          locale: "en_US",
          numericOrdering: true,
        },
      }
    )
    .toArray();

  const orders = await dbConnect
    .collection("newOrders")
    .find({ seller_id: req.user.seller_id })
    .limit(limit * 1)
    .skip((offset - 1) * limit)
    .toArray();

  const total = await dbConnect
    .collection("newOrders")
    .countDocuments({ seller_id: req.user.seller_id });

  const newOrders = orders.map((el) => ({
    _id: el._id,
    id: el.order_item_id,
    product_id: el.product_id,
    product_category: el.product_category,
    price: el.price,
    date: el.shipping_limit_date,
  }));

  return res.status(200).json({
    success: true,
    total: total,
    data: newOrders,
    offset,
    limit,
  });
};

exports.getOrder = async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const order = await dbConnect
    .collection("newOrders")
    .find(
      { _id: new ObjectId(req.params.id) },
      { seller_id: req.user.seller_id }
    )
    .toArray();


  if (order.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const result = order.map((el) => ({
    _id: el._id,
    id: el.order_item_id,
    product_id: el.product_id,
    product_category: el.product_category,
    date: el.shipping_limit_date,
    price: el.price,
  }));

  return res.status(200).json({
    success: true,
    data: result,
  });
};

exports.updateOrderItem = async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const order = await dbConnect
    .collection("newOrders")
    .findOne(
      { _id: new ObjectId(req.params.id) },
      { seller_id: req.user.seller_id }
    );


  

  const result = await dbConnect.collection("newOrders").updateOne(
    { _id: new ObjectId(req.params.id) },

    {
      $set: {
        order_item_id: req.body.id,
        product_id: req.body.product_id,
        price: req.body.price,
        shipping_limit_date: req.body.date,
        product_category: req.body.product_category,
      },
    }
  );

  

  return res.status(200).json({
    success: true,
    message: "Order updated",
    data: result,
  });
};

exports.deleteOrderItemId = async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const query = {
    seller_id: { $in: [req.user.seller_id] },
    order_item_id: { $in: [req.params.id] },
  };
  const orders = await dbConnect.collection("newOrders").find(query).toArray();

  if (orders.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const result = await dbConnect
    .collection("newOrders")
    .update(query, { $unset: { order_item_id: 1 } });

  return res.status(200).json({
    success: true,
    data: orders,
    count: orders.length,
    result,
  });
};

exports.deleteOrderItem = async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const order = await dbConnect
    .collection("orders")
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  const result = await dbConnect
    .collection("newOrders")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  return res.status(200).json({
    success: true,
    message: "Order deleted",
    data: result,
  });
};
