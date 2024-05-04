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

export const addEmployee = async (data) => {
    await addDoc(collection(db, `${employeesEntity}`), {
        ...data,
        subordinates: []
    });

    const employeeRef = doc(db, `${employeesEntity}/${data.supervisorId}`);

    await updateDoc(employeeRef, {
        subordinates: arrayUnion(data.name)
    });
}

export const getEmployeeData = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const employeeRef = doc(db, `${employeesEntity}/${employeeId}`);
            const employeeDataSnap = await getDoc(employeeRef);

            if (employeeDataSnap.exists()) {
                if (employeeDataSnap.data().supervisorId) {
                    const supervisorRef = doc(db, `${employeesEntity}/${employeeDataSnap.data().supervisorId}`)
                    const superVisorDocSnap = await getDoc(supervisorRef);

                    if (superVisorDocSnap.exists()) {
                        resolve({ ...employeeDataSnap.data(), supervisorData: superVisorDocSnap.data() });
                    }
                } else {
                    resolve(employeeDataSnap.data())
                }

            }

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    })
}

// export const getSuperVisorData = (superVisorId) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const employeeRef = doc(db, `${employeesEntity}/${superVisorId}`);
//             const employeeDataSnap = await getDoc(employeeRef);

//             if (employeeDataSnap.exists()) {
//                 const supervisorRef = doc(db, `${employeesEntity}/${employeeDataSnap.data().supervisorId}`)
//                 const superVisorDocSnap = await getDoc(supervisorRef);

//                 if (superVisorDocSnap.exists()) {
//                     resolve({...employeeDataSnap.data(), supervisorData: superVisorDocSnap.data()});
//                 }
//             }

//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     })
// }