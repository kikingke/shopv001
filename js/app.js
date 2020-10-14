const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Compras Quincenales',
        productos: [],
        productoNombre: '',
        cantidad: '',
        precio: ''



    },
    methods: {
        createArticulo: function () {
            this.productos.push({
                productoNombre: this.productoNombre,
                cantidad: this.cantidad,
                precio: this.precio,
                precioTotal: this.cantidad * this.precio,
                estado: false
            });
            localStorage.setItem('productos_dt', JSON.stringify(this.productos));


        },
        editarProducto: function (index) {
            if (this.productos[index].estado) {
                this.productos[index].estado = false;
                localStorage.setItem('productos_dt', JSON.stringify(this.productos));
            } else {
                this.productos[index].estado = true;
                localStorage.setItem('productos_dt', JSON.stringify(this.productos));
            }


        },
        eliminarProducto: function (index) {
            this.productos.splice(index, 1);
            localStorage.setItem('productos_dt', JSON.stringify(this.productos));
        },
        verDAtos: function () {
            let totalTotal = this.productos.reduce((accum, item) => accum + item.precioTotal, 0);
            // console.log(totalTotal);
            return totalTotal;

        },
        verFalsos: function () {
            let length = this.productos.filter(function (item) {
                return item.estado == false;
            }).length;
            return length;
        }


    },
    created: function () {
        let datosLS = JSON.parse(localStorage.getItem('productos_dt'));
        if (datosLS === null) {
            this.productos = [];
        } else {
            this.productos = datosLS;
        }






    }

})