import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";

import { supervisorEntity } from "../lib/supervisorEntity";
import { db } from "../Configurations/FirebaseConfigurations/Firebase.config";

export const getAllSupervisors = (callback) => {
    try {
        const q = collection(db, supervisorEntity);

        return onSnapshot(q, (snapshot) => {
            const productsList = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            callback(productsList);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}