<template>
    <div>
        <!-- Detail Modal -->
        <div class="modal fade" id="DetailModal" tabindex="-1" aria-labelledby="DetailModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 font-weight-bold" id="DetailModalLabel">{{nama_siswa}}'s Transaction</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card-body text-justify">
                    <h6 class="font-weight-bold">Title</h6>
                    <p class="card-text">{{ judul_buku }}</p>
                    <h6 class="font-weight-bold">Borrow Date</h6>
                    <p class="card-text">{{ tanggal_pinjam | moment("DD/MM/YYYY") }}</p>
                    <h6 class="font-weight-bold">Time Limit</h6>
                    <p class="card-text">{{ tenggat | moment("DD/MM/YYYY") }}</p>
                    <h6 v-if="tanggal_kembali >= tenggat" class="font-weight-bold">Return Date <span class="badge bg-warning text-light">Terlambat</span></h6>
                    <h6 v-else class="font-weight-bold">Return Date</h6>
                    <p v-if="tanggal_kembali == null" class="card-text"><span class="badge bg-danger">Not Returned</span></p>
                    <p v-else class="card-text">{{ tanggal_kembali | moment("DD/MM/YYYY") }}</p>
                    <h6 class="font-weight-bold">Fees</h6>
                    <p class="card-text">{{ denda }}</p>
                    <button type="button" v-if="denda > 0" @click="Lunas()" class="btn btn-secondary"> Pay Fee </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- Detail Modal End -->

        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 font-weight-bold">Loan's Data</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-dark card-outline">
                                <div class="card-body">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Name</th>
                                                <th>Title</th>
                                                <th>Time Limit</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(p, index) in peminjaman" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ p.nama_siswa }}</td>
                                                <td>{{ p.judul_buku }}</td>
                                                <td>{{ p.tenggat | moment("DD/MM/YYYY") }}</td>
                                                <td>
                                                    <span v-if="p.status == 'Dikembalikan'" class="badge bg-success">Returned</span>
                                                    <span v-else class="badge bg-danger">Not Returned</span>
                                                    <br>
                                                    <span v-if="p.denda == 0" class="badge bg-success">{{ p.tanggal_kembali }}</span>
                                                    <span v-else class="badge bg-warning text-light">Fee : {{ p.denda }}</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button type="button" @click="GetDetail(p.id_peminjaman)" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#DetailModal"> Detail </button>                                                 
                                                        <button type="button"  v-if="p.status == 'Dipinjam'" @click="Kembali(p)" class="btn btn-warning" style="color: white"> Return </button>
                                                        <button type="button" @click="DeletePeminjaman(p)" class="btn btn-danger"> Delete </button>                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(axios)

export default {
    data() {
        return {
            peminjaman : [],
            id_peminjaman : "",
            id_siswa : "",
            id_buku : "",
            tanggal_pinjaman : "",
            tenggat : "",
            tanggal_kembali : "",
            denda : "",
            siswa : [],
            buku : [],
        }
    },
    mounted() {  
        this.GetPeminjaman()
        this.GetDetail(this.$route.params.id)
        
    },
    methods : {
        GetPeminjaman : function (){
            axios.get('http://localhost:8000/api/getpeminjaman').then(
                ({data}) => {
                    this.peminjaman = data
                }
            );
        },
        GetDetail(p){
            axios.get('http://localhost:8000/api/getpeminjaman/' + p).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_peminjaman = response.data[0].id_peminjaman
                    this.id_siswa = response.data[0].id_siswa
                    this.nama_siswa = response.data[0].nama_siswa
                    this.id_buku = response.data[0].id_buku
                    this.judul_buku = response.data[0].judul_buku
                    this.tanggal_pinjam = response.data[0].tanggal_pinjam
                    this.tenggat = response.data[0].tenggat
                    this.tanggal_kembali = response.data[0].tanggal_kembali
                    this.denda = response.data[0].denda
                }
            );
        },
        Kembali(p){
            axios.put('http://localhost:8000/api/kembali/' + p.id_peminjaman).then(
                ({data}) => {
                    swal("You Returned the Book!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Transaction')
                    this.peminjaman = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        Lunas(){
            axios.put('http://localhost:8000/api/lunas/' + this.id_peminjaman).then(
                ({data}) => {
                    swal("You Paid Off the Fee!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Transaction')
                    this.peminjaman = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        DeletePeminjaman(p) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    var url = 'http://localhost:8000/api/deletepeminjaman/' + p.id_peminjaman
                    axios.delete(url)
                    swal("Poof! Your data has been deleted!", { 
                    icon: "success",
                    button: false,
                    });
                    setTimeout(() => {
                        location.reload()
                    }, 1500)
                } else {
                    swal("Your data is safe!");
                }
            });
        },
    }
}
</script>
