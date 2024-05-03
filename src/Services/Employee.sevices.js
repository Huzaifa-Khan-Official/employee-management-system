import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { employeesEntity } from "../lib/employeesEntity";
import { db } from "../Configurations/FirebaseConfigurations/Firebase.config";

export const getAllEmployees = (callback) => {
    try {
        const q = collection(db, employeesEntity);

        return onSnapshot(q, (snapshot) => {
            const employeesList = snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            });
            callback(employeesList);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export const addProduct = async (data) => {
    await addDoc(collection(db, `${employeesEntity}`), {
        ...data
    });

    const employeeRef = doc(db, `${employeesEntity}/${data.supervisorId}`);

    await updateDoc(employeeRef, {
        subordinates: arrayUnion(data.name)
    });
}