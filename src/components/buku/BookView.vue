<template>
    <div>

    <!-- Detail Modal -->
    <div class="modal fade" id="DetailModal" tabindex="-1" aria-labelledby="DetailModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 font-weight-bold" id="DetailModalLabel">Book's Detail</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card-body text-justify">
                <h6 class="font-weight-bold">Title</h6>
                <p class="card-text">{{ judul_buku }}</p>
                <h6 class="font-weight-bold">Author</h6>
                <p class="card-text">{{ pengarang }}</p>
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
                <h1 class="modal-title fs-5 font-weight-bold" id="EditModalLabel">Edit Book's Data</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="UpdateBuku">
                    <div class="card-body">
                        <input type="hidden" v-model="id_buku">
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" v-model="judul_buku">
                        </div>    
                        <div class="form-group">
                            <label>Author</label>
                            <input type="text" class="form-control" v-model="pengarang">
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
                        <h1 class="m-0 font-weight-bold">Book's Data</h1>
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
                                <router-link class="btn btn-secondary mb-2" to="/Book/Create">
                                    <i class="fas fa-plus"></i> Create Data
                                </router-link>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th style="width: 10px">#</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(b, index) in buku" :key="b.id_buku">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ b.judul_buku }}</td>
                                            <td>{{ b.pengarang }}</td>
                                            <td>
                                                <div class="btn-group">
                                                    <button type="button" @click="GetDetail(b.id_buku)" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#DetailModal"> Detail </button>
                                                    <button type="button" @click="GetDetail(b.id_buku)" class="btn btn-warning" style="color: white" data-bs-toggle="modal" data-bs-target="#EditModal"> Edit </button>
                                                    <button type="button" @click="DeleteBuku(b)" class="btn btn-danger"> Delete </button>                                                      
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
            buku : [],
            id_buku : "",
            judul_buku : "",
            pengarang : "",

        }
    },  
    mounted() {
        this.GetBuku()
        this.GetDetail(this.$route.params.id)

    },
    methods : {
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
                    this.pengarang = response.data[0].pengarang
                }
            );
        },
        DeleteBuku(b) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    var url = 'http://localhost:8000/api/deletebuku/' + b.id_buku
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
        UpdateBuku : function(){
            let data =
            {
                id_buku : this.id_buku,
                judul_buku : this.judul_buku,
                pengarang : this.pengarang,
            }
            axios.put('http://localhost:8000/api/updatebuku/' + this.id_buku , data).then(
                ({data}) => {
                    swal("Your data has been updated!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Book')
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