const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // TODO find all categories
  try{
    const categoryData = await Category.findAll({
      // TODO be sure to include its associated Products
      include: [ Product ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // TODO  find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      // TODO be sure to include its associated Products
      where: { id: req.params.id },
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post ('/', async (req, res) => {
  // TODO create a new category
  try {
    const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
});
// TODO update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'No Category found with this id!'});
      return;
    }
    res.json({ message: 'Category updated successfully' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


// TODO delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((Category) => {
    if(!Category) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json({ message: 'Category deleted successfully'});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
