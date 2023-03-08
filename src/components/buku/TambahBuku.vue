<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h3 class="m-0 font-weight-bold">Create Book's Data</h3>
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
                                            <label>Title</label>
                                            <input type="text" class="form-control" v-model="buku.judul_buku" autocomplete="off">
                                        </div>
                                        <div class="form-group">
                                            <label>Author</label>
                                            <input type="text" class="form-control" v-model="buku.pengarang" autocomplete="off">
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
            buku : {}
        }
    },
    methods : {
        save() {
            this.save_data()
        },
        save_data() {
            axios.post('http://localhost:8000/api/createbuku', this.buku).then(
                ({data}) => {
                    swal("Your data has been created!", {
                        icon: "success",
                        button: false,
                    });
                    this.$router.push('/Book')
                    this.siswa = data
                }
            )
        }
 
    }
}
</script>