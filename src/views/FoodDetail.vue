<template>
    <div class="food-detail">
        <Navbar />
        <div class="container">
            <!-- breadcumb -->
            <div class="row mt-4">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/" class="text-dark">Home</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/foods"  class="text-dark">Foods</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"><router-link to="/foods">Foods Order</router-link></li>
                            </ol>
                        </nav>
                    </nav>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <img :src="'../assets/images/'+product.gambar" class="img-fluid shadow" >
                </div>
                <div class="col-md-6">
                    <h2><strong>{{product.nama}}</strong></h2>
                    <h4>Harga : <strong>Rp. {{ product.harga}} </strong></h4>
                    <form class="mt-4" v-on:submit.prevent>
                        <div class="form-group">
                            <label for="jumlah_pesan">Jumlah Pesan</label>
                            <input type="number" class="form-control" v-model="pesan.jumlah_pemesanan">
                        </div>
                        <div class="form-group">
                            <label for="keterangan">Keterangan</label>
                            <textarea class="form-control" placeholder="keterangan spt : Pedas, Nasi Setengah"  v-model="pesan.keterangan" ></textarea>
                        </div>
                        <button type="submit" @click="pemesanan" class="btn btn-success"><b-icon-cart></b-icon-cart> Pesan</button>
                    </form>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name: 'FoodDetail',
    components: {
        Navbar,
    },
    data(){
        return {
            product: {},
            pesan: {}
        }
    },
    methods: {
        setProducts(data){
            this.product = data;
        },
        pemesanan(){
            this.pesan.product = this.product;
            if(this.pesan.jumlah_pemesanan && this.pesan.keterangan){
                axios
                .post("http://localhost:3000/keranjangs", this.pesan)
                .then(()=>{
                    this.$router.push({path: "/keranjang"})
                    this.$toast.success('Sukses Masuk Keranjang', {
                        type: 'success',
                        position: 'top-right',
                        duration: 3000,
                        dismissible: true,
                    })
                })
                .catch((err)=> console.log(err))
            }else{
                this.$toast.error('Jumlah Pesanan Harus Di isi', {
                    type: 'error',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true,
                })
            }
        }
    },
    mounted(){
        axios
        .get("http://localhost:3000/products/"+this.$route.params.id)
        .then((response)=> this.setProducts(response.data))
        .catch((error)=>console.log(error));
    }
};



</script>

<style>

</style>