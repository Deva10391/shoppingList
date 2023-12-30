const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Item=require('../../models/item');

router.get('/', (req, res)=>{
    Item.find()//gives the mongodb data
    .sort({date: -1})
    .then(items=>res.json(items));
});

router.post('/', auth, (req, res)=>{
    const newItem=new Item({
        name: req.body.name
    });
    newItem.save().then(item=>res.json(item));
});

router.delete('/:id', auth, (req, res)=>{
    Item.deleteOne({_id:req.params.id})
    .then(()=>res.json({success: true}))
    .catch(err=>res.status(404).json({success: false}));
});

module.exports=router;