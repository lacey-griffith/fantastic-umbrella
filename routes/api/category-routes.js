const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  //[x] find all categories
  //[x] be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['id','product_name','price','stock']
    }]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  //[x] find one category by its `id` value
  //[x] be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
      res.json(categoryData)})
  .catch(err => res.status(500).json(err))
});

router.post('/', (req, res) => {
  //[x] create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => res.status(500).json(err))
});

router.put('/:id', (req, res) => {
  //[x] update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    if(!categoryData){
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.json(categoryData)
  }).catch(err => res.status(500).json(err))
});

router.delete('/:id', (req, res) => {
  //[] delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
