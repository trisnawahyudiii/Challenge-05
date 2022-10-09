const confirmCreate = () => {
    const car_name = document.getElementById('car_name').value;
    const rent_cost = document.getElementById('rent_cost').value;
    const car_type = document.getElementById('car_type').value;
    const car_image = document.getElementById('car_image').value;
    const btnSave = document.getElementById('btnSave');

    if (car_name === '' || rent_cost === '' || car_type === '' || car_image === '') {
        alert(' harap isi semua data dengan benar');
        return;
    } else {
        btnSave.click();
    }
};
