const dbo = require('./../db/db')

async function findUser({username,password}){



const dbConnect = dbo.getDb()

const seller = await dbConnect.collection('sellers_list').findOne({seller_id: username,seller_zip_code_prefix: password})

   
    if (seller) {
        const { seller_zip_code_prefix, ...userWithoutPassword } = seller;
        return userWithoutPassword;
    } 

   
}














module.exports = {findUser}

