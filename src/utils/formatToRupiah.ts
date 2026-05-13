const formatToRupiah = (value: number | string) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
}).format(Number(value));

export default formatToRupiah