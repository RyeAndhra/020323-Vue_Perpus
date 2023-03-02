<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Siswa</h1>
                        </div>          
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-success">
                                <form @submit.prevent="save_edit">
                                    <div class="card-body">
                                        <input type="hidden" v-model="id_siswa">
                                        <div class="form-group">
                                            <label>Nama Anggota</label>
                                            <input type="text" class="form-control" v-model="nama_siswa">
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Tanggal Lahir</label>
                                            <b-form-datepicker id="example-datepicker" class="mb-2" v-model="tanggal_lahir"></b-form-datepicker>
                                        </div>
                                        <div class="form-group">
                                            <div>
                                                <label>Jenis Kelamin</label>
                                            </div>
                                            <div class="btn-group btn-group-toggle" data-toggle="buttons">                                                
                                                <label v-if="gender == 'L'" class="btn btn-outline-secondary active">
                                                    <input type="radio" value="L" v-model="gender" checked> Laki-laki                                                   
                                                </label>
                                                <label v-else class="btn btn-outline-secondary">
                                                    <input type="radio" value="L" v-model="gender"> Laki-laki                                                    
                                                </label>
                                                <label v-if="gender == 'P' " class="btn btn-outline-secondary active">
                                                    <input type="radio" value="P" v-model="gender" checked> Perempuan                                                    
                                                </label>
                                                <label v-else class="btn btn-outline-secondary">
                                                    <input type="radio" value="P" v-model="gender"> Perempuan                                                    
                                                </label>
                                                
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat</label>
                                            <textarea rows="4" class="form-control" v-model="alamat"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Kelas</label>
                                            <select class="form-control" v-model="id_kelas">                                                   
                                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas" > {{ k.nama_kelas }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
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

Vue.use(axios)

export default {
    data : function () {
        return {
            siswa : [],
            id_siswa : "",
            id_kelas : "",
            nama_siswa : "",
            tanggal_lahir : "",
            gender : "",
            alamat : "",
            kelas : [],
        }
    },
    mounted(){
        this.GetSiswa()
        this.GetDetail(this.$route.params.id)
        this.DataKelas()
    },
    methods : {
        GetSiswa : function (){
            axios.get('http://localhost:8000/api/getsiswa').then(
                ({data}) => {
                    this.siswa = data
                }
            );
        },
        DataKelas(){
            axios.get('http://localhost:8000/api/getkelas').then(
                ({data}) => {
                this.kelas = data
                }
            );
        },
        GetDetail(id_siswa){
            axios.get('http://localhost:8000/api/detailsiswa/' + id_siswa).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_siswa = response.data[0].id_siswa
                    this.id_kelas = response.data[0].id_kelas
                    this.nama_siswa = response.data[0].nama_siswa
                    this.tanggal_lahir = response.data[0].tanggal_lahir
                    this.gender = response.data[0].gender
                    this.alamat = response.data[0].alamat
                    this.nama_kelas = response.data[0].nama_kelas
                }
            );
        },
        save_edit : function(){
            let data =
            {
                id_siswa : this.id_siswa,
                id_kelas : this.id_kelas,
                nama_siswa : this.nama_siswa,
                tanggal_lahir : this.tanggal_lahir,
                gender : this.gender,
                alamat : this.alamat
            }
            axios.put('http://localhost:8000/api/updatesiswa/' + this.id_siswa , data).then(
            (response)=>{
                alert('Sukses Mengubah Data Siswa')
                console.log(response)
                this.$router.push('/getsiswa')
            })
        }

    }
}
</script>
