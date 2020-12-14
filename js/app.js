const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Compras Quincenales',
        productos: [],
        productoNombre: '',
        cantidad: '',
        precio: '',
        edition: false,
        ind: 0

    },
    methods: {
        guardarArticulo: function (item, index) {

            if (edition) {
                try {

                    let taskdb = {
                        productoNombre: this.productoNombre,
                        cantidad: this.cantidad,
                        precio: this.precio,
                        precioTotal: this.cantidad * this.precio,
                        estado: false
                    }
                    this.productos[this.ind] = taskdb;

                    localStorage.setItem('productos_dt', JSON.stringify(this.productos));

                    let taskDB = JSON.parse(localStorage.getItem('productos_dt'));
                    this.productos = taskDB;

                    this.productoNombre = '';
                    this.cantidad = '';
                    this.precio = '';
                    console.log('Modo edicion:Articulo Editado');
                    edition = false;
                } catch (error) {
                    console.log(error.message);
                }

            } else {
                if(this.productoNombre != "" && this.cantidad != "" && this.precio != ""){
                 this.productos.push({
                    productoNombre: this.productoNombre,
                    cantidad: this.cantidad,
                    precio: this.precio,
                    precioTotal: this.cantidad * this.precio,
                    estado: false
                });
                localStorage.setItem('productos_dt', JSON.stringify(this.productos));
                console.log('Modo insercion:Articulo Insertado');
                this.productoNombre = '';
                this.cantidad = '';
                this.precio = '';
                }
                 console.log('Campos vacios');
               
            }



        },
        editarEstado: function (index) {
            if (this.productos[index].estado) {
                this.productos[index].estado = false;
                localStorage.setItem('productos_dt', JSON.stringify(this.productos));
            } else {
                this.productos[index].estado = true;
                localStorage.setItem('productos_dt', JSON.stringify(this.productos));
            }
        },
        editarProducto: function (item, index) {
            edition = true;
            this.productoNombre = item.productoNombre;
            this.cantidad = item.cantidad;
            this.precio = item.precio;
            this.ind = index;

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
            edition = false;
        } else {
            this.productos = datosLS;
            edition = false;
        }






    }

})
