<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h3 class="m-0 font-weight-bold">Create Student's Data</h3>
                        </div>          
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary">
                                <form @submit.prevent="save">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Name</label>
                                            <input type="text" class="form-control" v-model="siswa.nama_siswa" autocomplete="off">
                                        </div>                                        
                                        <div class="form-group">
                                            <label>Date of Birth</label>
                                            <b-form-datepicker id="example-datepicker" class="mb-2" v-model="siswa.tanggal_lahir"></b-form-datepicker>
                                        </div>
                                        <div class="form-group">
                                            <div>
                                                <label>Gender</label>
                                            </div>
                                            <div class="btn-group btn-group-toggle" data-toggle="buttons">                                                
                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="L" v-model="siswa.gender"> Male
                                                </label>
                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="P" v-model="siswa.gender"> Female
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Address</label>
                                            <textarea rows="4" class="form-control" v-model="siswa.alamat"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Class</label>
                                            <select class="form-control" v-model="siswa.id_kelas">                                                   
                                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas" >{{ k.nama_kelas }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary">Save</button>
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
import swal from 'sweetalert'

Vue.use(axios)

export default {
    data() {
        return {
            siswa : {},
            kelas : {}
        }
    },
    created() {    
        this.DataKelas()
            
    },
    methods : {
        DataKelas() {
            axios.get('http://localhost:8000/api/getkelas').then(
            ({data}) => {
                this.kelas = data
            }
        )
        },
        save() {
            this.save_data()
        },
        save_data() {
            axios.post('http://localhost:8000/api/createsiswa', this.siswa).then(
                ({data}) => {
                    swal("Your data has been created!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/getsiswa')
                    this.siswa = data
                }
            )
        }
 
    }
}
</script>