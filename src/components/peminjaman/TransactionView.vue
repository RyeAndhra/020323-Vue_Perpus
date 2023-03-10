<template>
    <div>

    <!-- Create Peminjaman Modal -->
    <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 font-weight-bold" id="EditModalLabel">{{ judul_buku }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="CreatePeminjaman">
                    <div class="card-body">
                        <input type="hidden" v-model="id_buku">
                        <div class="form-group">
                            <label>Select your name :</label>
                            <select class="form-control" v-model="peminjaman.id_siswa">                                                   
                                <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa" >{{ s.nama_siswa }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-dark"> Borrow </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    <!-- Create Peminjaman Modal End -->

    <navbar-component></navbar-component>
    <sidebar-component></sidebar-component>
    <div class="content-wrapper">            
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 font-weight-bold">Library</h1>
                    </div>          
                </div>
            </div>
        </div>
        <div class="content-wrapper">
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div v-for="b in buku" :key="b.id_buku" class="card card-dark card-outline">
                                <div class="card-body text-justify">
                                    <h6 class="font-weight-bold">{{ b.judul_buku }}</h6>
                                    <p class="card-text">by {{ b.pengarang }}</p>
                                    <button type="button" @click="GetDetail(b.id_buku)" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#EditModal"> Borrow </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
            buku : [],
            id_buku : "",
            judul_buku : "",
            siswa : {},
            peminjaman : {}

        }
    },  
    mounted() {
        this.DataSiswa()
        this.GetBuku()
        this.GetDetail(this.$route.params.id)

    },
    methods : {
        DataSiswa() {
            axios.get('http://localhost:8000/api/getsiswa').then(
                ({data}) => {
                    this.siswa = data
                }
            )
        },
        GetBuku : function (){
            axios.get('http://localhost:8000/api/getbuku').then(
                ({data}) => {
                    this.buku = data
                }
            );
        },
        GetDetail(b){
            axios.get('http://localhost:8000/api/getbuku/' + b).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_buku = response.data[0].id_buku
                    this.judul_buku = response.data[0].judul_buku
                }
            );
        },
        CreatePeminjaman : function() {
            let data =
            {
                id_buku : this.id_buku,
                id_siswa : this.peminjaman.id_siswa
            }
            axios.post('http://localhost:8000/api/createpeminjaman', data).then(
                ({data}) => {
                    swal("You Borrowed a Book!", {
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
        }
    }
}
</script>