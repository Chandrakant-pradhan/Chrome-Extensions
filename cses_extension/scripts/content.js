const topics = document.querySelectorAll("h2");
const word = "General";
const info = document.createElement("table");
info.style.fontFamily = "arial, sans-serif";
info.style.borderCollapse = "collapse";
info.style.width = "100%";
info.innerHTML = `<tr><th>Topic</th><th>Solved</th><th>Unsolved</th></tr>`;
let total_tasks = 0;
let total_solved = 0;

topics.forEach(topic => {
    const topic_wise = document.createElement("span");
    const tasks = topic.nextElementSibling;
    if(topic.innerHTML === word){
        return;//do nothing if it is general section
    } else {
        console.log(topic.innerHTML);
        const task_list = topic.nextElementSibling;
        if(task_list && task_list.tagName==='UL'){
            //that means we have the required section
            const tasks = task_list.querySelectorAll("li.task");
            //convert the tasks to array for filter operation
            const solved_tasks = Array.from(tasks).filter(task => task.querySelector('span.task-score.icon.full'));
            const num_solved = solved_tasks.length;
            const num_unsolved = tasks.length - solved_tasks.length;
            total_solved += num_solved;
            total_tasks += num_solved + num_unsolved;
            topic_wise.innerText = `${num_solved}/${num_solved+num_unsolved}`;
            console.log(`Solved : `+num_solved+` Unsolved : `+num_unsolved);
            info.innerHTML += `<tr><td>${topic.innerHTML}</td><td>${num_solved}</td><td>${num_unsolved}</td></tr>`;
        }
    }
    topic.insertAdjacentElement("afterend",topic_wise);
});

console.log(`Number of tasks solved = `+total_solved);
console.log('Total tasks = '+total_tasks);

info.innerHTML += `<tr><th>Total</th><td>${total_solved}</td><td>${total_tasks - total_solved}</td></tr>`;
info.innerHTML += `<tr><th>Total tasks</th><td colspan="2">${total_tasks}</td></tr>`;

info.querySelectorAll('td, th').forEach(cell => {
    cell.style.border = "1px solid #dddddd";
    cell.style.padding = "8px";
    cell.style.textAlign = "center";
});

const rows = info.querySelectorAll('tr');
for(let i=0 ; i<rows.length ; i++){
    if(i%2 == 0){
        rows[i].style.backgroundColor = "#dddddd";
    }
}


const heading = document.querySelector("h1");
heading.insertAdjacentElement("afterend", info);
