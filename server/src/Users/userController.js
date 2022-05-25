const usersService = require('../Users/user.service')
const dbo = require('./../db/db')

function authenticate(req, res, next) {


    usersService.findUser(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}


const updateUser = async(req,res,next)=> {


        const dbConnect = dbo.getDb()
    const query = {seller_id: req.user.seller_id}

    const findUser = await dbConnect.collection('sellers_list').findOne(query)

    if(!findUser) {
        return res.status(404).json({
            success: 'false',

            message: 'User not found'

        })
    }

    const newValues = {

        $set:{
            seller_city: req.body.seller_city,
        seller_state : req.body.seller_state
        }
        
    }

    const result = await dbConnect.collection('sellers_list').updateOne(query,newValues)


    
    return res.status(200).json({
        success: true,
        message: 'User successfully updated',
        result
    })




   

}





module.exports = {authenticate,updateUser}