// console.log('cannected') 

// ===============================
// Filter Button Elements
// ===============================
const allfilterbtn = document.getElementById("btn-filter-all");
const openfilterbtn = document.getElementById("btn-filter-open");
const closedfilterbtn = document.getElementById("btn-filter-closed");


// ===============================
// Search Issues by Title
// ===============================
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
    const searchissuee = searchInput.value.trim();

    if(searchissuee === ""){
        loadIssuesCard();
        return;
    }

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchissuee)}`);
    const data = await res.json();

    displayedIssuesCard(data.data);
    issuesCounter.innerText = data.data.length; 
});

// ===============================
// Issues Counter Element
// ============================
const issuesCounter = document.getElementById("counter");

// ===============================
// Load All Issues From API
// ===============================
const loadIssuesCard = ()=> {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((data) => {      
        displayedIssuesCard(data.data)
        issuesCounter.innerText=data.data.length;
        })      
};

// ===============================
// Load Single Issue Detail
// ===============================
const loadissuedetail = async(id)=>{
    const url =`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details =await res.json();
    displayedIssueDetail(details.data);
};


// ===============================
// Display Issue Details in Modal
// ===============================
const displayedIssueDetail =(card) =>{
    console.log(card);
    const modalBox = document.getElementById("modal-container")
    modalBox.innerHTML=`
    <div class="space-y-3">

        <h2 class="font-bold text-[20px]">${card.title}</h2>

        <div class="space-y-2">
            <div class="flex justify-between">                     
                ${card.status === "open" ? 
                `<span class="text-white text-sm  bg-green-500 rounded-full py-1 px-4">Open </span>`: `<span        class=" text-white text-sm  bg-purple-500 rounded-full py-1 px-4">Closed</span>`}     

                <p class="bg-red-100 text-red-500 rounded-full px-6 py-1">${card.priority}</p>
            </div>
            <ul class="flex list-disc gap-8 pl-5 text-sm">
                <li>Opened by ${card.author}</li>
                <li>${card.createdAt}</li>
            </ul>
        </div>

        <div class="flex gap-4 ">
            <p class="text-red-500 bg-red-200 border border-red-300 rounded-full px-4 py-1"> <i class="fa-solid fa-bug"></i>${card.labels[0]}</p>
            <p class="text-orange-500 bg-orange-200 border border-orange-400 rounded-full px-4 py-1"> <i class="fa-solid fa-life-ring"></i>${card.labels[1] ? card.labels[1] :"N/A"}</p>
        </div>

        <p class="text-sm">${card.description}</p>
                
        <div class="flex justify-between items-center  bg-[#F8FAFC] p-3 rounded-2xl">
            <div>
                <p class="text-sm mb-1.5">Assignee:</p>
                <p class="text-sm font-semibold">${card.author}</p>
            </div>       
            <div>
                <p class="text-sm mb-1.5">Priority:</p>
                <button class="bg-red-500 py-1 px-4 text-[14px] rounded-full border-none text-white ">${card.priority}</button>
            </div>
        </div>
    </div>  
    `;

    document.getElementById("my_modal").showModal() ; 
}

// ===============================
// Display Issues as Cards
// ===============================
const displayedIssuesCard = (issues)=>{

    const issuesCard =document.getElementById("issues-card");
    
    issuesCard.innerHTML="";
    
    issues.forEach(card => {
     
    const cardDiv =document.createElement("div");
             
    cardDiv.innerHTML=`
    <div id="card-${card.id}" onclick="loadissuedetail(${card.id})"  class="border-t-4  border-green-500 p-2 space-y-4 shadow-sm rounded-2xl">
        <!-- 1st  -->

        <div class="flex justify-between">                     
            ${card.status === "open" ? 
            `<img class="w-[40px]" src="./assets/Open-Status.png" alt="">`: ` <img class="w-[40px]" src="./assets/Closed- Status .png" alt="">`}             
            <p class="bg-red-100 text-red-500 rounded-full px-6 py-1">${card.priority}</p>
        </div>

        <!-- 2nd  -->
        <div>
            <h2 class="text-[20px] font-bold">${card.title}</h2>
            <p class="text-gray-400 text-[16px] ">${card.description}</p>
        </div>
        
        <!-- 3rd  -->
        <div class="flex gap-4 justify-between">
            <p class=" text-red-500 text-sm bg-red-200 border border-red-300 rounded-full px-4 py-1"> <i class="fa-solid fa-bug"></i>${card.labels[0]}</p>
            <p class="text-orange-500 text-[12px] bg-orange-200 border border-orange-400 rounded-full px-4 py-1"> <i class="fa-solid fa-life-ring"></i>${card.labels[1] ? card.labels[1] :"N/A"}</p>
        </div>

        <hr class="border-gray-300">
        
        <!-- 4th  -->
        <div class="flex justify-between"> 
            <p class="text-gray-400 text-[15px]"> #1 by ${card.author}</p>
        </div>

        <!-- last part   -->
        <div class="flex justify-between"> 
            <p class="text-gray-400 text-[15px]"> #1 by ${card.createdAt}</p>              
        </div>  

    </div>        
        
    `;

    issuesCard.appendChild(cardDiv);  
    const cardbdr =document.getElementById(`card-${card.id}`)
    if(card.status === "closed"){
      cardbdr.classList.remove("border-green-500")
      cardbdr.classList.add("border-[#AD46FF]")        
    }

    }); 
};

// ===============================
// Filter & Button Active Style Handler
// ===============================
function toggleStyle(id){ 

    allfilterbtn.classList.remove('bg-black','text-white')
    openfilterbtn.classList.remove('bg-black','text-white')
    closedfilterbtn.classList.remove('bg-black','text-white')

    allfilterbtn.classList.add('bg-gray-300','text-black')
    openfilterbtn.classList.add('bg-gray-300','text-black')
    closedfilterbtn.classList.add('bg-gray-300','text-black')

    // console.log(id)
    const selected = document.getElementById(id)

    selected.classList.add('bg-[#4A00FF]' , 'text-white')
    selected.classList.remove('bg-gray-300','text-black')

    
    if(id === "btn-filter-all"){

        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((data)=>{
        displayedIssuesCard(data.data)
        issuesCounter.innerText = data.data.length
        })
    }

    else if (id ==="btn-filter-open"){
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res=>res.json())
        .then((data)=>{
        const openIssues =data.data.filter(issue=> issue.status ==="open")

        displayedIssuesCard(openIssues)
        issuesCounter.innerText = openIssues.length
        })
    }

    else if (id ==="btn-filter-closed"){
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((data) =>{
        const closedIssues =data.data.filter(issue =>issue.status ==="closed")
            
        displayedIssuesCard(closedIssues)
        issuesCounter.innerText = closedIssues.length
        })
    }
};

loadIssuesCard ();
