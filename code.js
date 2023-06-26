    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
    import { getDatabase, update, set, ref, get, onChildChanged, onChildAdded, onChildRemoved, push, child, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

    var _0x1862 = ["\x41\x49\x7A\x61\x53\x79\x42\x68\x50\x42\x6C\x65\x72\x4D\x5A\x47\x50\x50\x6E\x39\x6D\x66\x59\x73\x5A\x59\x75\x49\x42\x48\x30\x73\x6A\x41\x63\x44\x6F\x42\x59","\x6F\x79\x2D\x67\x6F\x65\x74\x68\x65\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x61\x70\x70\x2E\x63\x6F\x6D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6F\x79\x2D\x67\x6F\x65\x74\x68\x65\x2D\x64\x65\x66\x61\x75\x6C\x74\x2D\x72\x74\x64\x62\x2E\x66\x69\x72\x65\x62\x61\x73\x65\x69\x6F\x2E\x63\x6F\x6D","\x6F\x79\x2D\x67\x6F\x65\x74\x68\x65","\x6F\x79\x2D\x67\x6F\x65\x74\x68\x65\x2E\x61\x70\x70\x73\x70\x6F\x74\x2E\x63\x6F\x6D","\x31\x30\x38\x30\x34\x34\x34\x34\x32\x35\x30\x31\x30","\x31\x3A\x31\x30\x38\x30\x34\x34\x34\x34\x32\x35\x30\x31\x30\x3A\x77\x65\x62\x3A\x38\x61\x37\x66\x65\x35\x36\x37\x65\x38\x64\x38\x32\x33\x36\x33\x63\x62\x37\x64\x32\x62"];const Config={apiKey:_0x1862[0],authDomain:_0x1862[1],databaseURL:_0x1862[2],projectId:_0x1862[3],storageBucket:_0x1862[4],messagingSenderId:_0x1862[5],appId:_0x1862[6]}
    
    const app = initializeApp(Config);
    const db = getDatabase(app);
    let dbRef = ref(db, 'user')

    let allvaluesearch = '';
    let pageshowdata = document.querySelector('.pagedata')

    function is(value,idshow){
        let indexcard = 0;
        
        onChildAdded(idshow, (snapshot) => {
            const newData = snapshot.val()
            if(indexcard == 0){
                pageshowdata.innerHTML = ''
            }
            let backcolor; 
            
            if(newData.Level == 'A1' || newData.Level == 'A2')
            backcolor = '#820b5f'
            else if(newData.Level == 'B1' || newData.Level == 'B2')
            backcolor = '#eb6400'
            else
            backcolor = '#003b69'

            let getemail = '';
            if(newData.E_mail !== undefined){
                getemail = newData.E_mail
            }
            let getpass = '';
            if(newData.Password !== undefined){
                getpass = newData.Password
            }
            let dis;
            if(idshow._path.pieces_[0] == 'done'){
                dis = 'none'
            }
            
            if(newData.Firstname.toLowerCase().includes(value.toLowerCase()) || newData.Level.toLowerCase().includes(value.toLowerCase()) || newData.Dateexam.toLowerCase().includes(value.toLowerCase())){
                

                indexcard++
                pageshowdata.innerHTML += `  
                    <div id="${snapshot.key}" class='card'>
                        <div id="top_card">
                            <h3 id="date">${newData.dateN}</h3>
                            <h3 id="levet" style="background-color:${backcolor};">${newData.Level}</h3>
                            <button>${indexcard}</button>
                        </div>
                        <div id="card_data">
                            <h4>FirstName: ${newData.Firstname}</h4>
                            <h4>LastName: ${newData.Lastname}</h4>
                            <h4>date of birth: ${newData.Datemelad}</h4>
                            <h4>Country: ${newData.Contry}</h4>
                            <h4 id='h4_1' style="background:linear-gradient(to right,#cf0029,#6f0000); text-align:center;" >Date Exam: ${newData.Dateexam}</h4>
                            <h4>Phone: ${newData.Phone}</h4>
                            <h4>Email: ${newData.Email}</h4>
                            <h4>Address: ${newData.Street}</h4>
                            <h4>Level: ${newData.Level}</h4>
                            <h4>Time Rating: ${newData.Idampa}</h4>
                            <h4>Examine Before: ${newData.Yesno}</h4>
                            <hr>
                            <div style=" display:flex; flex-flow:row; background:linear-gradient(to right,#00756f,#00756f);">
                                <h4 class="E_P">E_M:<h4 style="outline:none; font-size:15px; background:none;" class="E_P" spellcheck="false" contenteditable="true" id='${snapshot.key + 1}' name="E_mail">${getemail}</h4></h4>
                            </div>
                            <div style=" display:flex; flex-flow:row;  background:linear-gradient( to right,#003ba295,#27704b00);">
                                <h4 class="E_P">Password:<h4 style="outline:none; background:none;" class="E_P" spellcheck="false" contenteditable="true" id='${snapshot.key + 2}' name="Password">${getpass}</h4></h4>
                            </div>
                        </div>
                        <div id="btn_card">
                            <button class="WhatsApp_card" data-key="${newData.Phone}">WhatsApp</button>
                            <button class="delete_card" style="display:${dis}" id="done" data-key='${snapshot.key}'>Done</button>
                            <button class="delete_card" id="delet" data-key='${snapshot.key}' data-name="${newData['Firstname']}">Delete</button>
                            <button class="delete_card" id="sing" data-key='${snapshot.key}'>Sign In Goethe</button>
                        </div>
                    </div>`

                        var delete_btn = document.querySelectorAll('.delete_card')
                        var whatsApp_btn = document.querySelectorAll('.WhatsApp_card')
                        var E_P = document.querySelectorAll('.E_P')

                        delete_btn.forEach(btn => {
                            btn.addEventListener('click',function(data){

                                var btnid = data.target.getAttribute('id')
                                var key = data.target.getAttribute('data-key')
                                var name = data.target.getAttribute('data-name')
                                console.log(btnid)

                                let titleN;
                                let htmlN;
                                let ico;
                                let botontext;
                                let botoncolor;
                                let Y1;
                                let Y2;
                                if(btnid == 'delet'){
                                    Y1 = 'Deleted!'
                                    Y2 = 'has been deleted successfully.'
                                    botoncolor = '#3085d6'
                                    botontext = 'Yes, delete it!'
                                    ico = 'warning'
                                    titleN = 'Are you sure?'
                                    htmlN = `user <b style="text-decoration: underline;">${name}</b> will be deleted!`
                                    editcard(btnid)
                                }
                                else if(btnid == 'done'){
                                    Y1 = 'Done!'
                                    Y2 = 'Added to the list of achievements'
                                    botontext = 'Yes'
                                    botoncolor = '#1abb73'
                                    ico = 'info'
                                    titleN = 'Transfer to the achievements page?'
                                    htmlN = `Click to confirm`
                                    editcard(btnid)
                                }
                                
                                else if(btnid == 'sing'){
                                    onChildAdded(ref(db,`user/${key}`), (data6) =>{
                                        update(ref(db,`sing/${data6.key}`),{
                                            val:data6.val(),
                                        })
                                        window.open('https://www.goethe.de/ins/jo/ar/spr/prf/gzsd1.cfm', '_blank');
                                    })
                                }

                                function editcard(idedet){

                                    Swal.fire({
                                        title: `${titleN}`,
                                        html:`${htmlN}`,
                                        icon: `${ico}`,
                                        showCancelButton: true,
                                        confirmButtonColor: `${botoncolor}`,
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: `${botontext}`
                                    }).then((result) => {   
                                        if (result.isConfirmed) {
                                            if(idedet == 'done'){
                                                get(ref(db,`user/${key}`)).then((data) =>{
                                                    push(ref(db,`done`),data.val()).then(()=>{
                                                        deleti()
                                                    })
                                                })
                                            }
                                            else{ deleti(); }
                                            function deleti(){
                                                remove(ref(db,`${idshow._path.pieces_[0]}/${key}`)).then(()=>{
                                                    Swal.fire(
                                                        `${Y1}`,
                                                        `${Y2}`,
                                                        'success'
                                                    )
                                                    is('',dbRef)
                                                })  
                                            }
                                        }   
                                    })
                                }

                            })
                            
                        }) 
                        E_P.forEach(inp =>{
                            inp.addEventListener('keyup',function(data){
                                let name = data.target.getAttribute('name')
                                let key = data.target.getAttribute('id')
                                let id = document.getElementById(key)
                                let setname = key.slice(0, -1)
                                if(name == 'E_mail'){
                                    update(ref(db,`user/${setname}`),{
                                        'E_mail':id.innerHTML
                                    })
                                }
                                else if(name == 'Password'){
                                    update(ref(db,`user/${setname}`),{
                                        'Password':id.innerHTML
                                    })
                                }
                            })
                        })


                        whatsApp_btn.forEach(btn =>{
                            btn.addEventListener('click', (data) =>{
                            let phone = data.target.getAttribute('data-key')
                            
                                const phoneWithPlus = phone.replace(/^00/, '+');
                                const message = '';
                                const url = `whatsapp://send?phone=${phoneWithPlus}&text=${encodeURIComponent(message)}`;
                                window.open(url);
                            })
                        })
            }
            document.getElementById('num_index').innerHTML = indexcard
        })
    }
    is('',dbRef)

    let po = 0;
    onChildAdded(dbRef, (chadata) => {
        if(po >= 1){
            showToast('truesubmit')
            let audio = document.getElementById('myAudio');
            audio.play();
        }
    })
    setTimeout(() =>{
        po = 1
    },5000)
    
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    let contener = document.querySelector('.contener')
    let isstyle = false;
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if(!isstyle){
            contener.style.width = '80%'
            contener.style.margin = 'auto 0px auto auto'
            contener.style.transition = '0.25s';
            contener.style.width = '80.5%'
            isstyle = true
        }
        else{
            contener.style.transition = '0.35s';
            contener.style.width = '100%'
            contener.style.width = '100%'
            isstyle = false
        }
    });



    function ResOpen(reas){
        var element = document.getElementById('res_info');
            if(reas){
                element.classList.add('isopen')
                element.classList.remove('isnotopen')
                element.innerHTML = 'Open'
            }
            else if(!reas){
                element.classList.remove('isopen')
                element.classList.add('isnotopen')
                element.innerHTML = 'Closed'
            }
        }


    let styleicon;
    let styletext;
    function showToast(Bstyle) {
    return new Promise((resolve, reject) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            width: '290px',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
    });
    if(Bstyle == true){
        styleicon = 'success'
        styletext = 'Registration is open'
    }
    else if(Bstyle == false){
        styleicon = 'error'
        styletext = 'Registration is closed'
    }
    else if(Bstyle == 'truesubmit'){
        styleicon = 'info'
        styletext = 'Recorder Added'
    }

    Toast.fire({
    icon: `${styleicon}`,
    title: `${styletext}`,
    }).then(() => {
    resolve();
    }).catch(error => {
    reject(error);
    });
});
}


    var os = null;
    function getOS() {
    var userAgent = window.navigator.userAgent
    if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/iPhone/.test(userAgent)) {
        os = 'iOS';
    }
    return os;
    }   
    getOS()

    function zoom(){
        if(os === 'Android' || os === 'iOS'){
            document.body.style.zoom = '32%'
        }
        else{
            document.body.style.zoom = '100%'
        }
    }
    zoom()

    document.getElementById('Done').addEventListener('click',() =>{
        document.getElementsByTagName('body')[0].style.backgroundColor = '#00ff40'
        dbRef = ref(db,'done')
        is('',dbRef)
    })


    const toggleButton = document.querySelector('.toggle-button');
    let boolis = true;

    toggleButton.addEventListener('click', function() {
        boolis = false
        update(ref(db,'bool/'),{
            'isopen':this.classList.toggle('active')
        })
            boolis = true
    });

    function datanumbermax(number1){
        update(ref(db,'resmax/'),{
            'num':number1,
        })
    }

    let inp_search = document.getElementById('inp_search')
    inp_search.onkeyup = () =>{
        allvaluesearch = inp_search.value
        is(inp_search.value,dbRef)
        if(inp_search.value == ''){
            is('',dbRef)
        }
    }
    inp_search.onblur = () =>{
        is('',dbRef)
    }

    let oldbtn = '';
    let btnlevel = document.querySelectorAll('.btn_level')
    btnlevel.forEach(btn1 =>{
        btn1.addEventListener('click', (data1) =>{
            allvaluesearch = btn1.id
            is(btn1.id,dbRef)
            if(oldbtn !== ''){
                document.getElementById(oldbtn).style.backgroundColor = '';
                document.getElementById(oldbtn).style.color = ''
            }
            if(btn1.id !== ''){
                oldbtn = btn1.id;
                document.getElementById(btn1.id).style.backgroundColor = '#ffd700'
                document.getElementById(btn1.id).style.color = 'black'  
            }
        })
    })

    ////////////////////////////////////////// Page Submit Edit/////////
    let btnhome = document.getElementById('Home')
    let pagewhatsappapi = document.querySelector('.page_edit_submit')
    btnhome.addEventListener('click', () =>{
        pageshowdata.style.display = 'flex'
    })

    var menu = document.getElementById("menu1");
    document.getElementById('bb1').addEventListener('click', () =>{
        menu.classList.toggle("active");
    }) 

    var menu1 = document.getElementById("menu2");
    document.getElementById('bb2').addEventListener('click', () =>{
        menu1.classList.toggle("active")
        
    })

    let btnapply = document.getElementById('btn_max_ply')
    let numMax = document.getElementById('inp_max')
    btnapply.addEventListener('click',() =>{
        if(numMax.value !== ''){
            datanumbermax(Number(numMax.value))
            numMax.value = ''
        }
    })

    let numlast;
    onChildChanged(ref(db,'bool'),(resed)=>{
        if(boolis){
            toggleButton.classList.toggle('active')
        }
        if(resed.val() && numlast == 0){
            datanumbermax(null)
        }
        ResOpen(resed.val())
        showToast(resed.val()).then(() => {
        })
    })

    onChildAdded(ref(db,'bool'),(resed)=>{
        if(resed.val()){
            toggleButton.classList.toggle('active')
        }
        ResOpen(resed.val())
        showToast(resed.val()).then(() => {
        })
    })

    onChildRemoved(ref(db,`user`),function(user){
        document.getElementById(user.key).remove()
        is(allvaluesearch)
    })

    onChildChanged(ref(db,'resmax'),(nummax) => {
        document.getElementById('num_resmax').innerHTML = nummax.val()
        numlast = nummax.val()
        if(numlast == 0){
            update(ref(db,'bool/'),{
            'isopen':false,
        })
        }
    })

    onChildAdded(ref(db,'resmax'),(resed)=>{
        document.getElementById('num_resmax').innerHTML = resed.val()
        numlast = resed.val()
        if(numlast == 0){
            update(ref(db,'bool/'),{
            'isopen':false,
        })
        }
    })

    var number = 84646963933843712; // الرقم الأصلي
var lastNineDigits = String(number).slice(-9); // الحصول على آخر 9 أرقام

console.log(lastNineDigits); // ستظهر "933843712"
setInterval

    /*
        let day = document.getElementsByClassName('cs-html-select__trigger dropdown-toggle btn-default')[0];
    let day1 = document.getElementsByClassName('cs-html-select__trigger-text')[0];
    let month = document.getElementsByClassName('cs-html-select__trigger dropdown-toggle btn-default')[1];
    let month1 = document.getElementsByClassName('cs-html-select__trigger-text')[1];
    let year = document.getElementsByClassName('cs-html-select__trigger dropdown-toggle btn-default')[2];
    let year1 = document.getElementsByClassName('cs-html-select__trigger-text')[2];

    ///////////////////////

        day.title = data.val().inp3.val.split('.')[0]
    day1.innerHTML = data.val().inp3.val.split('.')[0]
    getMonthName(data.val().inp3.val.split('.')[1])
    year.title = data.val().inp3.val.split('.')[2]
    year1.innerHTML = data.val().inp3.val.split('.')[2]
    // console.log(document.querySelector('[name = "accountPanel:basicData:body:dateBirth:daySelector"]'))
    daydata.setAttribute('selected','selected')
    mounthdata.setAttribute('selected','selected')
    yeardata.setAttribute('selected','selected')
    console.log(daydata,mounthdata,yeardata)


                        let daydata = document.querySelectorAll('option')[+data.val().Datemelad.val.split('.')[0]]
                        let dayin = document.querySelectorAll('li')[+data.val().Datemelad.val.split('.')[0] + +6]
                        let dayin1 = document.querySelectorAll('li')[+data.val().Datemelad.val.split('.')[0] + +7 - +data.val().Datemelad.val.split('.')[0]]

                        let mounthdata = document.querySelectorAll('option')[+data.val().Datemelad.val.split('.')[1] + +32]
                        let mounthdatain = document.querySelectorAll('li')[+data.val().Datemelad.val.split('.')[1] + +39]

                        let yeardata = document.querySelectorAll('option')data.val().Datemelad.val.split('.')[2]
                        let yeardatain = document.querySelectorAll('li')[+data.val().Datemelad.val.split('.')[2] - 1923 + +45]

                        day.title = daydata.innerHTML
                        day1.innerHTML = daydata.innerHTML


                        month.title = mounthdata.innerHTML
                        month1.innerHTML = mounthdata.innerHTML

                        year.title = yeardata.innerHTML
                        year1.innerHTML = yeardata.innerHTML

                        dayin.removeAttribute('class');
                        dayin.setAttribute('claas','cs-html-select__menu-item cs-html-select__menu-item--selected')
                        mounthdatain.removeAttribute('class');
                        mounthdatain.setAttribute('claas','cs-html-select__menu-item cs-html-select__menu-item--selected')
                        yeardatain.removeAttribute('class');
                        yeardatain.setAttribute('claas','cs-html-select__menu-item cs-html-select__menu-item--selected')
                        console.log(dayin)
                        console.log(dayin1)

                        daydata.setAttribute('selected','selected')
                        mounthdata.setAttribute('selected','selected')
                        yeardata.setAttribute('selected','selected')


    */