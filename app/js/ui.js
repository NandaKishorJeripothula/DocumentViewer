
window.onscroll = function() {sideBarSticker()};
var sideBar = document.getElementById("sideMenu");
//var sticky = sideBar.offsetTop; its value is 95 but for smooth effect direct value is instead of var 
function sideBarSticker() {
    sideBar.classList.add("sticky")
/*
 FOR FUTURE REFERENCE to STICK THE SIDE BAR
  if (window.pageYOffset >=95 ) {
    sideBar.classList.add("sticky");
  } else {
    sideBar.classList.remove("sticky");
  }
  */
}
 
document.addEventListener('DOMContentLoaded', function() {
    //SIDE MENU
    {document.getElementById('sideMenu').innerHTML=`
            <div class="sidebar" id="sideBar" data-color="purple" data-background-color="white" data-image="media/sidebar.jpg">
            <!--
                Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"
        
                Tip 2: you can also add an image using data-image tag
            -->
            <div class="logo">
                <a href="/home" class="simple-text logo-normal">
                <img src="/media/logo.png" alt="Dept Logo">
                Document Viewer
                </a>
            </div>
            <div class="sidebar-wrapper">
                <ul class="nav">
                <li class="nav-item" id="files&folders">
                    <a class="nav-link" href="/home">
                    <i class="material-icons">dashboard</i>
                    <p>Files & Folders</p>
                    </a>
                </li>
                <li class="nav-item " id="datacenter">
                    <a class="nav-link" href="#">
                    <i class="material-icons">account_balance</i>
                    <p>DataCenter</p>
                    </a>
                </li>
                <li class="nav-item " id="user">
                    <a class="nav-link" href="#">
                    <i class="material-icons">how_to_reg</i>
                    <p>User LoggedIn</p>
                    </a>
                </li>
                <li class="nav-item" id="aboutus ">
                        <a class="nav-link" href="#">
                            <i class="material-icons">ac_unit</i>
                            <p>About Us</p>
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    `;
    }
    //Code to set the Side Menu Nav Item ACTIVE
    {
    if(window.location.href.match(/home/g)){
        document.getElementById('files&folders').classList.add("active");
    }else if(window.location.href.match(/datacenter/g)){
        document.getElementById('datacenter').classList.add("active");
    }else if(window.location.href.match(/user/g)){
        document.getElementById('user').classList.add("active");
    }else if(window.location.href.match(/aboutus/g)){
        document.getElementById('aboutus').classList.add("active");
    }
    }
    
    
});