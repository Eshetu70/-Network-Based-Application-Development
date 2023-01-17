const courses = [{
    prefix: 'ITIS',
    id: 4166,
    title: 'Network based app development'
},
{
    prefix: 'ITIS',
    id: 4180,
    title: 'Mobile application development'
},
{
    prefix: 'ITCS',
    id: 4156,
    title: 'Intro to machine learning'
},
{
    prefix: 'ITCS',
    id: 3160,
    title: 'Database desgin'
}
];

//return a course that matches the id
function findById(id) {
    return courses.find(course => course.id === id);
}

//To do: implement save(course)

function  save(course){
    courses.push(course);
}

//To do: implement findByPrefix(prefix)

function findByPrefix(prefix) {
    let result = [];
    courses.forEach(course => {
        if (course.prefix == prefix) {
            // Insert into the result array
            result.push(course)
        }
    });
    return result;
}

//To do: implement updateById(id, course)
function updateById(id, course){
let index = courses.findIndex(n =>n.id ==id);
if(index !=-1){
courses[index]=course;
return true;
}
return false;
}
//To do: implement removeById(id)
function removeById(id){
    let index =courses.findIndex(c=>c.id ==id);
    if(index!=-1){
        courses.splice(index, 1);
        return true;
    }
    return false;
}


//To do: uncomment the following testing code when you are ready to test your functions

 save({ prefix: 'ITIS', id: 3310, title: 'Software architecture & design' });
 save({ prefix: 'ITIS', id: 4250, title: 'Computer forensics' });
 save({ prefix: 'ITIS', id: 4420, title: 'Usable security and privacy' });
 console.log(courses);
 console.log(findById(4166));
 console.log(findByPrefix('ITIS'));
 console.log(removeById(4000));
 console.log(updateById(4000));
 console.log(updateById(4166, {
    prefix: 'ITIS',
    id: 4166,
    title: 'Network-based app development'
 }, ));
 console.log(removeById(4420));
 console.log(courses);