const confirmDelete = (id) => {
    Swal.fire({
        imageUrl: '../images/img-BeepBeep.png',
        title: 'Menghapus Data Mobil',
        text: 'Setelah di hapus,data mobil tidak dapat dikembalikan. Yakin ingin menghapus?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Terhapus!', 'Data Mobil Terhapus!.', 'success');
            setTimeout(function () {
                window.location.href = '/delete-car/' + id;
            }, 1000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Batal Menghapus', '', 'error');
        }
    });
};
