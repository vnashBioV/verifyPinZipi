import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from "firebase/database";

//connecting to the firebase
const firebaseConfig = {
    apiKey: "AIzaSyCDv9ViM5f03ZnI9i8vKz9xI_conVCyKx8",
    authDomain: "new-zipi.firebaseapp.com",
    databaseURL: "https://new-zipi-default-rtdb.firebaseio.com",
    projectId: "new-zipi",
    storageBucket: "new-zipi.appspot.com",
    messagingSenderId: "56654691536",
    appId: "1:56654691536:web:fd0144a5cdc9e41da4b2d5",
    measurementId: "G-9GHMZP59JV"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export const verifyPin = (req, res) => {
    console.log("this is the driver", req.body.uid);
    const pinFromPickUp = (req.body.pin);
    const getDriver = ref(db, "drivers/" + req.body.uid);
    onValue(getDriver, (snapshot) => {
        console.log("this is the pin", snapshot.val())
        if(snapshot.val().pu_pin){
            const pickUpPin = snapshot.val().pu_pin
            if(pickUpPin.toString() === pinFromPickUp.toString()){
                update(getDriver, {
                    pu_pin: null , 
                    on_delivery: true
                })
                res.render('pinVerified')
            }else{
                res.render('pinIncorrect')
            }
        }else{
            res.send("Oops driver does not exist!!");
        }
    })
};
//285740
