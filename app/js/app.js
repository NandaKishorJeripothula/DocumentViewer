$(document).ready(function(){
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal();
    //form actions 
    document.uploadForm.action=SERVER+UPLOADFILE;
    var id='';
    var currentLocation='/';
    var prevId='';
    var parentId='';
    /*for (let el of document.querySelectorAll('.actions')) el.style.visibility = 'hidden';
    if(document.getElementById("exploreDataCard").classList.contains("active")){
        for (let el of document.querySelectorAll('.actions')) el.style.visibility = 'none';
    }
    
    */ 

    document.uploadForm.addEventListener('submit',function(e){
        e.preventDefault();
        
        document.getElementById("uploadMessage").innerHTML="<h5>WAIT</h5>"
        fetch(event.target.action, {
            method: 'POST',
            body:new FormData(event.target) // event.target is the form
        }).then((resp) => {
            if(resp.status==200){
                document.getElementById("uploadMessage").innerHTML=`<a href="#!" class="modal-close waves-effect waves-green btn float-right">Success ...Close</a></span>`
            };
        }).catch((error) => {
            console.log(error);
        });

    });
   function isJSON(data) {
    try {
        JSON.parse(data);
    }catch (e){
        return false;
    }
    return true;
    }
   //USERINFO 
    $.get(SERVER+USERINFO, function(data, status){
        if(isJSON(data)){
            var jsonData = $.parseJSON(data);
        }
        else{
            var jsonData =data;    
        }
        document.getElementById("userName").innerHTML=jsonData.name;
        document.getElementById("userId").innerHTML=jsonData.id;
    }) 
    //Data Loading
    HomePath=document.getElementById("loadHomeContent");
    CurrentPath=document.getElementById("currentpath");
    HomePath.addEventListener('click',function(e){
        console.log("home");
        preLoadData();
        CurrentPath.innerHTML="";
    });
    //Preloading 
    function preLoadData(){
        $.get(SERVER+GETCONTENTOF,function(data,status){
            if(isJSON(data)){
                var jsonData = $.parseJSON(data);
            }
            else{
                var jsonData =data;    
            }
            //console.log(data);
            renderData(jsonData,'bodyExploreDataCard');
        })
    }
    preLoadData();
    $('.collapsible #downloadFolderExploreDatacard').on('click', function(e) {
        e.stopPropagation();
        $.get(SERVER+DOWNLOAD+id,function(data,status){
            var jsonData=$.parseJSON(data);
            console.log(jsonData);
            if(jsonData.hasOwnProperty('providerLink')){
                if(window.confirm("Are you sure want to download???")){
                    window.open(jsonData.cloudElementsLink,"_blank");
                }
            }
            else{
                if(window.confirm("Its a folder, would you like download from actual service provider???")){
                    window.open(jsonData.cloudElementsLink,"_blank");
                }
            }
        })
    });
    $('.collapsible #uploadHereExploreDataCard').on('click', function(e) {
        //e.stopPropagation();
    });
    $('.collapsible #refreshExploreDataCard').on('click', function(e) {
        e.stopPropagation();
        $.get(SERVER+GETCONTENTOF+id,function(data,status){
            renderData(data,'bodyExploreDataCard');
        })
    });
    $('.collapsible #backExploreDataCard').on('click', function(e) {
        e.stopPropagation();
        CurrentPath.innerHTML="";
        $.get(SERVER+GETCONTENTOF+prevId,function(data,status){
            renderData(data,'bodyExploreDataCard');
        })
    });

    function formatBytes(bytes,decimals) {
        if(bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals <= 0 ? 0 : decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
     }

    function renderData(data,divId){
        if(isJSON(data)){
            var jsonData = $.parseJSON(data);
        }
        else{
            var jsonData =data;    
        }
        //EMPTY BEFORE LOADING DATA OUTSIDE LOOP
        document.getElementById("bodyExploreDataCard").innerHTML="";
        console.log(jsonData.length);
        // WHEN NO RECORDS FOUND
        tableBody=document.getElementById(divId);
        if(jsonData.length==0){
            console.log("no data");
            var NODATA="NO_DATA_AVAILABLE";
            for(var i=0;i<5;i++){
                var row= $('<tr/>');               
                // ADD TABLE ROW ELEMENT     
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                row.append($("<td>"+NODATA+"</td>"));
                tableBody.appendChild(row);
            }        
        }else{
            prevId=id;
            if(jsonData.length==1){
                id=jsonData.parentFolderId;
            }
            else{
                id=jsonData[0].parentFolderId;
            }
            // WHEN RECORDS ARE FOUND
            $(jsonData).each(function(index,o){
               /* var row= $('<tr />');               
                // ADD TABLE ROW ELEMENT     
                $(divId).append(row);
                row.append($(`<td><a `));
                row.append($("<td>"+o.mandal+"</td>"));
                row.append($("<td>"+o.village+"</td>"));
                row.append($("<td>"+o.school_name+"</td>"));
                */
                parentId=o.parentFolderId;
                tr=document.createElement('tr');
                var nameElm=document.createElement('td');
                if(o.directory==true){
                    nameElmDirButton=document.createElement('span');
                    nameElmDirButton.innerHTML=`<i class="fa fa-folder fa-lg" aria-hidden="true"></i> `+o.name
                    nameElmDirButton.classList.add('float-left','actionsDir');
                    nameElm.appendChild(nameElmDirButton);
                }
                else{
                    nameElm.innerHTML=`<i class="fa fa-file" aria-hidden="true"></i> `+o.name;
                }
                nameElm.addEventListener('click',function(e){
                    if(o.directory==true){
                        // to call for loading
                        currentLocation=o.path;
                        CurrentPath.innerHTML= o.name;
                        $.get(SERVER+GETCONTENTOF+o.id,function(data,status){
                            renderData(data,'bodyExploreDataCard');
                        })
                    }
                    else {

                    }
                })
                tr.appendChild(nameElm);
                dateElm=document.createElement('td');
                if(!o.modifiedDate){
                    dateElm.innerText=(new Date(o.createdDate).toString())
                }
                else{
                    dateElm.innerText=(new Date(o.modifiedDate).toString())
                }
                tr.appendChild(dateElm);
                sizeElm=document.createElement('td');
                if(o.directory==true){
                    sizeElm.innerText=' '
                }
                else{
                    sizeElm.innerText=formatBytes(o.size);
                }
                tr.appendChild(sizeElm);
                actionElm=document.createElement('a');
                actionElm.innerHTML=`<i class="fa fa-download" aria-hidden="true"></i>`
                actionElm.classList.add('btn-floating','right-align', 'green','waves-effect','waves-light');
                actionElm.style.float="right";
                actionElm.addEventListener('click',function(e){
                    console.log(o.id);
                    //Download Resource
                    $.get(SERVER+DOWNLOAD+o.id,function(data,status){
                        var jsonData=$.parseJSON(data);
                        console.log(jsonData);
                        if(jsonData.hasOwnProperty('providerLink')){
                            if(window.confirm("Are you sure want to download???")){
                                window.open(jsonData.cloudElementsLink,"_blank");
                            }
                        }
                        else{
                            if(window.confirm("It seems to be a folder, would you like download from actual service provider???")){
                                window.open(jsonData.cloudElementsLink,"_blank");
                            }
                        }
                    })
                })
                tr.appendChild(actionElm);
                tableBody.append(tr);
            });
        }    
    }
   /* {
        var parentCard=document.getElementById("exploreDataCard")
        parentCard.addEventListener('click',function(){
            var id='41A412183AAC9177!146';
            if(parentCard.classList.contains('active')){
                $.get(SERVER+GETCONTENTOF+id,function(data,status){
                    var jsonData=$.parseJSON(data);
                    console.log(jsonData);
                })
            }
        })
    }*/

    
});
      