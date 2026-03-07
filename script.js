console.log('cannected') 

const issuesCounter = document.getElementById("counter")

const loadIssuesCard = ()=> {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then((data) => {      
    displayedIssuesCard(data.data)
    issuesCounter.innerText=data.data.length;
})      
}


const allfilterbtn = document.getElementById("btn-filter-all")
const openfilterbtn = document.getElementById("btn-filter-open")
const closedfilterbtn = document.getElementById("btn-filter-closed")


const displayedIssuesCard = (issues)=>{
    // console.log(data)
    const issuesCard =document.getElementById("issues-card");
    
    issuesCard.innerHTML="";
    console.log(issuesCard);
    issues.forEach(card => {
        console.log(card);  

        const cardDiv =document.createElement("div");
        
        cardDiv.innerHTML=`
         <div class="border border-gray-200 p-5 space-y-4 shadow-sm rounded-2xl">
                  <!-- 1st  -->
                  <div class="flex justify-between"> 
                      <p class="bg-green-100 text-green-500 rounded-full px-6 py-1 ">${card.status} </p>
                      <p class="bg-red-100 text-red-500 rounded-full px-6 py-1">${card.priority}</p>
  
                  </div>
                  <!-- 2nd  -->
                  <div>
                      <h2 class="text-[20px] font-bold">${card.title}</h2>
                      <p class="text-gray-400 text-[16px] ">${card.description}</p>
                  </div>
                  <!-- 3rd  -->
                  <div class="flex gap-4 ">
                      <p class="text-red-500 bg-red-200 border border-red-300 rounded-full px-4 py-1"> <i class="fa-solid fa-bug"></i>${card.labels[0]}</p>
                      <p class="text-orange-500 bg-orange-200 border border-orange-400 rounded-full px-4 py-1"> <i class="fa-solid fa-life-ring"></i>${card.labels[1] ? card.labels[1] : "N/A"}</p>
                  </div>
                  <hr class="border-gray-300">
                   <!-- 4th  -->
                   <div class="flex justify-between"> 
                       <p class="text-gray-400 text-[15px]"> #1 by ${card.author}</p>
                       <p class="text-gray-400 text-[15px] ">${card.assignee ? card.assignee : "N/A" } </p>
                   </div>

                   <hr class="border-gray-300">

                  <!-- last part   -->
                   <div class="flex justify-between"> 
                       <p class="text-gray-400 text-[15px]"> #1 by ${card.createdAt}</p>
                       <p class="text-gray-400 text-[15px] "> ${card.updatedAt} </p>
                   </div>                  
              </div>        
        `;

    issuesCard.appendChild(cardDiv);

    }); 
}

loadIssuesCard ()

function filtering(id){
    allfilterbtn.classList.remove('bg-black','text-white')
    openfilterbtn.classList.remove('bg-black','text-white')
    closedfilterbtn.classList.remove('bg-black','text-white')

    allfilterbtn.classList.add('bg-gray-300','text-black')
    openfilterbtn.classList.add('bg-gray-300','text-black')
    closedfilterbtn.classList.add('bg-gray-300','text-black')

    console.log(id)

    const selected = document.getElementById(id)

    selected.classList.add('bg-[#4A00FF]' , 'text-white')
    selected.classList.remove('bg-gray-300','text-black')
}






