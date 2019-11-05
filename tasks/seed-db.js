const faker = require('faker')
const Category =  require('../app/models/category')
const mongoose = require('../config/database')
const Note = require('../app/models/note')

// const category = new Category({name:faker.commerce.department()})

// console.log(category);

// category.save()
// .then(category => {
//     console.log(category)
// })
// .catch(err => {
//     console.log(err)
// })
const categories = []

for(let i=0;i<=5;i++){
    const category = new Category({name:faker.commerce.department()})
    category.save()
.then(category => {
    categories.push(category)
    // console.log(categories);

})
.catch(err => {
    console.log(err)
})
}







