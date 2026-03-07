// console.log('hello js')

// Log-in Form 
document.getElementById("subnit-btn").addEventListener('click' ,function(){

    // username 
    const inputeUser = document.getElementById("inpute-user");
    const userName = inputeUser.value ;
    // console.log('user-name-',userName)

    // password 
    const inputPass = document.getElementById("input-pass");
    const password = inputPass.value ;
    // console.log('password-',password)

    if(userName=='admin' && password =='admin123'){
        window.location.href="./dashboard.html";
    }
    else{
        alert('login invalide')
    }
})

