<template>
  <div class="keranjang">
      <Navbar :updateKeranjang="keranjangs"/> 
      <div class="container">
            <!-- breadcumb -->
            <div class="row mt-4">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/" class="text-dark">Home</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/foods"  class="text-dark">Foods</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page"><router-link to="/foods">Keranjang</router-link></li>
                            </ol>
                        </nav>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <h2>Keranjang <strong>Saya</strong></h2>
                    <div class="table-responsive mt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Foto</th>
                                    <th scope="col">Makanan</th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Jumlah</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Total Harga</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                                    <th>{{ index+1 }}</th>
                                    <td>
                                        <img :src="'../assets/images/'+keranjang.product.gambar" class="img-fluid shadow" width="250" >
                                    </td>
                                    <td><strong>{{ keranjang.product.nama }}</strong></td>
                                    <td>{{ keranjang.keterangan ? keranjang.keterangan : "-" }}</td>
                                    <td>{{ keranjang.jumlah_pemesanan }}</td>
                                    <td align="right">Rp. {{ keranjang.product.harga }}</td>
                                    <td align="right"><strong>Rp. {{ keranjang.product.harga* keranjang.jumlah_pemesanan }}</strong></td>
                                    <td align="center" class="text-danger">
                                        <b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" align="right">
                                        <strong>Total Harga</strong>
                                    </td>
                                    <td  align="right">
                                        <strong>Rp. {{totalHarga}}</strong>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- form checkout -->

            <div class="row justify-content-end">
                <div class="col-md-4">
                    <form action="" v-on:submit.prevent>
                        <div class="form-group">
                            <label for="nama">Nama : </label>
                            <input type="text" class="form-control" v-model="pesan.nama">
                        </div>
                        <div class="form-group">
                            <label for="noMeja">Nomor Meja : </label>
                            <input type="number" class="form-control" v-model="pesan.noMeja">
                        </div>
                        <button type="submit" @click="checkout" class="btn btn-success float-right"><b-icon-cart></b-icon-cart> Pesan</button>
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
    name: 'Keranjang',
    components: {
        Navbar,
    },
    data(){
        return {
            keranjangs: [],
            pesan: {},
        }
    },
    methods:{
        setKeranjangs(data){
            this.keranjangs = data;
        },
        hapusKeranjang(id){
            axios
            .delete("http://localhost:3000/keranjangs/"+id)
            .then(()=> 
                this.$toast.error('Sukses Hapus Keranjang', {
                    type: 'error',
                    position: 'top-right',
                    duration: 3000,
                    dismissible: true,
                })
            )
            .catch((error)=>console.log(error))

            // updated data keranjang
            axios
            .get("http://localhost:3000/keranjangs")
            .then((response)=>  this.setKeranjangs(response.data))
            .catch((error)=>console.log(error))

        },
        checkout(){
            if(this.pesan.nama && this.pesan.noMeja){

                this.pesan.keranjang = this.keranjangs;

                console.log(this.pesan)

                axios
                .post("http://localhost:3000/pesanans", this.pesan)
                .then(()=>{

                    // hapus semua keranjang
                    this.keranjangs.map(function(item){
                        return axios
                                .delete("http://localhost:3000/keranjangs/"+item.id)
                                .catch((error)=>console.log(error))
                    })

                    this.$router.push({path: "/pesanan-success"})
                    this.$toast.success('Sukses Di Pesan', {
                        type: 'success',
                        position: 'top-right',
                        duration: 3000,
                        dismissible: true,
                    })
                })
                .catch((err)=> console.log(err))
            }else{
                this.$toast.error('Nama Dan Meja Harus Di isi', {
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
        .get("http://localhost:3000/keranjangs")
        .then((response)=>  this.setKeranjangs(response.data))
        .catch((error)=>console.log(error))
    },
    computed:{
        totalHarga(){
            return this.keranjangs.reduce(function(item, data){
                return item+(data.product.harga*data.jumlah_pemesanan)
            }, 0)
        }
    }
};
</script>

<style>

</style>