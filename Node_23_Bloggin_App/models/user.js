const {Schema, model} = require('mongoose');
// builtin package mainly used for hashing..
const {createHmac, randomBytes} = require('crypto');

const userSchema = new Schema({
    fullName:{
        type: String,
        required: 'true',
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    // we will hash the password and we will use salt and pepper hashing..
    salt:{
        type: String,
    
    },
    password:{
        type:String,
        required: true,
    },
    profileImageURL:{
        type:String,
        default: '/images/boy.jpg',
    },
    role:{
        type: String,
        // ENUM MEANS  IF WE WANT TO GIVE ANY OTHER VALUE THAN USER AND ADMIN, MONGOOSE WILL GIVE ERROR..
        enum:["USER", "ADMIN"],
        default: "USER",
    }

},{timestamps: true}
);

// mongoose .pre method deta hai jisse hum khuch opertion kr skte hai khuch values pe before saving it to the mongodb database..
// since we are using this we can't use the arrow function..

// hashing ke liye ek built in package milta hai jiska naam crypto hai jo npm provide krta hai..

userSchema.pre("save", function(next){
    // this points to currentuser
    const user = this;
     
    // agr user ka password modified hi nhi hua hai to khuchh nhi krna hai laut jana hai..
    if(!user.isModified("password")) return;
    // a random string..
    const salt = randomBytes(16).toString();
    
    // here we are creating the hashed password using the sha256 algorithm and passing the secretKey
    // salt and the updating the user passowrd with changed one and then converting it to the hexadecimal form.
    const hashedPassword = createHmac("sha256", salt)
                           .update(user.password)
                           .digest("hex");
    
   //updating the current user..
   this.salt = salt;
   this.password = hashedPassword;    
    
   next();
});

// we can define a function on the mongodb database..
userSchema.static("matchPassword", async function(email, password){
    // getting the data of the specified email from the data base which have to be done
    // asynchronously..
    const user = await this.findOne({email});
    
    if(!user) throw new Error('User not found!');

    // getting the salt value which have created earlier during signup.
    const salt = user.salt;
    // getting the hashedPassword which was created during signup..
    const hashedPassword = user.password;
    console.log(hashedPassword);

    console.log(hashedPassword + "hassh")

    // now again hashing the recieved password during signin using the same algorithm..
    const userProvidedHash = createHmac("sha256", salt)
                           .update(password)
                           .digest("hex");
    
     
    console.log(userProvidedHash + "userr")

    if(hashedPassword !== userProvidedHash)
        throw new Error("Incorrect Password");

    // agr hashPassword jo signup ke time generate hua tha aur abhi jo recieved password ke time generate hua hai 
    // dono same hai to iska mtlb jo password diya gya hai shi hai tbhi to same hashedvalue generate hui hai..
    // isse hum authenicate kr paa rhe hai ki yh whi user hai..
   
    // return hashedPassword === userProvidedHash;

    // hum yha pe user ko hi send kr denge..aur hume password aur salt ko bhejna nhi chahiye..
    // password ko hash krne ka yh fayda ho rha hai ki password user ke sath secure hai..
    return{...user, password: undefined, salt: undefined};
   
})


const User = model("user", userSchema);

module.exports = User;

