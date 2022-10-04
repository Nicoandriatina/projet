$(function () {
    $('table').DataTable();

    //creation d'un facture
    $('#create').on('click', function (e) {
        let formOrder = $('#formOrder')
        if (formOrder[0].checkValidity())
            console.log('data ', formOrder.serialize());
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
                getBills();
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
                let table = document.querySelector('#orderTable');
                table.innerHTML = response;
            }
        })
    }
    $('body').on('click', '.editBtn', function (e) {
        e.preventDefault();
        $.ajax({
            url: "process.php",
            type: 'post',
            data: { workingId: this.dataset.id },
            success: function (response) {
                let billinfo = JSON.parse(response);
                $('#bill_id').val(billinfo.id);
                $('#UpdateNombateau').val(billinfo.Nombateau);
                $('#UpdateMarque').val(billinfo.Marque);
                $('#Updatecategories').val(billinfo.categories);
                $('#Updatechargemax').val(billinfo.chargemax);
                $('#Updatechargemin').val(billinfo.chargemin);
                let select = document.querySelector('#Updatetypeproduit');
                let UpdatetypeproduitOption = Array.from(select.options);
                UpdatetypeproduitOption.forEach((o, i) => {
                    if (o.value == billinfo.state) select.selectedIndex = i;

                })

            }
        })
    })
     //Modification du liste de bateaux
     $('#Update').on('click', function (e) {
        let formOrder = $('#UpdateformOrder')
        if (formOrder[0].checkValidity()) {
            // console.log('data ', formOrder.serialize());
            e.preventDefault();
            $.ajax({
                url: 'process.php',
                type: 'post',
                data: formOrder.serialize() + '&action=Update',
                success: function (response) {
                    $('#UpdateModal').modal('hide');
                    Swal.fire({
                        icon: 'success',
                        title: 'Modifier avec succes',
                    })
                    formOrder[0].reset();
                    getBills();
                }
            })
        }
    })
})