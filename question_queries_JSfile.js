//  The MongoDB queries for solving the questions of Day-30 (MongoDB day-1) task are given below


// ---------------------------------------Question-1---------------------------------------
// Question-1: Find all the information about each products

// Query: 
db.productDetails.find()
 
// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-2---------------------------------------
// Question-2: : Find the product price which are between 400 to 800

// Query: 
db.productDetails.find(
    {
        product_price:{$gte:400,$lte:800}
    },
    {product_name:1,product_price:1,_id:0}
    )
 

// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-3---------------------------------------
// Question-3: Find the product price which are not between 400 to 600

// Query: 
db.productDetails.find(
    {product_price:{
        $not:{$gte:400,$lte:600}
    }},
    {product_name:1,product_price:1,_id:0}
    )
  
// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-4---------------------------------------
// Question-4: List the four product which are greater than 500 in price

// Query: 
db.productDetails.find(
    {product_price:{
        $gt:500
    }}).sort({product_price:1}).limit(4)
  

// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-5---------------------------------------
// Question-5: Find the product name and product material of each products

// Query: 
db.productDetails.find(
    {},
    {product_name:1,product_material:1,_id:0}
    )
  

// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-6---------------------------------------
// Question-6: Find the product with a row id of 10

// Query: 
db.productDetails.find({id:"10"})
  

// ----------------------------------------------------------------------------------------




// ---------------------------------------Question-7---------------------------------------
// Question-7: Find only the product name and product material (id of 10)

// Query: 
db.productDetails.find(
    {id:"10"},
    {product_name:1,product_material:1,_id:0}
    )
  
// ----------------------------------------------------------------------------------------




// ---------------------------------------Question-8---------------------------------------
// Question-8: Find all products which contain the value of soft in product material

// Query: 
db.productDetails.find({product_material:"Soft"})
  

// ----------------------------------------------------------------------------------------




// ---------------------------------------Question-9---------------------------------------
// Question-9: Find products which contain product color indigo and product price 492.00

// Query: 
db.productDetails.find({$and:[
    {product_color:"indigo"},
    {product_price:492}
]})
  

// ----------------------------------------------------------------------------------------



// ---------------------------------------Question-10---------------------------------------
// Question-10: Delete the products which product price value are same

// Query: 
db.productDetails.aggregate(
    [
        {$group:{
            _id:"$product_price",count:{$sum:1},dups:{$addToSet:"$_id"}
        }},
        {$match:{
            count:{$gt:1}
        }}
    ]
    ).forEach(
        function(doc){
            db.productDetails.deleteMany({_id:{$in:doc.dups}})
        }
        )

// Query to verify the deletion (of question-10)
db.productDetails.aggregate(
    [
        {$group:{
            _id:"$product_price",count:{$sum:1}
        }}
    ]
    )


// ----------------------------------------------------------------------------------------