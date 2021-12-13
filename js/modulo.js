export default class Modulo{

    paginador(total,paginador,Npaginas){
        paginador = parseInt(paginador);
        Npaginas = parseInt(Npaginas);
        let template=``;
        let i=1;
        if(total>=1 && paginador<=Npaginas){  
            template+=`<nav aria-label="Page navigation example" id="paginador"><ul class="pagination">`;
            if(paginador==1){
                template+=`<li class="page-item"><a class="page-link">Atras</a></li>`;
            }else{
                template+=`<li class="page-item"><a class="page-link" id="page" data-page="${paginador-1}" href="#" >Atras</a></li>`;
            }
            for(i=1;i<=Npaginas;i++){
                if(Npaginas<=5){
                    if(paginador!=i){
                        template+=`<li class="active"><a class="page-link" id="page" data-page="${i}" href="#" >${i}</a></li>`;
                    }else{
                        template+=`<li class="page-item active"><a class="page-link" id="page" data-page="${i}" href="#">${i}</a></li>`;
                    }
                }
            }
            if (Npaginas>=6 && paginador<Npaginas){
                if(paginador!=i){
                    template+=`<li class="active"><a class="page-link" id="page" data-page="1" href="#">inicio</a></li>`;
                    template+=`<li class="page-item active"><a class="page-link" id="page" data-page="${paginador}" href="#">${paginador}</a></li>`;
                    template+=`<li class="active"><a class="page-link" id="page" data-page="${paginador+1}" href="#"  >${paginador+1}</a></li>`;
                    template+=`<li class="active"><a class="page-link" id="page" data-page="${paginador+2}" href="#" >${paginador+2}</a></li>`;
                    template+=`<li class="active"><a class="page-link" id="page" data-page="${paginador+3}" href="#" >${paginador+3}</a></li>`;
                    
                }else{
                    template+=`<li class="page-item"><a class="page-link" id="page" data-page="${paginador}" href="#">${paginador}</a></li>`;
                }
            }
                
            if(paginador==Npaginas){  
                template+=`<li class="page-item"><a class="page-link">Siguiente</a></li>`;
            }else{
                template+=`<li class="page-item"><a class="page-link" id="page" data-page="${paginador+1}" href="#" >Siguiente</a></li>`;
            }
            
            template+=`</ul></nav>`;
        }
        
        return template;  
    }


}