
const commentSection=document.querySelector("#comments")
const send=document.getElementById("send")
const newComment=document.getElementById("new-comment")
function User(userName,userAvi){
this.userName=userName;
this.userAvi=userAvi;
}
function comment(){
}
comment.prototype={
    init:function(user,date,content,score){
    this.user=user;
    this.date=date;
    this.content=content;
    this.score=score;
    this.m={
        "plus":false,
        "minus":false
    }
    }
}
function reply(parent){ 
    this.parent=parent;
}
const editScore=function(mod,score,i){
    mod.addEventListener("click",function(e){
        let target=e.target;
        
        if(target.classList.contains("plus")){
            if(commentsArray[i].m["plus"]===false){
            let v=parseInt(score.textContent);
            commentsArray[i].score++
            v++;
            score.textContent=v.toString();
            if(commentsArray[i].m["minus"]===true){
                commentsArray[i].m["minus"]=false;
            }else{
            commentsArray[i].m["plus"]=true;
            }
            }
        }else if(target.classList.contains("minus")){
            if(commentsArray[i].m["minus"]===false){
            let v=parseInt(score.textContent);
            if(v>0){
            commentsArray[i].score--
            v--;
            score.textContent=v.toString();
            if(commentsArray[i].m["plus"]===true){
                commentsArray[i].m["plus"]=false;
            }else{
            commentsArray[i].m["minus"]=true;
            }
            
        }
            
        }
        }
    })
}
const manageDelete=function(div,i){
    
    div.addEventListener("click",function(e){
        console.log(commentsArray[i])
        
        console.log(commentsArray[i])
        if(e.target.classList.contains("delete-text")||e.target.classList.contains("delete-icon")){
            div.remove();
            delete(commentsArray[i])
        }
    })
}
const addReply=function(cr,i){
    const j=i
    cr.addEventListener("click",function(e){
        let target=e.target;
        
        
        if(!cr.innerHTML.includes('class="add-reply"')){
            
            if(target.classList.contains("reply-icon")||target.classList.contains("reply-text")){
                let section=document.createElement("section")
                let textA=document.createElement("textarea")
                let sendB=document.createElement("input")
                let form=document.createElement("form")
                section.setAttribute("class","add-reply")
                textA.setAttribute("class","new-reply")
                sendB.setAttribute("class","send-reply")
                sendB.setAttribute("type","submit")
                sendB.setAttribute("value","SEND")
                

                section.innerHTML=`
                
                <img class="user-avi" src="./images/avatars/image-juliusomo.png">`
                form.appendChild(textA)
                form.appendChild(sendB)
                section.appendChild(form)
                sendB.addEventListener("click",function(e){
                    if(e.target.classList.contains("send-reply")){
                        e.preventDefault();
                        cr.removeChild(cr.lastChild);
                        let r1=new reply(j);
                     r1.init(users[3],"just now",textA.value,0);
                     commentsArray.push(r1);
                     let div=document.createElement("div")
                     div.classList.add("comment");
                     div.classList.add("reply")
                     div.innerHTML=`
                     
                        <div class="comment-score">
                            <img class="score-mod plus" src="./images/icon-plus.svg">
                            <span class="score">${r1.score}</span>
                            <img class="score-mod minus" src="./images/icon-minus.svg">
                        </div>
                        <div class="comment-content">
                            <img class="user-avi" src="${r1.user.userAvi}">
                            <span class="username">${r1.user.userName}</span>
                            <span class="date">${r1.date}</span>
                            <span class="reply-text">Reply</span>
                            <img class="reply-icon" src="./images/icon-reply.svg">
                            <span class="delete-text">delete</span>
                            <img class="delete-icon" src="./images/icon-delete.svg">
                            <p><span class="tag">@${commentsArray[j].user.userName}</span>
                            ${r1.content}
                            </p>
                        </div>
                     
                      `
                    let i=(commentsArray.length-1)
                    editScore(div,div.querySelector(".score"),i,1);
                    manageDelete(div,i)
                    cr.appendChild(div)
                    }
                })
                cr.appendChild(section);
            }
    }
    })
}

    

reply.prototype= Object.create(comment.prototype)
reply.prototype.constructor=reply;
var users=[new User("maxblagun","./images/avatars/image-maxblagun.png"),
new User("amyrobson","./images/avatars/image-amyrobson.png"),
new User("ramsesmiron","./images/avatars/image-ramsesmiron.png"),
new User("juliusomo","./images/avatars/image-juliusomo.png")]
var commentsArray=[]
let c1=new comment();
c1.init(users[1],"1 month ago","Impressive! Though it seems the drag feature could be improved.But overall it looks incredible.You've nailed the desgin and responsivenesse at various breakpoints works really well",12);
commentsArray.push(c1);
c1=new comment();
c1.init(users[0],"2 weeks ago","Woah, your project looks awsome! How long have you been coding for? I'm still new, but think i want to dive into React as well soon.Perhaps you can give me an insight on where i can learn React? Thanks.",5);
commentsArray.push(c1);
c1=new reply(1);
c1.init(users[2],"1 week ago","if you're still new, i'd recommend focusing on the fundamentals of HTML, CSS and JS before considering React.it's very tempting to jump ahead but lay a solid foundation first",4);
commentsArray.push(c1);

const isComment=function(c){
    if(c instanceof reply){
        return false;
    }else{
        return true;
    }
}
let displayComments=commentsArray.filter(item=>isComment(item)).map(function(item){
    return `
    <div class="comment-replys">
        <div class="comment">
            <div class="comment-score">
                <img class="score-mod plus" src="./images/icon-plus.svg">
                <span class="score">${item.score}</span>
                <img class="score-mod minus" src="./images/icon-minus.svg">
            </div>
            <div class="comment-content">
                <img class="user-avi" src="${item.user.userAvi}">
                <span class="username">${item.user.userName}</span>
                <span class="date">${item.date}</span>
                <span class="reply-text">Reply</span>
                <img class="reply-icon" src="./images/icon-reply.svg">
                <p>
                ${item.content}
                </p>
            </div>
        </div>
    </div>`
    ;
})
displayComments=displayComments.join("");
commentSection.innerHTML=displayComments;
const comments=document.querySelectorAll(".comment-replys")

commentsArray.filter(item =>item instanceof reply).map(function(item){
    comments[item.parent].innerHTML+=`
    
    <div class="comment reply">
        <div class="comment-score">
            <img class="score-mod plus" src="./images/icon-plus.svg">
            <span class="score">${item.score}</span>
            <img class="score-mod minus" src="./images/icon-minus.svg">
        </div>
        <div class="comment-content">
            <img class="user-avi" src="${item.user.userAvi}">
            <span class="username">${item.user.userName}</span>
            <span class="date">${item.date}</span>
            <span class="reply-text">Reply</span>
            <img class="reply-icon" src="./images/icon-reply.svg">
            <p>
            ${item.content}
            </p>
        </div>
    </div>
`;

})
const mod=document.querySelectorAll(".comment");
const score=document.querySelectorAll(".score");
for(let i=0;i<mod.length;i++){
    editScore(mod[i],score[i],i)
}
for(let i=0;i<comments.length;i++){
    addReply(comments[i],i);
}


send.addEventListener("click",function(e){
    e.preventDefault();
    
    if(!newComment.value==""){
        
        let c1=new comment();
        c1.init(users[3],"just now",newComment.value,0);
        commentsArray.push(c1);
        let div=document.createElement("div")
        div.classList.add("comment-reply");
        div.innerHTML=`
        <div class="comment">
            <div class="comment-score">
                <img class="score-mod plus" src="./images/icon-plus.svg">
                <span class="score">${c1.score}</span>
                <img class="score-mod minus" src="./images/icon-minus.svg">
            </div>
            <div class="comment-content">
                <img class="user-avi" src="${c1.user.userAvi}">
                <span class="username">${c1.user.userName}</span>
                <span class="date">${c1.date}</span>
                
                <span class="reply-text">Reply</span>
                <img class="reply-icon" src="./images/icon-reply.svg">
                <span class="delete-text">delete</span>
                <img class="delete-icon" src="./images/icon-delete.svg">
                <p>
                ${c1.content}
                </p>
            </div>
        </div>
        `
        let i=(commentsArray.length-1);
        editScore(div,div.querySelector(".score"),i);
        addReply(div,i);
        manageDelete(div,i)
        commentSection.appendChild(div)
        newComment.value="";
    }
})












