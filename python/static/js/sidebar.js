sidebar_list.addEventListener("click", ()=> { 
    if(sidebar.style.display == "none") { 
        sidebar.style.display = "block";
        content.classList.remove("col-md-12");
        content.classList.add("col-md-10");
    } else if (sidebar.style.display == "block") { 
        sidebar.style.display = "none";
        content.classList.remove("col-md-10");
        content.classList.add("col-md-12");
    }
});
