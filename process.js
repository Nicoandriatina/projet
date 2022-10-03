$(function () {
    $('table').DataTable();

    //creation d'un facture
    $('#create').on('click', function (e) {
        let formOrder = $('#formOrder')
        if (formOrder[0].checkValidity())
            e.preventDefault();
        $.ajax({
            url: 'process.php',
            type: 'post',
            data: formOrder.serialize() + '&action=create',
            success: function (response) {
                $('#creatModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'ajouter avec succes',
                })
                formOrder[0].reset();
            }
        })
    })
    //recuperation du facture 
    getBills();
    function getBills() {
        $.ajax({
            url: 'process.php',
            type: 'post',
            data: { action: 'fetch' },
            success: function (response) {
                console.log(response);
                // CHANGE

                //Ny zavatra niova, dans process.php
                // received novaiko ho reseived (zay no ao DB) ligne 43
                // states novaiko ho state (zay no ao am DB) ligne 45

                // affichage du table sur le Html
                let table = document.querySelector('#orderTable');
                table.innerHTML = response;
                // Fin

                // FIN CHANGE
            }
        })
    }
    $('body').on('click','.editBtn', function(e) {
        e.preventDefault();
        $.ajax({
            url: "process.php",
            type: 'post',
            data:{workingId:this.dataset.id},
            success: function(response) {
                let billinfo=JSON.parse(response);
                $('#NombateauUpdate').val(billinfo.Nombateau);
                $('#MarqueUpdate').val(billinfo.Marque);
                $('#categoriespdate').val(billinfo.categories);
                $('#chargemaxUpdate').val(billinfo.chargemax);
                $('#chargeminUpdate').val(billinfo.chargemin);
                let select= document.querySelector('#stateUpdate');
                let stateOption=Array.from(select.options);
                stateOption.forEach((o,i)=> {
                    if(o.value==billinfo.state) select.selectedIndex=i;         
                      
                    

                })

            }
        })
    })
})