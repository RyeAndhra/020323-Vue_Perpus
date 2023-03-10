<template>
    <div>

    <!-- Detail Modal -->
    <div class="modal fade" id="DetailModal" tabindex="-1" aria-labelledby="DetailModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 font-weight-bold" id="DetailModalLabel">{{nama_siswa}}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card-body text-justify">
                <h6 class="font-weight-bold">Class</h6>
                <p class="card-text">{{ nama_kelas }}</p>
                <h6 class="font-weight-bold">Date of Birth</h6>
                <p class="card-text">{{ tanggal_lahir | moment("DD/MM/YYYY") }}</p>
                <h6 class="font-weight-bold">Gender</h6>
                <p class="card-text">{{ gender }}</p>
                <h6 class="font-weight-bold">Address</h6>
                <p class="card-text">{{ alamat }}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    <!-- Detail Modal End -->
    

    <!-- Edit Modal -->
    <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 font-weight-bold" id="EditModalLabel">Edit Student's Data</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="UpdateSiswa">
                    <div class="card-body">
                        <input type="hidden" v-model="id_siswa">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="nama_siswa">
                        </div>                                        
                        <div class="form-group">
                            <label>Date of Birth</label>
                            <b-form-datepicker id="example-datepicker" class="mb-2" v-model="tanggal_lahir"></b-form-datepicker>
                        </div>
                        <div class="form-group">
                            <div>
                            <label>Gender</label>
                            </div>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">                                                
                                <label v-if="gender == 'L'" class="btn btn-outline-secondary active">
                                    <input type="radio" value="L" v-model="gender" checked> Male                                                 
                                </label>
                                <label v-else class="btn btn-outline-secondary">
                                    <input type="radio" value="L" v-model="gender"> Male                                                    
                                </label>
                                <label v-if="gender == 'P' " class="btn btn-outline-secondary active">
                                    <input type="radio" value="P" v-model="gender" checked> Female                                                    
                                </label>
                                <label v-else class="btn btn-outline-secondary">
                                    <input type="radio" value="P" v-model="gender"> Female                                                    
                                </label>          
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Address</label>
                            <textarea rows="4" class="form-control" v-model="alamat"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Class</label>
                            <select class="form-control" v-model="id_kelas">                                                   
                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas" > {{ k.nama_kelas }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-secondary"> Save </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    <!-- Edit Modal End -->

    <navbar-component></navbar-component>
    <sidebar-component></sidebar-component>
    <div class="content-wrapper">            
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 font-weight-bold">Student's Data</h1>
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
                                <router-link class="btn btn-secondary mb-2" to="/Student/Create">
                                    <i class="fas fa-plus"></i> Create Data
                                </router-link>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(s, index) in siswa" :key="s.id_siswa">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ s.nama_siswa }}</td>
                                            <td>{{ s.nama_kelas }}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <button type="button" @click="GetDetail(s.id_siswa)" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#DetailModal"> Detail </button>
                                                    <!-- Edit Page Disabled -->
                                                    <!-- <router-link :to="{path: '/editsiswa/' + s.id_siswa}" class="btn btn-warning"> Edit </router-link> -->
                                                    <button type="button" @click="GetDetail(s.id_siswa)" class="btn btn-warning" style="color: white" data-bs-toggle="modal" data-bs-target="#EditModal"> Edit </button>
                                                    <button type="button" @click="DeleteSiswa(s)" class="btn btn-danger"> Delete </button>                                                      
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
    mounted() {
        this.GetSiswa()
        this.GetDetail(this.$route.params.id)
        this.DataKelas()

    },
    methods : {
        // GetSiswa() {
        //     var page = 'http://localhost:8000/api/getsiswa'
        //     axios.get(page).then(
        //         ({data})=>{
        //             this.siswa = data
        //         }
        //     );
        // },
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
        GetDetail(s){
            axios.get('http://localhost:8000/api/getsiswa/' + s).then(
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
        DeleteSiswa(s) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    var url = 'http://localhost:8000/api/deletesiswa/' + s.id_siswa
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
        UpdateSiswa : function(){
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
                ({data}) => {
                    swal("Your data has been updated!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Student')
                    this.siswa = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        }
    }
}
</script>