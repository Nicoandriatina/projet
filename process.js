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
})
