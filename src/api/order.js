import axiosClient from "../axios.js";

export function sendData(data){
    const form = new FormData();
    form.append('supplier_title', data.supplier_title);
    form.append('supplier_inn', data.supplier_inn);
    form.append('supplier_kpp', data.supplier_kpp);
    form.append('supplier_address', data.supplier_address);
    form.append('client_fio', data.client_fio);
    form.append('client_inn', data.client_inn);
    form.append('client_address', data.client_address);
    form.append('order_number', data.order_number);
    form.append('total_quantity', data.total_quantity);
    form.append('total_sum', data.total_sum);
    form.append('logo', data.logo);
    form.append('products', JSON.stringify(data.products));

    return axiosClient.post('/order', form);
}
