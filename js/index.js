    import Modulo from './modulo.js'
    const modulo = new Modulo();
    //const now = moment();
    var datareq = {} ;var lsdatareq = {}; var datareq_det = {}; var lsdatareq_det = {}; var idpintarfila=0;var idpintarfilanuevo=0
    export default class index {
        constructor() {
         
            if(!localStorage.getItem('lsdatareq')){
                localStorage.setItem('lsdatareq',"[]");
            }

            if(!localStorage.getItem('lsdatareq_det')){
                localStorage.setItem('lsdatareq_det',"[]");
            }

            if(localStorage.getItem('lsdatareq')!="[]"){
                lsdatareq =  JSON.parse(localStorage.getItem('lsdatareq'));
            }

            if(localStorage.getItem('lsdatareq_det')!="[]"){
                lsdatareq_det =  JSON.parse(localStorage.getItem('lsdatareq_det'));
            }
        }

        async getrequerimiento(){
            let response = await fetch('https://sheet.best/api/sheets/79692528-2507-4ad5-b2e7-94ffeea6657a',{
                method: 'GET',
                node: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data;
            if(response.ok){
                data = await response.json();
            }else{
                data = "error";
            }
            datareq = data;
            console.log(datareq);
            localStorage.setItem('lsdatareq',JSON.stringify(datareq));
            lsdatareq =  JSON.parse(localStorage.getItem('lsdatareq'));
            //return data;
        }

        async getrequerimientodetalle(){
            let response = await fetch('https://sheet.best/api/sheets/79692528-2507-4ad5-b2e7-94ffeea6657a/tabs/detalle',{
                method: 'GET',
                node: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let data;
            if(response.ok){
                data = await response.json();
            }else{
                data = "error";
            }
        
            console.log(data);
            localStorage.setItem('lsdatareq_det',JSON.stringify(data));
            lsdatareq_det =  JSON.parse(localStorage.getItem('lsdatareq_det'));
            //return data;
        }

        buscarXreq(req){
            lsdatareq = lsdatareq.filter(function(item){
                return item.REQ == req;
            });
            console.log(lsdatareq);
            ind.renderrequerimiento();
            lsdatareq =  JSON.parse(localStorage.getItem('lsdatareq'));
        }

        renderrequerimiento(page){
           
            let totalreg = lsdatareq.length;
            console.log(totalreg);
            let regvista = 5;
            let npag = totalreg/regvista; npag = Math.ceil(npag);
            let inicio; let fin;let template = ``;

            page=(page==null)?page=1:page=page;
            inicio=(page>0)?((page*regvista)-regvista):0;
            fin = inicio + regvista;
        
            //const slicedata = lsdatareq.slice(inicio,fin);
            let slicedata = this.json_orderdate(lsdatareq).slice(inicio,fin);
        
            if(lsdatareq.length==0){
                template = `
                <tr>
                    <td colspan="8">
                        <div class="alert alert-warning" role="alert">
                            No hay requerimientos o no se encontraron datos
                        </div>
                    </td>
                </tr>`;
            }else{
                let j=(page*regvista)-regvista+1;
                //console.log(lsdatareq);
                for(let i of slicedata) {
                    template += `
                    <tr id="row${i.REQ}"  data-idreq="${i.REQ}">
                        <td scope="row">${j}</td>
                        <td>${i.FECHA}</td>
                        <td>${i.TIPO}</td>
                        <th>${i.REQ}</th>
                        <td>${i.EQUIPO}</td>
                        <td>${i.FECHA_REC}</td>
                        <td>${ui.etq_estado(i.ESTADO)}</td>
                        <td>${i.OBS}</td>
                    </tr>`;
                    j++;
                }
            }
            lbltotalreg.innerHTML = totalreg;
            document.querySelector('#viewreq').innerHTML = template;
            document.querySelector("#pagination").innerHTML = modulo.paginador(totalreg,page,npag);
        }

        renderrequerimiento_det(req,page){
        
            let filterreq_det = lsdatareq_det.filter((item)=>item.REQ == req);
            console.log(filterreq_det);

            let totalreg_det = filterreq_det.length;
            let regvista = 10;
            let npag = totalreg_det/regvista; npag = Math.ceil(npag);
            let inicio; let fin;let template = ``;

            page=(page==null)?page=1:page=page;
            inicio=(page>0)?((page*regvista)-regvista):0;
            fin = inicio + regvista;
        
            if(filterreq_det.length==0){
                template = `
                <tr>
                    <td colspan="8">
                        <div class="alert alert-warning" role="alert">
                            No hay requerimientos o no se encontraron datos
                        </div>
                    </td>
                </tr>`;
            }else{
                let j=(page*regvista)-regvista+1;
                //console.log(lsdatareq);
                for(let i of filterreq_det.slice(inicio,fin)) {
                    template += `
                    <tr>
                        <td scope="row">${j}</td>
                        <td>${i.DESCRIPCION}</td>
                        <td>${i.NPARTE}</td>
                        <td>${i.QTY}</td>
                        <th>${i.QTY_ATEND}</th>
                        <td>${ui.etq_estado(i.ESTADO)}</td>
                        <td>${i.OBS}</td>
                    </tr>`;
                    j++;
                }
            }
            lbltotalreg_det.innerHTML = totalreg_det;
            document.querySelector('#viewreq_det').innerHTML = template;
            document.querySelector("#pagination_det").innerHTML = modulo.paginador(totalreg_det,page,npag);
        }

        limpiarreq_det(){
            let template =``;
            document.querySelector('#viewreq_det').innerHTML = template;
            document.querySelector("#pagination_det").innerHTML = template;

        }

        json_orderdate(data){
            let lista_a = [];
            let j =0;
           for(let i of data){
               lista_a.push(data[j]);
               j++;
           }
           return lista_a.sort((a,b)=>new Date(b.FECHA) - new Date(a.FECHA));
        }
    }


    class IU{

        etq_estado(estado){
            if(estado=="parcial"){
                return `<span class="badge rounded-pill bg-primary">${estado}</span>`;
            }else if(estado=="completo"){
                return `<span class="badge rounded-pill bg-success">${estado}</span>`;
            }else if(estado=="no procede"){
                return `<span class="badge rounded-pill bg-danger">${estado}</span>`;
            }else if(estado=="observado"){
                    return `<span class="badge rounded-pill bg-warning text-dark">${estado}</span>`;
            }else if(estado=="pendiente"){//pendiente
                return `<span class="badge rounded-pill bg-secondary">${estado}</span>`;
            }else{
                return `<span class="badge rounded-pill bg-light text-dark">sin estado</span>`;
            }
        }

        async pintarfilas(){
            if(idpintarfila!=0){
                if(document.querySelector("#"+idpintarfila)){
                document.querySelector("#"+idpintarfila).className='';
                }
            }
            console.log(idpintarfila,idpintarfilanuevo);
            if(idpintarfilanuevo!=0){
                if(document.querySelector("#"+idpintarfilanuevo)){
                    document.querySelector("#"+idpintarfilanuevo).className='alert alert-primary';
                }
            }
            idpintarfila = idpintarfilanuevo;
        }
    }

    
    const ind = new index();
    const ui = new IU();

    document.addEventListener('DOMContentLoaded', async function () {
        if(localStorage.getItem('lsdatareq')=="[]"){
          await  ind.getrequerimiento();
        }
        console.log(lsdatareq);
        await ind.renderrequerimiento();

       if(localStorage.getItem('lsdatareq_det')=="[]"){
        await  ind.getrequerimientodetalle();
        }

        lblnreq.innerHTML = "";
        lblnreq_det.innerHTML = "";
        lblequipo.innerHTML = "";
        lbltotalreg_det.innerHTML = "";

    });

    document.querySelector("#tablereq").addEventListener('click',function(e){
        if(e.target.id=="page"){
            console.log(e.target.dataset.page);
            nopage.value=e.target.dataset.page;
            ind.renderrequerimiento(nopage.value);
        }

        let fila = e.target.parentNode;
        console.log(fila.nodeName);
        if(fila.nodeName=='TR'){
            lblnreq.innerHTML = e.target.parentNode.querySelectorAll("th")[0].innerText;
            lblnreq_det.innerHTML = e.target.parentNode.querySelectorAll("th")[0].innerText;
            lblequipo.innerHTML = e.target.parentNode.querySelectorAll("td")[3].innerText;
            console.log(fila.dataset.idreq);
            //idfactura = fila.dataset.idfact;
            idpintarfilanuevo = fila.id;
            ui.pintarfilas();
            ind.renderrequerimiento_det(fila.dataset.idreq,nopage_det.value);  
            
        }
        
    });

    document.querySelector("#tablereq_det").addEventListener('click',function(e){
        if(e.target.id=="page"){
            let req = 2705;
            console.log(e.target.dataset.page);
            nopage_det.value=e.target.dataset.page;
            ind.renderrequerimiento_det(req,nopage_det.value);
        }
    });
    
    document.querySelector("#btnbuscar").addEventListener("click",function(e){   
        console.log("click",txtbuscareq.value);
        lblnreq.innerHTML = txtbuscareq.value;
        ind.buscarXreq(txtbuscareq.value);
    });

    document.querySelector("#btnreset").addEventListener("click",function(e){
        txtbuscareq.value = "";
        lsdatareq =  JSON.parse(localStorage.getItem('lsdatareq'));
        lblnreq.innerHTML = "";
        lblnreq_det.innerHTML = "";
        lblequipo.innerHTML = "";
        ind.renderrequerimiento();
        ind.limpiarreq_det();
    });
   