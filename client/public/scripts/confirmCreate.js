const confirmCreate = () => {
    const car_name = document.getElementById('car_name').value;
    const rent_cost = document.getElementById('rent_cost').value;
    const car_type = document.getElementById('car_type').value;
    const car_image = document.getElementById('car_image').value;
    const btnSave = document.getElementById('btnSave');

    // if (car_name === '' || rent_cost === '' || car_type === '' || car_image === '') {
    //     alert(' harap isi semua data dengan benar');
    //     return;
    // } else {
    //     btnSave.click();
    // }

    if (car_name === '' || rent_cost === '' || car_type === '' || car_image === '') {
        Swal.fire('Harap isi semua data', 'Apa masih ada yang kosong ?', 'question');
        return;
    } else {
        Swal.fire({
            title: 'Data sudah benar?',
            text: 'Periksa kembali data yang anda masukkan',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
        }).then((saveSucess) => {
            if (saveSucess.isConfirmed) {
                Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success');
                btnSave.click();
            }
        });
    }
};
