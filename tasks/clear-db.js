const mongoose=require('../config/database')
const Category=require('../app/models/category')

Category.deleteMany({})
.then(c => {
    console.log('categories removed',c)
})