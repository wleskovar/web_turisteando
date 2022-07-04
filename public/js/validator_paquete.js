 window.addEventListener('load', function() {
    let formulario = document.querySelector("form.producto_v");

    formulario.addEventListener('submit', function(e) {
        
        let errores = [];

        let package_name = document.querySelector('input.name_v');
        if (package_name.value == '') {
            errores.push('El campo nombre debe estar completo');
        }else if (package_name.value.lenght < 3) {
            errores.push('El campo nombre debe tener más de 3 caracteres');
        };

        
        // En la modificacion del paquete hay que tener cuidado con la validacion de la imagen.
        // si esta no se modifica, no significa que no se haya cargado porque al trabajar con Multer, no tenemos el dato en el valor.
        // Para saber si la validacion se hace sobre el alta o la modificacion, analizamos el HTML. 
        // Si en la etiqueta 'label' solo esta el titulo es un alta, si aparece el nombre del archivo es una modificacion y hay que 
        // saltear la validacion.
        let etiqueta_imagen = document.querySelector('label.imagen_v');
        let etiqueta = etiqueta_imagen.innerHTML;

        console.log(etiqueta);

        let extensiones_aceptadas = ['.jpeg', '.png', '.webp'];
        let bandera = false;
        for (let  extension in extensiones_aceptadas) {
            if (etiqueta.indexOf(extension) !== -1) {
                bandera = true;
            };
        };
       
        console.log(bandera);
        
        // Si posicion es igual a -1, significa que no se encontro la descripcion de la imagen 
        if (bandera == false) {
            let package_image = document.querySelector('input.image_v');
            if (package_image.value == '') {
                errores.push('Debe cargar una imagen');
            };
        }

        let package_alt_image = document.querySelector('input.alt_image_v');
        if (package_alt_image.value == '') {
            errores.push('El campo alt_image debe estar completo');
        }else if (package_alt_image.value.lenght < 3) {
            errores.push('El campo alt_image debe tener más de 3 caracteres');
        };

        let package_price = document.querySelector('input.price_v');
        if (package_price.value == '') {
            errores.push('El campo precio debe estar completo');
        };

        let package_title = document.querySelector('input.title_v');
        if (package_title.value == '') {
            errores.push('El campo titulo debe estar completo');
        }else if (package_title.value.lenght < 3) {
            errores.push('El campo titulo debe tener más de 3 caracteres');
        };

        let package_q_days = document.querySelector('input.q_days_v');
        if (package_q_days.value == '') {
            errores.push('El campo cantidad de días debe estar completo');
        
        };

        let package_description = document.querySelector('textarea.description_v');
        if (package_description.value == '') {
            errores.push('El campo descripción debe estar completo');
        }else if (package_description.value.lenght < 3) {
            errores.push('El campo descripción debe tener más de 3 caracteres');
        };

        let package_date_admission = document.querySelector('input.date_admission_v');
        if (package_date_admission.value == '') {
            errores.push('El campo día de admisión debe estar completo');
        };

        let package_discount = document.querySelector('input.discount_v');
        if (package_discount.value == '') {
            errores.push('El campo descuento debe estar completo');
        };
                    
        if (errores.length > 0) {
            e.preventDefault();
            
            let ulErrores = document.querySelector('ul.errores_formulario_v');

            // se blanquea para que no se acumulen leyendas de error si el usuario los repite, solo mostrara los actualizados.
            ulErrores.innerHTML = '';
            
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += '<li>' + errores[i] + '</li>';
                
            };
        };
    })
});