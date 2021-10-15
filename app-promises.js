const users = [
    {
        id: 1,
        name: "Prince",
        schoolId: 101
    },
    {
        id: 2,
        name: "Abhishek",
        schoolId: 204
    },
    {
        id: 3,
        name: "Rani",
        schoolId: 503
    },
]

const grades = [
    {
        id: 1,
        schoolId: 101,
        grade: 86
    },
    {
        id: 2,
        schoolId: 503,
        grade: 73
    },
    {
        id: 3,
        schoolId: 204,
        grade: 56
    },
    {
        id: 4,
        schoolId: 503,
        grade: 81
    },
]

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });
        if(user){
            resolve(user);
        }else{
            reject(`Unable to find user of id ${id}`)
        }
    });
};

getUser(3)
    .then(user => console.log(user))
    .catch(err => console.log(err));

const getGrades = (schoolId) => {
    return new Promise((resolve,reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId ))
    })
}

getGrades(503)
.then(grade => console.log(grade))
.catch(err => console.log(err));


// Prince has 83% in the class
const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        // calculate average
        let average = 0;
        if(grades.length > 0){
            average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
        }
        return `${user.name} has ${average}% grades in the class.`;
    })
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    
    // console.log(user,grades);
    let average = 0;
    if(grades.length > 0){
        average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
    }
    return `${user.name} has ${average}% grades in the class.`;
}

getStatusAlt(2).then((status) => {
    console.log(status)
}).catch(err => console.log(err));

// getStatus(1)
// .then(user => console.log(user))
// .catch(err => console.log(err));