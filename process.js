$(function() {
    $('table').DataTable();

    //creation d'un facture
    $('#create').on('click', function(e){
      let formOrder = $('#formOrder')
      if(formOrder [0].checkValidity())
      e.preventDefault();
      $.ajax({
         url: 'process.php',
         type: 'post',  
         data: formOrder.serialize() + '&action=create',
         success: function(response){
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
    function getBills(){
        $.ajax({
            url: 'process.php',
            type: 'post',
            data:{action:'fetch'},
            success: function(response){
                console.log(response);
            }
        })
    }
 })
