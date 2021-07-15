
//get random slok on button click
let get_random=document.querySelector(".random-slok");
get_random.addEventListener("click",(event)=>{
    if(document.querySelector(".specific_verse_data")){
        document.querySelector(".specific_verse_data").remove()
    }

    let intervalId1=setInterval(()=>{
        document.querySelector(".loading_alert").innerHTML=`fetching data...`
    },2000)
    setTimeout(()=>{
        clearInterval(intervalId1)
        document.querySelector(".loading_alert").innerHTML=``
    },3000)
    

    url1="https://bhagavadgita-api-server.herokuapp.com/random_slok"
    const get_random_slok=async(url)=>{
        let rawData=await fetch(url,{
            method:"GET",
        })
        let jsonData=await rawData.json()
        .then(data=>displaySlok(data))
    }
    get_random_slok(url1)
})


const displaySlok=(data)=>{
    let image=document.querySelector(".gita_image")
    image.setAttribute("src","")

    if(document.querySelector(".slok_details")){
        document.querySelector(".slok_details").remove()
    }

    
    let myData=data._id?data:JSON.parse(data)
    let gita_content=document.querySelector(".gita_data");

    let card_element=document.createElement("div")
    card_element.setAttribute("class","card text-center slok_details")
    gita_content.append(card_element);

    let card_header=document.createElement("div");
    card_header.setAttribute("class","card-header")
    card_header.innerHTML=`<span> Chapter: ${myData.chapter} Verse: ${myData.verse}</span>`
    card_element.append(card_header)

    let card_body=document.createElement("div");
    card_body.setAttribute("class","card-body");
    card_element.append(card_body);

    let card_title=document.createElement("h5")
    card_title.setAttribute("class","card-title");
    card_title.innerHTML=`${myData.slok}`;
    card_body.append(card_title);


    let card_text=document.createElement("p");
    card_text.setAttribute("class","card-text");
    card_text.innerHTML=`${myData.tej.ht}`;
    card_body.append(card_text)

    let card_footer=document.createElement("div");
    card_footer.setAttribute("class","card-footer text-muted");
    card_footer.innerHTML=`${myData.siva.et}`;
    card_element.append(card_footer)
}

//display image on home button click
let gita_home=document.querySelector(".gita-home");
gita_home.addEventListener("click",()=>{
    if(document.querySelector(".slok_details")){
        document.querySelector(".slok_details").remove()
    }
    // specific_verse_data
    if(document.querySelector(".specific_verse_data")){
        document.querySelector(".specific_verse_data").remove()
    }
    let image=document.querySelector(".gita_image")
    image.setAttribute("src","https://assets.entrepreneur.com/content/3x2/2000/1597240199-bhagavadgita-6s.jpg")
})


// specific-slok on button click along with form to choose the specific slok
let get_specific=document.querySelector(".specific-slok");
get_specific.addEventListener("click",(event)=>{
    let image=document.querySelector(".gita_image")
    image.setAttribute("src","")

    if(document.querySelector(".slok_details")){
        document.querySelector(".slok_details").remove()
    }

    let gita_content=document.querySelector(".gita_data");

    //Form content to choose chapter number and verse number
    let specific_verse_content=document.createElement("div")
    specific_verse_content.setAttribute("class","card text-center specific_verse_data")
    gita_content.append(specific_verse_content)

    let specific_verse_card_header=document.createElement("h5")
    specific_verse_card_header.setAttribute("class","card-header")
    specific_verse_card_header.innerHTML="Choose Chapter and Verse Number"
    specific_verse_content.append(specific_verse_card_header)

    let specific_verse_card_body=document.createElement("div");
    specific_verse_card_body.setAttribute("class","card-body");
    specific_verse_content.append(specific_verse_card_body);
    
    
    let form=document.createElement("form")
    form.setAttribute("class","was-validated")
    specific_verse_card_body.append(form)

    let select_tag=document.createElement("select")
    select_tag.setAttribute("class","form-select select_chapter_value")
    select_tag.setAttribute("aria-label","select example")
    select_tag.setAttribute("required","true")
    select_tag.addEventListener("change",(event)=>{
        if(document.querySelectorAll(".dynamic_verse_option")){
            document.querySelectorAll(".dynamic_verse_option").forEach(ele=>ele.remove())
        }
        if(event.target.value){
            let verse_select_ele=document.querySelector(".verse_select")
            verse_select_ele.removeAttribute("disabled")
            console.log(event.target.value)
            let verse_count={1:47,2:72,3:43,4:42,5:29,6:47,7:30,8:28,9:34,10:42,11:55,12:20,13:34,14:27,15:20,16:24,17:28,18:78}
            let n=verse_count[event.target.value]
            for(i=0;i<n;i++){
                let select_option=document.createElement("option");
                select_option.setAttribute("value",`${i+1}`)
                select_option.setAttribute("class","dynamic_verse_option")
                select_option.innerHTML=`${i+1}`
                verse_select_ele.append(select_option)
            } 
        }
    })
    form.append(select_tag);

    let select_default_option=document.createElement("option");
    select_default_option.setAttribute("value","")
    select_default_option.innerHTML="Choose the chapter Number"
    select_tag.append(select_default_option)

    for(i=0;i<18;i++){
        let select_option=document.createElement("option");
        select_option.setAttribute("value",`${i+1}`)
        select_option.innerHTML=`${i+1}`
        
        select_tag.append(select_option)
    } 



    let select_verse_tag=document.createElement("select")
    select_verse_tag.setAttribute("class","form-select verse_select")
    select_verse_tag.setAttribute("aria-label","select example")
    select_verse_tag.setAttribute("required","true")
    select_verse_tag.setAttribute("disabled","true")
    form.append(select_verse_tag);

    let select_verse_default_option=document.createElement("option");
    select_verse_default_option.setAttribute("value","")
    select_verse_default_option.innerHTML="Choose the verse Number"
    select_verse_tag.append(select_verse_default_option)

    let submit_button=document.createElement("button")
    submit_button.setAttribute("class","btn btn-primary")
    submit_button.setAttribute("type","submit")
    submit_button.innerHTML="Submit";
    form.append(submit_button)
    //end of form content
    

    //get specific slok after submission of the input in form
    submit_button.addEventListener("click",(event)=>{
        let intervalId2=setInterval(()=>{
            document.querySelector(".loading_alert").innerHTML=`fetching data...`
        },2000)
        setTimeout(()=>{
            clearInterval(intervalId2)
            document.querySelector(".loading_alert").innerHTML=``
        },3000)
        let chapter=document.querySelector(".select_chapter_value").value
        let verse=document.querySelector(".verse_select").value
        console.log(chapter, verse)
        url2=`https://bhagavadgita-api-server.herokuapp.com/specific_slok/${chapter}/${verse}`
        const get_specific_slok=async(url)=>{
            let rawData=await fetch(url,{
                method:"GET",
            })
            let jsonData=await rawData.json()
            .then(data=>displaySlok(data))
        }
        get_specific_slok(url2)
        event.preventDefault()
    })

    
})
